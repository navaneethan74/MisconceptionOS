// MisconceptionOS - Socratic Intervention Manager
// Handles guided dialogue, persistent misconception checks, and concept resolution transitions

import { questionsData } from '../data/questions.js';
import { learnerState } from './learnerState.js';

export class InterventionManager {
  /**
   * Evaluates student response to a Socratic prompt.
   * Checks whether the misconception persists or has transitioned to understanding.
   */
  evaluateSocraticResponse(questionId, currentStageIndex, studentReasoning) {
    const qData = questionsData[questionId];
    if (!qData || !qData.socraticStages || !qData.socraticStages[currentStageIndex]) {
      return {
        status: "ERROR",
        message: "Socratic stage not found."
      };
    }

    const stage = qData.socraticStages[currentStageIndex];
    const text = (studentReasoning || '').trim();

    if (text.length < 5) {
      return {
        status: "INSUFFICIENT",
        heading: "A little more detail is helpful",
        explanation: "Please share a full thought so we can work through the concept together."
      };
    }

    const persists = stage.persistentCheck(text);
    const corrected = stage.correctedCheck(text);

    // If persistent check matched OR it didn't meet the corrected threshold
    if (persists && !corrected) {
      // Misconception persists!
      learnerState.updateMisconceptionStatus(qData.concept, 'abstract_vs_implementation', 'persisted');

      const nextStageIndex = currentStageIndex + 1;
      const nextPrompt = qData.socraticStages[nextStageIndex] 
        ? qData.socraticStages[nextStageIndex].prompt 
        : "Reflect on this: What does every stack have in common when empty, regardless of code?";

      return {
        status: "MISCONCEPTION_PERSISTS",
        heading: "Misconception persists",
        explanation: qData.concept === "Stack" 
          ? "Your reasoning still treats -1 as a rule of the stack itself."
          : `Your reasoning still treats -1 as a rule of the ${qData.concept.toLowerCase()} itself.`,
        nextQuestion: nextPrompt,
        nextStageIndex: qData.socraticStages[nextStageIndex] ? nextStageIndex : currentStageIndex,
        isResolved: false
      };
    }

    if (corrected) {
      // Concept understood!
      learnerState.updateMisconceptionStatus(qData.concept, 'abstract_vs_implementation', 'understood');

      return {
        status: "CONCEPT_UNDERSTOOD",
        heading: "Concept understood",
        explanation: qData.concept === "Stack"
          ? "You now distinguish the stack concept from the way a particular implementation handles an empty stack."
          : `You now distinguish the ${qData.concept.toLowerCase()} concept from the way a particular implementation handles an empty state.`,
        isResolved: true,
        readyForTransfer: true,
        transferQuestion: qData.transferQuestion
      };
    }

    // Default if reasoning is neutral/incomplete
    return {
      status: "MISCONCEPTION_PERSISTS",
      heading: "Misconception persists",
      explanation: "Your reasoning does not yet clearly separate the universal rule from implementation choices.",
      nextQuestion: "If two implementations handle an empty condition differently, what behavior is common to both?",
      nextStageIndex: Math.min(currentStageIndex + 1, qData.socraticStages.length - 1),
      isResolved: false
    };
  }
}

export const interventionManager = new InterventionManager();
