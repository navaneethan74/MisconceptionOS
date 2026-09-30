// MisconceptionOS - Intelligent Diagnostic & Socratic Engine
// Analyzes both answer and reasoning, handles prompt injections, 'I don't know', insufficient evidence, and recurring cross-concept patterns.

import { QUESTION_BANK } from './questions.js';
import { db } from './db.js';

export const MISCONCEPTION_CATALOG = {
  abstract_vs_implementation: {
    key: "abstract_vs_implementation",
    title: "Abstract Behavior vs Implementation Behavior",
    underlyingConcept: "Abstract data-structure behavior vs implementation-specific behavior",
    description: "Treating an implementation-specific return value or error convention as a universal rule of the abstract data structure.",
    studentExplanation: "You seem to be treating -1 as a rule of the data structure itself. However, -1 is one possible way an implementation can handle an empty state.",
    remediationConcept: "An abstract data structure specifies operations and preconditions (such as underflow when empty), whereas specific programming languages or libraries choose how to signal that condition (e.g. returning -1, null, or raising an exception)."
  },
  lifo_vs_fifo: {
    key: "lifo_vs_fifo",
    title: "LIFO/FIFO Confusion",
    underlyingConcept: "LIFO vs FIFO ordering semantics",
    description: "Confusing Last-In First-Out with First-In First-Out removal semantics.",
    studentExplanation: "You are describing First-In First-Out (FIFO) behavior, where the earliest item added is removed first. However, a stack operates strictly on Last-In First-Out (LIFO).",
    remediationConcept: "A stack operates on Last-In, First-Out (LIFO), like a stack of plates where the top plate placed last is the one removed first. FIFO applies to queues, like waiting in line."
  },
  pointer_severing: {
    key: "pointer_severing",
    title: "Dangling Pointer / Unlinked Node Deletion",
    underlyingConcept: "Pointer rewiring in linked structures",
    description: "Assuming that removing a node from memory automatically links surrounding nodes.",
    studentExplanation: "Freeing or deleting a node without updating the preceding node leaves the preceding node pointing to unallocated memory, severing the list.",
    remediationConcept: "In a singly linked list, each node only knows about its immediate successor. You must explicitly rewire the previous node's next pointer before deleting the target node."
  },
  monotonicity_requirement: {
    key: "monotonicity_requirement",
    title: "Ignoring Algorithm Invariant Preconditions",
    underlyingConcept: "Binary search divide-and-conquer preconditions",
    description: "Attempting to apply binary search without monotonic ordering.",
    studentExplanation: "Binary search relies on ordering to discard half the search space with each comparison. Without sorted order, discarding half can discard the target element.",
    remediationConcept: "Binary search requires a sorted collection so that comparisons provide a definite direction. Without ordering, a linear scan (O(N)) is required."
  },
  bst_subtree_invariant: {
    key: "bst_subtree_invariant",
    title: "Local Child vs Global Subtree Invariant Confusion",
    underlyingConcept: "Global binary search tree invariant",
    description: "Checking BST properties only against immediate children rather than the entire subtree.",
    studentExplanation: "The BST property requires that ALL keys in a node's left subtree are strictly less than the node's key, not just the immediate left child.",
    remediationConcept: "BST lookup efficiency is guaranteed because any search can prune entire subtrees. A single violation deep in a subtree breaks search correctness."
  }
};

export class DiagnosticEngine {
  /**
   * Sanitizes input to protect against prompt injection or malicious text while preserving educational meaning.
   */
  sanitizeInput(text) {
    if (!text) return '';
    return text.toString()
      .replace(/<[^>]*>/g, '') // remove HTML tags
      .trim();
  }

