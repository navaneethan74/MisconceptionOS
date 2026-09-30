// MisconceptionOS Question Bank
export const questionsData = {
  stack_underflow: {
    id: "stack_underflow",
    subject: "Data Structures",
    concept: "Stack",
    title: "Stack Underflow Behavior",
    prompt: "What happens when pop() is used on an empty stack?",
    context: "Consider what occurs when a removal operation is attempted on a stack that contains zero elements.",
    answerPlaceholder: "e.g. It returns -1 / It throws an error / Stack underflow occurs",
    reasoningPlaceholder: "Explain the underlying reason for your answer...",
    socraticStages: [
      {
        stage: 1,
        prompt: "If another stack implementation throws an exception instead of returning -1, is the stack concept wrong?",
        placeholder: "Explain your reasoning here...",
        persistentCheck: (text) => {
          const lower = text.toLowerCase();
          // Student still insists that returning -1 is the universal rule or that other implementations are wrong
          return (
            lower.includes("-1") &&
            (lower.includes("always") || lower.includes("should") || lower.includes("must") || lower.includes("rule") || lower.includes("wrong") || lower.includes("yes"))
          ) || (
            lower.includes("yes") && !lower.includes("no")
          );
        },
        correctedCheck: (text) => {
          const lower = text.toLowerCase();
          return (
            (lower.includes("not part of") || lower.includes("implementation choice") || lower.includes("implementation") || lower.includes("choice") || lower.includes("distinction") || lower.includes("definition") || lower.includes("no element") || lower.includes("empty") || lower.includes("no,")) &&
            (lower.includes("underflow") || lower.includes("concept") || lower.includes("implementation") || lower.includes("empty") || lower.includes("exception") || lower.includes("choice") || lower.includes("does not define"))
          );
        }
      },
      {
        stage: 2,
        prompt: "If two implementations handle an empty stack differently, what behavior is common to both?",
        placeholder: "What fundamental condition do both implementations encounter?",
        persistentCheck: (text) => {
          const lower = text.toLowerCase();
          return lower.includes("-1") || (lower.includes("return") && !lower.includes("empty"));
        },
        correctedCheck: (text) => {
          const lower = text.toLowerCase();
          return lower.includes("empty") || lower.includes("no element") || lower.includes("underflow") || lower.includes("nothing to remove") || lower.includes("cannot remove");
        }
      }
    ],
    transferQuestion: {
      prompt: "In Java, an empty stack can throw an exception when pop() is called. Does this contradict the concept of stack underflow?",
      placeholder: "Explain whether this contradicts stack underflow and why...",
      evaluate: (text) => {
        const lower = text.toLowerCase();
        // Correct reasoning: No, throwing an exception is just an implementation mechanism to signal underflow
        const indicatesNo = lower.includes("no") || lower.includes("does not") || lower.includes("doesn't") || lower.includes("not contradict") || lower.includes("consistent");
        const mentionsReason = lower.includes("signal") || lower.includes("underflow") || lower.includes("implementation") || lower.includes("way") || lower.includes("mechanism") || lower.includes("empty");
        if (indicatesNo && mentionsReason) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct. Throwing an exception is an implementation choice to report stack underflow, not a contradiction of the concept."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Stack underflow simply means an attempt was made to take an item from an empty stack. Throwing an exception is one valid implementation response, just as returning null or a sentinel might be."
        };
      }
    }
  },

  queue_underflow: {
    id: "queue_underflow",
    subject: "Data Structures",
    concept: "Queue",
    title: "Queue Underflow Behavior",
    prompt: "What happens when dequeue() is used on an empty queue?",
    context: "Consider what occurs when a removal operation is attempted on a queue that has no items queued.",
    answerPlaceholder: "e.g. It returns -1 / Queue underflow occurs / Returns null",
    reasoningPlaceholder: "Explain why this happens...",
    socraticStages: [
      {
        stage: 1,
        prompt: "Is returning a specific value like -1 required by the queue concept, or is it an implementation decision?",
        placeholder: "Explain the difference in your reasoning...",
        persistentCheck: (text) => {
          const lower = text.toLowerCase();
          return lower.includes("-1") && (lower.includes("required") || lower.includes("always") || lower.includes("must"));
        },
        correctedCheck: (text) => {
          const lower = text.toLowerCase();
          return lower.includes("implementation") || lower.includes("decision") || lower.includes("not required") || lower.includes("abstract");
        }
      }
    ],
    transferQuestion: {
      prompt: "In Python, removing from an empty collections.deque raises an IndexError. Does this violate the abstract queue specification?",
      placeholder: "Explain whether this violates the abstract queue specification...",
      evaluate: (text) => {
        const lower = text.toLowerCase();
        const indicatesNo = lower.includes("no") || lower.includes("does not") || lower.includes("doesn't") || lower.includes("not violate");
        if (indicatesNo) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Well done. Raising an IndexError is how Python's implementation handles queue underflow without violating the abstract queue contract."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "The abstract queue specification defines underflow condition when removing from empty queue; how that condition is surfaced (exception, sentinel, error code) is an implementation detail."
        };
      }
    }
  },

  stack_principle: {
    id: "stack_principle",
    subject: "Data Structures",
    concept: "Stack Ordering",
    title: "Stack Removal Ordering Principle",
    prompt: "Which principle explains why a stack removes the most recently added element first?",
    context: "Reflect on how order of insertion determines order of removal in stacks.",
    answerPlaceholder: "e.g. LIFO / FIFO",
    reasoningPlaceholder: "Explain the principle and why it applies...",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you stack plates on top of each other, which plate is taken off first: the first one placed or the last one placed?",
        placeholder: "Explain which plate you remove and which principle that represents...",
        persistentCheck: (text) => {
          const lower = text.toLowerCase();
          return lower.includes("first") && lower.includes("fifo") && !lower.includes("lifo");
        },
        correctedCheck: (text) => {
          const lower = text.toLowerCase();
          return lower.includes("last") || lower.includes("lifo") || lower.includes("top");
        }
      }
    ],
    transferQuestion: {
      prompt: "When a browser's 'Back' button returns you to the page you just visited, does this follow LIFO or FIFO ordering?",
      placeholder: "Identify the principle and explain why...",
      evaluate: (text) => {
        const lower = text.toLowerCase();
        if (lower.includes("lifo") || (lower.includes("last in") && !lower.includes("fifo"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct. The most recently visited page is on top of the history stack, which exemplifies Last-In, First-Out (LIFO) behavior."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Since you return to the page you visited most recently, the last page added to history is the first one retrieved (LIFO)."
        };
      }
    }
  }
};
