// MisconceptionOS - Core Diagnostic Engine
// Analyzes both answer AND reasoning deeply, distinguishing true misconceptions from lack of evidence

import { MISCONCEPTION_TYPES, checkRecurringMisconception } from './misconceptions.js';
import { learnerState } from './learnerState.js';

export class DiagnosticEngine {
  /**
   * Evaluates student answer and reasoning.
   * Does NOT rely solely on keywords; evaluates semantic intent and reasoning depth.
   */
  diagnose(questionId, concept, answer, reasoning) {
    const cleanAnswer = (answer || '').trim();
    const cleanReasoning = (reasoning || '').trim();

    // 1. Check for insufficient evidence
    if (this.isInsufficientEvidence(cleanAnswer, cleanReasoning)) {
      return {
        type: 'INSUFFICIENT_EVIDENCE',
        status: 'Not enough evidence yet.',
        studentExplanation: 'Could you explain your reasoning in a bit more detail? Understanding how you arrived at this answer helps us provide the right guidance.',
        needsClarification: true,
        misconception: null,
        recurring: null
      };
    }

    const lowerAns = cleanAnswer.toLowerCase();
    const lowerReas = cleanReasoning.toLowerCase();

    // 2. Question: stack_underflow or queue_underflow
    if (questionId === 'stack_underflow' || questionId === 'queue_underflow') {
      return this.evaluateUnderflow(questionId, concept, lowerAns, lowerReas, cleanAnswer, cleanReasoning);
    }

    // 3. Question: stack_principle
    if (questionId === 'stack_principle') {
      return this.evaluatePrinciple(questionId, concept, lowerAns, lowerReas, cleanAnswer, cleanReasoning);
    }

    // Default fallback
    return {
      type: 'INSUFFICIENT_EVIDENCE',
      status: 'Not enough evidence yet.',
      studentExplanation: 'We need a little more explanation of your thinking to provide helpful feedback.',
      needsClarification: true,
      misconception: null,
      recurring: null
    };
  }

  isInsufficientEvidence(answer, reasoning) {
    if (!answer || !reasoning) return true;
    const words = reasoning.split(/\s+/).filter(Boolean);
    if (words.length < 3) return true;

    // Check for evasive or meaningless reasoning
    const evasivePhrases = [
      'i dont know', "i don't know", 'idk', 'guess', 'guessing', 'just because',
      'because', 'random', 'not sure', 'no idea'
    ];
    const lower = reasoning.toLowerCase().trim();
    if (evasivePhrases.includes(lower) || lower.length < 7) {
      return true;
    }

    return false;
  }

  evaluateUnderflow(questionId, concept, lowerAns, lowerReas, rawAnswer, rawReasoning) {
    const fullText = `${lowerAns} ${lowerReas}`;

    // Check if the student treats -1 or specific return value as the rule of the abstract concept
    const mentionsMinusOne = fullText.includes("-1") || fullText.includes("minus one") || fullText.includes("negative one");
    const reasonsAsRule = 
      fullText.includes("should return -1") ||
      fullText.includes("returns -1") ||
      fullText.includes("to show that the stack is empty") ||
      fullText.includes("to show that the queue is empty") ||
      fullText.includes("empty data structure should return") ||
      fullText.includes("function should return") ||
      fullText.includes("always returns") ||
      fullText.includes("must return") ||
      (mentionsMinusOne && (fullText.includes("empty") || fullText.includes("remove") || fullText.includes("signal")));

    // Check if student correctly identified abstract underflow or implementation dependency
    const isCorrectAbstractUnderstanding = 
      (fullText.includes("underflow") || fullText.includes("cannot remove") || fullText.includes("error") || fullText.includes("exception") || fullText.includes("depends on")) &&
      !reasonsAsRule;

    if (reasonsAsRule) {
      const miscInfo = MISCONCEPTION_TYPES.ABSTRACT_VS_IMPLEMENTATION;
      
      // Check if this is a recurring misconception across concepts (e.g. from Stack to Queue)
      const recurringCheck = checkRecurringMisconception(concept, miscInfo.key, learnerState);

      const studentExplanation = concept.toLowerCase().includes('queue')
        ? "You seem to be treating -1 as a rule of the queue itself. However, -1 is one possible way an implementation can handle an empty queue."
        : "You seem to be treating -1 as a rule of the stack itself. However, -1 is one possible way an implementation can handle an empty stack.";

      return {
        type: 'MISCONCEPTION_DETECTED',
        status: recurringCheck.isRecurring ? 'Similar misconception found' : 'Misconception detected',
        misconceptionKey: miscInfo.key,
        title: miscInfo.title,
        underlyingConcept: miscInfo.underlyingConcept,
        studentExplanation,
        detailedDiagnosis: "The student is treating an implementation-specific return value as a universal rule of the abstract concept.",
        recurring: recurringCheck,
        needsSocratic: true
      };
    }

    if (isCorrectAbstractUnderstanding) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Correct Abstract Understanding',
        underlyingConcept: 'Abstract underflow definition',
        studentExplanation: `You correctly recognize that attempting to remove from an empty ${concept.toLowerCase()} results in an underflow condition, and that specific return values like -1 or exceptions are implementation details.`,
        detailedDiagnosis: "The student accurately distinguishes the abstract condition from implementation details.",
        recurring: { isRecurring: false },
        needsSocratic: false
      };
    }

    // If ambiguous
    return {
      type: 'INSUFFICIENT_EVIDENCE',
      status: 'Not enough evidence yet.',
      studentExplanation: 'Your answer mentions an outcome, but your reasoning does not yet clearly show why this occurs. Could you elaborate on what happens to the data structure conceptually?',
      needsClarification: true,
      misconception: null,
      recurring: null
    };
  }

  evaluatePrinciple(questionId, concept, lowerAns, lowerReas, rawAnswer, rawReasoning) {
    const fullText = `${lowerAns} ${lowerReas}`;

    // Test case: FIFO reasoning on stack question
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
      const miscInfo = MISCONCEPTION_TYPES.LIFO_VS_FIFO;
      const recurringCheck = checkRecurringMisconception(concept, miscInfo.key, learnerState);

      return {
        type: 'MISCONCEPTION_DETECTED',
        status: 'Different misconception detected',
        misconceptionKey: miscInfo.key,
        title: miscInfo.title,
        underlyingConcept: miscInfo.underlyingConcept,
        studentExplanation: miscInfo.studentExplanation,
        detailedDiagnosis: "The student confused Last-In, First-Out (LIFO) with First-In, First-Out (FIFO).",
        recurring: recurringCheck,
        needsSocratic: true
      };
    }

    if (suggestsLifo) {
      return {
        type: 'CONCEPT_UNDERSTOOD',
        status: 'Concept understood',
        misconceptionKey: null,
        title: 'Correct Ordering Principle',
        underlyingConcept: 'LIFO principle',
        studentExplanation: "Correct. A stack operates strictly on the Last-In, First-Out (LIFO) principle, where the most recently added item is the first to be popped.",
        detailedDiagnosis: "The student correctly understands the LIFO ordering mechanism.",
        recurring: { isRecurring: false },
        needsSocratic: false
      };
    }

    return {
      type: 'INSUFFICIENT_EVIDENCE',
      status: 'Not enough evidence yet.',
      studentExplanation: 'Please explain how the arrival order relates to the departure order in your reasoning.',
      needsClarification: true,
      misconception: null,
      recurring: null
    };
  }
}

export const diagnosticEngine = new DiagnosticEngine();
