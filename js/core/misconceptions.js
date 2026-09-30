// MisconceptionOS - Misconception Taxonomy & Recurring Detector

export const MISCONCEPTION_TYPES = {
  ABSTRACT_VS_IMPLEMENTATION: {
    key: "abstract_vs_implementation",
    title: "Abstract Behavior vs Implementation Behavior",
    underlyingConcept: "Abstract behavior vs implementation behavior",
    description: "Treating an implementation-specific return value or error convention as a universal rule of the abstract data structure.",
    studentExplanation: "You seem to be treating -1 as a rule of the data structure itself. However, -1 is one possible way an implementation can handle an empty state.",
    remediationConcept: "An abstract data structure defines operations and preconditions (such as underflow when empty), whereas specific programming languages or libraries choose how to signal that condition (e.g. returning -1, null, or raising an exception)."
  },
  LIFO_VS_FIFO: {
    key: "lifo_vs_fifo",
    title: "Confusing LIFO and FIFO",
    underlyingConcept: "LIFO vs FIFO",
    description: "Confusing Last-In First-Out with First-In First-Out ordering semantics.",
    studentExplanation: "You are describing First-In First-Out (FIFO) behavior, where the earliest item added is removed first. However, a stack operates on Last-In First-Out (LIFO).",
    remediationConcept: "A stack operates on Last-In, First-Out (LIFO), like a stack of plates where the top plate placed last is the one removed first. FIFO applies to queues, like waiting in line."
  }
};

/**
 * Checks if a diagnosed misconception is recurring across different concepts in learner history.
 * @param {string} currentConcept 
 * @param {string} misconceptionKey 
 * @param {object} learnerStateInstance 
 * @returns {object|null} Previous interaction / misconception info if recurring, otherwise null
 */
export function checkRecurringMisconception(currentConcept, misconceptionKey, learnerStateInstance) {
  const previousMatch = learnerStateInstance.hasRecurringMisconception(currentConcept, misconceptionKey);
  if (previousMatch) {
    return {
      isRecurring: true,
      previousConcept: previousMatch.concept,
      misconceptionKey: misconceptionKey,
      underlyingConcept: previousMatch.underlyingConcept,
      title: previousMatch.title,
      previousEvidence: previousMatch.evidence,
      message: `We noticed a similar reasoning pattern in your earlier ${previousMatch.concept} question.`,
      synthesis: `Your mistakes in ${previousMatch.concept} and ${currentConcept} appear to come from a similar idea.`
    };
  }
  return {
    isRecurring: false
  };
}