  /**
   * Analyzes student answer and reasoning deeply.
   */
  async diagnose(userId, questionId, rawAnswer, rawReasoning) {
    const answer = this.sanitizeInput(rawAnswer);
    const reasoning = this.sanitizeInput(rawReasoning);
    const qData = QUESTION_BANK[questionId];

    if (!qData) {
      return {
        type: 'OUT_OF_SCOPE',
        status: 'Topic Outside Scope',
        studentExplanation: 'This topic is currently outside the supported learning scope.',
        needsSocratic: false
      };
    }

    const lowerAns = answer.toLowerCase();
    const lowerReas = reasoning.toLowerCase();
    const fullText = `${lowerAns} ${lowerReas}`;

    // 1. Check for "I don't know" / Uncertainty
    if (this.isUncertainOrDontKnow(lowerAns, lowerReas)) {
      return {
        type: 'DONT_KNOW',
        status: "That's completely okay",
        title: "Starting the Concept Together",
        studentExplanation: "Data structures have subtle properties that are easiest to learn through exploration. Let's think through this together: What is a removal operation supposed to take when there are zero items present?",
        needsSocratic: true,
        socraticQuestion: qData.socraticStages[0]?.prompt || "What does an empty state mean conceptually?",
        concept: qData.concept
      };
    }

    // 2. Check for Insufficient Evidence / Vague Reasoning
    if (this.isInsufficientEvidence(answer, reasoning)) {
      return {
        type: 'INSUFFICIENT_EVIDENCE',
        status: 'Clarification Needed',
        title: 'We need a little more reasoning to determine your understanding',
        studentExplanation: 'Your answer gives an initial thought, but explaining why you think this happens helps us pinpoint your exact mental model. Could you elaborate on what occurs conceptually?',
        needsClarification: true,
        concept: qData.concept
      };
    }

    // 3. Question-specific Diagnosis
    let diagnosticResult = null;

    if (questionId === 'stack_underflow' || questionId === 'queue_underflow') {
      diagnosticResult = this.evaluateUnderflow(questionId, qData.concept, lowerAns, lowerReas, fullText);
    } else if (questionId === 'stack_principle') {
      diagnosticResult = this.evaluatePrinciple(questionId, qData.concept, lowerAns, lowerReas, fullText);
    } else if (questionId === 'linked_list_delete') {
      diagnosticResult = this.evaluateLinkedList(questionId, qData.concept, lowerAns, lowerReas, fullText);
    } else if (questionId === 'binary_search_precondition') {
      diagnosticResult = this.evaluateBinarySearch(questionId, qData.concept, lowerAns, lowerReas, fullText);
    } else if (questionId === 'tree_bst_property') {
      diagnosticResult = this.evaluateBST(questionId, qData.concept, lowerAns, lowerReas, fullText);
    }

    if (!diagnosticResult) {
      diagnosticResult = {
        type: 'INSUFFICIENT_EVIDENCE',
        status: 'Clarification Needed',
        title: 'We need a little more reasoning to determine your understanding',
        studentExplanation: 'Could you explain the reasoning behind your answer in a little more detail?',
        needsClarification: true,
        concept: qData.concept
      };
    }

    // 4. Cross-Concept Recurring Misconception Check
    if (diagnosticResult.type === 'MISCONCEPTION_DETECTED') {
      const recurringCheck = await this.checkRecurringMisconception(userId, qData.concept, diagnosticResult.misconceptionKey);
      if (recurringCheck.isRecurring) {
        diagnosticResult.status = 'Similar recurring misconception detected';
        diagnosticResult.recurring = recurringCheck;
      }
    }

    return diagnosticResult;
  }

  isUncertainOrDontKnow(ans, reas) {
    const uncertainPhrases = [
      "i don't know", "i dont know", "dont know", "not sure", "no idea",
      "have no idea", "unsure", "not certain", "don't know", "idk"
    ];
    return uncertainPhrases.some(phrase => ans === phrase || reas === phrase || reas.startsWith(phrase));
  }

