// MisconceptionOS - Learner State Manager
// Maintains clean structured learner state across practice sessions

const STORAGE_KEY = 'misconception_os_learner_state_v1';

export class LearnerStateManager {
  constructor() {
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      concepts: {
        "Stack": { practiced: false, status: "Not started", lastInteraction: null },
        "Queue": { practiced: false, status: "Not started", lastInteraction: null },
        "Stack Ordering": { practiced: false, status: "Not started", lastInteraction: null }
      },
      misconceptions: [
        /*
        {
          id: string,
          concept: string,
          misconceptionKey: string,
          title: string,
          underlyingConcept: string,
          evidence: { answer: string, reasoning: string },
          interventionGiven: string,
          status: 'detected' | 'persisted' | 'understood' | 'verified',
          timestamp: number
        }
        */
      ],
      interactions: [
        /*
        {
          id: string,
          questionId: string,
          concept: string,
          answer: string,
          reasoning: string,
          diagnosis: object,
          timestamp: number
        }
        */
      ],
      recoveryStatus: {
        // [concept]: { verified: boolean, status: string, notes: string, timestamp: number }
      }
    };
  }

  loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn("Could not read from localStorage, using memory state", e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Could not persist to localStorage", e);
    }
  }

  recordInteraction(questionId, concept, answer, reasoning, diagnosis) {
    const interaction = {
      id: 'int_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      questionId,
      concept,
      answer,
      reasoning,
      diagnosis,
      timestamp: Date.now()
    };
    this.state.interactions.push(interaction);

    if (!this.state.concepts[concept]) {
      this.state.concepts[concept] = { practiced: true, status: "In progress", lastInteraction: Date.now() };
    } else {
      this.state.concepts[concept].practiced = true;
      this.state.concepts[concept].lastInteraction = Date.now();
    }

    this.saveState();
    return interaction;
  }

  recordMisconception(concept, misconceptionKey, title, underlyingConcept, answer, reasoning, interventionGiven, status = 'detected') {
    const item = {
      id: 'misc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      concept,
      misconceptionKey,
      title,
      underlyingConcept,
      evidence: { answer, reasoning },
      interventionGiven,
      status,
      timestamp: Date.now()
    };
    this.state.misconceptions.push(item);
    this.saveState();
    return item;
  }

  updateMisconceptionStatus(concept, misconceptionKey, newStatus) {
    for (let i = this.state.misconceptions.length - 1; i >= 0; i--) {
      const item = this.state.misconceptions[i];
      if (item.concept === concept && item.misconceptionKey === misconceptionKey) {
        item.status = newStatus;
        break;
      }
    }
    this.saveState();
  }

  findPreviousMisconceptions(misconceptionKey) {
    return this.state.misconceptions.filter(m => m.misconceptionKey === misconceptionKey);
  }

  hasRecurringMisconception(currentConcept, misconceptionKey) {
    const matches = this.state.misconceptions.filter(
      m => m.misconceptionKey === misconceptionKey && m.concept !== currentConcept
    );
    return matches.length > 0 ? matches[matches.length - 1] : null;
  }

  recordRecovery(concept, verified, notes) {
    this.state.recoveryStatus[concept] = {
      verified,
      status: verified ? "Recovery verified" : "Understanding needs more practice",
      notes,
      timestamp: Date.now()
    };

    if (this.state.concepts[concept]) {
      this.state.concepts[concept].status = verified ? "Verified" : "Needs review";
    }

    this.saveState();
  }

  getHistory() {
    return {
      concepts: this.state.concepts,
      misconceptions: this.state.misconceptions,
      interactions: this.state.interactions,
      recoveryStatus: this.state.recoveryStatus
    };
  }

  reset() {
    this.state = this.getDefaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }
}

export const learnerState = new LearnerStateManager();
