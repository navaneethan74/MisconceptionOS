// MisconceptionOS - Transfer Question & Recovery Verifier
// Verifies true conceptual recovery rather than superficial memorization

import { questionsData } from '../data/questions.js';
import { learnerState } from './learnerState.js';

export class RecoveryVerifier {
  evaluateTransfer(questionId, responseText) {
    const qData = questionsData[questionId];
    if (!qData || !qData.transferQuestion) {
      return {
        status: "ERROR",
        message: "No transfer question available for this concept."
      };
    }

    const evaluation = qData.transferQuestion.evaluate(responseText || '');
    
    // Record into learner state
    learnerState.recordRecovery(qData.concept, evaluation.verified, evaluation.feedback);
    
    if (evaluation.verified) {
      learnerState.updateMisconceptionStatus(qData.concept, 'abstract_vs_implementation', 'verified');
    }

    return {
      verified: evaluation.verified,
      heading: evaluation.status,
      explanation: evaluation.feedback,
      concept: qData.concept
    };
  }
}

export const recoveryVerifier = new RecoveryVerifier();