  isInsufficientEvidence(ans, reas) {
    if (!ans || !reas) return true;
    const words = reas.split(/\s+/).filter(Boolean);
    if (words.length < 3) return true;

    const vagueTokens = ["because", "just because", "guess", "guessing", "random", "why not"];
    if (vagueTokens.includes(reas.trim())) return true;

    return false;
  }

  evaluateUnderflow(questionId, concept, lowerAns, lowerReas, fullText) {
    const mentionsMinusOne = fullText.includes("-1") || fullText.includes("minus one") || fullText.includes("negative one");
    const reasonsAsRule =
      fullText.includes("should return -1") ||
      fullText.includes("returns -1") ||
      fullText.includes("to show that the stack is empty") ||
      fullText.includes("to show that the queue is empty") ||
      fullText.includes("empty data structure should return") ||
      fullText.includes("function should return -1") ||
      fullText.includes("always returns -1") ||
      fullText.includes("must return -1") ||
      (mentionsMinusOne && (fullText.includes("empty") || fullText.includes("remove") || fullText.includes("signal")));

    const isCorrectAbstract =
      (fullText.includes("underflow") || fullText.includes("cannot remove") || fullText.includes("exception") || fullText.includes("depends on") || fullText.includes("error")) &&
      !reasonsAsRule;

    if (reasonsAsRule) {
      const cat = MISCONCEPTION_CATALOG.abstract_vs_implementation;
      return {
        type: 'MISCONCEPTION_DETECTED',
        status: 'Misconception detected',
        misconceptionKey: cat.key,
        title: cat.title,
        underlyingConcept: cat.underlyingConcept,
        studentExplanation: concept.toLowerCase().includes('queue')
          ? "You seem to be treating -1 as a rule of the queue itself. However, -1 is one possible way an implementation can handle an empty queue."
          : "You seem to be treating -1 as a rule of the stack itself. However, -1 is one possible way an implementation can handle an empty stack.",
        detailedEvidence: "Implementation-specific return value (-1) treated as a universal rule of the abstract concept.",
        needsSocratic: true,
        concept
      };
    }

    if (isCorrectAbstract) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Accurate Abstract Understanding',
        underlyingConcept: 'Abstract underflow definition',
        studentExplanation: `You accurately distinguish that attempting to remove from an empty ${concept.toLowerCase()} represents an underflow condition, and how this condition is handled is an implementation choice.`,
        needsSocratic: false,
        concept
      };
    }

    return null;
  }

  evaluatePrinciple(questionId, concept, lowerAns, lowerReas, fullText) {
    const suggestsFifo =
      fullText.includes("fifo") ||
      fullText.includes("first in first out") ||
      (fullText.includes("first element") && fullText.includes("first") && fullText.includes("removed"));

    const suggestsLifo =
      fullText.includes("lifo") ||
      fullText.includes("last in first out") ||
      (fullText.includes("last element") && fullText.includes("first removed")) ||
      (fullText.includes("most recent") && fullText.includes("first"));

    if (suggestsFifo) {
      const cat = MISCONCEPTION_CATALOG.lifo_vs_fifo;
      return {
        type: 'MISCONCEPTION_DETECTED',
        status: 'Different misconception detected',
        misconceptionKey: cat.key,
        title: cat.title,
        underlyingConcept: cat.underlyingConcept,
        studentExplanation: cat.studentExplanation,
        detailedEvidence: "Confused Last-In First-Out with First-In First-Out.",
        needsSocratic: true,
        concept
      };
    }

    if (suggestsLifo) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Accurate Principle Understanding',
        underlyingConcept: 'LIFO principle',
        studentExplanation: "Correct. A stack operates strictly on the Last-In, First-Out (LIFO) principle, where the most recently added item is the first to be popped.",
        needsSocratic: false,
        concept
      };
    }

    return null;
  }

  evaluateLinkedList(questionId, concept, lowerAns, lowerReas, fullText) {
    const forgetsPrevious =
      fullText.includes("just delete") ||
      fullText.includes("b is gone") ||
      fullText.includes("auto link") ||
      (fullText.includes("no pointer") && fullText.includes("needed"));

    const updatesPointer =
      fullText.includes("a.next") ||
      fullText.includes("previous node") ||
      fullText.includes("rewire") ||
      fullText.includes("b.next") ||
      fullText.includes("point to c");

    if (forgetsPrevious) {
      const cat = MISCONCEPTION_CATALOG.pointer_severing;
      return {
        type: 'MISCONCEPTION_DETECTED',
        status: 'Misconception detected',
        misconceptionKey: cat.key,
        title: cat.title,
        underlyingConcept: cat.underlyingConcept,
        studentExplanation: cat.studentExplanation,
        detailedEvidence: "Failed to recognize requirement to update predecessor pointer before node removal.",
        needsSocratic: true,
        concept
      };
    }

    if (updatesPointer) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Accurate Pointer Manipulation',
        underlyingConcept: 'Singly linked list deletion invariant',
        studentExplanation: "Correct. In a singly linked list, A.next must be explicitly updated to B.next to bypass the deleted node and preserve list continuity.",
        needsSocratic: false,
        concept
      };
    }

    return null;
  }

  evaluateBinarySearch(questionId, concept, lowerAns, lowerReas, fullText) {
    const thinksUnsortedWorks =
      (fullText.includes("yes") || fullText.includes("can work") || fullText.includes("possible")) &&
      !fullText.includes("cannot") && !fullText.includes("no,");

    const recognizesSortedPrecondition =
      fullText.includes("no") ||
      fullText.includes("must be sorted") ||
      fullText.includes("requires sorted") ||
      fullText.includes("cannot determine which half");

    if (thinksUnsortedWorks) {
      const cat = MISCONCEPTION_CATALOG.monotonicity_requirement;
      return {
        type: 'MISCONCEPTION_DETECTED',
        status: 'Misconception detected',
        misconceptionKey: cat.key,
        title: cat.title,
        underlyingConcept: cat.underlyingConcept,
        studentExplanation: cat.studentExplanation,
        detailedEvidence: "Assumed binary search elimination works without sorted ordering invariant.",
        needsSocratic: true,
        concept
      };
    }

    if (recognizesSortedPrecondition) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Accurate Algorithm Precondition Understanding',
        underlyingConcept: 'Binary search monotonic precondition',
        studentExplanation: "Correct. Binary search fundamentally depends on sorted ordering to eliminate half of the search range at each step.",
        needsSocratic: false,
        concept
      };
    }

    return null;
  }

  evaluateBST(questionId, concept, lowerAns, lowerReas, fullText) {
    const onlyChecksImmediate =
      (fullText.includes("only child") || fullText.includes("immediate") || fullText.includes("left child")) &&
      !fullText.includes("all nodes");

    const checksSubtree =
      fullText.includes("all keys") ||
      fullText.includes("entire subtree") ||
      fullText.includes("every node") ||
      fullText.includes("all elements");

    if (onlyChecksImmediate) {
      const cat = MISCONCEPTION_CATALOG.bst_subtree_invariant;
      return {
        type: 'MISCONCEPTION_DETECTED',
        status: 'Misconception detected',
        misconceptionKey: cat.key,
        title: cat.title,
        underlyingConcept: cat.underlyingConcept,
        studentExplanation: cat.studentExplanation,
        detailedEvidence: "Treated local parent-child inequality as sufficient rather than full subtree invariant.",
        needsSocratic: true,
        concept
      };
    }

    if (checksSubtree) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Accurate BST Invariant Understanding',
        underlyingConcept: 'Global BST ordering property',
        studentExplanation: "Correct. In a valid BST, the invariant applies globally: every key in the left subtree must be less than the root key.",
        needsSocratic: false,
        concept
      };
    }

    return null;
  }

  async checkRecurringMisconception(userId, currentConcept, misconceptionKey) {
    if (!userId) return { isRecurring: false };
    const history = await db.getMisconceptions(userId);
    const priorMatch = history.find(m => m.misconception_key === misconceptionKey && m.concept !== currentConcept);

    if (priorMatch) {
      return {
        isRecurring: true,
        previousConcept: priorMatch.concept,
        misconceptionKey,
        underlyingConcept: priorMatch.underlying_concept,
        title: priorMatch.title,
        previousEvidence: priorMatch.evidence,
        message: `We noticed a similar reasoning pattern in your earlier ${priorMatch.concept} question.`,
        synthesis: `Your mistakes in ${priorMatch.concept} and ${currentConcept} appear to come from a similar idea: confusing abstract behavior with implementation-specific behavior.`
      };
    }

    return { isRecurring: false };
  }

  /**
   * Evaluates student response to Socratic guidance.
   */
  evaluateSocratic(questionId, stageIndex, rawReasoning) {
    const reasoning = this.sanitizeInput(rawReasoning);
    const qData = QUESTION_BANK[questionId];
    if (!qData || !qData.socraticStages || !qData.socraticStages[stageIndex]) {
      return { status: 'ERROR', message: 'Socratic stage not found.' };
    }

    const stage = qData.socraticStages[stageIndex];
    if (reasoning.length < 5) {
      return {
        status: 'INSUFFICIENT',
        heading: 'A little more detail is helpful',
        explanation: 'Please share a complete thought so we can work through the concept together.'
      };
    }

    const persists = stage.persistentCheck(reasoning);
    const corrected = stage.correctedCheck(reasoning);

    if (persists && !corrected) {
      const nextIndex = stageIndex + 1;
      const nextQuestion = qData.socraticStages[nextIndex]
        ? qData.socraticStages[nextIndex].prompt
        : "Reflect on this: What condition is fundamental to an empty data structure regardless of language?";

      return {
        status: 'MISCONCEPTION_PERSISTS',
        heading: 'Misconception persists',
        explanation: qData.concept === 'Stack'
          ? 'Your reasoning still treats -1 as a rule of the stack itself.'
          : `Your reasoning still treats -1 as a rule of the ${qData.concept.toLowerCase()} itself.`,
        nextQuestion,
        nextStageIndex: qData.socraticStages[nextIndex] ? nextIndex : stageIndex,
        isResolved: false
      };
    }

    if (corrected) {
      return {
        status: 'CONCEPT_UNDERSTOOD',
        heading: 'Concept understood',
        explanation: qData.concept === 'Stack'
          ? 'You now distinguish the stack concept from the way a particular implementation handles an empty stack.'
          : `You now distinguish the ${qData.concept.toLowerCase()} concept from the way a particular implementation handles an empty state.`,
        isResolved: true,
        readyForTransfer: true,
        transferQuestion: qData.transferQuestion
      };
    }

    return {
      status: 'MISCONCEPTION_PERSISTS',
      heading: 'Misconception persists',
      explanation: 'Your reasoning does not yet clearly separate abstract rules from implementation choices.',
      nextQuestion: 'If two implementations handle an empty condition differently, what behavior is common to both?',
      nextStageIndex: Math.min(stageIndex + 1, qData.socraticStages.length - 1),
      isResolved: false
    };
  }

  /**
   * Evaluates student response to transfer verification.
   */
  evaluateTransfer(questionId, rawResponse) {
    const text = this.sanitizeInput(rawResponse);
    const qData = QUESTION_BANK[questionId];
    if (!qData || !qData.transferQuestion) {
      return { status: 'ERROR', message: 'No transfer question available for this concept.' };
    }

    const evalResult = qData.transferQuestion.evaluate(text);
    return {
      verified: evalResult.verified,
      heading: evalResult.status,
      explanation: evalResult.feedback,
      concept: qData.concept
    };
  }
}

export const diagnosticEngine = new DiagnosticEngine();
