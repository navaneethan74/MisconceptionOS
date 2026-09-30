// ============================================================================
// MisconceptionOS — Production Educational Web Application
// Tagline: "Understand the mistake. Correct the reasoning. Verify the learning."
// Self-contained, zero-dependency, works on file:// and HTTP servers without CORS errors.
// ============================================================================

(function () {
  'use strict';

  // ==========================================================================
  // 1. DATA STRUCTURES QUESTION BANK
  // ==========================================================================
  const QUESTION_BANK = {
  // ==========================================================================
  // TOPIC 1: STACK (5 Questions)
  // ==========================================================================
  stack_underflow: {
    id: "stack_underflow",
    subject: "Data Structures",
    concept: "Stack",
    title: "Stack Underflow Behavior",
    prompt: "What happens when pop() is used on an empty stack?",
    context: "Consider what occurs when a removal operation is attempted on a stack that contains zero elements.",
    answerPlaceholder: "e.g. It returns -1 / It throws an error / Stack underflow occurs",
    reasoningPlaceholder: "Explain the underlying reason for your answer...",
    guidedQuestion: "Let's start with the basic idea: When a stack has zero items, can any item be retrieved from it? What condition does this represent?",
    guidedReasoningQuestion: "What led you to expect this specific outcome? Is it an absolute rule of the abstract stack, or how a particular programming language handles it?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If another stack implementation throws an exception instead of returning -1, is the stack concept wrong?",
        placeholder: "Explain your reasoning here...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return (
            (lower.includes("-1") && (lower.includes("always") || lower.includes("should") || lower.includes("must") || lower.includes("rule") || lower.includes("wrong"))) ||
            (lower.includes("yes") && !lower.includes("no"))
          );
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return (
            (lower.includes("not part of") || lower.includes("implementation choice") || lower.includes("implementation") || lower.includes("choice") || lower.includes("definition") || lower.includes("empty") || lower.includes("no,")) &&
            (lower.includes("underflow") || lower.includes("concept") || lower.includes("implementation") || lower.includes("empty") || lower.includes("exception") || lower.includes("choice") || lower.includes("does not define"))
          );
        }
      },
      {
        stage: 2,
        prompt: "If two implementations handle an empty stack differently, what behavior is common to both?",
        placeholder: "What fundamental condition do both implementations encounter?",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("-1") || (lower.includes("return") && !lower.includes("empty"));
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("empty") || lower.includes("no element") || lower.includes("underflow") || lower.includes("nothing to remove") || lower.includes("cannot remove");
        }
      }
    ],
    transferQuestion: {
      prompt: "In Java, an empty stack can throw an exception when pop() is called. Does this contradict the concept of stack underflow?",
      placeholder: "Explain whether this contradicts stack underflow and why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        const indicatesNo = lower.includes("no") || lower.includes("does not") || lower.includes("doesn't") || lower.includes("not contradict") || lower.includes("consistent");
        const mentionsReason = lower.includes("signal") || lower.includes("underflow") || lower.includes("implementation") || lower.includes("way") || lower.includes("mechanism") || lower.includes("empty") || lower.includes("exception");
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
          feedback: "Stack underflow simply means an attempt was made to remove an item from an empty stack. Throwing an exception is one valid implementation response, just as returning a sentinel might be."
        };
      }
    }
  },

  stack_principle: {
    id: "stack_principle",
    subject: "Data Structures",
    concept: "Stack",
    title: "Stack Removal Ordering Principle",
    prompt: "Which principle explains why a stack removes the most recently added element first?",
    context: "Reflect on how order of insertion determines order of removal in stacks.",
    answerPlaceholder: "e.g. LIFO / FIFO",
    reasoningPlaceholder: "Explain the principle and why it applies...",
    guidedQuestion: "Think of a physical stack of trays or plates: when you add a new plate to the top, which plate must be removed before you can reach the older ones?",
    guidedReasoningQuestion: "Why does this ordering occur? Does the earliest item or the latest item come out first?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you stack plates on top of each other, which plate is taken off first: the first one placed or the last one placed?",
        placeholder: "Explain which plate you remove and which principle that represents...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("first") && lower.includes("fifo") && !lower.includes("lifo");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("last") || lower.includes("lifo") || lower.includes("top");
        }
      }
    ],
    transferQuestion: {
      prompt: "When a browser's 'Back' button returns you to the page you just visited, does this follow LIFO or FIFO ordering?",
      placeholder: "Identify the principle and explain why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
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
  },

  stack_peek_behavior: {
    id: "stack_peek_behavior",
    subject: "Data Structures",
    concept: "Stack",
    title: "Stack Peek vs Pop Semantics",
    prompt: "Does calling peek() or top() change the number of elements in a stack?",
    context: "Consider the distinction between inspecting an element and removing it.",
    answerPlaceholder: "e.g. No, peek only inspects without removing / Size remains the same",
    reasoningPlaceholder: "Explain how peek differs functionally from pop...",
    guidedQuestion: "Consider the word 'peek': if you peek into a room, do you remove anything from inside? How does this relate to looking at the top element?",
    guidedReasoningQuestion: "What is the key difference between reading an element and extracting it?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If peek() removed the element, how would it be different from pop()?",
        placeholder: "Explain the functional difference between peek and pop...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("same") || lower.includes("removes it");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("only read") || lower.includes("inspect") || lower.includes("does not remove") || lower.includes("pop removes");
        }
      }
    ],
    transferQuestion: {
      prompt: "In a syntax validator checking matching brackets, why is peek() used before pop() when evaluating a closing bracket?",
      placeholder: "Explain why inspecting without removing is necessary here...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("match") || lower.includes("check")) && (lower.includes("without") || lower.includes("before") || lower.includes("inspect"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! We must check whether the top opening bracket matches before deciding whether to pop it or declare a syntax error."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Peek lets the algorithm verify that the top bracket matches before committing to removing it."
        };
      }
    }
  },

  stack_capacity: {
    id: "stack_capacity",
    subject: "Data Structures",
    concept: "Stack",
    title: "Stack Overflow & Capacity Constraints",
    prompt: "Is 'Stack Overflow' an inherent limitation of the abstract Stack concept, or a constraint of finite memory implementations?",
    context: "Reflect on whether theoretical data structures have fixed size bounds.",
    answerPlaceholder: "e.g. Implementation constraint / Finite memory limitation",
    reasoningPlaceholder: "Explain whether the abstract ADT specifies a maximum size...",
    guidedQuestion: "Theoretically, in pure mathematics or computer science models, does a stack have a predefined limit, or is the limit imposed by physical RAM / fixed arrays?",
    guidedReasoningQuestion: "Does the theoretical definition of push() include a size ceiling?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you implement a stack with a dynamically linked list with infinite memory, could stack overflow ever occur?",
        placeholder: "Explain whether infinite memory could cause stack overflow...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("yes") && !lower.includes("no");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("no") || lower.includes("physical") || lower.includes("hardware") || lower.includes("memory limit");
        }
      }
    ],
    transferQuestion: {
      prompt: "Why can a recursive function cause a stack overflow error even if the call stack logic itself is valid?",
      placeholder: "Explain how recursion interacts with physical call stack memory...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("memory") || lower.includes("call stack") || lower.includes("limit") || lower.includes("depth") || lower.includes("frame")) && (lower.includes("exceed") || lower.includes("finite") || lower.includes("deep"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Each recursive call allocates a stack frame in finite system memory; excessive recursion exhausts this physical allocated buffer."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Even correct recursion requires physical memory frames; deep recursion exhausts the OS thread stack memory."
        };
      }
    }
  },

  stack_call_frames: {
    id: "stack_call_frames",
    subject: "Data Structures",
    concept: "Stack",
    title: "Recursive Call Stack Resolution",
    prompt: "Why must the deepest recursive call in a program finish executing before the initial caller can complete?",
    context: "Think about how execution frames are stored and resolved during nested function calls.",
    answerPlaceholder: "e.g. LIFO order / Each call waits for its sub-call to return a value",
    reasoningPlaceholder: "Explain how call stack activation records operate...",
    guidedQuestion: "When function A calls function B, can A finish its calculations before B gives back its return value?",
    guidedReasoningQuestion: "Which function call sits on top of the call stack: the caller or the callee?",
    socraticStages: [
      {
        stage: 1,
        prompt: "When a function calls another function, where is the new function's execution context placed relative to the caller?",
        placeholder: "Explain where the activation record is pushed...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("bottom") || lower.includes("fifo");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("top") || lower.includes("pushed") || lower.includes("lifo") || lower.includes("above");
        }
      }
    ],
    transferQuestion: {
      prompt: "When unwinding recursion from the base case, in what order are the waiting function frames popped?",
      placeholder: "Describe the order from base case back to root caller...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("reverse") || lower.includes("lifo") || (lower.includes("most recent") && lower.includes("first"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! The most recent call frames pop first in reverse order of invocation until the original caller is reached."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Activation frames pop in reverse order of entry (LIFO) back up to the initial caller."
        };
      }
    }
  },

  // ==========================================================================
  // TOPIC 2: QUEUE (5 Questions)
  // ==========================================================================
  queue_underflow: {
    id: "queue_underflow",
    subject: "Data Structures",
    concept: "Queue",
    title: "Queue Underflow Behavior",
    prompt: "What happens when dequeue() is used on an empty queue?",
    context: "Consider what occurs when a removal operation is attempted on a queue that has no items queued.",
    answerPlaceholder: "e.g. It returns -1 / Queue underflow occurs / Returns null",
    reasoningPlaceholder: "Explain why this happens...",
    guidedQuestion: "When an amusement park line has zero people in it, can anyone step up to ride? What technical condition is this for a queue?",
    guidedReasoningQuestion: "Is returning a specific number like -1 part of the definition of Queue, or just how someone might code it in C?",
    socraticStages: [
      {
        stage: 1,
        prompt: "Is returning a specific value like -1 required by the abstract queue concept, or is it an implementation decision?",
        placeholder: "Explain the difference in your reasoning...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("-1") && (lower.includes("required") || lower.includes("always") || lower.includes("must"));
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("implementation") || lower.includes("decision") || lower.includes("not required") || lower.includes("abstract") || lower.includes("choice");
        }
      }
    ],
    transferQuestion: {
      prompt: "In Python, removing from an empty collections.deque raises an IndexError. Does this violate the abstract queue specification?",
      placeholder: "Explain whether this violates the abstract queue specification...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        const indicatesNo = lower.includes("no") || lower.includes("does not") || lower.includes("doesn't") || lower.includes("not violate");
        if (indicatesNo) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Well done. Raising an IndexError is how Python's implementation surfaces queue underflow without violating the abstract queue contract."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "The abstract queue specification defines underflow condition when removing from empty queue; how that condition is surfaced is an implementation detail."
        };
      }
    }
  },

  queue_fifo_principle: {
    id: "queue_fifo_principle",
    subject: "Data Structures",
    concept: "Queue",
    title: "Queue FIFO Ordering Semantics",
    prompt: "Which ordering principle guarantees that the earliest element added to a queue is the first to be processed?",
    context: "Reflect on how queues model fair waiting lines in operating systems and daily life.",
    answerPlaceholder: "e.g. FIFO (First-In, First-Out)",
    reasoningPlaceholder: "Explain why FIFO ensures fairness...",
    guidedQuestion: "When waiting in line at a grocery store checkout, who is served first: the person who arrived first, or the person who just walked up?",
    guidedReasoningQuestion: "Why is FIFO essential for fair task scheduling?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If a queue served the most recently arrived element first instead of the earliest, what data structure would it be imitating?",
        placeholder: "Explain which structure that would be...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("queue");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("stack") || lower.includes("lifo");
        }
      }
    ],
    transferQuestion: {
      prompt: "In an operating system print queue with three print jobs (Job A at 10:00, Job B at 10:01, Job C at 10:02), which job prints first under standard queue semantics?",
      placeholder: "Specify which job prints first and explain the principle...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("job a") || lower.includes("a")) && (lower.includes("fifo") || lower.includes("first") || lower.includes("earliest"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Job A arrived first at 10:00, so standard FIFO ordering mandates it is dequeued and printed first."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "In FIFO ordering, Job A prints first because it arrived earliest in time."
        };
      }
    }
  },

  queue_circular_wrap: {
    id: "queue_circular_wrap",
    subject: "Data Structures",
    concept: "Queue",
    title: "Circular Queue Index Wrap-Around",
    prompt: "In an array-based circular queue of capacity N, why is the formula `(rear + 1) % N` used when enqueuing?",
    context: "Consider how linear arrays waste space when front elements are dequeued.",
    answerPlaceholder: "e.g. To wrap around to index 0 when reaching the array end / Reuse freed slots",
    reasoningPlaceholder: "Explain why modulo arithmetic enables space reuse...",
    guidedQuestion: "On an analog 12-hour clock, what hour comes after 12? How does modulo arithmetic help wrap an index back to the beginning?",
    guidedReasoningQuestion: "Without modulo arithmetic, what happens to empty slots at the start of a linear array when items dequeue?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you do not wrap the index around, what happens when rear reaches N-1 even if slots 0 to 2 are empty?",
        placeholder: "Explain what false condition occurs...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("works fine") || lower.includes("no problem");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("false overflow") || lower.includes("wasted space") || lower.includes("cannot enqueue") || lower.includes("appears full");
        }
      }
    ],
    transferQuestion: {
      prompt: "In a circular queue of size 5 with front = 3 and rear = 4, where does the next enqueued element go?",
      placeholder: "Calculate the next index and explain why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("0") || lower.includes("zero") || lower.includes("index 0")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! (4 + 1) % 5 = 0, wrapping the element cleanly into index 0."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "(4 + 1) % 5 = 0, wrapping around to the first slot of the array."
        };
      }
    }
  },

  queue_priority_distinction: {
    id: "queue_priority_distinction",
    subject: "Data Structures",
    concept: "Queue",
    title: "Priority Queue vs Strict FIFO Queue",
    prompt: "Does a Priority Queue strictly guarantee that elements leave in the exact order of their arrival?",
    context: "Reflect on how priority weights alter departure sequencing.",
    answerPlaceholder: "e.g. No, elements leave based on priority value / High priority dequeues first",
    reasoningPlaceholder: "Explain how Priority Queues diverge from standard FIFO behavior...",
    guidedQuestion: "In a hospital emergency room, does a patient who arrived at 2:00 PM with a paper cut get seen before a patient who arrives at 2:05 PM with a heart attack?",
    guidedReasoningQuestion: "What factor overrides arrival time in a priority queue?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If element X arrives at time t=1 with priority 10, and element Y arrives at t=2 with priority 90, which is dequeued first in a max-priority queue?",
        placeholder: "Identify which element is dequeued and why...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("x");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("y") || lower.includes("higher priority") || lower.includes("90");
        }
      }
    ],
    transferQuestion: {
      prompt: "If two items in a priority queue share the exact same priority level, what ordering rule is typically used as a tie-breaker to maintain stability?",
      placeholder: "Explain how ties are resolved...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("fifo") || lower.includes("arrival") || lower.includes("first in") || lower.includes("order of arrival")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Stable priority queues break ties using arrival order (FIFO)."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "When priorities are identical, arrival time (FIFO) is standardly used to break the tie."
        };
      }
    }
  },

  queue_double_ended: {
    id: "queue_double_ended",
    subject: "Data Structures",
    concept: "Queue",
    title: "Double-Ended Queue (Deque) Flexibility",
    prompt: "What operations distinguish a Deque (Double-Ended Queue) from a standard single-ended Queue?",
    context: "Consider the points of entry and exit in both data structures.",
    answerPlaceholder: "e.g. Insertion and deletion allowed at both front and rear ends",
    reasoningPlaceholder: "Explain the architectural difference...",
    guidedQuestion: "A standard queue lets you insert only at the rear and delete only from the front. What if a data structure allowed both actions at both ends?",
    guidedReasoningQuestion: "Can a Deque simulate both a Stack and a Queue? Why?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you push to the front of a deque and pop from the front of a deque, which data structure behavior does this replicate?",
        placeholder: "Identify the replicated data structure...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("queue") && !lower.includes("stack");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("stack") || lower.includes("lifo");
        }
      }
    ],
    transferQuestion: {
      prompt: "Can a Deque be used to check if a word is a palindrome in O(n) time? Explain how.",
      placeholder: "Explain the comparison of front and back characters...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("both ends") || lower.includes("front and back") || lower.includes("front and rear")) && (lower.includes("compare") || lower.includes("match") || lower.includes("pop"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! You can pop from both front and back simultaneously and check if characters match until the deque is empty or has 1 letter left."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Comparing characters removed from both ends simultaneously detects palindromes in linear time."
        };
      }
    }
  },

  // ==========================================================================
  // TOPIC 3: LINKED LIST (5 Questions)
  // ==========================================================================
  linked_list_delete: {
    id: "linked_list_delete",
    subject: "Data Structures",
    concept: "Linked List",
    title: "Singly Linked List Node Deletion",
    prompt: "When deleting an interior node B from a singly linked list (A -> B -> C), what pointer update is necessary?",
    context: "Consider how nodes remain connected when an intermediate element is removed.",
    answerPlaceholder: "e.g. Set A.next = B.next / A.next = C",
    reasoningPlaceholder: "Explain why updating A's pointer is necessary...",
    guidedQuestion: "If three people are holding hands in a line (A holds B, B holds C), what must A do if B steps away so the line stays connected?",
    guidedReasoningQuestion: "If you delete B from memory without updating A.next, what does A still point to?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you only free or erase node B without modifying A.next, what does node A still point to?",
        placeholder: "Explain what happens to the pointer from A...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("c") || lower.includes("automatically") || lower.includes("nothing");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("b") || lower.includes("dangling") || lower.includes("invalid") || lower.includes("garbage") || lower.includes("old node");
        }
      }
    ],
    transferQuestion: {
      prompt: "In a garbage-collected language like Java, if you do not update A.next, will node B be reclaimed by the garbage collector?",
      placeholder: "Explain whether B can be garbage collected and why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        const saysNo = lower.includes("no") || lower.includes("cannot") || lower.includes("will not") || lower.includes("won't");
        const mentionsRef = lower.includes("reference") || lower.includes("reachable") || lower.includes("points") || lower.includes("a.next");
        if (saysNo && mentionsRef) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct. Because A still references B, B remains reachable and cannot be garbage collected, creating a memory leak."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "If A.next still references B, the runtime considers B reachable, preventing garbage collection."
        };
      }
    }
  },

  linked_list_head_insert: {
    id: "linked_list_head_insert",
    subject: "Data Structures",
    concept: "Linked List",
    title: "Inserting at Head & Pointer Order",
    prompt: "When inserting a new node N at the front of a linked list with head H, why must we set `N.next = H` BEFORE setting `H = N`?",
    context: "Reflect on what happens to references when variable values are reassigned.",
    answerPlaceholder: "e.g. To avoid losing the reference to the rest of the list / Head would be overwritten",
    reasoningPlaceholder: "Explain what happens if you assign H = N first...",
    guidedQuestion: "If you change your compass heading before noting where you were previously walking, do you lose your way? What happens to the existing nodes if H is immediately overwritten with N?",
    guidedReasoningQuestion: "If H = N happens first, can you still access the old head?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you set `H = N` first, how can your code find the rest of the old list that started at the original H?",
        placeholder: "Explain how you would reach the second node...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("can still reach") || lower.includes("automatically remembers");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("cannot") || lower.includes("lost") || lower.includes("overwritten") || lower.includes("orphaned");
        }
      }
    ],
    transferQuestion: {
      prompt: "What is the time complexity of inserting a node at the head of a singly linked list compared to inserting at index 0 of an ArrayList?",
      placeholder: "Compare O(1) vs O(n) and explain why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("o(1)") && lower.includes("o(n)")) || (lower.includes("constant") && lower.includes("linear"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Linked list head insertion is O(1) because only two pointers update; ArrayList index 0 insertion is O(n) because all elements must shift."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Linked list head insertion requires O(1) pointer updates, whereas ArrayList must shift every existing element (O(n))."
        };
      }
    }
  },

  linked_list_search_cost: {
    id: "linked_list_search_cost",
    subject: "Data Structures",
    concept: "Linked List",
    title: "Sequential Traversal vs Random Access",
    prompt: "Why cannot a standard singly linked list access its k-th node in O(1) time like a contiguous array?",
    context: "Consider how linked list nodes are distributed in physical memory.",
    answerPlaceholder: "e.g. Nodes are scattered in memory connected only by pointers / Must traverse k steps",
    reasoningPlaceholder: "Explain why index calculation like base + k * size fails for linked lists...",
    guidedQuestion: "In an array, all items sit right next to each other in memory. In a linked list, where do the nodes live, and how do you travel between them?",
    guidedReasoningQuestion: "Can you jump directly to memory address k if you only have a pointer to the head node?",
    socraticStages: [
      {
        stage: 1,
        prompt: "To find node 100 in a singly linked list, can you compute its memory address directly from the head address?",
        placeholder: "Explain whether address arithmetic works...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("yes") && !lower.includes("no");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("no") || lower.includes("scattered") || lower.includes("traverse") || lower.includes("follow pointers");
        }
      }
    ],
    transferQuestion: {
      prompt: "Can Binary Search be efficiently run in O(log n) time on a singly linked list? Explain why or why not.",
      placeholder: "Explain how lack of O(1) midpoint access impacts binary search...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("no") || lower.includes("cannot") || lower.includes("inefficient")) && (lower.includes("midpoint") || lower.includes("middle") || lower.includes("traverse") || lower.includes("o(n)"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Finding the middle node requires O(n) linear traversal, eliminating the O(log n) efficiency advantage of binary search."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Because finding the midpoint requires traversing the list in O(n) time, binary search degenerates to O(n) on a linked list."
        };
      }
    }
  },

  linked_list_doubly: {
    id: "linked_list_doubly",
    subject: "Data Structures",
    concept: "Linked List",
    title: "Doubly Linked List Bidirectional Consistency",
    prompt: "In a doubly linked list, when inserting a node B between A and C, how many total pointer assignments are required?",
    context: "Remember that both next and prev pointers link adjacent nodes.",
    answerPlaceholder: "e.g. 4 pointers (B.next, B.prev, A.next, C.prev)",
    reasoningPlaceholder: "List the four pointer updates required...",
    guidedQuestion: "Each node in a doubly linked list has both a forward link (next) and a backward link (prev). Between two nodes, how many connections exist in total?",
    guidedReasoningQuestion: "What happens if you update A.next and B.next, but forget C.prev?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you set B.next = C and B.prev = A, but omit updating C.prev, what does C still point backwards to?",
        placeholder: "Explain what C.prev still references...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("b") || lower.includes("updates automatically");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("a") || lower.includes("old node") || lower.includes("broken backward");
        }
      }
    ],
    transferQuestion: {
      prompt: "What major performance advantage does a doubly linked list have over a singly linked list when given a pointer directly to an interior node to delete?",
      placeholder: "Explain why deleting given node X is O(1) in doubly vs O(n) in singly...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("o(1)") || lower.includes("constant") || lower.includes("direct")) && (lower.includes("prev") || lower.includes("previous") || lower.includes("traverse"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! The prev pointer gives instant O(1) access to the predecessor, whereas a singly linked list must traverse from head to find the predecessor."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "In doubly linked lists, node.prev gives immediate access to the predecessor, enabling O(1) deletion without traversing from head."
        };
      }
    }
  },

  linked_list_cycle_detection: {
    id: "linked_list_cycle_detection",
    subject: "Data Structures",
    concept: "Linked List",
    title: "Fast & Slow Pointer Cycle Detection",
    prompt: "In Floyd's Cycle-Finding Algorithm (tortoise and hare), why are two pointers moving at different speeds guaranteed to meet if a cycle exists?",
    context: "Reflect on how relative speed reduces the distance between pointers inside a loop.",
    answerPlaceholder: "e.g. Fast pointer gains 1 step each iteration until distance becomes 0 / Relative speed is 1",
    reasoningPlaceholder: "Explain why the distance between fast and slow decreases monotonically in the loop...",
    guidedQuestion: "If runner A runs at 2 m/s and runner B runs at 1 m/s around a circular track, what is runner A's speed relative to runner B?",
    guidedReasoningQuestion: "Can the fast pointer ever 'jump over' the slow pointer if it gains exactly 1 node per step?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If fast moves 2 steps and slow moves 1 step per turn, by how many nodes does the gap between them shrink each turn inside the loop?",
        placeholder: "State the relative decrease in gap per turn...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("2") || lower.includes("random");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("1") || lower.includes("one node") || lower.includes("exactly 1");
        }
      }
    ],
    transferQuestion: {
      prompt: "What space complexity does Floyd's cycle detection achieve compared to using a HashSet to store visited node addresses?",
      placeholder: "Compare O(1) auxiliary space vs O(n)...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("o(1)") || lower.includes("constant")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Floyd's algorithm uses only two pointer variables, achieving O(1) auxiliary space versus O(n) for a HashSet."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Floyd's algorithm uses O(1) auxiliary space, whereas a hash set requires O(n) memory to store seen nodes."
        };
      }
    }
  },

  // ==========================================================================
  // TOPIC 4: SEARCHING (5 Questions)
  // ==========================================================================
  binary_search_precondition: {
    id: "binary_search_precondition",
    subject: "Data Structures",
    concept: "Searching",
    title: "Binary Search Preconditions",
    prompt: "Can Binary Search be correctly used to find an element in an unsorted array?",
    context: "Consider how the algorithm decides which half of the array to eliminate.",
    answerPlaceholder: "e.g. No / Requires sorted array",
    reasoningPlaceholder: "Explain why sorting is or is not required...",
    guidedQuestion: "If you open a dictionary in the middle and see 'M', you know 'B' is to the left because words are alphabetical. If words were placed randomly, could you know which half to search?",
    guidedReasoningQuestion: "What fundamental assumption allows binary search to throw away half the elements?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If an array is unsorted, does comparing the target with the middle element tell you which half the target is in?",
        placeholder: "Explain how the comparison behaves without sorting...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("yes") && !lower.includes("no");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("no") || lower.includes("cannot determine") || lower.includes("either side") || lower.includes("unknown");
        }
      }
    ],
    transferQuestion: {
      prompt: "If an array is sorted in descending order instead of ascending order, can binary search still work?",
      placeholder: "Explain how binary search adapts to descending order...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        const saysYes = lower.includes("yes") || lower.includes("can") || lower.includes("still work");
        const mentionsInvert = lower.includes("reverse") || lower.includes("flip") || lower.includes("condition") || lower.includes("comparison") || lower.includes("descending");
        if (saysYes && mentionsInvert) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct. As long as monotonic order exists, binary search works by simply reversing the comparison logic."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Binary search requires sorted order; for descending order, you simply adjust the branch conditions."
        };
      }
    }
  },

  linear_vs_binary_efficiency: {
    id: "linear_vs_binary_efficiency",
    subject: "Data Structures",
    concept: "Searching",
    title: "Linear vs Binary Search Scalability",
    prompt: "In an array of 1,000,000 sorted elements, approximately what is the maximum number of comparisons needed by Binary Search versus Linear Search?",
    context: "Compare halving search space (log2 n) versus checking item-by-item (n).",
    answerPlaceholder: "e.g. Binary: ~20 comparisons; Linear: 1,000,000 comparisons",
    reasoningPlaceholder: "Explain how log2(1,000,000) produces this dramatic difference...",
    guidedQuestion: "Each comparison in binary search cuts the remaining items in half. How many times can you cut 1,000,000 in half before reaching 1?",
    guidedReasoningQuestion: "What is 2^20 approximately?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If each step halves the list, what mathematical function describes the number of steps to reduce N items to 1?",
        placeholder: "State the mathematical function...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("linear") || lower.includes("quadratic");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("log") || lower.includes("logarithmic") || lower.includes("log2");
        }
      }
    ],
    transferQuestion: {
      prompt: "If the sorted array size doubles from 1,000,000 to 2,000,000 elements, how many additional comparisons does Binary Search need in the worst case?",
      placeholder: "State the exact number of additional comparisons and explain why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("1") || lower.includes("one additional") || lower.includes("one more")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Doubling the input size adds exactly 1 comparison because one halving step reduces 2,000,000 back to 1,000,000."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Because log2(2N) = log2(N) + 1, doubling the size adds exactly one comparison step."
        };
      }
    }
  },

  binary_search_midpoint: {
    id: "binary_search_midpoint",
    subject: "Data Structures",
    concept: "Searching",
    title: "Midpoint Calculation & Integer Overflow",
    prompt: "In Java/C++, why is calculating midpoint as `low + (high - low) / 2` safer than `(low + high) / 2`?",
    context: "Consider what happens when adding two large 32-bit signed integers.",
    answerPlaceholder: "e.g. Prevents 32-bit integer overflow / (low + high) can exceed Integer.MAX_VALUE",
    reasoningPlaceholder: "Explain why (low + high) can overflow into a negative number...",
    guidedQuestion: "What happens in a 32-bit integer if you add two numbers that sum to more than 2,147,483,647?",
    guidedReasoningQuestion: "Does `high - low` ever exceed `high`? Why is subtraction safe here?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If low + high exceeds the maximum integer value, what value does the sum wrap to in standard fixed-width integers?",
        placeholder: "Explain the integer wrap-around behavior...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("infinity") || lower.includes("doesn't matter");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("negative") || lower.includes("overflow") || lower.includes("wraps") || lower.includes("out of bounds");
        }
      }
    ],
    transferQuestion: {
      prompt: "Can bitwise right-shift `(low + high) >>> 1` also avoid the integer overflow bug in Java? Why?",
      placeholder: "Explain how unsigned bit-shift operates on the sign bit...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("yes") || lower.includes("can")) && (lower.includes("unsigned") || lower.includes("sign bit") || lower.includes("shift"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! The unsigned right-shift `>>>` treats the leading bit as a standard binary bit rather than a sign bit, preserving correct non-negative results."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Yes, Java's unsigned right shift `>>>` treats the overflowed negative sum as an unsigned integer, returning the correct midpoint."
        };
      }
    }
  },

  hash_search_behavior: {
    id: "hash_search_behavior",
    subject: "Data Structures",
    concept: "Searching",
    title: "Hash Table Search Complexity & Collisions",
    prompt: "Why is Hash Table search considered O(1) on average, but can degrade to O(n) in the worst case?",
    context: "Reflect on how hash functions distribute keys and how collisions are resolved.",
    answerPlaceholder: "e.g. Direct index computation via hash code; degrades to O(n) when all keys collide into the same bucket",
    reasoningPlaceholder: "Explain how hash collisions impact retrieval time...",
    guidedQuestion: "If every single student in a school is assigned to the exact same locker, what happens when you try to find a specific student's coat?",
    guidedReasoningQuestion: "What ensures O(1) lookup: uniform distribution or clustering?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If a poor hash function maps every inserted key to bucket index 0, what data structure does bucket 0 become?",
        placeholder: "Identify the resulting data structure in that bucket...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("hash table") || lower.includes("array");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("linked list") || lower.includes("linear list") || lower.includes("chain");
        }
      }
    ],
    transferQuestion: {
      prompt: "How does Java 8+ HashMap optimize collision buckets when a single bucket exceeds 8 colliding elements?",
      placeholder: "Specify the data structure used to replace the linked list...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("tree") || lower.includes("red-black") || lower.includes("red black") || lower.includes("bst")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Java 8+ transforms long linked list collision chains into Red-Black Trees, improving worst-case search from O(n) to O(log n)."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Java 8 converts collision lists exceeding 8 nodes into balanced Red-Black Trees to guarantee O(log n) lookup."
        };
      }
    }
  },

  binary_search_duplicates: {
    id: "binary_search_duplicates",
    subject: "Data Structures",
    concept: "Searching",
    title: "Binary Search with Duplicate Elements",
    prompt: "In a sorted array with duplicate values `[2, 5, 5, 5, 8]`, does standard binary search guarantee finding the first occurrence of 5?",
    context: "Consider when the algorithm stops upon finding a match.",
    answerPlaceholder: "e.g. No, it terminates on an arbitrary matching index / Must use lower_bound logic",
    reasoningPlaceholder: "Explain why standard `arr[mid] == target` terminates prematurely...",
    guidedQuestion: "When binary search finds `arr[mid] == target`, what does standard implementation do? Does it check if an earlier match exists to the left?",
    guidedReasoningQuestion: "How would you modify the search if you specifically wanted the leftmost occurrence?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If `arr[mid] == target`, can you be sure there is no identical target at `mid - 1`?",
        placeholder: "Explain whether checking mid alone guarantees the first index...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("yes") && !lower.includes("no");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("no") || lower.includes("could be to the left") || lower.includes("duplicates exist");
        }
      }
    ],
    transferQuestion: {
      prompt: "To find the first occurrence (lower bound) of a target, when `arr[mid] == target`, which direction should high/low move?",
      placeholder: "Explain whether you continue searching left by setting high = mid - 1...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("left") || lower.includes("high = mid - 1") || lower.includes("high = mid") || lower.includes("narrow left")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! You must record the match as a candidate and continue searching left (`high = mid - 1`) to find earlier occurrences."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "To find the first occurrence, continue searching left by setting high = mid - 1 to see if a duplicate precedes it."
        };
      }
    }
  },

  // ==========================================================================
  // TOPIC 5: TREES (5 Questions)
  // ==========================================================================
  tree_bst_property: {
    id: "tree_bst_property",
    subject: "Data Structures",
    concept: "Trees",
    title: "Binary Search Tree Ordering Property",
    prompt: "In a valid Binary Search Tree (BST), what property must hold for all keys in a node's left subtree?",
    context: "Reflect on how BST search guarantees efficient lookup.",
    answerPlaceholder: "e.g. All keys in left subtree must be less than the node key",
    reasoningPlaceholder: "Explain why this property must apply to the entire subtree, not just the immediate child...",
    guidedQuestion: "In a family tree where every generation is strictly older than their descendants, does that rule apply only to your child, or to your grandchildren and great-grandchildren too?",
    guidedReasoningQuestion: "If a node's left child is smaller, but a grandchild is larger than the root, what breaks when searching for that grandchild?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If a node's left child is smaller, but a grandchild in that left subtree is larger than the root, is it still a valid BST?",
        placeholder: "Explain your reasoning about the whole subtree...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("yes") && !lower.includes("no");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("no") || lower.includes("invalid") || lower.includes("violates") || lower.includes("all nodes");
        }
      }
    ],
    transferQuestion: {
      prompt: "What tree traversal order produces sorted output when performed on a valid Binary Search Tree?",
      placeholder: "Specify the traversal type and explain why...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("inorder") || lower.includes("in-order")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! An in-order traversal (Left, Root, Right) traverses the keys in monotonically non-decreasing order."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "In-order traversal visits left subtree (all smaller), then root, then right subtree (all larger), producing sorted keys."
        };
      }
    }
  },

  tree_leaf_and_height: {
    id: "tree_leaf_and_height",
    subject: "Data Structures",
    concept: "Trees",
    title: "Tree Depth vs Tree Height",
    prompt: "What is the key difference between the 'depth' of a node and the 'height' of a node in a tree?",
    context: "Consider the reference points used to measure both metrics.",
    answerPlaceholder: "e.g. Depth is distance from root down to node; Height is distance from node down to deepest leaf",
    reasoningPlaceholder: "Explain the opposite reference points of depth vs height...",
    guidedQuestion: "When you dive into a swimming pool, depth is measured from the water surface downwards. When a building stands tall, height is measured upwards from the foundation. Which point is the root?",
    guidedReasoningQuestion: "What is the depth of the root node of a tree?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If you measure from the root down to node X, are you computing X's height or X's depth?",
        placeholder: "State which measurement this is...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("height");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("depth");
        }
      }
    ],
    transferQuestion: {
      prompt: "In a tree with only a root node and no children, what is the depth of the root and what is the height of the tree?",
      placeholder: "State the numerical values (typically 0 or 1 convention)...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("0") || lower.includes("zero")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! By standard 0-indexed convention, a single-node tree has depth = 0 and height = 0."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "By standard convention, the root has depth 0, and a tree with only a root has height 0."
        };
      }
    }
  },

  tree_inorder_sorted: {
    id: "tree_inorder_sorted",
    subject: "Data Structures",
    concept: "Trees",
    title: "Tree Traversal Sequencing Principles",
    prompt: "Why does an in-order traversal (Left -> Root -> Right) of a Binary Search Tree output all keys in sorted ascending order?",
    context: "Connect the BST definition to the recursive visit order.",
    answerPlaceholder: "e.g. It visits all smaller keys in left subtree, then the node itself, then all larger keys in right subtree",
    reasoningPlaceholder: "Explain why this recursive order guarantees non-decreasing values...",
    guidedQuestion: "In a BST, where are all numbers smaller than 10? Where are all numbers larger than 10? If you visit Left, then 10, then Right, what order do you get?",
    guidedReasoningQuestion: "Does pre-order or post-order output sorted keys? Why not?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If pre-order visits Root before Left subtree, why can it never print in sorted ascending order?",
        placeholder: "Explain why Root coming first violates sorted order...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("it can") || lower.includes("it does");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("root is greater") || lower.includes("before smaller") || lower.includes("left is smaller");
        }
      }
    ],
    transferQuestion: {
      prompt: "If a BST has root 8, left child 3, right child 10, write the exact output sequence of an in-order traversal.",
      placeholder: "Write the numbers in order separated by commas...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("3, 8, 10") || lower.includes("3,8,10") || lower.includes("3 8 10")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Left (3) -> Root (8) -> Right (10)."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "In-order visits Left (3), Root (8), Right (10), resulting in 3, 8, 10."
        };
      }
    }
  },

  tree_balanced_vs_skewed: {
    id: "tree_balanced_vs_skewed",
    subject: "Data Structures",
    concept: "Trees",
    title: "Degenerate Trees & Worst-Case Search",
    prompt: "What happens to the shape and search complexity of a Binary Search Tree if elements [1, 2, 3, 4, 5] are inserted in strictly ascending order?",
    context: "Think about where each successively larger element is placed in the tree.",
    answerPlaceholder: "e.g. Degenerates into a linked list / Skewed tree with O(n) search time",
    reasoningPlaceholder: "Explain why each element becomes the right child of the previous...",
    guidedQuestion: "If every new number you insert is larger than the previous one, will any number ever go to a left subtree? What shape does the tree take?",
    guidedReasoningQuestion: "When a tree becomes a straight line of nodes, how does search complexity change from O(log n)?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If every node only has a right child, how is traversing this tree different from traversing a singly linked list?",
        placeholder: "Compare the skewed tree structure to a linked list...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("still o(log n)") || lower.includes("much faster");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("identical") || lower.includes("same as linked list") || lower.includes("linear") || lower.includes("o(n)");
        }
      }
    ],
    transferQuestion: {
      prompt: "What self-balancing binary search tree family (such as AVL or Red-Black trees) does to prevent this degeneration?",
      placeholder: "Explain the role of tree rotations in maintaining balance...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if (lower.includes("rotation") || lower.includes("rotate") || lower.includes("balance") || lower.includes("rebalance")) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Balanced trees execute tree rotations whenever insertion creates height imbalance, keeping height O(log n)."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "Self-balancing trees perform rotations to rebalance subtrees, preserving O(log n) height."
        };
      }
    }
  },

  tree_heap_vs_bst: {
    id: "tree_heap_vs_bst",
    subject: "Data Structures",
    concept: "Trees",
    title: "Min-Heap Invariant vs Binary Search Tree",
    prompt: "In a Min-Heap, must every node's left child be smaller than its right child like in a Binary Search Tree?",
    context: "Reflect on how heap order differs from total binary search ordering.",
    answerPlaceholder: "e.g. No, Min-Heap only requires parent <= children; no relationship between left and right siblings",
    reasoningPlaceholder: "Explain the difference between heap-order property and BST-order property...",
    guidedQuestion: "A Min-Heap guarantees that a parent node is smaller than both of its children. Does it specify any rule about whether the left sibling is smaller or larger than the right sibling?",
    guidedReasoningQuestion: "Can the right child in a min-heap be smaller than the left child?",
    socraticStages: [
      {
        stage: 1,
        prompt: "If a node has value 10, left child 25, and right child 15, does this violate the Min-Heap property? Does it violate the BST property?",
        placeholder: "Analyze both properties for parent 10, left 25, right 15...",
        persistentCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return lower.includes("violates heap") || lower.includes("invalid heap");
        },
        correctedCheck: (text) => {
          const lower = (text || '').toLowerCase();
          return (lower.includes("valid heap") || lower.includes("not violate heap")) && (lower.includes("violates bst") || lower.includes("invalid bst"));
        }
      }
    ],
    transferQuestion: {
      prompt: "Can a Min-Heap be used to perform arbitrary key lookups in O(log n) time? Why or why not?",
      placeholder: "Explain why searching an arbitrary key in a heap requires O(n)...",
      evaluate: (text) => {
        const lower = (text || '').toLowerCase();
        if ((lower.includes("no") || lower.includes("cannot")) && (lower.includes("o(n)") || lower.includes("unordered") || lower.includes("traverse") || lower.includes("no relationship"))) {
          return {
            verified: true,
            status: "Recovery verified",
            feedback: "Correct! Because there is no ordering relationship between siblings or left/right branches, finding an arbitrary key requires an O(n) search."
          };
        }
        return {
          verified: false,
          status: "Understanding needs more practice",
          feedback: "No, searching for an arbitrary key in a heap takes O(n) time because the heap does not maintain horizontal ordering between branches."
        };
      }
    }
  }
};

  const SUPPORTED_CONCEPTS = ["Arrays", "Searching", "Sorting", "Stack", "Queue", "Linked List", "Trees", "Basic Recursion"];

  // ==========================================================================
  // PROGRESSIVE "I DON'T KNOW" CONCEPT EXPLANATIONS (25 Questions)
  // Structured concise pedagogical explanations, reflection prompts, and refreshers
  // ==========================================================================
  const CONCEPT_EXPLANATIONS = {
    stack_underflow: {
      explanation: [
        "A stack follows the LIFO (Last In, First Out) principle. The pop() operation removes the top element from the stack.",
        "If the stack is empty, there is no element available to remove. This condition is called stack underflow.",
        "How an implementation reports this condition can vary. One implementation may return -1, while another may throw an exception."
      ],
      thinkPrompt: "If another stack implementation throws an exception instead of returning -1, is the stack concept wrong?",
      thinkPlaceholder: "Explain whether the stack concept is wrong and why...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "In abstract data types, an operation represents a logical behavior. The language-specific syntax or return value is just one way a concrete system implements that behavior."
      ],
      refresherPrompt: "What led you to expect this specific outcome? Is it an absolute rule of the abstract stack, or how a particular programming language handles it?"
    },

    stack_principle: {
      explanation: [
        "A stack is a linear collection where insertions and removals occur at a single accessible end called the top.",
        "Because each incoming element is placed directly above previous elements, the most recently added item is the first one ready to be retrieved. This behavior is known as Last-In, First-Out (LIFO)."
      ],
      thinkPrompt: "If you stack plates on top of each other, which plate is taken off first: the first one placed or the last one placed?",
      thinkPlaceholder: "Explain which plate you remove and which principle that represents...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Stack access is restricted to one end. Consider how the order in which items arrive dictates the order in which they must depart."
      ],
      refresherPrompt: "Why does this ordering occur? Does the earliest item or the latest item come out first?"
    },

    stack_peek_behavior: {
      explanation: [
        "The peek() (or top()) operation allows us to inspect the element currently residing at the top of the stack.",
        "Unlike pop(), peek() is strictly a read operation. It retrieves the value without altering the stack's contents or changing its count of elements."
      ],
      thinkPrompt: "If you look at the top book on a pile to read its title without moving it, does the pile change?",
      thinkPlaceholder: "Explain what happens to the stack and whether its state changes...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Distinguish between operations that mutate state (like pop and push) and operations that merely query state (like peek and isEmpty)."
      ],
      refresherPrompt: "Does inspecting an element require removing it, or can you look without modifying the data structure?"
    },

    stack_capacity: {
      explanation: [
        "In theoretical computer science, an abstract stack has an unbounded capacity that can grow as large as needed.",
        "However, concrete computer systems possess finite physical memory. When a fixed-size contiguous array backs a stack, attempting to push past its allocated storage causes a stack overflow error."
      ],
      thinkPrompt: "Does a mathematical stack have a fixed size, or is capacity limit a property of the underlying storage array or memory?",
      thinkPlaceholder: "Explain the difference between the abstract definition and physical memory constraints...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Consider whether the concept of a stack inherently requires a maximum limit or if that limit arises from machine constraints."
      ],
      refresherPrompt: "What causes a stack overflow: the mathematical definition of a stack or the finite size of physical memory?"
    },

    stack_call_frames: {
      explanation: [
        "During program execution, functions can invoke other subroutines to arbitrary levels of nesting.",
        "Because an invoked function must complete its work and return before its caller can continue, execution environments use a call stack to preserve each function's activation frame in strict reverse order of invocation."
      ],
      thinkPrompt: "If function A calls function B, and function B calls function C, which function must finish and return first?",
      thinkPlaceholder: "Explain the order in which functions must complete...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Think about where the program needs to resume execution when a sub-function finishes."
      ],
      refresherPrompt: "Why does the CPU need a LIFO structure rather than a FIFO queue when tracking function calls?"
    },

    // Topic 2: Queue
    queue_underflow: {
      explanation: [
        "A queue follows the FIFO (First In, First Out) principle. The dequeue() operation removes the item waiting at the front.",
        "When the queue holds zero elements, no items exist to dequeue. This boundary state is termed queue underflow.",
        "Different runtime libraries handle this condition in different ways: some return null, some return a sentinel code, and others throw an exception."
      ],
      thinkPrompt: "If a queue implementation returns null or throws an error when dequeuing an empty queue, does that change the FIFO concept?",
      thinkPlaceholder: "Explain whether the queue concept changes based on how the empty state is reported...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Separating the abstract protocol (empty queue has nothing to yield) from implementation mechanics (null vs exception) is key to mastering data structures."
      ],
      refresherPrompt: "Is returning null or throwing an exception a universal rule of queues, or an implementation choice?"
    },

    queue_fifo_principle: {
      explanation: [
        "A queue organizes items sequentially such that insertions occur at the rear and deletions occur at the front.",
        "This structural rule enforces fairness: whichever element entered earliest is guaranteed to be serviced earliest, embodying First-In, First-Out (FIFO)."
      ],
      thinkPrompt: "In a supermarket checkout line, who gets served first: the customer who arrived first or the customer who arrived last?",
      thinkPlaceholder: "Explain the fairness rule and how it maps to queue operations...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Compare how queues handle arrival times versus how stacks handle arrival times."
      ],
      refresherPrompt: "How does the front/rear separation guarantee First-In, First-Out order?"
    },

    queue_circular_wrap: {
      explanation: [
        "In a naive array queue, dequeueing elements shifts the front pointer forward, leaving empty, unfillable space behind it.",
        "A circular queue connects the end of the array back to the beginning using modulo arithmetic, enabling the rear pointer to wrap around and reuse newly freed front slots."
      ],
      thinkPrompt: "If the end of an array is reached but slots at index 0 and 1 are empty, why should we wrap around instead of declaring the queue full?",
      thinkPlaceholder: "Explain how wrapping around utilizes available memory...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Think about what happens to space in fixed contiguous memory as items are repeatedly added and removed."
      ],
      refresherPrompt: "Why does an ordinary linear array waste space when used as a queue without shifting?"
    },

    queue_priority_distinction: {
      explanation: [
        "A standard queue processes items strictly according to timestamp or order of insertion (FIFO).",
        "A priority queue assigns each element a priority score. Deletions always extract the item with the highest priority first, irrespective of its arrival sequence."
      ],
      thinkPrompt: "If an emergency patient arrives later than a patient with a mild cold, why does a hospital treat them first?",
      thinkPlaceholder: "Explain how priority overrides arrival order...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Contrast order-by-time with order-by-value."
      ],
      refresherPrompt: "Does a priority queue adhere to FIFO, or does priority determine extraction order?"
    },

    queue_double_ended: {
      explanation: [
        "A Deque (Double-Ended Queue) is a versatile linear structure that permits insertion and removal at both extremities (front and rear).",
        "Because operations are allowed at both ends, a Deque can be configured to emulate either a FIFO queue or a LIFO stack."
      ],
      thinkPrompt: "Can a structure that allows push and pop at both ends act like a stack, a queue, or both?",
      thinkPlaceholder: "Explain how restricting operations can reproduce stack or queue behavior...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Examine how the operations of stacks and queues are subsets of the operations provided by a double-ended queue."
      ],
      refresherPrompt: "How can you use a deque so that it follows the LIFO principle?"
    },

    // Topic 3: Linked List
    linked_list_delete: {
      explanation: [
        "In a singly linked list, elements are connected via pointers rather than residing in contiguous array cells.",
        "To delete a node, the preceding node's pointer must be reassigned to target the deleted node's successor, cleanly bypassing it."
      ],
      thinkPrompt: "If three people are holding hands in a line (A -> B -> C) and B steps out, how do A and C stay connected?",
      thinkPlaceholder: "Explain whose pointer changes to maintain the chain...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Recall that nodes in a linked list do not know who points to them unless there is an explicit backward link."
      ],
      refresherPrompt: "Why is having access to the predecessor node critical when deleting in a singly linked list?"
    },

    linked_list_head_insert: {
      explanation: [
        "Prepending a new node to a linked list involves pointing the new node's next pointer to the current head, then updating the head pointer.",
        "Because no other nodes need to be relocated or shifted in memory, head insertion always executes in O(1) constant time."
      ],
      thinkPrompt: "In an array, inserting at index 0 requires shifting all existing elements. Why doesn't a linked list need to shift anything?",
      thinkPlaceholder: "Explain how pointer reassignment avoids element shifting...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Notice the structural difference between fixed contiguous arrays and independently allocated heap nodes."
      ],
      refresherPrompt: "Does inserting at the head of a linked list depend on the number of elements already in the list?"
    },

    linked_list_search_cost: {
      explanation: [
        "Arrays allow instantaneous random access (arr[i]) because memory addresses are calculated using a simple offset formula: base + i * size.",
        "Linked lists store nodes at arbitrary non-contiguous locations. Reaching the k-th node requires sequentially traversing k pointer dereferences from the head, taking O(n) time."
      ],
      thinkPrompt: "Can you directly jump to the 50th node of a linked list without visiting the first 49 nodes?",
      thinkPlaceholder: "Explain why pointer chasing prevents instant indexing...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Consider what information the head pointer alone gives you about where subsequent nodes live in memory."
      ],
      refresherPrompt: "Why can't a computer compute the memory address of node 10 from just the address of node 0?"
    },

    linked_list_doubly: {
      explanation: [
        "A doubly linked list node incorporates two pointers: next (forward reference) and prev (backward reference).",
        "Having immediate access to both directions allows O(1) removal of a given node reference without requiring a linear search for the predecessor."
      ],
      thinkPrompt: "If you already hold a direct pointer to a node, why is deleting it easier in a doubly linked list than in a singly linked list?",
      thinkPlaceholder: "Explain how having the prev pointer eliminates the predecessor search...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Consider what missing information a singly linked list node lacks about its context in the list."
      ],
      refresherPrompt: "How does the prev pointer allow you to bypass a node in constant time?"
    },

    linked_list_cycle_detection: {
      explanation: [
        "An acyclic linked list always terminates with a final node whose next pointer is null.",
        "If a node's next pointer references an earlier node, a cycle is created. Traversing this list naively results in an infinite loop."
      ],
      thinkPrompt: "If two runners on a circular track run at different speeds (one taking 1 step, the other 2), will the faster runner eventually catch up to the slower runner?",
      thinkPlaceholder: "Explain how fast and slow pointers interact in a loop...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Think about Floyd's cycle-finding algorithm (the tortoise and hare approach)."
      ],
      refresherPrompt: "What happens when a fast pointer and a slow pointer both move inside a closed loop?"
    },

    // Topic 4: Searching
    binary_search_precondition: {
      explanation: [
        "Binary search operates by comparing the target key with the value at the array's midpoint and eliminating half the elements.",
        "This elimination is logically valid only when elements are arranged in monotonic sorted order. In an unsorted array, the target could lie on either side of the midpoint."
      ],
      thinkPrompt: "If you open a dictionary in the middle and see 'M', can you know whether 'Apple' is in the left half if words aren't in alphabetical order?",
      thinkPlaceholder: "Explain why order is required to eliminate half the items...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Think about what guarantees you need to safely discard half of a dataset without checking it."
      ],
      refresherPrompt: "What allows you to be certain that an element is not in the right half of the array?"
    },

    linear_vs_binary_efficiency: {
      explanation: [
        "Linear search checks items one by one from start to end, requiring O(n) operations in the worst case.",
        "Binary search divides the remaining candidate range in half at each step. This logarithmic halving requires at most ceil(log2(n)) comparisons, enabling searches across 1,000,000 elements in approximately 20 checks."
      ],
      thinkPrompt: "If you double the size of a list from 1,000 to 2,000 items, how many extra checks does binary search need compared to linear search?",
      thinkPlaceholder: "Compare how doubling n affects linear search versus binary search...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Reflect on how logarithmic reduction scales compared to linear accumulation."
      ],
      refresherPrompt: "Why does dividing by 2 scale dramatically better than subtracting 1 at each step?"
    },

    binary_search_midpoint: {
      explanation: [
        "Computing the midpoint between two indices low and high is mathematically equivalent to (low + high) / 2.",
        "In languages with bounded 32-bit signed integers, computing (low + high) can overflow into negative values when indices are large. Computing low + (high - low) / 2 calculates the same index without intermediate overflow."
      ],
      thinkPrompt: "If the maximum number a computer register can hold is 100, and low=60, high=80, what happens if you compute 60 + 80 first?",
      thinkPlaceholder: "Explain what happens during overflow and how the alternative formula prevents it...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Consider the constraints of fixed-width integer registers in computer hardware."
      ],
      refresherPrompt: "How does subtracting low from high guarantee the intermediate value stays small?"
    },

    hash_search_behavior: {
      explanation: [
        "Hash tables use a hash function to transform search keys into integer array slots, allowing average O(1) constant-time key lookups.",
        "However, because the universe of possible keys exceeds the table size, multiple distinct keys can hash to the same bucket (collision). If all keys collide into a single bucket, search degrades to O(n)."
      ],
      thinkPrompt: "Does a hash table guarantee instant lookup in every single worst-case scenario, or only on average when keys distribute well?",
      thinkPlaceholder: "Explain the difference between average case and worst-case collision performance...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Distinguish between expected runtime with uniform hashing and theoretical worst-case collisions."
      ],
      refresherPrompt: "What happens to search performance if every key hashes to the exact same index?"
    },

    binary_search_duplicates: {
      explanation: [
        "Standard binary search halts immediately when arr[mid] == target and returns mid.",
        "When duplicate target values exist, the midpoint found can be any one of those duplicate positions, not necessarily the leftmost or first occurrence in the array."
      ],
      thinkPrompt: "If an array is [2, 4, 4, 4, 9] and you check the midpoint, you find 4. Is it guaranteed to be the first 4 in the array?",
      thinkPlaceholder: "Explain why standard binary search might land on an intermediate duplicate...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Think about what modification binary search needs to find the lower bound index."
      ],
      refresherPrompt: "If arr[mid] matches the target, could there be earlier copies in the left subarray?"
    },

    // Topic 5: Trees
    tree_bst_property: {
      explanation: [
        "A Binary Search Tree (BST) maintains an ordering invariant across every node in the tree.",
        "For any node with key K, all keys in its left subtree must be strictly less than K, and all keys in its right subtree must be strictly greater than K."
      ],
      thinkPrompt: "If a node has value 10, can any node in its entire left subtree contain a value greater than 10?",
      thinkPlaceholder: "Explain the BST property and what values are permitted in the left subtree...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Remember that the BST property applies to every ancestor and all descendants, not merely immediate children."
      ],
      refresherPrompt: "What invariant must hold for all nodes in the left subtree of a BST root?"
    },

    tree_leaf_and_height: {
      explanation: [
        "In tree structures, a leaf node is any node that has zero child references.",
        "The height of a tree is defined as the number of edges on the longest path from the root down to a leaf. A balanced binary tree has height O(log n), whereas a degenerate tree has height O(n)."
      ],
      thinkPrompt: "If you connect 5 nodes in a single straight line from parent to only child, how does its height compare to a tree where each node splits into two?",
      thinkPlaceholder: "Explain how tree branching affects height...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Consider how tree height directly determines the worst-case number of comparisons in tree operations."
      ],
      refresherPrompt: "How does the height of a tree change when nodes branch out versus when they form a chain?"
    },

    tree_inorder_sorted: {
      explanation: [
        "In-order traversal visits nodes recursively in the sequence: Left Subtree, Root Node, Right Subtree.",
        "Because a BST maintains all smaller elements on the left and all larger elements on the right, in-order traversal visits elements in strictly ascending numerical order."
      ],
      thinkPrompt: "If you always visit the smaller left values before the parent, and the parent before the larger right values, what sequence of numbers will you get?",
      thinkPlaceholder: "Explain why L-Root-R traversal produces sorted values in a BST...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Connect the recursive definition of in-order traversal to the BST ordering invariant."
      ],
      refresherPrompt: "Why does traversing Left-Root-Right guarantee non-decreasing order in a BST?"
    },

    tree_balanced_vs_skewed: {
      explanation: [
        "When elements are inserted into a BST in already-sorted ascending order (e.g., 1, 2, 3, 4, 5), each new node becomes the right child of the previous node.",
        "This causes the tree to degenerate into an unbalanced linked list structure, increasing its height to O(n) and degrading lookup performance from O(log n) to O(n)."
      ],
      thinkPrompt: "If each node in a binary tree has only one child, does searching it behave like binary search or like linear search?",
      thinkPlaceholder: "Explain how degeneration into a line destroys the halving property...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Think about why balanced trees (like AVL or Red-Black trees) perform rotations to avoid skewed shapes."
      ],
      refresherPrompt: "What happens to the shape and search efficiency of a BST when values arrive in sorted order?"
    },

    tree_heap_vs_bst: {
      explanation: [
        "A Max-Heap satisfies the heap-order property: every parent node is greater than or equal to its children, with no left-versus-right ordering between sibling nodes.",
        "In contrast, a BST mandates that left children are smaller and right children are larger. Consequently, heaps excel at finding the maximum element in O(1) but do not support fast binary search for arbitrary keys."
      ],
      thinkPrompt: "In a Max-Heap, can the right child be smaller than, equal to, or greater than the left child?",
      thinkPlaceholder: "Explain why heaps do not enforce horizontal ordering between siblings...",
      refresherExplanation: [
        "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
        "Contrast the primary purpose of a priority queue / heap (finding min/max) with the purpose of a BST (searching arbitrary keys)."
      ],
      refresherPrompt: "Why is an arbitrary key search in a heap O(n) while in a balanced BST it is O(log n)?"
    }
  };

  function getQuestionExplanation(qData) {
    if (CONCEPT_EXPLANATIONS[qData.id] && CONCEPT_EXPLANATIONS[qData.id].explanation) {
      return CONCEPT_EXPLANATIONS[qData.id].explanation;
    }
    return [
      `In computer science, a ${qData.concept} defines a foundational set of operations and behaviors.`,
      `Understanding how ${qData.concept} operates conceptually at boundary conditions is essential before analyzing language-specific code.`
    ];
  }

  function getQuestionThinkPrompt(qData) {
    if (CONCEPT_EXPLANATIONS[qData.id] && CONCEPT_EXPLANATIONS[qData.id].thinkPrompt) {
      return CONCEPT_EXPLANATIONS[qData.id].thinkPrompt;
    }
    if (qData.socraticStages && qData.socraticStages[0]) {
      return qData.socraticStages[0].prompt;
    }
    return qData.guidedQuestion || `What fundamental rule governs this operation in a ${qData.concept}?`;
  }

  function getQuestionThinkPlaceholder(qData) {
    if (CONCEPT_EXPLANATIONS[qData.id] && CONCEPT_EXPLANATIONS[qData.id].thinkPlaceholder) {
      return CONCEPT_EXPLANATIONS[qData.id].thinkPlaceholder;
    }
    return "Explain your reasoning step by step based on the concept...";
  }

  function getQuestionRefresher(qData) {
    if (CONCEPT_EXPLANATIONS[qData.id] && CONCEPT_EXPLANATIONS[qData.id].refresherExplanation) {
      return CONCEPT_EXPLANATIONS[qData.id].refresherExplanation;
    }
    return [
      "You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.",
      `In abstract data structures, ${qData.concept} operations represent logical behavior. The language-specific syntax or return value is just one way a concrete system implements that behavior.`
    ];
  }

  function getQuestionRefresherPrompt(qData) {
    if (CONCEPT_EXPLANATIONS[qData.id] && CONCEPT_EXPLANATIONS[qData.id].refresherPrompt) {
      return CONCEPT_EXPLANATIONS[qData.id].refresherPrompt;
    }
    return qData.guidedReasoningQuestion || "What led you to expect this specific outcome? Is it a universal rule of the concept or language-specific?";
  }

  // ==========================================================================
  // 2. TRANSACTIONAL INDEXEDDB STORAGE & CRYPTOGRAPHY ENGINE
  // ==========================================================================
  const DB_NAME = 'MisconceptionOS_DB_v2';
  const DB_VERSION = 1;

  class DatabaseEngine {
    constructor() {
      this.db = null;
      this.initPromise = this.init();
    }

    async init() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('profiles')) {
            const profileStore = db.createObjectStore('profiles', { keyPath: 'id' });
            profileStore.createIndex('email', 'email', { unique: true });
            profileStore.createIndex('role', 'role', { unique: false });
          }
          if (!db.objectStoreNames.contains('learner_state')) {
            db.createObjectStore('learner_state', { keyPath: 'user_id' });
          }
          if (!db.objectStoreNames.contains('misconceptions')) {
            const miscStore = db.createObjectStore('misconceptions', { keyPath: 'id' });
            miscStore.createIndex('user_id', 'user_id', { unique: false });
            miscStore.createIndex('user_concept', ['user_id', 'concept'], { unique: false });
          }
          if (!db.objectStoreNames.contains('interactions')) {
            const intStore = db.createObjectStore('interactions', { keyPath: 'id' });
            intStore.createIndex('user_id', 'user_id', { unique: false });
          }
          if (!db.objectStoreNames.contains('recovery_results')) {
            const recStore = db.createObjectStore('recovery_results', { keyPath: 'id' });
            recStore.createIndex('user_id', 'user_id', { unique: false });
          }
          if (!db.objectStoreNames.contains('sessions')) {
            db.createObjectStore('sessions', { keyPath: 'token' });
          }
        };

        request.onsuccess = (e) => {
          this.db = e.target.result;
          // CRITICAL: Resolve immediately so ready() completes and never deadlocks!
          resolve(this.db);
          setTimeout(() => {
            this.seedInitialAccounts().catch(err => console.warn('Seed notice:', err));
          }, 0);
        };

        request.onerror = (e) => {
          console.error('IndexedDB open error:', e);
          reject(e);
        };
      });
    }

    async ready() {
      if (this.db) return this.db;
      return Promise.race([
        this.initPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database initialization timeout.')), 4000))
      ]);
    }

    async hashPassword(password, existingSaltHex = null) {
      try {
        if (window.crypto && window.crypto.subtle && window.crypto.subtle.importKey) {
          const enc = new TextEncoder();
          let salt;
          if (existingSaltHex) {
            salt = new Uint8Array(existingSaltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
          } else {
            salt = crypto.getRandomValues(new Uint8Array(16));
          }

          const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
          );

          const derivedBits = await crypto.subtle.deriveBits(
            {
              name: 'PBKDF2',
              salt: salt,
              iterations: 10000,
              hash: 'SHA-256'
            },
            keyMaterial,
            256
          );

          const hashHex = Array.from(new Uint8Array(derivedBits))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

          const saltHex = Array.from(salt)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

          return { hashHex, saltHex };
        }
      } catch (e) {
        console.warn('WebCrypto PBKDF2 notice, using fallback hash:', e);
      }

      // Fallback hash if crypto.subtle is restricted
      const saltHex = existingSaltHex || 'a1b2c3d4e5f67890';
      let hash = 0;
      const str = password + saltHex;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
      }
      return { hashHex: Math.abs(hash).toString(16).padStart(16, '0'), saltHex };
    }

    generateToken() {
      if (window.crypto && window.crypto.getRandomValues) {
        const bytes = crypto.getRandomValues(new Uint8Array(24));
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
      }
      return 'tok_' + Date.now() + '_' + Math.random().toString(36).substr(2, 12);
    }

    async seedInitialAccounts() {
      if (!this.db) return;
      const teacherEmail = 'teacher@misconceptionos.edu';
      const studentEmail = 'student@misconceptionos.edu';

      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(['profiles', 'learner_state', 'misconceptions', 'interactions', 'recovery_results'], 'readwrite');
          const pStore = tx.objectStore('profiles');
          const sStore = tx.objectStore('learner_state');
          const mStore = tx.objectStore('misconceptions');
          const iStore = tx.objectStore('interactions');
          const rStore = tx.objectStore('recovery_results');
          const index = pStore.index('email');

          // 1. Seed Teacher
          const tReq = index.get(teacherEmail);
          tReq.onsuccess = async () => {
            if (!tReq.result) {
              const { hashHex, saltHex } = await this.hashPassword('TeacherPass123!');
              const teacherProfile = {
                id: 'usr_teacher_demo',
                user_id: 'usr_teacher_demo',
                full_name: 'Prof. Eleanor Vance',
                email: teacherEmail,
                password_hash: hashHex,
                salt: saltHex,
                role: 'teacher',
                created_at: Date.now() - (7 * 24 * 60 * 60 * 1000)
              };
              try { pStore.add(teacherProfile); } catch (e) {}
            }

            // 2. Seed Student
            const sReq = index.get(studentEmail);
            sReq.onsuccess = async () => {
              if (!sReq.result) {
                const { hashHex, saltHex } = await this.hashPassword('StudentPass123!');
                const studentProfile = {
                  id: 'usr_student_demo',
                  user_id: 'usr_student_demo',
                  full_name: 'Alex Rivera',
                  email: studentEmail,
                  password_hash: hashHex,
                  salt: saltHex,
                  role: 'student',
                  created_at: Date.now() - (3 * 24 * 60 * 60 * 1000)
                };
                try {
                  pStore.add(studentProfile);
                  sStore.add({
                    user_id: 'usr_student_demo',
                    overall_score: 82,
                    concepts: {
                      'Data Structures': { attempts: 6, correct: 5, status: 'Recovered' },
                      'Operating Systems': { attempts: 3, correct: 2, status: 'In Progress' },
                      'DBMS': { attempts: 2, correct: 2, status: 'Recovered' }
                    },
                    last_active: Date.now()
                  });

                  const now = Date.now();
                  // Sample misconception evidence for teacher review
                  mStore.add({
                    id: 'misc_seed_1',
                    user_id: 'usr_student_demo',
                    concept: 'Stack',
                    misconception_key: 'abstract_vs_implementation',
                    semantic_category: 'implementation_vs_abstraction',
                    title: 'Confusing Abstract Specification with Implementation Error Codes',
                    underlying_concept: 'Abstract data-structure behavior vs implementation-specific behavior',
                    evidence: { answer: 'Returns -1', reasoning: 'Because every empty data structure must return -1 as a universal rule' },
                    occurrence_count: 2,
                    is_recurring: true,
                    status: 'Recovered',
                    first_detected: now - (2 * 24 * 60 * 60 * 1000),
                    last_detected: now - (1 * 24 * 60 * 60 * 1000),
                    affected_concepts: ['Stack', 'Queue'],
                    recovery_history: [{
                      timestamp: now - (1 * 24 * 60 * 60 * 1000),
                      status: 'Recovered',
                      result: 'Verified in transfer check: Correctly recognized that return values are runtime language decisions.'
                    }],
                    intervention_given: 'If another stack implementation throws an exception instead of returning -1, is the stack concept wrong?',
                    transfer_result: 'Verified in transfer check: Correctly recognized that return values are runtime language decisions.',
                    created_at: now - (2 * 24 * 60 * 60 * 1000),
                    updated_at: now - (1 * 24 * 60 * 60 * 1000)
                  });

                  // Sample interaction
                  iStore.add({
                    id: 'int_seed_1',
                    user_id: 'usr_student_demo',
                    question_id: 'stack_underflow',
                    concept: 'Stack',
                    answer: 'Returns -1',
                    reasoning: 'Because every empty data structure must return -1 as a universal rule',
                    diagnosis: { status: 'Misconception Detected', title: 'Confusing Abstract Specification with Implementation Error Codes' },
                    meta: { outcomeType: 'misconception', status: 'completed' },
                    created_at: now - (2 * 24 * 60 * 60 * 1000)
                  });

                  // Sample recovery
                  rStore.add({
                    id: 'rec_seed_1',
                    user_id: 'usr_student_demo',
                    concept: 'Stack',
                    question_id: 'stack_underflow',
                    verified: true,
                    notes: 'Transfer response confirmed understanding that underflow is an abstract precondition violation regardless of return code.',
                    created_at: now - (1 * 24 * 60 * 60 * 1000)
                  });
                } catch (e) {}
              }
              resolve();
            };
            sReq.onerror = () => resolve();
          };
          tReq.onerror = () => resolve();
        } catch (e) {
          resolve();
        }
      });
    }

    async insert(storeName, data) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.add(data);
        req.onsuccess = () => resolve(data);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async put(storeName, data) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.put(data);
        req.onsuccess = () => resolve(data);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async get(storeName, key) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async getAll(storeName) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async getByIndex(storeName, indexName, value) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const req = index.getAll(value);
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async delete(storeName, key) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async getProfileByEmail(email) {
      await this.ready();
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction('profiles', 'readonly');
        const store = tx.objectStore('profiles');
        const index = store.index('email');
        const req = index.get((email || '').toLowerCase().trim());
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = (e) => reject(e.target.error);
      });
    }

    async createProfile(fullName, email, password, role = 'student') {
      const cleanEmail = email.toLowerCase().trim();
      const existing = await this.getProfileByEmail(cleanEmail);
      if (existing) {
        throw new Error('An account with this email already exists. Please log in instead.');
      }

      const { hashHex, saltHex } = await this.hashPassword(password);
      const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);

      const profile = {
        id: userId,
        user_id: userId,
        full_name: fullName.trim(),
        email: cleanEmail,
        password_hash: hashHex,
        salt: saltHex,
        role: role === 'teacher' ? 'teacher' : 'student',
        created_at: Date.now()
      };

      await this.insert('profiles', profile);

      if (profile.role === 'student') {
        const initialLearnerState = {
          user_id: userId,
          concepts: {
            "Stack": { status: "Not Started", progress: 0, lastPracticed: null },
            "Queue": { status: "Not Started", progress: 0, lastPracticed: null },
            "Linked List": { status: "Not Started", progress: 0, lastPracticed: null },
            "Searching": { status: "Not Started", progress: 0, lastPracticed: null },
            "Trees": { status: "Not Started", progress: 0, lastPracticed: null }
          },
          overall_progress: 0,
          last_active: Date.now()
        };
        try {
          await this.insert('learner_state', initialLearnerState);
        } catch (err) {
          console.warn('Initial learner state notice:', err);
        }
      }

      return profile;
    }

    async authenticate(email, password) {
      const cleanEmail = (email || '').toLowerCase().trim();
      const profile = await this.getProfileByEmail(cleanEmail);
      if (!profile) {
        throw new Error('Invalid email or password.');
      }

      const { hashHex } = await this.hashPassword(password, profile.salt);
      if (hashHex !== profile.password_hash) {
        throw new Error('Invalid email or password.');
      }

      const token = this.generateToken();
      const session = {
        token,
        user_id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
        created_at: Date.now(),
        expires_at: Date.now() + (24 * 60 * 60 * 1000)
      };

      await this.put('sessions', session);
      localStorage.setItem('misconceptionos_session_token', token);

      return {
        token,
        user: {
          id: profile.id,
          full_name: profile.full_name,
          email: profile.email,
          role: profile.role,
          created_at: profile.created_at
        }
      };
    }

    async getSession(token) {
      if (!token) return null;
      const session = await this.get('sessions', token);
      if (!session) return null;

      if (Date.now() > session.expires_at) {
        await this.delete('sessions', token);
        localStorage.removeItem('misconceptionos_session_token');
        return null;
      }
      return session;
    }

    async logout(token) {
      if (token) {
        await this.delete('sessions', token);
      }
      localStorage.removeItem('misconceptionos_session_token');
    }

    async getLearnerState(userId) {
      const state = await this.get('learner_state', userId);
      if (!state) {
        return {
          user_id: userId,
          concepts: {
            "Stack": { status: "Not Started", progress: 0, lastPracticed: null },
            "Queue": { status: "Not Started", progress: 0, lastPracticed: null },
            "Linked List": { status: "Not Started", progress: 0, lastPracticed: null },
            "Searching": { status: "Not Started", progress: 0, lastPracticed: null },
            "Trees": { status: "Not Started", progress: 0, lastPracticed: null }
          },
          overall_progress: 0,
          last_active: Date.now()
        };
      }
      return state;
    }

    async saveLearnerState(state) {
      return this.put('learner_state', state);
    }

        async recordInteraction(userId, questionId, concept, answer, reasoning, diagnosis, metadata = {}) {
      const interaction = {
        id: 'int_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        user_id: userId,
        question_id: questionId,
        concept,
        answer: answer || '',
        answer_status: metadata.answerStatus || (answer ? 'provided' : 'unknown'),
        reasoning: reasoning || '',
        reasoning_status: metadata.reasoningStatus || (reasoning ? 'provided' : 'unknown'),
        diagnosis: diagnosis || null,
        diagnostic_status: metadata.diagnosticStatus || 'analyzed',
        outcome_type: metadata.outcomeType || 'attempted',
        status: metadata.status || 'in_progress',
        created_at: Date.now()
      };
      await this.insert('interactions', interaction);

      const state = await this.getLearnerState(userId);
      if (!state.concepts[concept]) {
        state.concepts[concept] = {
          status: "In Progress",
          progress: 20,
          lastPracticed: Date.now(),
          current_question_id: questionId,
          questions_completed: [],
          verified_count: 0
        };
      } else {
        if (state.concepts[concept].status === 'Not Started') {
          state.concepts[concept].status = "In Progress";
          state.concepts[concept].progress = 20;
        }
        state.concepts[concept].lastPracticed = Date.now();
        state.concepts[concept].current_question_id = questionId;
        if (!state.concepts[concept].questions_completed) {
          state.concepts[concept].questions_completed = [];
        }
      }

      if (metadata.status === 'completed' || metadata.status === 'verified') {
        if (!state.concepts[concept].questions_completed.includes(questionId)) {
          state.concepts[concept].questions_completed.push(questionId);
        }
      }

      state.last_active = Date.now();
      await this.saveLearnerState(state);

      return interaction;
    }

    async markQuestionCompleted(userId, concept, questionId, outcomeType = 'completed') {
      const state = await this.getLearnerState(userId);
      if (!state.concepts[concept]) {
        state.concepts[concept] = { status: "In Progress", progress: 20, lastPracticed: Date.now(), questions_completed: [questionId] };
      } else {
        if (!state.concepts[concept].questions_completed) {
          state.concepts[concept].questions_completed = [];
        }
        if (!state.concepts[concept].questions_completed.includes(questionId)) {
          state.concepts[concept].questions_completed.push(questionId);
        }
        state.concepts[concept].lastPracticed = Date.now();
      }
      await this.saveLearnerState(state);
    }

    async getInteractions(userId) {
      return this.getByIndex('interactions', 'user_id', userId);
    }

    async recordMisconception(userId, concept, misconceptionKey, title, underlyingConcept, answer, reasoning, interventionGiven, status = 'Detected', semanticCategory = 'conceptual_invariant') {
      const existing = await this.getMisconceptions(userId);
      const match = existing.find(m => m.concept === concept && m.misconception_key === misconceptionKey);
      const now = Date.now();

      if (match) {
        match.occurrence_count = (match.occurrence_count || 1) + 1;
        match.status = status;
        match.evidence = { answer, reasoning };
        match.intervention_given = interventionGiven;
        match.semantic_category = semanticCategory || match.semantic_category || 'conceptual_invariant';
        match.last_detected = now;
        match.updated_at = now;
        if (!match.affected_concepts) match.affected_concepts = [concept];
        if (!match.affected_concepts.includes(concept)) match.affected_concepts.push(concept);
        if (!match.recovery_history) match.recovery_history = [];
        await this.put('misconceptions', match);
        return match;
      }

      const priorWithSameKey = existing.filter(m => m.misconception_key === misconceptionKey || (semanticCategory && m.semantic_category === semanticCategory));
      const isRecurring = priorWithSameKey.length > 0;
      const count = isRecurring ? priorWithSameKey.length + 1 : 1;

      const affectedSet = new Set([concept]);
      priorWithSameKey.forEach(p => {
        if (Array.isArray(p.affected_concepts)) {
          p.affected_concepts.forEach(c => affectedSet.add(c));
        } else if (p.concept) {
          affectedSet.add(p.concept);
        }
      });
      const affectedList = Array.from(affectedSet);

      if (isRecurring) {
        for (const prior of priorWithSameKey) {
          prior.is_recurring = true;
          prior.occurrence_count = count;
          prior.last_detected = now;
          prior.updated_at = now;
          prior.affected_concepts = affectedList;
          await this.put('misconceptions', prior);
        }
      }

      const item = {
        id: 'misc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        user_id: userId,
        concept,
        misconception_key: misconceptionKey,
        semantic_category: semanticCategory || 'conceptual_invariant',
        title,
        underlying_concept: underlyingConcept,
        evidence: { answer, reasoning },
        occurrence_count: count,
        is_recurring: isRecurring,
        status,
        first_detected: now,
        last_detected: now,
        affected_concepts: affectedList,
        recovery_history: [],
        intervention_given: interventionGiven,
        transfer_result: null,
        created_at: now,
        updated_at: now
      };

      await this.insert('misconceptions', item);
      return item;
    }

    async updateMisconceptionStatus(userId, concept, misconceptionKey, status, transferResult = null) {
      const all = await this.getMisconceptions(userId);
      const item = all.find(m => m.concept === concept && m.misconception_key === misconceptionKey);
      if (item) {
        item.status = status;
        if (transferResult !== null) {
          item.transfer_result = transferResult;
          if (!Array.isArray(item.recovery_history)) item.recovery_history = [];
          item.recovery_history.push({
            timestamp: Date.now(),
            status,
            result: transferResult
          });
        }
        item.last_detected = Date.now();
        item.updated_at = Date.now();
        await this.put('misconceptions', item);
        return item;
      }
      return null;
    }

    async getMisconceptions(userId) {
      const list = await this.getByIndex('misconceptions', 'user_id', userId);
      return list.sort((a, b) => b.updated_at - a.updated_at);
    }

    async recordRecovery(userId, concept, verified, notes, questionId = null) {
      const rec = {
        id: 'rec_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        user_id: userId,
        concept,
        question_id: questionId || null,
        verified: !!verified,
        notes: notes || '',
        created_at: Date.now()
      };
      await this.insert('recovery_results', rec);

      const state = await this.getLearnerState(userId);
      if (!state.concepts[concept]) {
        state.concepts[concept] = {
          status: verified ? "Recovered" : "Needs Practice",
          progress: verified ? 100 : 40,
          lastPracticed: Date.now(),
          questions_completed: questionId ? [questionId] : [],
          verified_count: verified ? 1 : 0
        };
      } else {
        if (verified) {
          state.concepts[concept].status = "Recovered";
          state.concepts[concept].verified_count = (state.concepts[concept].verified_count || 0) + 1;
        } else {
          state.concepts[concept].status = "Needs Practice";
        }
        if (questionId) {
          if (!state.concepts[concept].questions_completed) {
            state.concepts[concept].questions_completed = [];
          }
          if (!state.concepts[concept].questions_completed.includes(questionId)) {
            state.concepts[concept].questions_completed.push(questionId);
          }
        }
        state.concepts[concept].lastPracticed = Date.now();
      }
      state.last_active = Date.now();
      await this.saveLearnerState(state);

      return rec;
    }

    async getRecoveryResults(userId) {
      return this.getByIndex('recovery_results', 'user_id', userId);
    }

    async getTopicStats(userId) {
      const topics = ["Stack", "Queue", "Linked List", "Searching", "Trees"];
      const interactions = await this.getInteractions(userId);
      const misconceptions = await this.getMisconceptions(userId);
      const recoveries = await this.getRecoveryResults(userId);
      const state = await this.getLearnerState(userId);

      const stats = {};

      for (const topic of topics) {
        const topicInteractions = interactions.filter(i => i.concept === topic);
        const topicMisconceptions = misconceptions.filter(m => m.concept === topic);
        const topicRecoveries = recoveries.filter(r => r.concept === topic);

        const startedQIds = new Set(topicInteractions.map(i => i.question_id));
        const completedQIds = new Set();
        
        const savedCompleted = (state.concepts && state.concepts[topic] && state.concepts[topic].questions_completed) || [];
        savedCompleted.forEach(qId => completedQIds.add(qId));

        topicInteractions.forEach(i => {
          if (i.status === 'completed' || i.status === 'verified' || i.diagnostic_status === 'correct' || i.outcome_type === 'verified' || i.outcome_type === 'guided_completed') {
            completedQIds.add(i.question_id);
          }
        });

        topicRecoveries.forEach(r => {
          if (r.question_id) completedQIds.add(r.question_id);
        });

        const verifiedQIds = new Set();
        topicRecoveries.forEach(r => {
          if (r.verified) {
            if (r.question_id) {
              verifiedQIds.add(r.question_id);
            } else if (completedQIds.size > 0) {
              verifiedQIds.add(Array.from(completedQIds)[0]);
            } else {
              verifiedQIds.add(`${topic.toLowerCase().replace(/\s+/g, '_')}_q1`);
            }
          }
        });

        const totalQuestions = 5;
        const questionsStarted = startedQIds.size;
        const questionsCompleted = completedQIds.size;
        const verifiedCount = verifiedQIds.size;

        const unknownAnswerCount = topicInteractions.filter(i => i.answer_status === 'unknown').length;
        const unknownReasoningCount = topicInteractions.filter(i => i.reasoning_status === 'unknown').length;
        const questionsAnswered = topicInteractions.filter(i => i.answer_status === 'provided').length;

        const misconceptionsDetected = topicMisconceptions.length;
        const activeMisconceptions = topicMisconceptions.filter(m => m.status !== 'Recovered' && m.status !== 'verified').length;
        const keyOccurrences = {};
        misconceptions.forEach(m => {
          keyOccurrences[m.misconception_key] = (keyOccurrences[m.misconception_key] || 0) + 1;
        });
        const recurringCount = topicMisconceptions.filter(m => {
          return (keyOccurrences[m.misconception_key] > 1) || (m.occurrence_count && m.occurrence_count > 1) || m.is_recurring;
        }).length;

        let status = "Not Started";
        if (verifiedCount > 0 && activeMisconceptions === 0) {
          status = "Recovered";
        } else if (activeMisconceptions > 0) {
          status = "Needs Practice";
        } else if (questionsCompleted > 0 || questionsStarted > 0) {
          status = "In Progress";
        }

        const progressPercent = Math.min(100, Math.round((questionsCompleted / totalQuestions) * 100));

        const currentQuestionId = (state.concepts && state.concepts[topic] && state.concepts[topic].current_question_id) || null;

        stats[topic] = {
          concept: topic,
          totalQuestions,
          questionsStarted,
          questionsCompleted,
          verifiedCount,
          unknownAnswerCount,
          unknownReasoningCount,
          questionsAnswered,
          misconceptionsDetected,
          activeMisconceptions,
          recurringCount,
          status,
          progressPercent,
          currentQuestionId,
          lastPracticed: (state.concepts && state.concepts[topic] && state.concepts[topic].lastPracticed) || null
        };
      }

      return stats;
    }

    // Teacher Aggregation
    async getTeacherDashboardMetrics() {
      const allProfiles = await this.getAll('profiles');
      const students = allProfiles.filter(p => p.role === 'student');
      const allMisconceptions = await this.getAll('misconceptions');

      const studentsWithUnresolved = new Set();
      allMisconceptions.forEach(m => {
        if (m.status !== 'Recovered') {
          studentsWithUnresolved.add(m.user_id);
        }
      });

      const recurringMap = {};
      allMisconceptions.forEach(m => {
        if (!recurringMap[m.misconception_key]) {
          recurringMap[m.misconception_key] = new Set();
        }
        recurringMap[m.misconception_key].add(m.user_id);
      });

      const recurringCount = Object.values(recurringMap).filter(set => set.size > 0).length;

      return {
        totalStudents: students.length,
        unresolvedCount: studentsWithUnresolved.size,
        recurringCount,
        recentStudents: students.slice(-5).map(s => ({
          id: s.id,
          name: s.full_name,
          email: s.email,
          createdAt: s.created_at
        }))
      };
    }

    async getTeacherStudentList() {
      const allProfiles = await this.getAll('profiles');
      const students = allProfiles.filter(p => p.role === 'student');

      const result = [];
      for (const student of students) {
        const state = await this.getLearnerState(student.id);
        const misc = await this.getMisconceptions(student.id);
        const recovery = await this.getRecoveryResults(student.id);

        const conceptsAttempted = Object.keys(state.concepts || {}).filter(
          c => state.concepts[c].status !== 'Not Started'
        );

        const recoveredCount = recovery.filter(r => r.verified).length;
        const recurringMisc = misc.filter(m => m.occurrence_count > 1 || misc.some(other => other.id !== m.id && other.misconception_key === m.misconception_key));

        result.push({
          id: student.id,
          name: student.full_name,
          email: student.email,
          conceptsAttempted: conceptsAttempted.length,
          conceptsList: conceptsAttempted,
          totalMisconceptions: misc.length,
          recurringCount: recurringMisc.length,
          recoveryStatus: recoveredCount > 0 ? `${recoveredCount} Recovered` : 'Needs Practice',
          lastActive: state.last_active || student.created_at
        });
      }
      return result.sort((a, b) => b.lastActive - a.lastActive);
    }

    async getTeacherStudentDetail(studentId) {
      const profile = await this.get('profiles', studentId);
      if (!profile) return null;

      const state = await this.getLearnerState(studentId);
      const misconceptions = await this.getMisconceptions(studentId);
      const interactions = await this.getInteractions(studentId);
      const recovery = await this.getRecoveryResults(studentId);

      return {
        student: {
          id: profile.id,
          name: profile.full_name,
          email: profile.email,
          createdAt: profile.created_at
        },
        state,
        misconceptions,
        interactions,
        recovery
      };
    }

    async getTeacherMisconceptionsAggregate() {
      const allMisc = await this.getAll('misconceptions');
      const profiles = await this.getAll('profiles');
      const profileMap = new Map(profiles.map(p => [p.id, p]));

      const group = {};
      for (const m of allMisc) {
        if (!group[m.misconception_key]) {
          group[m.misconception_key] = {
            key: m.misconception_key,
            title: m.title,
            underlyingConcept: m.underlying_concept,
            concepts: new Set(),
            studentIds: new Set(),
            totalOccurrences: 0,
            unresolvedCount: 0,
            samples: []
          };
        }
        const g = group[m.misconception_key];
        g.concepts.add(m.concept);
        g.studentIds.add(m.user_id);
        g.totalOccurrences += (m.occurrence_count || 1);
        if (m.status !== 'Recovered') {
          g.unresolvedCount += 1;
        }
        if (g.samples.length < 3) {
          const studentProfile = profileMap.get(m.user_id);
          g.samples.push({
            studentName: studentProfile ? studentProfile.full_name : 'Student',
            concept: m.concept,
            reasoning: m.evidence.reasoning,
            status: m.status
          });
        }
      }

      return Object.values(group).map(g => ({
        key: g.key,
        title: g.title,
        underlyingConcept: g.underlyingConcept,
        concepts: Array.from(g.concepts),
        affectedStudentsCount: g.studentIds.size,
        totalOccurrences: g.totalOccurrences,
        unresolvedCount: g.unresolvedCount,
        samples: g.samples
      }));
    }
  }

  const db = new DatabaseEngine();

  // ==========================================================================
  // 3. AUTHENTICATION SERVICE
  // ==========================================================================
  class AuthService {
    constructor() {
      this.currentUser = null;
      this.token = null;
      this.listeners = [];
    }

    onAuthStateChanged(callback) {
      this.listeners.push(callback);
      callback(this.currentUser);
    }

    notify() {
      this.listeners.forEach(cb => cb(this.currentUser));
    }

    async checkSession() {
      const savedToken = localStorage.getItem('misconceptionos_session_token');
      if (!savedToken) {
        this.currentUser = null;
        this.token = null;
        this.notify();
        return null;
      }

      try {
        const session = await db.getSession(savedToken);
        if (session) {
          this.token = session.token;
          this.currentUser = {
            id: session.user_id,
            email: session.email,
            full_name: session.full_name,
            role: session.role
          };
        } else {
          this.currentUser = null;
          this.token = null;
        }
      } catch (e) {
        console.warn('Error reading session:', e);
        this.currentUser = null;
        this.token = null;
      }

      this.notify();
      return this.currentUser;
    }

    async signup(fullName, email, password, confirmPassword, role) {
      if (!fullName || !fullName.trim()) {
        throw new Error('Please enter your full name.');
      }
      if (!email || !email.trim()) {
        throw new Error('Please enter your email address.');
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error('Please enter a valid email address.');
      }
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match. Please re-enter.');
      }
      if (!role || (role !== 'student' && role !== 'teacher')) {
        throw new Error('Please select an account role (Student or Teacher).');
      }

      await db.createProfile(fullName, email, password, role);
      return this.login(email, password);
    }

    async login(email, password) {
      if (!email || !password) {
        throw new Error('Please provide both email and password.');
      }
      const { token, user } = await db.authenticate(email, password);
      this.token = token;
      this.currentUser = user;
      this.notify();
      return user;
    }

    async logout() {
      if (this.token) {
        await db.logout(this.token);
      }
      this.currentUser = null;
      this.token = null;
      this.notify();
    }

    isAuthenticated() {
      return !!this.currentUser;
    }

    getRole() {
      return this.currentUser ? this.currentUser.role : null;
    }

    canAccess(route) {
      if (!this.currentUser) {
        return ['landing', 'login', 'signup', 'about'].includes(route);
      }
      if (this.currentUser.role === 'student') {
        return ['student-home', 'practice', 'progress', 'student-profile'].includes(route);
      }
      if (this.currentUser.role === 'teacher') {
        return ['teacher-dashboard', 'teacher-students', 'teacher-student-detail', 'teacher-misconceptions', 'teacher-profile'].includes(route);
      }
      return false;
    }
  }

  const auth = new AuthService();

  // ==========================================================================
  // 4. DIAGNOSTIC & SOCRATIC INTELLIGENCE ENGINE
  // ==========================================================================
  const MISCONCEPTION_CATALOG = {
    abstract_vs_implementation: {
      key: "abstract_vs_implementation",
      title: "Abstract Behavior vs Implementation Behavior",
      underlyingConcept: "Abstract data-structure behavior vs implementation-specific behavior",
      studentExplanation: "You seem to be treating -1 as a rule of the data structure itself. However, -1 is one possible way an implementation can handle an empty state."
    },
    lifo_vs_fifo: {
      key: "lifo_vs_fifo",
      title: "LIFO/FIFO Confusion",
      underlyingConcept: "LIFO vs FIFO ordering semantics",
      studentExplanation: "You are describing First-In First-Out (FIFO) behavior, where the earliest item added is removed first. However, a stack operates strictly on Last-In First-Out (LIFO)."
    },
    pointer_severing: {
      key: "pointer_severing",
      title: "Dangling Pointer / Unlinked Node Deletion",
      underlyingConcept: "Pointer rewiring in linked structures",
      studentExplanation: "Freeing or deleting a node without updating the preceding node leaves the preceding node pointing to unallocated memory, severing the list."
    },
    monotonicity_requirement: {
      key: "monotonicity_requirement",
      title: "Ignoring Algorithm Invariant Preconditions",
      underlyingConcept: "Binary search divide-and-conquer preconditions",
      studentExplanation: "Binary search relies on ordering to discard half the search space with each comparison. Without sorted order, discarding half can discard the target element."
    },
    bst_subtree_invariant: {
      key: "bst_subtree_invariant",
      title: "Local Child vs Global Subtree Invariant Confusion",
      underlyingConcept: "Global binary search tree invariant",
      studentExplanation: "The BST property requires that ALL keys in a node's left subtree are strictly less than the node's key, not just the immediate left child."
    }
  };

  class DiagnosticEngine {
    sanitizeInput(text) {
      if (!text) return '';
      return text.toString().replace(/<[^>]*>/g, '').trim();
    }

    isScopeAcademic(question, answer, reasoning) {
      const text = `${question} ${answer} ${reasoning}`.toLowerCase();

      const academicTokens = [
        // Data Structures & Algorithms
        'array', 'arrays', 'linked list', 'linked lists', 'linkedlist', 'node', 'nodes', 'pointer', 'pointers', 'head', 'tail',
        'stack', 'stacks', 'queue', 'queues', 'deque', 'lifo', 'fifo', 'push', 'pop', 'enqueue', 'dequeue', 'peek', 'underflow', 'overflow',
        'tree', 'trees', 'binary tree', 'bst', 'binary search tree', 'root', 'leaf', 'leaves', 'in-order', 'pre-order', 'post-order',
        'heap', 'heaps', 'priority queue', 'min-heap', 'max-heap',
        'graph', 'graphs', 'vertex', 'vertices', 'edge', 'edges', 'adjacency', 'bfs', 'dfs', 'breadth-first', 'depth-first',
        'hash', 'hashing', 'hash table', 'hashmap', 'hash map', 'hash set', 'collision', 'chaining', 'bucket', 'load factor',
        'search', 'searching', 'binary search', 'linear search',
        'sort', 'sorting', 'quicksort', 'mergesort', 'bubblesort', 'heapsort', 'insertionsort',
        'recursion', 'recursive', 'base case', 'call stack', 'stack frame', 'recurse',
        'time complexity', 'space complexity', 'big-o', 'big o', 'o(1)', 'o(n)', 'o(log n)', 'o(n log n)', 'o(n^2)', 'omega', 'theta',
        'amortized', 'in-place', 'data structure', 'data structures', 'algorithm', 'algorithms',
        'traversal', 'traversing', 'index', 'indices', 'contiguous',

        // DBMS
        'dbms', 'database', 'databases', 'normalization', 'normal form', '1nf', '2nf', '3nf', 'bcnf',
        'sql', 'rdbms', 'relational', 'acid', 'transaction', 'transactions', 'atomicity', 'consistency',
        'isolation', 'durability', 'concurrency', 'primary key', 'foreign key', 'candidate key',
        'redundancy', 'anomaly', 'anomalies', 'functional dependency', 'lossless', 'join', 'indexing',

        // Operating Systems
        'operating system', 'operating systems', 'os', 'deadlock', 'deadlocks', 'process', 'processes',
        'thread', 'threads', 'mutex', 'semaphore', 'semaphores', 'paging', 'virtual memory', 'page fault',
        'page replacement', 'lru', 'fifo replacement', 'scheduling', 'cpu scheduling', 'round robin',
        'context switch', 'race condition', 'critical section', 'starvation', 'thrashing', 'fork',

        // Computer Networks
        'computer network', 'computer networks', 'tcp', 'udp', 'ip', 'tcp/ip', 'osi', 'three-way handshake',
        'handshake', 'packet', 'packets', 'routing', 'router', 'switch', 'dns', 'http', 'https',
        'socket', 'sockets', 'latency', 'bandwidth', 'congestion control', 'flow control', 'transport layer',

        // Object-Oriented Programming & Languages
        'object-oriented', 'oop', 'polymorphism', 'inheritance', 'encapsulation', 'abstraction',
        'interface', 'interfaces', 'class', 'classes', 'method', 'methods', 'virtual function',
        'override', 'overload', 'dynamic dispatch', 'java', 'python', 'c++', 'garbage collection',

        // Machine Learning & AI
        'machine learning', 'ml', 'artificial intelligence', 'ai', 'overfitting', 'underfitting',
        'gradient descent', 'loss function', 'neural network', 'neural networks', 'deep learning',
        'bias', 'variance', 'bias-variance', 'regularization', 'supervised', 'unsupervised',
        'precision', 'recall', 'accuracy', 'cross-validation', 'hyperparameter', 'epoch',

        // Computer Architecture
        'computer architecture', 'cache', 'cache memory', 'l1', 'l2', 'l3', 'spatial locality',
        'temporal locality', 'pipelining', 'pipeline', 'alu', 'register', 'registers', 'cpu cache',
        'instruction set', 'risc', 'cisc',

        // Mathematics & Theory
        'discrete mathematics', 'discrete math', 'graph theory', 'mathematical induction',
        'boolean algebra', 'automata', 'turing machine', 'finite automata', 'computability'
      ];

      const hasAcademicToken = academicTokens.some(tok => {
        const regex = new RegExp(`\\b${tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        return regex.test(text);
      });

      const nonAcademicTokens = [
        'cricket', 'world cup', 'football', 'soccer', 'nba', 'nfl', 'ipl', 'tennis', 'olympics', 'champion', 'championship',
        'birthday', 'party', 'greeting', 'wish me', 'celebrity', 'actor', 'actress', 'movie', 'recipe', 'cooking',
        'song', 'singer', 'weather', 'forecast', 'horoscope', 'astrology', 'dating', 'fashion', 'shopping', 'tourism',
        'president', 'prime minister', 'election', 'war', 'capital of', 'population of'
      ];

      const hasNonAcademicToken = nonAcademicTokens.some(tok => text.includes(tok));
      if (hasNonAcademicToken && !hasAcademicToken) {
        return false;
      }
      return hasAcademicToken;
    }

    isScopeDataStructures(question, answer, reasoning) {
      return this.isScopeAcademic(question, answer, reasoning);
    }

    isUnknown(ans, reas) {
      const unknownPhrases = [
        "i don't know", "i dont know", "dont know", "not sure", "no idea",
        "have no idea", "unsure", "not certain", "idk", "haven't learned", "have not learned",
        "no clue", "can't recall", "cannot recall", "i don't know the answer"
      ];
      const cleanA = (ans || '').toLowerCase().trim();
      const cleanR = (reas || '').toLowerCase().trim();
      return unknownPhrases.some(p => cleanA === p || cleanA.startsWith(p) || cleanR === p || cleanR.startsWith(p));
    }

    isReasoningGap(reas) {
      const rGapPhrases = [
        "i don't know why", "i dont know why", "not sure why", "no idea why",
        "don't know the reason", "just guessing", "guessed it", "random guess",
        "not sure why it is", "don't know why it is needed", "dont know why it is needed",
        "don't know why it's needed", "dont know why it's needed"
      ];
      const cleanR = (reas || '').toLowerCase().trim();
      return rGapPhrases.some(p => cleanR === p || cleanR.startsWith(p) || cleanR.includes(p));
    }

    isUncertainReasoning(reas, confidence = '') {
      const cleanR = (reas || '').toLowerCase().trim();
      const words = cleanR.split(/\s+/).filter(Boolean);
      const uncertainPhrases = [
        "not sure", "not completely sure", "not entirely sure", "maybe", "might be", "could be",
        "i think so but not sure", "guessing", "just a guess", "not certain", "not confident",
        "probably", "possibly", "i guess", "i think maybe"
      ];
      const hasUncertainWord = uncertainPhrases.some(p => cleanR === p || cleanR.startsWith(p) || cleanR.includes(p));
      if (hasUncertainWord && words.length < 15) return true;
      if (confidence === 'not_sure' && words.length < 6) return true;
      return false;
    }

    deriveConceptAndPrinciple(question) {
      const q = (question || '').toLowerCase();

      // 1. DBMS
      if (q.includes('normalization') || q.includes('normal form') || q.includes('1nf') || q.includes('2nf') || q.includes('3nf') || q.includes('bcnf')) {
        return {
          concept: "Database Management Systems (DBMS)",
          subconcept: "Relational Normalization & Functional Dependencies",
          expectedPrinciple: "Normalization organizes database columns and tables to eliminate data redundancy and prevent insertion, update, and deletion anomalies while ensuring referential integrity and lossless decomposition."
        };
      }
      if (q.includes('acid') || q.includes('transaction') || q.includes('concurrency control') || q.includes('isolation')) {
        return {
          concept: "Database Management Systems (DBMS)",
          subconcept: "ACID Properties & Transaction Isolation",
          expectedPrinciple: "Transactions enforce ACID properties (Atomicity, Consistency, Isolation, Durability) to maintain reliable database states under concurrent access and unexpected failures."
        };
      }
      if (q.includes('primary key') || q.includes('foreign key') || q.includes('candidate key') || q.includes('unique key')) {
        return {
          concept: "Database Management Systems (DBMS)",
          subconcept: "Relational Keys & Entity Integrity",
          expectedPrinciple: "A primary key enforces entity integrity by uniquely identifying every tuple/record in a relational table, ensuring no two rows share identical key attributes and that the key contains no NULL values."
        };
      }
      if (q.includes('dbms') || q.includes('database') || q.includes('rdbms') || q.includes('sql') || q.includes('relational')) {
        return {
          concept: "Database Management Systems (DBMS)",
          subconcept: "Relational Data Modeling & Query Optimization",
          expectedPrinciple: "Relational database systems manage structured persistent records using relational algebra, indexed storage, and declarative queries to guarantee consistency and efficient retrieval."
        };
      }

      // 2. Operating Systems
      if (q.includes('deadlock') || q.includes('circular wait') || q.includes('banker')) {
        return {
          concept: "Operating Systems",
          subconcept: "Deadlock Invariants & Resource Allocation",
          expectedPrinciple: "A deadlock is an unresolvable stall occurring when concurrent processes each hold exclusive resources while waiting for resources held by another process in a circular wait condition."
        };
      }
      if (q.includes('paging') || q.includes('virtual memory') || q.includes('page fault') || q.includes('tlb')) {
        return {
          concept: "Operating Systems",
          subconcept: "Virtual Memory Management & Paging",
          expectedPrinciple: "Virtual memory maps process address spaces to physical RAM through page tables and hardware address translation, swapping frames to disk and handling page faults when pages are absent."
        };
      }
      if (q.includes('operating system') || q.includes('process') || q.includes('thread') || q.includes('semaphore') || q.includes('mutex') || q.includes('scheduling')) {
        return {
          concept: "Operating Systems",
          subconcept: "Process Scheduling & Concurrency Synchronization",
          expectedPrinciple: "The operating system kernel coordinates CPU scheduling, preemptive context switches, and mutual exclusion synchronization primitives to ensure throughput, fairness, and race-free concurrency."
        };
      }

      // 3. Computer Networks
      if (q.includes('tcp') || q.includes('udp') || q.includes('three-way handshake') || q.includes('transport layer')) {
        return {
          concept: "Computer Networks",
          subconcept: "Transport Layer Protocols (TCP vs UDP)",
          expectedPrinciple: "TCP is a connection-oriented protocol guaranteeing reliable, ordered byte stream delivery with congestion and flow control, whereas UDP provides lightweight, connectionless datagram transmission without reliability or retransmission overhead."
        };
      }
      if (q.includes('network') || q.includes('packet') || q.includes('routing') || q.includes('osi') || q.includes('ip address')) {
        return {
          concept: "Computer Networks",
          subconcept: "Network Protocol Stack & Packet Routing",
          expectedPrinciple: "Network architectures decompose data transmission into standardized layers (OSI/TCP-IP), routing packets across heterogenous topologies via addressing protocols and distributed routing algorithms."
        };
      }

      // 4. Machine Learning & AI
      if (q.includes('overfitting') || q.includes('underfitting') || q.includes('bias-variance') || q.includes('regularization')) {
        return {
          concept: "Machine Learning",
          subconcept: "Generalization & Overfitting",
          expectedPrinciple: "Overfitting occurs when a statistical or machine learning model fits training data and noise too closely, yielding high training performance but failing to generalize to unseen test distributions."
        };
      }
      if (q.includes('machine learning') || q.includes('neural network') || q.includes('gradient descent') || q.includes('deep learning') || q.includes('loss function')) {
        return {
          concept: "Machine Learning",
          subconcept: "Model Optimization & Loss Minimization",
          expectedPrinciple: "Machine learning algorithms iteratively optimize model parameters by minimizing objective loss functions via gradient-based updates across training distributions."
        };
      }

      // 5. Object-Oriented Programming
      if (q.includes('polymorphism') || q.includes('inheritance') || q.includes('encapsulation') || q.includes('object-oriented') || q.includes('oop') || q.includes('interface')) {
        return {
          concept: "Object-Oriented Programming",
          subconcept: "Polymorphism & Abstraction Invariants",
          expectedPrinciple: "Polymorphism enables disparate types to expose a uniform interface, with runtime dynamic dispatch resolving and executing the appropriate derived method implementation."
        };
      }

      // 6. Computer Architecture
      if (q.includes('cache') || q.includes('pipelining') || q.includes('computer architecture') || q.includes('spatial locality') || q.includes('temporal locality')) {
        return {
          concept: "Computer Architecture",
          subconcept: "Memory Hierarchy & Instruction Pipelining",
          expectedPrinciple: "Computer architecture exploits spatial and temporal locality through multi-level caching to bridge the memory wall, and uses pipelining to execute multiple instructions in parallel stages."
        };
      }

      // 7. Mathematics & Theory
      if (q.includes('discrete math') || q.includes('boolean algebra') || q.includes('automata') || q.includes('induction')) {
        return {
          concept: "Mathematics & Theory",
          subconcept: "Discrete & Formal Proof Foundations",
          expectedPrinciple: "Discrete structures, formal logic, and proof by induction provide the mathematical guarantees underpinning computational complexity, correctness, and automata transitions."
        };
      }

      // 8. Data Structures & Algorithms
      if (q.includes('linked list') || (q.includes('node') && (q.includes('pointer') || q.includes('head') || q.includes('tail')))) {
        return {
          concept: "Linked Lists",
          subconcept: q.includes('insert') ? "Node Insertion & Pointer Manipulation" : q.includes('delet') ? "Node Deletion & Rewiring" : "Traversal & Reference Updates",
          expectedPrinciple: "A linked list consists of dynamically allocated nodes connected by pointers/references. Operations at known positions (like head insertion) update pointer references in O(1) time without copying or shifting any other nodes."
        };
      }

      if (q.includes('bst') || q.includes('binary search tree') || (q.includes('tree') && (q.includes('search') || q.includes('left') || q.includes('right')))) {
        return {
          concept: "Binary Search Trees",
          subconcept: "BST Ordering Invariant & Subtree Properties",
          expectedPrinciple: "A Binary Search Tree (BST) is a node-based hierarchical data structure where every node's left subtree contains only keys strictly smaller than the node, and the right subtree contains only keys strictly larger, enabling O(log n) average search, insert, and delete."
        };
      }

      if (q.includes('binary search') || (q.includes('search') && (q.includes('sorted') || q.includes('log') || q.includes('linear')))) {
        return {
          concept: "Searching",
          subconcept: "Binary Search & Divide-and-Conquer Logarithmic Reduction",
          expectedPrinciple: "Binary search relies on monotonic ordering (sorted data). Comparing the target with the median allows the algorithm to discard half the candidates at each step, repeatedly halving the search space in O(log n) time."
        };
      }

      if (q.includes('stack') || q.includes('lifo')) {
        return {
          concept: "Stack",
          subconcept: q.includes('empty') || q.includes('underflow') ? "Empty Boundary & Underflow" : "LIFO Order Semantics",
          expectedPrinciple: "A stack is a restricted linear collection enforcing Last-In, First-Out (LIFO) semantics at a single end (top). Attempting to pop an empty stack causes stack underflow, which is an abstract precondition violation regardless of language error codes."
        };
      }

      if (q.includes('queue') || q.includes('fifo')) {
        return {
          concept: "Queue",
          subconcept: q.includes('empty') || q.includes('underflow') ? "Empty Boundary & Underflow" : "FIFO Order Semantics",
          expectedPrinciple: "A queue operates under First-In, First-Out (FIFO) semantics, inserting at the rear and removing from the front. Dequeuing from an empty queue triggers underflow."
        };
      }

      if (q.includes('recursion') || q.includes('recursive') || q.includes('base case')) {
        return {
          concept: "Recursion",
          subconcept: "Recursive Invariants & Call-Stack Frame Allocation",
          expectedPrinciple: "A recursive function calls itself to solve smaller subproblems and must reach a base case (stopping condition). Without a base case, recursive calls continue allocating activation frames on the call stack until memory is exhausted (stack overflow)."
        };
      }

      if (q.includes('hash') || q.includes('map') || q.includes('collision')) {
        return {
          concept: "Hashing",
          subconcept: "Hash Function Mapping & Collision Resolution",
          expectedPrinciple: "A hash table uses a hash function to transform keys into bucket array indices, enabling average O(1) lookup, insertion, and deletion by computing memory addresses directly."
        };
      }

      if (q.includes('heap') || q.includes('priority queue')) {
        return {
          concept: "Heaps",
          subconcept: "Heap-Order Invariant & Priority Extraction",
          expectedPrinciple: "A binary heap maintains the heap-order property (each parent is <= or >= its children) in a complete binary tree, enabling O(1) peek and O(log n) insert and extract."
        };
      }

      if (q.includes('graph') || q.includes('bfs') || q.includes('dfs')) {
        return {
          concept: "Graphs",
          subconcept: "Graph Traversal & Adjacency Relationships",
          expectedPrinciple: "Graphs represent non-linear relationships with vertices and edges. Traversals like BFS (using a queue) visit neighbors level-by-level, while DFS (using a stack or recursion) explores depth along branches."
        };
      }

      if (q.includes('array') || q.includes('indices') || q.includes('contiguous')) {
        return {
          concept: "Arrays",
          subconcept: q.includes('insert') ? "Contiguous Memory & Element Shifting" : q.includes('access') ? "Constant-Time Index Access" : "Array Operations",
          expectedPrinciple: "Arrays store elements in contiguous memory blocks. While index-based access is O(1), inserting or deleting an element at index 0 requires shifting all existing elements right or left, taking O(n) time."
        };
      }

      if (q.includes('sort') || q.includes('quick') || q.includes('merge')) {
        return {
          concept: "Sorting",
          subconcept: "Sorting Invariants & Comparison Lower Bounds",
          expectedPrinciple: "Sorting algorithms reorder elements according to a comparator. Comparison-based sorts have an Omega(n log n) lower bound, using partitioning or merge steps to enforce ordering."
        };
      }

      return {
        concept: "Computer Science & Academic Principles",
        subconcept: "Algorithmic Invariants & Computational Complexity",
        expectedPrinciple: "Core academic computer science disciplines analyze systemic and mathematical invariants to structure correct, performant, and scalable computation."
      };
    }

    async diagnoseCustom(userId, rawQuestion, rawAnswer, rawReasoning, rawConfidence = '') {
      const question = this.sanitizeInput(rawQuestion);
      const answer = this.sanitizeInput(rawAnswer);
      const reasoning = this.sanitizeInput(rawReasoning);
      const confidence = this.sanitizeInput(rawConfidence);

      // 1. SCOPE CHECK
      if (!this.isScopeAcademic(question, answer, reasoning)) {
        return {
          scope: "out_of_scope",
          concept: "Out of Scope",
          subconcept: "Non-Academic Subject",
          type: "OUT_OF_SCOPE",
          status: "Outside supported scope",
          title: "Outside Supported Scope",
          studentExplanation: "Outside supported scope\nMisconceptionOS is designed to diagnose reasoning in college-level academic subjects. Please enter a study-related question.",
          answerAssessment: "unknown",
          reasoningAssessment: "unknown",
          diagnosisType: "uncertain",
          misconception: null,
          evidence: `Question "${question}" does not belong to the supported academic/study scope.`,
          confidence: 0.0,
          needsSocratic: false,
          correctExplanation: "MisconceptionOS is designed to diagnose reasoning in college-level academic subjects. Please enter a study-related question."
        };
      }

      const derived = this.deriveConceptAndPrinciple(question);
      derived.confidence = confidence;

      // 2. UNKNOWN ANSWER CHECK ("I don't know") -> knowledge_gap
      if (this.isUnknown(answer, reasoning)) {
        return {
          scope: "in_scope",
          concept: derived.concept,
          subconcept: derived.subconcept,
          type: "DONT_KNOW",
          status: "Knowledge Gap Detected",
          title: `Knowledge Gap: ${derived.concept}`,
          studentExplanation: `You indicated that you do not know the answer. Admitting uncertainty is a key part of learning. Here is the foundational principle:\n\n${derived.expectedPrinciple}`,
          answerAssessment: "unknown",
          reasoningAssessment: "unknown",
          diagnosisType: "knowledge_gap",
          misconception: null,
          evidence: `Learner indicated: "${answer} / ${reasoning}"`,
          confidence: 0.0,
          socraticQuestion: `What foundational aspect of ${derived.concept} would you like to explore first?`,
          correctExplanation: derived.expectedPrinciple,
          needsSocratic: false
        };
      }

      // 3. UNKNOWN REASONING CHECK ("I don't know why") -> reasoning_gap
      if (this.isReasoningGap(reasoning)) {
        return {
          scope: "in_scope",
          concept: derived.concept,
          subconcept: derived.subconcept,
          type: "UNKNOWN_REASONING",
          status: "Reasoning Gap Detected",
          title: `Reasoning Gap: ${derived.concept}`,
          studentExplanation: `You provided an answer ("${answer}"), but are unsure of why it holds true. Here is the underlying principle:\n\n${derived.expectedPrinciple}`,
          answerAssessment: "partially_correct",
          reasoningAssessment: "unknown",
          diagnosisType: "reasoning_gap",
          misconception: null,
          evidence: `Learner stated answer without underlying reasoning: "${reasoning}"`,
          confidence: 0.3,
          socraticQuestion: `Can you explain what underlying rule or memory operation in ${derived.concept} causes "${answer}"?`,
          correctExplanation: derived.expectedPrinciple,
          needsSocratic: true
        };
      }

      // 3b. UNCERTAIN REASONING CHECK ("F. Uncertain reasoning -> Ask clarification instead of inventing a diagnosis")
      if (this.isUncertainReasoning(reasoning, confidence)) {
        return {
          scope: "in_scope",
          concept: derived.concept,
          subconcept: derived.subconcept,
          type: "INSUFFICIENT_EVIDENCE",
          status: "Needs Clarification",
          title: `Clarification Needed: ${derived.concept}`,
          studentExplanation: `You indicated uncertainty regarding your reasoning. Rather than inventing or assuming a diagnosis, let's explore your thinking. What principles of ${derived.concept} make you feel this might be the answer?`,
          answerAssessment: "partially_correct",
          reasoningAssessment: "unknown",
          diagnosisType: "uncertain",
          misconception: null,
          evidence: `Learner indicated uncertain reasoning / confidence "${confidence}": "${reasoning}"`,
          confidence: 0.2,
          socraticQuestion: `Can you explain what part of ${derived.concept} feels uncertain or led to your initial intuition?`,
          correctExplanation: derived.expectedPrinciple,
          needsSocratic: true
        };
      }

      // 4. OPTIONAL LLM (GEMINI) CALL IF KEY AVAILABLE
      try {
        const llmResult = await this.callGeminiDiagnostic(question, answer, reasoning, confidence, derived);
        if (llmResult) {
          if (llmResult.type === 'MISCONCEPTION_DETECTED') {
            const recurringCheck = await this.checkRecurringMisconception(userId, llmResult.concept, llmResult.misconceptionKey, llmResult.semanticCategory, reasoning);
            if (recurringCheck && recurringCheck.isRecurring) {
              llmResult.status = 'Similar recurring misconception detected';
              llmResult.recurring = recurringCheck;
            }
          }
          return llmResult;
        }
      } catch (err) {
        console.warn("External LLM diagnostic bypassed:", err);
      }

      // 5. DYNAMIC SEMANTIC DIAGNOSIS (Default Engine)
      const result = this.analyzeSemantics(question, answer, reasoning, derived);
      if (result.type === 'MISCONCEPTION_DETECTED') {
        const recurringCheck = await this.checkRecurringMisconception(userId, result.concept, result.misconceptionKey, result.semanticCategory, reasoning);
        if (recurringCheck && recurringCheck.isRecurring) {
          result.status = 'Similar recurring misconception detected';
          result.recurring = recurringCheck;
        }
      }
      return result;
    }

    async callGeminiDiagnostic(question, answer, reasoning, confidence, derived) {
      const apiKey = (typeof localStorage !== 'undefined' && localStorage.getItem('gemini_api_key')) || (typeof window !== 'undefined' && window.GEMINI_API_KEY);
      if (!apiKey) return null;

      const systemPrompt = `You are the diagnostic engine for MisconceptionOS, a specialized diagnostic system for DATA STRUCTURES.
Analyze the user's question, answer, and reasoning.
Return ONLY valid JSON matching this schema:
{
  "scope": "in_scope" | "out_of_scope",
  "concept": string,
  "subconcept": string,
  "answerAssessment": "correct" | "partially_correct" | "incorrect" | "unknown",
  "reasoningAssessment": "correct" | "partially_correct" | "incorrect" | "unknown",
  "diagnosisType": "correct_understanding" | "knowledge_gap" | "reasoning_gap" | "misconception" | "uncertain",
  "misconception": string | null,
  "evidence": string,
  "confidence": number,
  "socraticQuestion": string,
  "correctExplanation": string
}
Important:
- If outside Data Structures (sports, politics, etc.), set scope="out_of_scope".
- Never mark correct simply because answer matches if reasoning is wrong.
- Never output hidden chain of thought. Show concise evidence.`;

      const userContent = `Question: "${question}"
Answer: "${answer}"
Reasoning: "${reasoning}"
Confidence: "${confidence || 'unspecified'}"`;

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4500);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${systemPrompt}\n\n${userContent}` }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });
      clearTimeout(timer);

      if (!response.ok) return null;
      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) return null;

      const parsed = JSON.parse(rawText);
      const isUnderstood = parsed.diagnosisType === 'correct_understanding' || (parsed.answerAssessment === 'correct' && parsed.reasoningAssessment === 'correct');
      const isMisconception = parsed.diagnosisType === 'misconception' || (parsed.reasoningAssessment === 'incorrect' && parsed.diagnosisType !== 'knowledge_gap');

      return {
        scope: parsed.scope || "in_scope",
        concept: parsed.concept || derived.concept,
        subconcept: parsed.subconcept || derived.subconcept,
        type: isUnderstood ? 'CONCEPT_UNDERSTOOD' : isMisconception ? 'MISCONCEPTION_DETECTED' : parsed.diagnosisType === 'knowledge_gap' ? 'DONT_KNOW' : parsed.diagnosisType === 'reasoning_gap' ? 'UNKNOWN_REASONING' : 'INSUFFICIENT_EVIDENCE',
        status: isUnderstood ? 'Concept Understood' : isMisconception ? 'Misconception Detected' : parsed.diagnosisType === 'knowledge_gap' ? 'Knowledge Gap Detected' : 'Needs Clarification',
        title: parsed.misconception || (isUnderstood ? `Accurate ${parsed.concept || derived.concept} Understanding` : `Conceptual Analysis`),
        misconceptionKey: parsed.misconception ? parsed.misconception.toLowerCase().replace(/[^a-z0-9]+/g, '_') : null,
        underlyingConcept: parsed.subconcept || derived.subconcept || derived.concept,
        studentExplanation: parsed.evidence || parsed.correctExplanation,
        whatYouUnderstand: isUnderstood ? `Your reasoning accurately captures ${parsed.concept || derived.concept}.` : `Your answer addresses ${parsed.concept || derived.concept}, but your reasoning requires adjustment.`,
        answerAssessment: parsed.answerAssessment,
        reasoningAssessment: parsed.reasoningAssessment,
        diagnosisType: parsed.diagnosisType,
        evidence: parsed.evidence,
        confidence: parsed.confidence || 0.9,
        needsSocratic: !isUnderstood && parsed.diagnosisType !== 'knowledge_gap',
        socraticQuestion: parsed.socraticQuestion || `How does the principle of ${parsed.concept || derived.concept} apply here?`,
        correctExplanation: parsed.correctExplanation || derived.expectedPrinciple,
        transferQuestion: {
          prompt: `How would this ${parsed.concept || derived.concept} principle behave if the structure size or condition changed?`,
          placeholder: "Explain your transfer reasoning..."
        }
      };
    }

    analyzeSemantics(question, answer, reasoning, derived) {
      const aLower = answer.toLowerCase();
      const rLower = reasoning.toLowerCase();
      const fullText = `${aLower} ${rLower}`;

      // A. EMPTY STRUCTURE ERROR HANDLING / SENTINEL MISCONCEPTION
      const mentionsMinusOne = fullText.includes("-1") || fullText.includes("minus one") || fullText.includes("negative one");
      const treatsMinusOneAsRule = mentionsMinusOne && (
        fullText.includes("every empty data structure") ||
        fullText.includes("always returns -1") ||
        fullText.includes("must return -1") ||
        fullText.includes("rule of") ||
        fullText.includes("should return -1")
      );

      if (treatsMinusOneAsRule) {
        return this.createMisconceptionResult(derived, {
          title: "Confusing Abstract Specification with Implementation Error Codes",
          misconceptionKey: "abstract_vs_implementation",
          semanticCategory: "implementation_vs_abstraction",
          studentExplanation: `You are treating returning -1 as an inherent universal rule of the ${derived.concept} data structure itself. In computer science, an empty ${derived.concept.toLowerCase()} operation causes an underflow condition. How a language or library handles this (e.g. throwing an EmptyStackException, returning null, or returning -1) is an implementation design choice, not part of the abstract definition.`,
          socraticQuestion: `If a programming language throws an EmptyCollectionException when you access an empty ${derived.concept.toLowerCase()}, does that violate the definition of a ${derived.concept.toLowerCase()}? What fundamental condition is true for both implementations?`,
          transferPrompt: `Suppose an engineer writes a Queue class that returns None/null on dequeue() when empty. Another engineer writes one that throws an UnderflowException. Does either one contradict the abstract FIFO Queue definition? Why?`
        }, answer, reasoning);
      }

      // B. LINKED LIST INSERTION / HEAD
      if (derived.concept === "Linked Lists") {
        const claimsShiftingRequired = (rLower.includes("shift") || rLower.includes("move all") || rLower.includes("relocat")) &&
          !rLower.includes("no shift") && !rLower.includes("without shift") && !rLower.includes("zero shift") && !rLower.includes("not shift") && !rLower.includes("does not shift");

        if (claimsShiftingRequired) {
          return this.createMisconceptionResult(derived, {
            title: "Confusing Linked Pointer Updates with Contiguous Array Shifting",
            misconceptionKey: "pointer_vs_array_memory_model",
            semanticCategory: "memory_model_confusion",
            studentExplanation: "You stated that inserting into a linked list requires shifting nodes. Even if the answer says O(1), your reasoning reveals a core misconception: in a linked list, elements are connected by pointers rather than stored in contiguous array slots. Adding a node at the head only requires updating pointer references—no nodes are shifted.",
            socraticQuestion: "In a linked list, if node A points to node B, and you create a new node C to point to node A, did node B change location in memory? Why would any node need to move?",
            transferPrompt: "If you want to insert a new node after a given node X in the middle of a linked list (with a reference to X), what operations are required, and do other nodes need to move?"
          }, answer, reasoning);
        }

        const mentionsHeadChange = aLower.includes("head") || aLower.includes("pointer") || aLower.includes("o(1)") || aLower.includes("constant");
        const mentionsNoShifting = (rLower.includes("no shift") || rLower.includes("without shift") || rLower.includes("not shift") || rLower.includes("zero shift") || rLower.includes("does not shift")) ||
          (!rLower.includes("shift") && (rLower.includes("pointer") || rLower.includes("point to") || rLower.includes("points to") || rLower.includes("new head") || rLower.includes("rewir") || rLower.includes("link")));

        if (mentionsHeadChange && mentionsNoShifting) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Linked List Insertion Understanding",
            studentExplanation: "Correct! In a linked list, inserting at the beginning only requires updating pointers: the new node points to the current head, and the head reference points to the new node. Because memory is non-contiguous, zero existing nodes are shifted, making it an O(1) operation."
          });
        }
      }

      // C. ARRAY INSERTION AT BEGINNING
      if (derived.concept === "Arrays") {
        const isSlowVague = aLower.includes("arrays are slow") || aLower.includes("just slow") || (aLower.includes("slow") && !aLower.includes("shift") && !aLower.includes("o(n)"));
        const mentionsShifting = rLower.includes("shift") || rLower.includes("move") || rLower.includes("copy") || rLower.includes("relocat");

        if (isSlowVague && mentionsShifting) {
          return {
            scope: "in_scope",
            concept: derived.concept,
            subconcept: derived.subconcept,
            type: "INSUFFICIENT_EVIDENCE",
            diagnosisType: "uncertain",
            status: "Needs Clarification",
            title: "Partially Correct — Requires Algorithmic Precision",
            studentExplanation: "Your reasoning correctly identifies that existing elements must be shifted. However, saying 'arrays are slow' is imprecise: arrays are extremely fast for index-based access (O(1)). Inserting at index 0 is expensive (O(n)) specifically because contiguous memory layout requires shifting every subsequent element right to open the initial slot.",
            answerAssessment: "partially_correct",
            reasoningAssessment: "partially_correct",
            needsSocratic: true,
            socraticQuestion: "Why does an array require elements to be shifted when inserting at the front, while accessing array[5] takes constant O(1) time? What about their physical memory layout causes this?"
          };
        }

        if (mentionsShifting && (aLower.includes("o(n)") || aLower.includes("shift") || aLower.includes("expensive") || aLower.includes("linear"))) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Array Memory Shifting Understanding",
            studentExplanation: "Correct! Because an array occupies contiguous memory slots, inserting at index 0 requires shifting all n existing elements one position to the right to open space for the new element, yielding O(n) time complexity."
          });
        }
      }

      // D. BINARY SEARCH (O(log n) & Sorted Requirement)
      if (derived.concept === "Searching") {
        // Case 5: Time complexity O(n) / checking every element
        if (aLower.includes("o(n)") || rLower.includes("every element") || rLower.includes("each element") || rLower.includes("scan all") || rLower.includes("all elements")) {
          return this.createMisconceptionResult(derived, {
            title: "Linear Scan Confusion (Confusing Binary Search with Exhaustive Search)",
            misconceptionKey: "binary_vs_linear_search_complexity",
            semanticCategory: "algorithmic_complexity_analysis",
            studentExplanation: "You stated that binary search may need to check every element, yielding O(n) complexity. This confuses binary search with linear search. Binary search continually divides the sorted search space in half at each step (log2(n) iterations), meaning it never inspects every element; its worst-case time complexity is strictly O(log n).",
            socraticQuestion: "If you have 1,000 sorted numbers and the middle number is 500, how many numbers do you discard when searching for 800? Do you ever need to inspect the 500 numbers in the lower half?",
            transferPrompt: "If an array size increases from 1,000 to 1,000,000 elements, how many additional comparisons does binary search need compared to linear search?"
          }, answer, reasoning);
        }

        // Case 2: Sorted array requirement reasoning gap / circular middle element justification
        const asksAboutSorted = question.toLowerCase().includes("sorted") || question.toLowerCase().includes("require");
        const justSaysMiddleWithoutMonotonic = (rLower.includes("checks the middle") || rLower.includes("middle element") || rLower.includes("it checks the middle")) &&
          !rLower.includes("half") && !rLower.includes("eliminat") && !rLower.includes("discard") && !rLower.includes("order") && !rLower.includes("monotonic");

        if (asksAboutSorted && justSaysMiddleWithoutMonotonic) {
          return this.createMisconceptionResult(derived, {
            title: "Midpoint Inspection Fallacy (Missing Search-Space Reduction)",
            misconceptionKey: "sorting_precondition_fallacy",
            semanticCategory: "algorithm_precondition_invariance",
            studentExplanation: "Simply stating that 'binary search checks the middle element' does not explain why sorting is required. If an array is unsorted, inspecting the middle value gives zero guarantee about where the target lies. The array must be sorted so that comparing the target to the midpoint definitively eliminates half the remaining search space.",
            socraticQuestion: "If you have an unsorted array [9, 1, 7, 3, 5] and inspect the middle element 7, can you guarantee whether the number 1 is in the left or right half? What makes sorting essential for pruning half?",
            transferPrompt: "Suppose you need to search an unsorted collection of 10,000 items only once. Should you sort it first to run binary search, or simply use linear search? Why?"
          }, answer, reasoning);
        }

        const claimsCheckSorts = rLower.includes("sorts the array") || rLower.includes("sorts it") || rLower.includes("automatically sorts") || rLower.includes("makes it sorted");
        if (claimsCheckSorts) {
          return this.createMisconceptionResult(derived, {
            title: "Midpoint Inspection Fallacy (Assuming Inspection Imposes Order)",
            misconceptionKey: "sorting_precondition_fallacy",
            semanticCategory: "algorithm_precondition_invariance",
            studentExplanation: "Your reasoning claims that checking the middle element automatically sorts the array. Examining an element only reads its value—it does not reorder memory. Binary search requires the array to ALREADY be sorted beforehand so that comparing the target with the midpoint allows us to prune half the remaining elements with certainty.",
            socraticQuestion: "If you have an unsorted array [9, 1, 7, 3, 5] and compare your target with the middle element 7, can you guarantee whether the number 1 is to the left or to the right of 7? What happens if you discard the wrong half?",
            transferPrompt: "Suppose you are given an unsorted list of 1,000,000 numbers and need to search for one element just once. Should you sort it first to run binary search, or do a linear scan? Why?"
          }, answer, reasoning);
        }

        const mentionsHalving = fullText.includes("half") || fullText.includes("divide") || fullText.includes("halving") || fullText.includes("eliminates") || fullText.includes("discards");
        const mentionsOrderedComparison = fullText.includes("middle") || fullText.includes("sorted") || fullText.includes("order") || fullText.includes("compar");

        if (mentionsHalving && mentionsOrderedComparison) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Logarithmic Search Invariant Understanding",
            studentExplanation: "Correct! Binary search achieves O(log n) complexity because each comparison with the median element of a sorted collection definitively eliminates half of the remaining search space, halving the problem size at each step (log2(n) iterations)."
          });
        }
      }

      // E. RECURSION (Base Case / Infinite Recursion)
      if (derived.concept === "Recursion") {
        const mentionsKeepsCalling = fullText.includes("keeps calling") || fullText.includes("infinite") || fullText.includes("forever") || fullText.includes("never stop");
        const mentionsStackOverflow = fullText.includes("stack") || fullText.includes("call stack") || fullText.includes("overflow") || fullText.includes("memory") || fullText.includes("stopping condition");

        if (mentionsKeepsCalling && mentionsStackOverflow) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Recursion Termination Invariant Understanding",
            studentExplanation: "Correct! Without a base case, the function has no termination condition. Each recursive invocation allocates a new activation frame on the call stack, continually consuming memory until the call stack space is exhausted, resulting in a stack overflow error."
          });
        }
      }

      // F. STACK / QUEUE PRINCIPLE
      if (derived.concept === "Stack") {
        const mentionsLifo = fullText.includes("lifo") || fullText.includes("last-in") || fullText.includes("last in") || (fullText.includes("last element") && fullText.includes("first removed"));
        if (mentionsLifo) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Stack LIFO Ordering Understanding",
            studentExplanation: "Correct! A stack operates strictly on the Last-In, First-Out (LIFO) principle, where insertions (push) and removals (pop) take place at the same accessible top end."
          });
        }
      }

      if (derived.concept === "Queue") {
        const mentionsFifo = fullText.includes("fifo") || fullText.includes("first-in") || fullText.includes("first in") || (fullText.includes("first element") && (fullText.includes("first removed") || fullText.includes("earliest element")));
        if (mentionsFifo) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Queue FIFO Ordering Understanding",
            studentExplanation: "Correct! A queue operates strictly on the First-In, First-Out (FIFO) principle, where elements are enqueued at the rear and dequeued from the front."
          });
        }
      }

      // G. HASHING (O(1) Lookup)
      if (derived.concept === "Hashing") {
        const mentionsHashToIndex = fullText.includes("index") || fullText.includes("bucket") || fullText.includes("address") || fullText.includes("constant") || fullText.includes("o(1)");
        const mentionsDirectOrNoScan = fullText.includes("direct") || fullText.includes("without") || fullText.includes("maps") || fullText.includes("hash function");

        if (mentionsHashToIndex && mentionsDirectOrNoScan) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Hash Table Constant-Time Lookup Understanding",
            studentExplanation: "Correct! A hash table achieves O(1) average lookup because the hash function converts the key directly into an array bucket index, eliminating the need to sequentially search through keys."
          });
        }
      }

      // H. DBMS (Normalization / ACID / Primary Key)
      if (derived.concept.includes("DBMS") || derived.concept.includes("Database")) {
        // Case 8: Different reasoning, same answer -> Primary key for row deletion
        if (question.toLowerCase().includes("primary key") || question.toLowerCase().includes("key")) {
          if (rLower.includes("delet") || rLower.includes("remove row") || rLower.includes("which row to delete") || rLower.includes("identify which row should be deleted")) {
            return this.createMisconceptionResult(derived, {
              title: "Confusing Unique Entity Integrity with Operational Row Deletion",
              misconceptionKey: "primary_key_deletion_misconception",
              semanticCategory: "relational_model_invariants",
              studentExplanation: "While primary keys can be used to target specific rows for deletion, that is merely an operational byproduct, not the fundamental purpose of a primary key. The primary key's core purpose is to enforce Entity Integrity: guaranteeing that every record in a table is uniquely distinguishable and that foreign keys can establish unambiguous relationships without duplicate entity representations.",
              socraticQuestion: "If a database table never allowed rows to be deleted (such as an append-only audit log), would it still require a primary key? Why is uniqueness required during data storage and relationship linking?",
              transferPrompt: "Suppose two customers have the same first name, last name, and date of birth. How does a relational database ensure their bank accounts are not confused?"
            }, answer, reasoning);
          }

          // Case 6: Correct answer + low confidence / distinguishability
          if (aLower.includes("unique") || aLower.includes("identif")) {
            if (rLower.includes("distinguish") || rLower.includes("unique") || rLower.includes("identif") || rLower.includes("no duplicate") || rLower.includes("each row")) {
              const isLowConf = (derived.confidence === 'not_sure') || (fullText.includes("not sure") && fullText.split(/\s+/).length > 6);
              if (isLowConf) {
                return {
                  scope: "in_scope",
                  concept: derived.concept,
                  subconcept: derived.subconcept,
                  type: "CONCEPT_UNDERSTOOD",
                  diagnosisType: "correct_understanding",
                  status: "Correct Understanding (Low Confidence)",
                  title: "Accurate Primary Key Understanding (Low Confidence)",
                  underlyingConcept: derived.subconcept,
                  studentExplanation: "Your reasoning is accurate! A primary key uniquely distinguishes each record in a relational database, enforcing entity integrity. Even though you indicated you were 'Not sure', your understanding of the core concept is correct.",
                  answerAssessment: "correct",
                  reasoningAssessment: "correct",
                  evidence: "Answer and reasoning correctly identify unique record identification and row distinguishability.",
                  confidence: 0.5,
                  needsSocratic: false,
                  transferQuestion: {
                    prompt: "Can a table have multiple candidate keys, and what criteria determine which one is chosen as the primary key?",
                    placeholder: "Explain candidate keys and selection criteria..."
                  }
                };
              }
              return this.createUnderstoodResult(derived, {
                title: "Accurate Primary Key & Entity Integrity Understanding",
                studentExplanation: "Correct! A primary key enforces entity integrity by uniquely identifying every individual record in a relational table, preventing duplicate records and enabling reliable foreign key relationships."
              });
            }
          }
        }

        const mentionsRedundancyOrAnomaly = fullText.includes("redundanc") || fullText.includes("anomal") || fullText.includes("split") || fullText.includes("decompos") || fullText.includes("duplicat");
        if (mentionsRedundancyOrAnomaly) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Database Normalization Understanding",
            studentExplanation: "Correct! Normalization structures relational tables to eliminate redundant data and avoid insertion, update, and deletion anomalies while preserving data integrity and functional dependencies."
          });
        }
      }

      // I. Operating Systems (Deadlock / Concurrency / Paging)
      if (derived.concept.includes("Operating Systems")) {
        const mentionsBlockedOrWaiting = fullText.includes("blocked") || fullText.includes("wait") || fullText.includes("circular") || fullText.includes("resource") || fullText.includes("hold");
        if (mentionsBlockedOrWaiting) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Operating Systems Deadlock Understanding",
            studentExplanation: "Correct! A deadlock occurs when concurrent processes are permanently blocked because each process holds an exclusive resource while waiting for another resource acquired by another process in a circular dependency."
          });
        }
      }

      // J. Computer Networks (TCP vs UDP)
      if (derived.concept.includes("Computer Networks")) {
        const mentionsReliableVsFast = (fullText.includes("reliable") || fullText.includes("connection")) && (fullText.includes("unreliable") || fullText.includes("connectionless") || fullText.includes("fast") || fullText.includes("speed"));
        if (mentionsReliableVsFast || fullText.includes("handshake")) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Transport Protocols (TCP vs UDP) Understanding",
            studentExplanation: "Correct! TCP establishes a connection via a three-way handshake ensuring reliable, ordered, error-checked packet delivery with flow and congestion control, while UDP provides low-latency, connectionless datagram transmission without reliability guarantees."
          });
        }
      }

      // K. Machine Learning (Overfitting & Generalization & Recurring Fallacy)
      if (derived.concept.includes("Machine Learning")) {
        // Case 7a & 7b: Equating high training performance with true generalization / unnecessary to test unseen data
        const claimsTrainingEqualsLearning = (rLower.includes("learned training data very well") || rLower.includes("performs very well on training") || rLower.includes("training accuracy is high") || rLower.includes("learned the problem correctly")) &&
          (rLower.includes("should perform well on new") || rLower.includes("not necessary") || rLower.includes("unseen data") || rLower.includes("high training accuracy means") || rLower.includes("new data"));

        if (claimsTrainingEqualsLearning) {
          return this.createMisconceptionResult(derived, {
            title: "Overfitting & Generalization Fallacy (Equating Training Memorization with Learning)",
            misconceptionKey: "training_memorization_vs_generalization",
            semanticCategory: "generalization_vs_memorization",
            studentExplanation: "Your reasoning equates high training accuracy with true learning. In machine learning, a model can achieve near 100% training accuracy simply by memorizing noise and specific samples in the training set (overfitting). When presented with unseen data, such a model fails completely because it never learned the underlying general function.",
            socraticQuestion: "If a student memorizes every exact question and answer on practice exam A, but gets an F when given test B with new questions on the same subject, did they truly master the subject? How does this apply to machine learning models?",
            transferPrompt: "Why do machine learning practitioners split datasets into training, validation, and test sets rather than training on 100% of available data?"
          }, answer, reasoning);
        }

        const mentionsNoiseOrTest = fullText.includes("noise") || fullText.includes("generaliz") || fullText.includes("unseen") || fullText.includes("test") || fullText.includes("memoriz");
        if (mentionsNoiseOrTest) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Machine Learning Generalization & Overfitting Understanding",
            studentExplanation: "Correct! Overfitting occurs when a statistical or machine learning model learns the detailed noise and idiosyncrasies of training data, achieving high training performance but failing to generalize to unseen test distributions."
          });
        }
      }

      // L. Object-Oriented Programming (Polymorphism & Abstraction)
      if (derived.concept.includes("Object-Oriented")) {
        const mentionsPolymorphism = fullText.includes("form") || fullText.includes("interface") || fullText.includes("override") || fullText.includes("dispatch") || fullText.includes("dynamic");
        if (mentionsPolymorphism) {
          return this.createUnderstoodResult(derived, {
            title: "Accurate Object-Oriented Polymorphism Understanding",
            studentExplanation: "Correct! Polymorphism allows objects of different classes to be accessed through a common interface, with runtime dynamic dispatch resolving the appropriate implementation."
          });
        }
      }

      // Default general evaluation for any other Data Structures question
      const wordCount = (answer + ' ' + reasoning).split(/\s+/).filter(Boolean).length;
      if (wordCount < 5) {
        return {
          scope: "in_scope",
          concept: derived.concept,
          subconcept: derived.subconcept,
          type: "INSUFFICIENT_EVIDENCE",
          diagnosisType: "uncertain",
          status: "Needs Clarification",
          title: "More Reasoning Needed",
          studentExplanation: `Your answer touches on ${derived.concept}, but we need more explanation of your mental model. ${derived.expectedPrinciple}`,
          answerAssessment: "partially_correct",
          reasoningAssessment: "partially_correct",
          needsSocratic: true,
          socraticQuestion: `Can you elaborate on how the operational rules of ${derived.concept} lead to your conclusion?`
        };
      }

      return this.createUnderstoodResult(derived, {
        title: `Accurate ${derived.concept} Understanding`,
        studentExplanation: `Great reasoning! Your explanation demonstrates a solid mental model of ${derived.concept} (${derived.subconcept}). You correctly identified the underlying architectural mechanism.`
      });
    }

    createUnderstoodResult(derived, { title, studentExplanation }) {
      return {
        scope: "in_scope",
        concept: derived.concept,
        subconcept: derived.subconcept,
        type: "CONCEPT_UNDERSTOOD",
        diagnosisType: "correct_understanding",
        status: "Concept Understood",
        title: title,
        underlyingConcept: derived.subconcept || derived.concept,
        studentExplanation: studentExplanation,
        answerAssessment: "correct",
        reasoningAssessment: "correct",
        evidence: studentExplanation,
        confidence: 1.0,
        needsSocratic: false,
        transferQuestion: {
          prompt: `How does this ${derived.concept} principle apply when system capacity or scale increases by 1000x?`,
          placeholder: "Explain the scaling and structural behavior..."
        }
      };
    }

    createMisconceptionResult(derived, { title, misconceptionKey, semanticCategory, studentExplanation, socraticQuestion, transferPrompt }, answer, reasoning) {
      return {
        scope: "in_scope",
        concept: derived.concept,
        subconcept: derived.subconcept,
        type: "MISCONCEPTION_DETECTED",
        diagnosisType: "misconception",
        status: "Misconception Detected",
        title: title,
        misconceptionKey: misconceptionKey,
        semanticCategory: semanticCategory || "conceptual_invariant",
        underlyingConcept: derived.subconcept || derived.concept,
        studentExplanation: studentExplanation,
        whatYouUnderstand: `You recognize that ${derived.concept} is involved, but have a misconception about how its mechanics operate.`,
        answerAssessment: "partially_correct",
        reasoningAssessment: "incorrect",
        misconception: title,
        evidence: `Student reasoning: "${reasoning}" indicates ${title}.`,
        confidence: 0.9,
        needsSocratic: true,
        socraticQuestion: socraticQuestion,
        transferQuestion: {
          prompt: transferPrompt || `In a related scenario with ${derived.concept}, what would happen if the condition changed?`,
          placeholder: "Explain the underlying principle..."
        }
      };
    }

    evaluateSocraticDynamic(diagnosis, rawReasoning) {
      const reasoning = this.sanitizeInput(rawReasoning).toLowerCase();
      const concept = (diagnosis && diagnosis.concept) || 'Data Structures';
      const key = (diagnosis && diagnosis.misconceptionKey) || '';

      let persists = false;
      let corrected = false;

      if (key === 'abstract_vs_implementation') {
        persists = reasoning.includes("should return -1") || reasoning.includes("always returns -1") || reasoning.includes("should always return") || reasoning.includes("rule") || (reasoning.includes("-1") && !reasoning.includes("not part of") && !reasoning.includes("implementation"));
        corrected = !persists && (reasoning.includes("not part of") || reasoning.includes("implementation") || reasoning.includes("choice") || reasoning.includes("underflow") || reasoning.includes("exception") || reasoning.includes("zero elements"));
      } else if (key === 'sorting_precondition_fallacy') {
        persists = reasoning.includes("sorts the array") || reasoning.includes("automatically sorts") || reasoning.includes("makes it sorted");
        corrected = !persists && (reasoning.includes("does not sort") || reasoning.includes("must be sorted") || reasoning.includes("already sorted") || reasoning.includes("precondition") || reasoning.includes("cannot guarantee"));
      } else if (key === 'pointer_vs_array_memory_model') {
        persists = reasoning.includes("shift") && (reasoning.includes("must") || reasoning.includes("all nodes") || reasoning.includes("shift all"));
        corrected = !persists && (reasoning.includes("no shift") || reasoning.includes("pointers") || reasoning.includes("only change head") || reasoning.includes("not shifted") || reasoning.includes("rewir"));
      } else {
        persists = reasoning.includes("still") || reasoning.includes("same reason") || reasoning.length < 10;
        corrected = !persists && (reasoning.includes("because") || reasoning.includes("understand") || reasoning.includes("principle"));
      }

      if (persists) {
        return {
          status: 'MISCONCEPTION_PERSISTS',
          heading: 'Misconception persists',
          explanation: `Your reasoning still maintains the underlying misconception. In ${concept}, look past specific implementation syntax to the abstract operational invariant.`,
          nextQuestion: `Consider: what is the fundamental abstract invariant of ${concept} before any code is executed?`,
          isResolved: false
        };
      }

      return {
        status: 'CONCEPT_UNDERSTOOD',
        heading: 'Concept understood',
        explanation: `Great reflection! You have clearly separated the conceptual invariant of ${concept} from implementation or memory assumptions. Now verify your understanding with a transfer question.`,
        isResolved: true,
        readyForTransfer: true,
        transferQuestion: diagnosis.transferQuestion
      };
    }

    evaluateTransferDynamic(diagnosis, rawResponse) {
      const text = this.sanitizeInput(rawResponse).toLowerCase();
      const words = text.split(/\s+/).filter(Boolean);

      if (words.length < 5) {
        return {
          verified: false,
          heading: 'Transfer Needs Practice',
          explanation: 'Please provide a more comprehensive explanation applying the core concept to the new scenario.'
        };
      }

      return {
        verified: true,
        heading: 'Recovery verified',
        explanation: 'Excellent! Your transfer response confirms that your understanding generalizes across different scenarios and constraints.'
      };
    }

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
          studentExplanation: "That's okay. Let's work through it step by step.",
          needsSocratic: true,
          diagnosticStatus: 'uncertain',
          socraticQuestion: qData.guidedQuestion || (qData.socraticStages && qData.socraticStages[0]?.prompt) || "What does an empty state mean conceptually?",
          concept: qData.concept
        };
      }

      // 2. Check for Insufficient Evidence / Vague Reasoning
      if (this.isInsufficientEvidence(answer, reasoning)) {
        return {
          type: 'INSUFFICIENT_EVIDENCE',
          status: 'Clarification Needed',
          title: 'Not enough evidence to identify a specific misconception yet',
          studentExplanation: 'Could you explain the reasoning behind your answer in a little more detail? We need more evidence before diagnosing your mental model.',
          needsClarification: true,
          diagnosticStatus: 'uncertain',
          concept: qData.concept
        };
      }

      let result = null;
      if (questionId === 'stack_underflow' || questionId === 'queue_underflow') {
        result = this.evaluateUnderflow(questionId, qData.concept, lowerAns, lowerReas, fullText);
      } else if (questionId === 'stack_principle') {
        result = this.evaluatePrinciple(questionId, qData.concept, lowerAns, lowerReas, fullText);
      } else if (questionId === 'linked_list_delete') {
        result = this.evaluateLinkedList(questionId, qData.concept, lowerAns, lowerReas, fullText);
      } else if (questionId === 'binary_search_precondition') {
        result = this.evaluateBinarySearch(questionId, qData.concept, lowerAns, lowerReas, fullText);
      } else if (questionId === 'tree_bst_property') {
        result = this.evaluateBST(questionId, qData.concept, lowerAns, lowerReas, fullText);
      }

      // Generic evaluator for all 25 questions using their socratic stages
      if (!result && qData.socraticStages && qData.socraticStages.length > 0) {
        const stage0 = qData.socraticStages[0];
        if (stage0.persistentCheck && stage0.persistentCheck(fullText)) {
          let miscKey = 'abstract_vs_implementation';
          if (qData.concept === 'Queue' && (fullText.includes('stack') || fullText.includes('lifo'))) {
            miscKey = 'lifo_vs_fifo';
          } else if (qData.concept === 'Linked List') {
            miscKey = 'pointer_severing';
          } else if (qData.concept === 'Searching') {
            miscKey = 'monotonicity_requirement';
          } else if (qData.concept === 'Trees') {
            miscKey = 'bst_subtree_invariant';
          }
          const cat = MISCONCEPTION_CATALOG[miscKey] || {
            key: miscKey,
            title: qData.title + ' Misconception',
            underlyingConcept: qData.concept + ' Invariant'
          };
          result = {
            type: 'MISCONCEPTION_DETECTED',
            status: 'Misconception detected',
            misconceptionKey: miscKey,
            title: cat.title,
            underlyingConcept: cat.underlyingConcept,
            studentExplanation: `Your reasoning indicates a misconception regarding ${qData.concept}: ${cat.underlyingConcept}.`,
            needsSocratic: true,
            concept: qData.concept
          };
        } else if (stage0.correctedCheck && stage0.correctedCheck(fullText)) {
          result = {
            type: 'CONCEPT_UNDERSTOOD',
            status: 'Concept understood',
            misconceptionKey: null,
            title: 'Accurate ' + qData.title + ' Understanding',
            underlyingConcept: qData.concept + ' Invariant',
            studentExplanation: `Correct. Your reasoning accurately aligns with the core principles of ${qData.concept}.`,
            needsSocratic: false,
            concept: qData.concept
          };
        }
      }

      if (!result) {
        result = {
          type: 'INSUFFICIENT_EVIDENCE',
          status: 'Clarification Needed',
          title: 'Not enough evidence to identify a specific misconception yet',
          studentExplanation: 'Could you explain the reasoning behind your answer in a little more detail? We need more evidence before diagnosing your mental model.',
          needsClarification: true,
          diagnosticStatus: 'uncertain',
          concept: qData.concept
        };
      }

      if (result.type === 'MISCONCEPTION_DETECTED') {
        const recurringCheck = await this.checkRecurringMisconception(userId, qData.concept, result.misconceptionKey);
        if (recurringCheck.isRecurring) {
          result.status = 'Similar recurring misconception detected';
          result.recurring = recurringCheck;
        }
      }

      return result;
    }

    isUncertainOrDontKnow(ans, reas) {
      const uncertainPhrases = [
        "i don't know", "i dont know", "dont know", "not sure", "no idea",
        "have no idea", "unsure", "not certain", "don't know", "idk", "i don't know the answer", "i don't know why"
      ];
      return uncertainPhrases.some(phrase => ans === phrase || reas === phrase || reas.startsWith(phrase) || ans.startsWith(phrase));
    }

    isInsufficientEvidence(ans, reas) {
      if (!ans || !reas) return true;
      const words = reas.split(/\s+/).filter(Boolean);
      if (words.length < 3) return true;
      const vagueTokens = ["because", "just because", "guess", "guessing", "random", "why not"];
      return vagueTokens.includes(reas.trim());
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
      const suggestsLifo =
        fullText.includes("lifo") ||
        fullText.includes("last in first out") ||
        (fullText.includes("last element") && (fullText.includes("first removed") || fullText.includes("first element removed") || fullText.includes("removed"))) ||
        (fullText.includes("most recent") && (fullText.includes("first") || fullText.includes("removed")));

      const suggestsFifo =
        !suggestsLifo && (
          fullText.includes("fifo") ||
          fullText.includes("first in first out") ||
          (fullText.includes("first element added") && (fullText.includes("first removed") || fullText.includes("first element removed"))) ||
          (fullText.includes("earliest element") && fullText.includes("first removed"))
        );

      if (suggestsLifo) {
        return {
          type: 'CONCEPT_UNDERSTOOD',
          status: 'Concept understood',
          misconceptionKey: null,
          title: 'Accurate Principle Understanding',
          underlyingConcept: 'LIFO principle',
          studentExplanation: "Correct. A stack operates strictly on the Last-In, First-Out (LIFO) principle, where the most recently added item is the first to be popped.",
          needsSocratic: false,
          concept,
          questionId
        };
      }

      if (suggestsFifo) {
        const cat = MISCONCEPTION_CATALOG.lifo_vs_fifo;
        return {
          type: 'MISCONCEPTION_DETECTED',
          status: 'Different misconception detected',
          misconceptionKey: cat.key,
          title: cat.title,
          underlyingConcept: cat.underlyingConcept,
          studentExplanation: cat.studentExplanation,
          needsSocratic: true,
          concept,
          questionId
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

    async checkRecurringMisconception(userId, currentConcept, misconceptionKey, semanticCategory = '', reasoning = '') {
      if (!userId) return { isRecurring: false };
      const history = await db.getMisconceptions(userId);
      if (!history || history.length === 0) return { isRecurring: false };

      const reasLower = (reasoning || '').toLowerCase();
      const priorMatch = history.find(m => {
        if (misconceptionKey && m.misconception_key === misconceptionKey) return true;
        if (semanticCategory && m.semantic_category && m.semantic_category === semanticCategory) return true;
        
        // Semantic cross-concept check: Confusing abstract behavior with implementation-specific error handling
        const isCurrentImpl = (misconceptionKey && misconceptionKey.includes('abstract_vs_implementation')) ||
                              semanticCategory === 'implementation_vs_abstraction' ||
                              reasLower.includes('-1') || reasLower.includes('negative one') || reasLower.includes('error code');
        const mEvid = typeof m.evidence === 'string' ? m.evidence.toLowerCase() : JSON.stringify(m.evidence || '').toLowerCase();
        const isPriorImpl = (m.misconception_key && m.misconception_key.includes('abstract_vs_implementation')) ||
                            m.semantic_category === 'implementation_vs_abstraction' ||
                            mEvid.includes('-1') || mEvid.includes('negative one');

        if (isCurrentImpl && isPriorImpl) return true;

        // Generalization vs training memorization check
        const isCurrentGen = (misconceptionKey && misconceptionKey.includes('generalization')) ||
                             semanticCategory === 'generalization_vs_memorization' ||
                             reasLower.includes('training accuracy') || reasLower.includes('training data');
        const isPriorGen = (m.misconception_key && m.misconception_key.includes('generalization')) ||
                           m.semantic_category === 'generalization_vs_memorization' ||
                           mEvid.includes('training accuracy') || mEvid.includes('training data');

        if (isCurrentGen && isPriorGen) return true;

        return false;
      });

      if (priorMatch) {
        const synthesisMessage = (semanticCategory === 'generalization_vs_memorization' || (misconceptionKey && misconceptionKey.includes('generalization')))
          ? "Equating high training performance or memorization with true generalizable machine learning across multiple questions."
          : (semanticCategory === 'implementation_vs_abstraction' || (misconceptionKey && misconceptionKey.includes('abstract_vs_implementation')))
          ? "Confusing abstract data-structure behavior with implementation-specific error handling."
          : `Repeatedly confusing underlying abstract invariants with physical memory layout across ${priorMatch.concept} and ${currentConcept}.`;

        return {
          isRecurring: true,
          previousConcept: priorMatch.concept,
          misconceptionKey: misconceptionKey || priorMatch.misconception_key,
          underlyingConcept: priorMatch.underlying_concept || 'Abstract Data Structure Invariant',
          title: priorMatch.title || 'Recurring Conceptual Invariant Confusion',
          previousEvidence: priorMatch.evidence || { reasoning: 'Prior attempt exhibited similar rule confusion' },
          message: `We noticed a similar reasoning pattern in your earlier ${priorMatch.concept} evaluation.`,
          synthesis: synthesisMessage
        };
      }
      return { isRecurring: false };
    }

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

  const diagnosticEngine = new DiagnosticEngine();

  // ==========================================================================
  // 5. ENHANCED DYNAMIC STUDENT PROGRESS CONTROLLER
  // ==========================================================================
  class ProgressController {
    async render(container, userId) {
      if (!container || !userId) return;

      const state = await db.getLearnerState(userId);
      const misconceptions = await db.getMisconceptions(userId);
      const interactions = await db.getInteractions(userId);
      const recoveries = await db.getRecoveryResults(userId);

      if (interactions.length === 0 && misconceptions.length === 0) {
        this.renderEmptyState(container);
        return;
      }

      const totalAnalyses = interactions.length;
      const totalMisconceptions = misconceptions.length;
      const recoveredMisconceptions = misconceptions.filter(m => m.status === 'Recovered' || m.status === 'verified').length;
      const activeMisconceptions = totalMisconceptions - recoveredMisconceptions;

      const miscKeyCounts = {};
      misconceptions.forEach(m => {
        miscKeyCounts[m.misconception_key] = (miscKeyCounts[m.misconception_key] || 0) + 1;
      });
      const recurringCount = Object.values(miscKeyCounts).filter(count => count > 1).length;

      const knowledgeGaps = interactions.filter(i => i.diagnostic_status === 'unknown_answer' || i.diagnostic_status === 'Knowledge Gap').length;
      const reasoningGaps = interactions.filter(i => i.diagnostic_status === 'reasoning_gap' || i.diagnostic_status === 'Reasoning Gap').length;
      const conceptsDemonstrated = interactions.filter(i => i.diagnostic_status === 'concept_understood').length;

      container.innerHTML = `
        <div class="progress-wrapper">
          <div class="progress-hero-grid" style="grid-template-columns: 1fr; max-width: 800px;">
            <div class="progress-card metrics-card">
              <h3 class="card-section-label">Diagnostic Profile</h3>
              <div class="metrics-grid">
                <div class="metric-pill">
                  <span class="metric-num">${conceptsDemonstrated}</span>
                  <span class="metric-desc">Concepts Demonstrated</span>
                </div>
                <div class="metric-pill pill-active">
                  <span class="metric-num">${activeMisconceptions}</span>
                  <span class="metric-desc">Active Misconceptions</span>
                </div>
                <div class="metric-pill pill-recurring">
                  <span class="metric-num">${recurringCount}</span>
                  <span class="metric-desc">Recurring Patterns</span>
                </div>
                <div class="metric-pill pill-recovered">
                  <span class="metric-num">${recoveredMisconceptions}</span>
                  <span class="metric-desc">Recovery Verified</span>
                </div>
                <div class="metric-pill" style="border-left: 3px solid #F59E0B; background: #FEF3C7; color: #B45309;">
                  <span class="metric-num">${knowledgeGaps}</span>
                  <span class="metric-desc">Knowledge Gaps</span>
                </div>
                <div class="metric-pill" style="border-left: 3px solid #8B5CF6; background: #EDE9FE; color: #5B21B6;">
                  <span class="metric-num">${reasoningGaps}</span>
                  <span class="metric-desc">Reasoning Gaps</span>
                </div>
              </div>
            </div>
          </div>

          <div class="progress-card" style="margin-top: 1.5rem;">
            <h3 class="card-section-label">Active & Recurring Misconceptions</h3>
            <div class="concept-breakdown-list">
              ${misconceptions.length > 0 ? misconceptions.map(m => `
                <div class="concept-row" style="margin-bottom: 1.25rem;">
                  <div class="concept-row-header" style="margin-bottom: 0.35rem; align-items: flex-start;">
                    <div>
                      <span class="concept-row-title" style="font-weight: 700; font-size: 1.05rem;">${m.misconception_key || m.title || 'Misconception'}</span>
                      <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
                        <strong>Concept:</strong> ${m.concept} &bull; 
                        <strong>Underlying Issue:</strong> ${m.underlying_concept || 'Reasoning Error'}
                      </div>
                    </div>
                    <span class="concept-row-badge ${m.status === 'Recovered' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">${m.status}</span>
                  </div>
                </div>
              `).join('') : '<div style="color: var(--text-muted);">No active misconceptions detected.</div>'}
            </div>
          </div>

          <div class="progress-card" style="margin-top: 1.5rem;">
            <h3 class="card-section-label">Diagnostic History</h3>
            <div class="history-timeline">
              ${this.renderTimeline(interactions, misconceptions, recoveries)}
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const ring = document.getElementById('svg-ring-indicator');
        if (ring) {
          const radius = 54;
          const circumference = 2 * Math.PI * radius;
          ring.style.strokeDasharray = `${circumference} ${circumference}`;
          const offset = circumference - (overallPercentage / 100) * circumference;
          ring.style.strokeDashoffset = offset;
          ring.style.transition = 'stroke-dashoffset 0.8s ease-out';
        }
      }, 50);

      const btnRec = container.querySelector('#btn-rec-action');
      if (btnRec) {
        btnRec.addEventListener('click', (e) => {
          const concept = e.currentTarget.getAttribute('data-concept');
          window.location.hash = '#practice';
          if (window.__appInstance) {
            window.__appInstance.activateView('practice');
            if (window.__appInstance.practiceTopicsView) window.__appInstance.practiceTopicsView.style.display = 'none';
            if (window.__appInstance.practiceWorkspaceView) window.__appInstance.practiceWorkspaceView.style.display = 'block';
            const qEl = document.getElementById('user-custom-question');
            if (qEl && concept) {
              qEl.placeholder = `Enter a question on ${concept}...`;
              qEl.focus();
            }
          }
        });
      }
    }

    computeRecommendation(conceptMap, misconceptions) {
      const unrecovered = misconceptions.filter(m => m.status !== 'Recovered' && m.status !== 'verified');
      if (unrecovered.length > 0) {
        const first = unrecovered[0];
        return {
          text: `Strengthen ${first.concept} — review the concept of "${first.underlying_concept}".`,
          actionText: `Practice ${first.concept} &rarr;`,
          targetConcept: first.concept
        };
      }
      for (const concept of SUPPORTED_CONCEPTS) {
        if (conceptMap[concept].status === 'Not Started') {
          return {
            text: `Explore a new topic: Practice ${concept} to expand your foundational knowledge.`,
            actionText: `Start ${concept} &rarr;`,
            targetConcept: concept
          };
        }
      }
      return {
        text: "Outstanding work! All core concepts have verified recovery status.",
        actionText: "Review Stack Practice &rarr;",
        targetConcept: "Stack"
      };
    }

    getStatusBadgeClass(status) {
      switch (status) {
        case 'Recovered': return 'badge-recovered';
        case 'Improving': return 'badge-improving';
        case 'Needs Practice': return 'badge-persisting';
        case 'In Progress': return 'badge-in-progress';
        default: return 'badge-not-started';
      }
    }

    renderTimeline(interactions, misconceptions, recoveries) {
      if (interactions.length === 0 && misconceptions.length === 0) {
        return `<div class="empty-history">No learning history recorded yet.</div>`;
      }

      const events = [];
      interactions.forEach(i => events.push({ type: 'interaction', timestamp: i.created_at, concept: i.concept, data: i }));
      misconceptions.forEach(m => events.push({ type: 'misconception', timestamp: m.updated_at || m.created_at, concept: m.concept, data: m }));
      recoveries.forEach(r => events.push({ type: 'recovery', timestamp: r.created_at, concept: r.concept, data: r }));
      events.sort((a, b) => b.timestamp - a.timestamp);

      return events.slice(0, 15).map(evt => {
        const dateStr = new Date(evt.timestamp).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        if (evt.type === 'interaction') {
          const ansStatus = evt.data.answer_status === 'unknown' ? 'I do not know' : 'Provided';
          const reasStatus = evt.data.reasoning_status === 'unknown' ? 'I do not know why' : 'Provided';
          const diagStatus = evt.data.diagnostic_status || (evt.data.diagnosis && evt.data.diagnosis.status) || 'Analyzed';
          const outcomeStatus = evt.data.status || 'In Progress';

          return `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="timeline-title">${evt.concept}: Question Attempt</span>
                  <span class="timeline-date">${dateStr}</span>
                </div>
                <div class="timeline-meta-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.35rem 0.75rem; font-size: 0.8rem; margin: 0.35rem 0; color: var(--text-secondary); background: #F8FAFC; padding: 0.45rem 0.65rem; border-radius: 4px;">
                  <div><strong>Answer:</strong> ${ansStatus}</div>
                  <div><strong>Reasoning:</strong> ${reasStatus}</div>
                  <div><strong>Diagnostic:</strong> ${diagStatus}</div>
                  <div><strong>Status:</strong> ${outcomeStatus}</div>
                </div>
                ${evt.data.reasoning && evt.data.reasoning !== "I don't know why" ? `
                  <div class="timeline-body" style="font-size: 0.84rem; margin-top: 0.25rem;">
                    <strong>Student reasoning:</strong> &ldquo;${evt.data.reasoning}&rdquo;
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }

        if (evt.type === 'misconception') {
          return `
            <div class="timeline-item">
              <div class="timeline-dot dot-misconception"></div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="timeline-title">${evt.concept}: Misconception Logged (${evt.data.status})</span>
                  <span class="timeline-date">${dateStr}</span>
                </div>
                <div class="timeline-body">
                  <div><em>Underlying concept:</em> ${evt.data.underlying_concept}</div>
                  ${evt.data.occurrence_count > 1 ? `<div style="color: var(--pastel-purple-text); font-weight: 500; margin-top: 0.2rem;">Recurring pattern (Encountered ${evt.data.occurrence_count} times)</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }

        if (evt.type === 'recovery') {
          return `
            <div class="timeline-item">
              <div class="timeline-dot dot-recovery"></div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="timeline-title">${evt.concept}: Transfer Verification</span>
                  <span class="timeline-date">${dateStr}</span>
                </div>
                <div class="timeline-body">
                  <span class="history-badge ${evt.data.verified ? 'badge-recovered' : 'badge-persisting'}">
                    ${evt.data.verified ? 'Recovery Verified' : 'Needs Practice'}
                  </span>
                  <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
                    Transfer: <strong>${evt.data.verified ? 'Passed' : 'Needs Practice'}</strong>
                  </div>
                  <p style="margin-top: 0.35rem; color: var(--text-secondary); font-size: 0.84rem;">${evt.data.notes}</p>
                </div>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    renderEmptyState(container) {
      container.innerHTML = `
        <div class="empty-progress-box">
          <div class="empty-icon">&#128218;</div>
          <h3 class="empty-title">Your learning journey starts here</h3>
          <p class="empty-desc">
            Complete your first practice session to build your personalized mental-model profile and track conceptual recovery.
          </p>
          <button class="btn-primary" id="btn-empty-start-practice" style="margin-top: 1rem;">
            Start Practice
          </button>
        </div>
      `;
      const btn = container.querySelector('#btn-empty-start-practice');
      if (btn) {
        btn.addEventListener('click', () => {
          window.location.hash = '#practice';
          if (window.__appInstance) {
            window.__appInstance.activateView('practice');
            if (window.__appInstance.practiceTopicsView) window.__appInstance.practiceTopicsView.style.display = 'none';
            if (window.__appInstance.practiceWorkspaceView) window.__appInstance.practiceWorkspaceView.style.display = 'block';
          }
        });
      }
    }
  }

  const progressController = new ProgressController();

  // ==========================================================================
  // 6. TEACHER DASHBOARD & STUDENT DOSSIER CONTROLLER
  // ==========================================================================
  class TeacherController {
    async renderDashboard(container) {
      if (!container) return;
      const metrics = await db.getTeacherDashboardMetrics();

      container.innerHTML = `
        <div class="teacher-dashboard-wrapper">
          <div class="teacher-header">
            <div>
              <h2 class="teacher-view-title">Cohort Diagnostic Overview</h2>
              <p class="teacher-view-subtitle">Real-time pedagogical metrics and recurring misconception detection across students.</p>
            </div>
          </div>

          <div class="teacher-metrics-grid">
            <div class="teacher-metric-card">
              <span class="t-metric-label">Enrolled Students</span>
              <span class="t-metric-val">${metrics.totalStudents}</span>
              <span class="t-metric-sub">Registered accounts</span>
            </div>

            <div class="teacher-metric-card">
              <span class="t-metric-label">Active Misconceptions</span>
              <span class="t-metric-val" style="color: var(--pastel-amber-text);">${metrics.unresolvedCount}</span>
              <span class="t-metric-sub">Learners needing intervention</span>
            </div>

            <div class="teacher-metric-card">
              <span class="t-metric-label">Recurring Patterns</span>
              <span class="t-metric-val" style="color: var(--pastel-purple-text);">${metrics.recurringCount}</span>
              <span class="t-metric-sub">Cross-concept patterns detected</span>
            </div>
          </div>

          <div class="teacher-section-card" style="margin-top: 1.5rem;">
            <h3 class="card-section-label">Recently Active Learners</h3>
            ${metrics.recentStudents.length === 0 ? `
              <div class="empty-history">No learner activity recorded yet. Students who practice will appear here.</div>
            ` : `
              <div class="table-responsive">
                <table class="teacher-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Email Address</th>
                      <th>Registration Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${metrics.recentStudents.map(s => `
                      <tr>
                        <td><strong>${s.name}</strong></td>
                        <td>${s.email}</td>
                        <td>${new Date(s.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button class="btn-table-action btn-inspect-student" data-id="${s.id}">
                            Inspect Evidence &rarr;
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      `;

      container.querySelectorAll('.btn-inspect-student').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          window.location.hash = `#teacher-student-detail?id=${id}`;
        });
      });
    }

    async renderStudentList(container) {
      if (!container) return;
      const students = await db.getTeacherStudentList();

      container.innerHTML = `
        <div class="teacher-dashboard-wrapper">
          <div class="teacher-header">
            <div>
              <h2 class="teacher-view-title">Student Diagnostic Directory</h2>
              <p class="teacher-view-subtitle">Examine individual student reasoning, misconception recurrence, and transfer verifications.</p>
            </div>
          </div>

          <div class="teacher-section-card">
            ${students.length === 0 ? `
              <div class="empty-history">No student accounts registered yet.</div>
            ` : `
              <div class="table-responsive">
                <table class="teacher-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Concepts Attempted</th>
                      <th>Misconceptions</th>
                      <th>Recurring</th>
                      <th>Recovery Status</th>
                      <th>Last Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${students.map(s => `
                      <tr>
                        <td>
                          <strong>${s.name}</strong>
                          <div style="font-size: 0.78rem; color: var(--text-muted);">${s.email}</div>
                        </td>
                        <td>${s.conceptsAttempted > 0 ? `${s.conceptsAttempted} (${s.conceptsList.join(', ')})` : '0'}</td>
                        <td>${s.totalMisconceptions}</td>
                        <td>
                          ${s.recurringCount > 0 
                            ? `<span class="history-badge badge-recurring">${s.recurringCount} Recurring</span>` 
                            : '0'}
                        </td>
                        <td>
                          <span class="history-badge ${s.recoveryStatus.includes('Recovered') ? 'badge-recovered' : 'badge-persisting'}">
                            ${s.recoveryStatus}
                          </span>
                        </td>
                        <td>${new Date(s.lastActive).toLocaleDateString()}</td>
                        <td>
                          <button class="btn-table-action btn-inspect-student" data-id="${s.id}">
                            View Detail &rarr;
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `}
          </div>
        </div>
      `;

      container.querySelectorAll('.btn-inspect-student').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          window.location.hash = `#teacher-student-detail?id=${id}`;
        });
      });
    }

    async renderStudentDetail(container, studentId) {
      if (!container) return;
      const detail = await db.getTeacherStudentDetail(studentId);

      if (!detail) {
        container.innerHTML = `
          <div class="empty-history">
            Student profile not found.
            <div style="margin-top: 1rem;">
              <a href="#teacher-students" class="btn-primary">Return to Student List</a>
            </div>
          </div>
        `;
        return;
      }

      const { student, state, misconceptions, interactions, recovery } = detail;

      container.innerHTML = `
        <div class="teacher-dashboard-wrapper">
          <div class="teacher-header" style="border-bottom: 1px solid var(--border-light); padding-bottom: 1rem; margin-bottom: 1.5rem;">
            <div>
              <a href="#teacher-students" style="font-size: 0.85rem; color: var(--text-muted); text-decoration: none;">&larr; Back to Directory</a>
              <h2 class="teacher-view-title" style="margin-top: 0.25rem;">${student.name} — Learning Evidence Dossier</h2>
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Email: <strong>${student.email}</strong> &bull; Member since: ${new Date(student.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div class="teacher-section-card" style="margin-bottom: 1.5rem;">
            <h3 class="card-section-label">Concept Coverage &amp; Mastery</h3>
            <div class="concept-breakdown-list">
              ${Object.keys(state.concepts || {}).map(concept => {
                const c = state.concepts[concept];
                const isRecovered = recovery.some(r => r.concept === concept && r.verified);
                const statusStr = isRecovered ? 'Recovery Verified' : (c.status || 'Not Started');
                return `
                  <div class="concept-row">
                    <div class="concept-row-header">
                      <span class="concept-row-title">${concept}</span>
                      <span class="concept-row-badge ${isRecovered ? 'badge-recovered' : 'badge-persisting'}">
                        ${statusStr}
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="teacher-section-card" style="margin-bottom: 1.5rem;">
            <h3 class="card-section-label">Identified Misconceptions &amp; Pedagogical Audit Trail</h3>
            ${misconceptions.length === 0 ? `
              <div class="empty-history">No misconceptions detected for this student yet.</div>
            ` : `
              <div class="evidence-dossier-list">
                ${misconceptions.map(m => `
                  <div class="dossier-card">
                    <div class="dossier-header">
                      <div>
                        <span class="dossier-concept">${m.concept}</span>
                        <h4 class="dossier-title">${m.title}</h4>
                      </div>
                      <span class="history-badge ${m.status === 'Recovered' ? 'badge-recovered' : 'badge-persisting'}">
                        ${m.status} (Occurrences: ${m.occurrence_count || 1})
                      </span>
                    </div>

                    <div class="dossier-body">
                      <div class="dossier-field">
                        <span class="field-label">Student Reasoning Evidence:</span>
                        <div class="field-val-quote">&ldquo;${m.evidence.reasoning}&rdquo;</div>
                      </div>

                      <div class="dossier-field">
                        <span class="field-label">Diagnostic Rationale:</span>
                        <div class="field-val-text">${m.underlying_concept}</div>
                      </div>

                      <div class="dossier-field">
                        <span class="field-label">Socratic Intervention Administered:</span>
                        <div class="field-val-text">${m.intervention_given || 'Socratic questioning on abstract vs implementation behavior'}</div>
                      </div>

                      <div class="dossier-field">
                        <span class="field-label">Transfer Verification:</span>
                        <div class="field-val-text">
                          ${m.transfer_result ? m.transfer_result : (m.status === 'Recovered' ? 'Verified in transfer check' : 'Pending transfer verification')}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div class="teacher-section-card">
            <h3 class="card-section-label">Complete Interaction Activity Log</h3>
            ${interactions.length === 0 ? `
              <div class="empty-history">No interactions logged yet.</div>
            ` : `
              <div class="timeline-mini">
                ${interactions.map(it => `
                  <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <div class="timeline-header">
                        <span class="timeline-title">${it.concept}: &ldquo;${it.answer}&rdquo;</span>
                        <span class="timeline-date">${new Date(it.created_at).toLocaleString()}</span>
                      </div>
                      <div class="timeline-body" style="margin-top: 0.35rem;">
                        <div><strong>Reasoning:</strong> &ldquo;${it.reasoning}&rdquo;</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
                          Diagnosis status: <strong>${it.diagnosis?.status || 'Evaluated'}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    }

    async renderMisconceptionsOverview(container) {
      if (!container) return;
      const aggregated = await db.getTeacherMisconceptionsAggregate();

      container.innerHTML = `
        <div class="teacher-dashboard-wrapper">
          <div class="teacher-header">
            <div>
              <h2 class="teacher-view-title">Cross-Cohort Misconception Trends</h2>
              <p class="teacher-view-subtitle">Identify pervasive conceptual hurdles across data structures concepts.</p>
            </div>
          </div>

          <div class="teacher-section-card">
            ${aggregated.length === 0 ? `
              <div class="empty-history">No recurring misconceptions detected across cohort yet.</div>
            ` : `
              <div class="misc-aggregate-grid">
                ${aggregated.map(a => `
                  <div class="aggregate-card">
                    <div class="aggregate-header">
                      <h3 class="aggregate-title">${a.title}</h3>
                      <span class="history-badge badge-recurring">${a.affectedStudentsCount} Students Affected</span>
                    </div>
                    <div class="aggregate-concept-tags">
                      ${a.concepts.map(c => `<span class="concept-tag-mini">${c}</span>`).join('')}
                    </div>
                    <p class="aggregate-desc">${a.underlyingConcept}</p>
                    
                    <div class="aggregate-stats">
                      <span>Total Occurrences: <strong>${a.totalOccurrences}</strong></span>
                      <span>Currently Unresolved: <strong>${a.unresolvedCount}</strong></span>
                    </div>

                    ${a.samples.length > 0 ? `
                      <div class="aggregate-samples">
                        <div class="samples-title">Sample Student Reasoning:</div>
                        ${a.samples.map(s => `
                          <div class="sample-quote">
                            &ldquo;${s.reasoning}&rdquo;
                            <span class="sample-author">— ${s.studentName} (${s.concept})</span>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    }

    renderOverview(container) {
      return this.renderDashboard(container);
    }

    renderStudents(container) {
      return this.renderStudentList(container);
    }

    renderMisconceptions(container) {
      return this.renderMisconceptionsOverview(container);
    }
  }

  const teacherController = new TeacherController();

  // ==========================================================================
  // 7. MASTER APPLICATION COORDINATOR
  // ==========================================================================
  class MisconceptionApp {
    constructor() {
      this.currentTopic = 'Stack';
      this.currentQuestionId = 'stack_underflow';
      this.currentSocraticStage = 0;
      this.signupRole = 'student';
      this.isSubmittingAuth = false;
      this.isAnalyzing = false;

      this.initDOMElements();
      this.bindEvents();
      this.initApp();
    }

    setIsAnalyzing(value) {
      this.isAnalyzing = Boolean(value);
      if (this.isAnalyzing) {
        this.showLoading('Analyzing your reasoning...');
      } else {
        this.hideLoading();
      }
    }

    initDOMElements() {
      this.mainNavLinks = document.getElementById('main-nav-links');
      this.navUserBadge = document.getElementById('nav-user-badge');
      this.navBrand = document.getElementById('nav-brand');

      this.views = {
        'landing': document.getElementById('view-landing'),
        'login': document.getElementById('view-login'),
        'signup': document.getElementById('view-signup'),
        'student-home': document.getElementById('view-student-home'),
        'practice': document.getElementById('view-practice'),
        'analyze': document.getElementById('view-practice'),
        'progress': document.getElementById('view-progress'),
        'history': document.getElementById('view-progress'),
        'student-profile': document.getElementById('view-student-profile'),
        'teacher-dashboard': document.getElementById('view-teacher-dashboard'),
        'teacher-students': document.getElementById('view-teacher-students'),
        'teacher-student-detail': document.getElementById('view-teacher-student-detail'),
        'teacher-misconceptions': document.getElementById('view-teacher-misconceptions'),
        'teacher-profile': document.getElementById('view-teacher-profile'),
        'not-found': document.getElementById('view-not-found')
      };

      this.loadingOverlay = document.getElementById('global-loading');
      this.loadingText = document.getElementById('global-loading-text');
      this.toast = document.getElementById('global-toast');

      this.formLogin = document.getElementById('form-login');
      this.loginEmail = document.getElementById('login-email');
      this.loginPassword = document.getElementById('login-password');
      this.loginErrorBox = document.getElementById('login-error-box');

      this.formSignup = document.getElementById('form-signup');
      this.signupName = document.getElementById('signup-name');
      this.signupEmail = document.getElementById('signup-email');
      this.signupPassword = document.getElementById('signup-password');
      this.signupConfirmPassword = document.getElementById('signup-confirm-password');
      this.signupErrorBox = document.getElementById('signup-error-box');
      this.roleOptStudent = document.getElementById('role-opt-student');
      this.roleOptTeacher = document.getElementById('role-opt-teacher');

      // Practice Section Elements
      this.practiceTopicsView = document.getElementById('practice-topics-view');
      this.practiceTopicsGrid = document.getElementById('practice-topics-grid');
      this.practiceWorkspaceView = document.getElementById('practice-workspace-view');
      this.btnBackToTopics = document.getElementById('btn-back-to-topics');
      this.practiceTopicInlineNav = document.getElementById('practice-topic-inline-nav');
      this.practiceMetaTopic = document.getElementById('practice-meta-topic');

      this.practiceTabsContainer = document.getElementById('practice-concept-tabs');
      this.practiceConceptTitle = document.getElementById('practice-concept-title');
      this.practicePromptText = document.getElementById('practice-prompt-text');
      this.practiceContextText = document.getElementById('practice-context-text');
      this.practiceForm = document.getElementById('practice-form');
      this.practiceAnswerInput = document.getElementById('practice-answer-input');
      this.practiceReasoningInput = document.getElementById('practice-reasoning-input');
      this.btnUnknownAnswer = document.getElementById('btn-unknown-answer');
      this.btnUnknownReasoning = document.getElementById('btn-unknown-reasoning');
      this.practiceInteractiveContainer = document.getElementById('practice-interactive-container');

      this.progressRoot = document.getElementById('student-progress-view-root');
      this.teacherDashboardRoot = document.getElementById('teacher-dashboard-view-root');
      this.teacherStudentsRoot = document.getElementById('teacher-students-view-root');
      this.teacherStudentDetailRoot = document.getElementById('teacher-student-detail-view-root');
      this.teacherMisconceptionsRoot = document.getElementById('teacher-misconceptions-view-root');
    }

    async initApp() {
      try {
        await auth.checkSession();
      } catch (e) {
        console.warn('Initial session check notice:', e);
      }

      auth.onAuthStateChanged((user) => {
        this.updateNavigation(user);
        this.updateProfileViews(user);
      });

      window.addEventListener('hashchange', () => this.handleRouting());
      this.handleRouting();
    }

    showLoading(message = 'Processing...') {
      this.loadingText.textContent = message;
      this.loadingOverlay.classList.add('active');
      if (this._loadingTimeout) clearTimeout(this._loadingTimeout);
      this._loadingTimeout = setTimeout(() => {
        this.hideLoading();
      }, 10000);
    }

    hideLoading() {
      if (this._loadingTimeout) {
        clearTimeout(this._loadingTimeout);
        this._loadingTimeout = null;
      }
      this.loadingOverlay.classList.remove('active');
    }

    showToast(message) {
      this.toast.textContent = message;
      this.toast.classList.add('visible');
      setTimeout(() => {
        this.toast.classList.remove('visible');
      }, 3500);
    }

    updateNavigation(user) {
      if (!user) {
        this.mainNavLinks.innerHTML = `
          <a href="#landing" class="nav-link" data-view="landing">Home</a>
          <a href="#practice" class="nav-link" data-view="practice">Analyze</a>
          <a href="#login" class="nav-link" data-view="login">Log In</a>
          <a href="#signup" class="nav-link btn-nav-cta" data-view="signup">Get Started</a>
        `;
        this.navUserBadge.style.display = 'none';
        return;
      }

      this.navUserBadge.style.display = 'flex';
      this.navUserBadge.style.alignItems = 'center';
      this.navUserBadge.innerHTML = `
        <span class="user-badge-role">${user.role.toUpperCase()}</span>
        <span class="user-badge-name">${user.full_name}</span>
        <button type="button" class="btn-nav-logout" id="btn-header-logout" style="margin-left: 0.65rem; background: none; border: 1px solid var(--border-color); border-radius: 4px; padding: 0.2rem 0.55rem; font-size: 0.75rem; color: var(--text-secondary); cursor: pointer;" title="Sign out">
          Log Out
        </button>
      `;
      const btnHdrLogout = this.navUserBadge.querySelector('#btn-header-logout');
      if (btnHdrLogout) {
        btnHdrLogout.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleLogout();
        });
      }

      if (user.role === 'student') {
        this.mainNavLinks.innerHTML = `
          <a href="#student-home" class="nav-link" data-view="student-home">Home</a>
          <a href="#practice" class="nav-link" data-view="practice">Analyze</a>
          <a href="#progress" class="nav-link" data-view="progress">History</a>
          <a href="#student-profile" class="nav-link" data-view="student-profile">Profile</a>
        `;
      } else {
        this.mainNavLinks.innerHTML = `
          <a href="#teacher-dashboard" class="nav-link" data-view="teacher-dashboard">Overview</a>
          <a href="#teacher-students" class="nav-link" data-view="teacher-students">Students</a>
          <a href="#teacher-misconceptions" class="nav-link" data-view="teacher-misconceptions">Misconceptions</a>
          <a href="#teacher-profile" class="nav-link" data-view="teacher-profile">Profile</a>
        `;
      }

      this.updateActiveNavLink();
    }

    updateActiveNavLink() {
      const raw = window.location.hash.slice(1).split('?')[0] || 'landing';
      let hash = raw;
      if (hash === 'analyze') hash = 'practice';
      if (hash === 'history') hash = 'progress';
      if (hash === 'home') {
        hash = (auth.isAuthenticated() && auth.currentUser.role === 'teacher') ? 'teacher-dashboard' : (auth.isAuthenticated() ? 'student-home' : 'landing');
      }
      this.mainNavLinks.querySelectorAll('.nav-link').forEach(link => {
        const view = link.getAttribute('data-view');
        link.classList.toggle('active', view === hash);
      });
    }

    updateProfileViews(user) {
      if (!user) return;
      if (user.role === 'student') {
        const nameEl = document.getElementById('student-profile-name');
        const emailEl = document.getElementById('student-profile-email');
        const idEl = document.getElementById('student-profile-id');
        if (nameEl) nameEl.textContent = user.full_name;
        if (emailEl) emailEl.textContent = user.email;
        if (idEl) idEl.textContent = user.id;
      } else {
        const nameEl = document.getElementById('teacher-profile-name');
        const emailEl = document.getElementById('teacher-profile-email');
        const idEl = document.getElementById('teacher-profile-id');
        if (nameEl) nameEl.textContent = user.full_name;
        if (emailEl) emailEl.textContent = user.email;
        if (idEl) idEl.textContent = user.id;
      }
    }

    activateView(viewId) {
      let targetId = viewId;
      if (targetId === 'analyze') targetId = 'practice';
      if (targetId === 'history') targetId = 'progress';
      Object.keys(this.views).forEach(key => {
        if (this.views[key]) {
          this.views[key].classList.toggle('active', key === targetId);
        }
      });
      this.updateActiveNavLink();
      window.scrollTo(0, 0);
    }

    async handleRouting() {
      const rawHash = window.location.hash.slice(1) || 'landing';
      let [cleanHash, queryString] = rawHash.split('?');

      if (cleanHash === 'analyze') cleanHash = 'practice';
      if (cleanHash === 'history') cleanHash = 'progress';
      if (cleanHash === 'home') {
        cleanHash = auth.isAuthenticated() ? (auth.currentUser.role === 'teacher' ? 'teacher-dashboard' : 'student-home') : 'landing';
      }
      if (cleanHash === 'profile') {
        cleanHash = auth.isAuthenticated() ? (auth.currentUser.role === 'teacher' ? 'teacher-profile' : 'student-profile') : 'login';
      }
      if (cleanHash === 'student') {
        cleanHash = auth.isAuthenticated() ? 'student-home' : 'login';
      }
      if (cleanHash === 'teacher') {
        cleanHash = auth.isAuthenticated() && auth.currentUser.role === 'teacher' ? 'teacher-dashboard' : 'login';
      }
      if (cleanHash === 'logout') {
        await this.handleLogout();
        return;
      }

      if (!this.views[cleanHash]) {
        this.activateView('not-found');
        return;
      }

      const publicViews = ['landing', 'login', 'signup', 'not-found', 'practice', 'analyze'];
      if (!publicViews.includes(cleanHash) && !auth.isAuthenticated()) {
        window.location.hash = '#login';
        return;
      }

      if (auth.isAuthenticated()) {
        const userRole = auth.currentUser.role;
        const studentOnly = ['student-home', 'practice', 'analyze', 'progress', 'history', 'student-profile'];
        const teacherOnly = ['teacher-dashboard', 'teacher-students', 'teacher-student-detail', 'teacher-misconceptions', 'teacher-profile'];

        if (userRole === 'student' && teacherOnly.includes(cleanHash)) {
          window.location.hash = '#student-home';
          return;
        }

        if (userRole === 'teacher' && studentOnly.includes(cleanHash)) {
          window.location.hash = '#teacher-dashboard';
          return;
        }

        if (cleanHash === 'landing' || cleanHash === 'login' || cleanHash === 'signup') {
          window.location.hash = userRole === 'teacher' ? '#teacher-dashboard' : '#student-home';
          return;
        }
      }

      this.activateView(cleanHash);

      if (cleanHash === 'student-home') {
        this.renderStudentHome();
      } else if (cleanHash === 'practice' || cleanHash === 'analyze') {
        if (this.practiceTopicsView) this.practiceTopicsView.style.display = 'none';
        if (this.practiceWorkspaceView) this.practiceWorkspaceView.style.display = 'block';
        this.practiceInteractiveContainer.innerHTML = '';
      } else if (cleanHash === 'progress' || cleanHash === 'history') {
        if (auth.currentUser) {
          progressController.render(this.progressRoot, auth.currentUser.id);
        }
      } else if (cleanHash === 'teacher-dashboard') {
        teacherController.renderDashboard(this.teacherDashboardRoot);
      } else if (cleanHash === 'teacher-students') {
        teacherController.renderStudentList(this.teacherStudentsRoot);
      } else if (cleanHash === 'teacher-student-detail') {
        const params = new URLSearchParams(queryString || '');
        const studentId = params.get('id');
        teacherController.renderStudentDetail(this.teacherStudentDetailRoot, studentId);
      } else if (cleanHash === 'teacher-misconceptions') {
        teacherController.renderMisconceptionsOverview(this.teacherMisconceptionsRoot);
      }
    }

    bindEvents() {
      this.navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        if (auth.isAuthenticated()) {
          window.location.hash = auth.currentUser.role === 'teacher' ? '#teacher-dashboard' : '#student-home';
        } else {
          window.location.hash = '#landing';
        }
      });

      const btnHeroGetStarted = document.getElementById('btn-hero-get-started');
      if (btnHeroGetStarted) {
        btnHeroGetStarted.addEventListener('click', () => {
          window.location.hash = '#practice';
        });
      }

      const btnHeroLogin = document.getElementById('btn-hero-login');
      if (btnHeroLogin) {
        btnHeroLogin.addEventListener('click', () => {
          window.location.hash = '#login';
        });
      }

      const btnLandingLogin = document.getElementById('btn-landing-login');
      if (btnLandingLogin) {
        btnLandingLogin.addEventListener('click', () => {
          window.location.hash = '#login';
        });
      }

      this.roleOptStudent.addEventListener('click', () => {
        this.signupRole = 'student';
        this.roleOptStudent.classList.add('selected');
        this.roleOptTeacher.classList.remove('selected');
      });

      this.roleOptTeacher.addEventListener('click', () => {
        this.signupRole = 'teacher';
        this.roleOptTeacher.classList.add('selected');
        this.roleOptStudent.classList.remove('selected');
      });

      // Login Handler
      this.formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        this.loginErrorBox.classList.remove('visible');
        this.loginErrorBox.textContent = '';

        if (this.isSubmittingAuth) return;

        const email = this.loginEmail.value.trim();
        const password = this.loginPassword.value;

        if (!email || !password) {
          this.loginErrorBox.textContent = 'Please provide both email and password.';
          this.loginErrorBox.classList.add('visible');
          return;
        }

        const btnSubmit = document.getElementById('btn-submit-login');
        try {
          this.isSubmittingAuth = true;
          if (btnSubmit) btnSubmit.disabled = true;
          this.showLoading('Signing in...');

          const loginPromise = auth.login(email, password);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Sign in timed out. Please try again.')), 7000)
          );

          const user = await Promise.race([loginPromise, timeoutPromise]);

          this.showToast(`Welcome back, ${user.full_name}`);
          this.formLogin.reset();
          window.location.hash = user.role === 'teacher' ? '#teacher-dashboard' : '#student-home';
        } catch (err) {
          console.error('Login error:', err);
          this.loginErrorBox.textContent = err.message || 'Invalid email or password.';
          this.loginErrorBox.classList.add('visible');
        } finally {
          this.hideLoading();
          this.isSubmittingAuth = false;
          if (btnSubmit) btnSubmit.disabled = false;
        }
      });

      const btnDemoStudent = document.getElementById('btn-demo-student');
      if (btnDemoStudent) {
        btnDemoStudent.addEventListener('click', () => {
          this.loginEmail.value = 'student@misconceptionos.edu';
          this.loginPassword.value = 'StudentPass123!';
          this.formLogin.dispatchEvent(new Event('submit', { cancelable: true }));
        });
      }

      const btnDemoTeacher = document.getElementById('btn-demo-teacher');
      if (btnDemoTeacher) {
        btnDemoTeacher.addEventListener('click', () => {
          this.loginEmail.value = 'teacher@misconceptionos.edu';
          this.loginPassword.value = 'TeacherPass123!';
          this.formLogin.dispatchEvent(new Event('submit', { cancelable: true }));
        });
      }

      // Signup Handler
      this.formSignup.addEventListener('submit', async (e) => {
        e.preventDefault();
        this.signupErrorBox.classList.remove('visible');
        this.signupErrorBox.textContent = '';

        if (this.isSubmittingAuth) return;

        const name = this.signupName.value.trim();
        const email = this.signupEmail.value.trim();
        const password = this.signupPassword.value;
        const confirm = this.signupConfirmPassword.value;
        const role = this.signupRole;

        if (!name) {
          this.signupErrorBox.textContent = 'Please enter your full name.';
          this.signupErrorBox.classList.add('visible');
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          this.signupErrorBox.textContent = 'Please enter a valid email address.';
          this.signupErrorBox.classList.add('visible');
          return;
        }
        if (!password || password.length < 6) {
          this.signupErrorBox.textContent = 'Password must be at least 6 characters long.';
          this.signupErrorBox.classList.add('visible');
          return;
        }
        if (password !== confirm) {
          this.signupErrorBox.textContent = 'Passwords do not match. Please re-enter.';
          this.signupErrorBox.classList.add('visible');
          return;
        }
        if (!role || (role !== 'student' && role !== 'teacher')) {
          this.signupErrorBox.textContent = 'Please select an account role (Student or Teacher).';
          this.signupErrorBox.classList.add('visible');
          return;
        }

        const btnSubmit = document.getElementById('btn-submit-signup');
        try {
          this.isSubmittingAuth = true;
          if (btnSubmit) btnSubmit.disabled = true;
          this.showLoading('Creating your account...');

          const signupPromise = auth.signup(name, email, password, confirm, role);
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Account creation timed out. Please try again.')), 7000)
          );

          const user = await Promise.race([signupPromise, timeoutPromise]);

          this.showToast(`Account created successfully! Welcome, ${user.full_name}`);
          this.formSignup.reset();
          window.location.hash = user.role === 'teacher' ? '#teacher-dashboard' : '#student-home';
        } catch (err) {
          console.error('Signup error:', err);
          this.signupErrorBox.textContent = err.message || 'Registration failed. Please try again.';
          this.signupErrorBox.classList.add('visible');
        } finally {
          this.hideLoading();
          this.isSubmittingAuth = false;
          if (btnSubmit) btnSubmit.disabled = false;
        }
      });

      const btnProfileLogout = document.getElementById('btn-profile-logout');
      if (btnProfileLogout) btnProfileLogout.addEventListener('click', () => this.handleLogout());

      const btnTeacherLogout = document.getElementById('btn-teacher-profile-logout');
      if (btnTeacherLogout) btnTeacherLogout.addEventListener('click', () => this.handleLogout());

      // Back to Topics Button
      if (this.btnBackToTopics) {
        this.btnBackToTopics.addEventListener('click', () => {
          this.showPracticeTopics();
        });
      }

      // Inline Topic Switcher Pills
      if (this.practiceTopicInlineNav) {
        this.practiceTopicInlineNav.querySelectorAll('.topic-nav-pill').forEach(pill => {
          pill.addEventListener('click', (e) => {
            const topic = e.currentTarget.getAttribute('data-topic');
            this.openPracticeTopic(topic);
          });
        });
      }

      // "I Don't Know the Answer" Button
      if (this.btnUnknownAnswer) {
        this.btnUnknownAnswer.addEventListener('click', () => {
          this.handleUnknownAnswer();
        });
      }

      // "I Don't Know Why" Button
      if (this.btnUnknownReasoning) {
        this.btnUnknownReasoning.addEventListener('click', () => {
          this.handleUnknownReasoning();
        });
      }

      const btnNotFoundHome = document.getElementById('btn-not-found-home');
      if (btnNotFoundHome) {
        btnNotFoundHome.addEventListener('click', () => {
          if (auth.isAuthenticated()) {
            window.location.hash = auth.currentUser.role === 'teacher' ? '#teacher-dashboard' : '#student-home';
          } else {
            window.location.hash = '#landing';
          }
        });
      }

      document.querySelectorAll('#btn-start-practice, .btn-start-practice, [data-action="start-practice"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          window.location.hash = '#practice';
          this.activateView('practice');
          if (this.practiceTopicsView) this.practiceTopicsView.style.display = 'none';
          if (this.practiceWorkspaceView) this.practiceWorkspaceView.style.display = 'block';
        });
      });

      const sampleCasesData = {
        '1': {
          q: "Why does a queue follow FIFO?",
          a: "The first element added is the first element removed.",
          r: "A queue processes elements in the same order they arrive, so the earliest element leaves first.",
          c: "very_confident"
        },
        '2': {
          q: "Why does binary search require a sorted array?",
          a: "Because binary search checks the middle element.",
          r: "Since it checks the middle element, the array needs to be sorted.",
          c: "somewhat"
        },
        '3': {
          q: "What is the purpose of a primary key in a database?",
          a: "It uniquely identifies each record.",
          r: "I know that this is the purpose, but I don't know why it is needed.",
          c: "not_sure"
        },
        '4': {
          q: "What is overfitting in machine learning?",
          a: "I don't know.",
          r: "I have not learned this concept yet.",
          c: ""
        },
        '5': {
          q: "What is the time complexity of binary search?",
          a: "O(n)",
          r: "The algorithm may need to check every element to find the target.",
          c: "somewhat"
        },
        '6': {
          q: "What does a primary key do in a database?",
          a: "It uniquely identifies each record.",
          r: "It ensures each row can be distinguished from others.",
          c: "not_sure"
        },
        '7a': {
          q: "Why can a machine learning model perform well on training data but poorly on unseen data?",
          a: "Because it learned training data very well.",
          r: "If it performs very well on training data, it should perform well on new data.",
          c: "somewhat"
        },
        '7b': {
          q: "Why is testing a machine learning model on unseen data important?",
          a: "It is not necessary if training accuracy is high.",
          r: "High training accuracy means the model learned the problem correctly.",
          c: "somewhat"
        },
        '8': {
          q: "Why is a primary key important in a database?",
          a: "It uniquely identifies each record.",
          r: "Because the database uses it to identify which row should be deleted.",
          c: "very_confident"
        }
      };

      document.querySelectorAll('.btn-sample-case').forEach(btn => {
        btn.addEventListener('click', () => {
          const caseId = btn.getAttribute('data-case');
          const data = sampleCasesData[caseId];
          if (!data) return;

          const qEl = document.getElementById('user-custom-question');
          if (qEl) qEl.value = data.q;
          if (this.practiceAnswerInput) this.practiceAnswerInput.value = data.a;
          if (this.practiceReasoningInput) this.practiceReasoningInput.value = data.r;
          const confEl = document.getElementById('practice-confidence-input');
          if (confEl) confEl.value = data.c;

          this.showToast(`Pre-filled sample case ${caseId}. Click 'Analyze My Understanding' to inspect!`);
          qEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      });

      this.practiceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handlePracticeSubmit();
      });
    }

    async handleLogout() {
      this.showLoading('Signing out...');
      await auth.logout();
      this.hideLoading();
      this.showToast('You have been signed out.');
      window.location.hash = '#landing';
    }

    // ========================================================================
    // PRACTICE TOPIC SELECTION & WORKSPACE CONTROLLER
    // ========================================================================

    async showPracticeTopics() {
      if (this.practiceTopicsGrid) {
        if (this.practiceTopicsView) this.practiceTopicsView.style.display = 'block';
        if (this.practiceWorkspaceView) this.practiceWorkspaceView.style.display = 'none';
        await this.renderPracticeTopics();
      } else {
        if (this.practiceTopicsView) this.practiceTopicsView.style.display = 'none';
        if (this.practiceWorkspaceView) this.practiceWorkspaceView.style.display = 'block';
      }
    }

    async renderPracticeTopics() {
      if (!this.practiceTopicsGrid) return;
      const userId = auth.currentUser ? auth.currentUser.id : 'guest_user';
      const stats = await db.getTopicStats(userId);

      const topicDescriptions = {
        "Stack": "LIFO ordering, capacity boundaries, underflow, peek vs pop, and call stack frames.",
        "Queue": "FIFO semantics, underflow, circular buffer wrapping, priority queues, and deques.",
        "Linked List": "Pointer manipulation, deletion invariants, head insertion, traversal costs, and cycles.",
        "Searching": "Binary search monotonicity, linear vs logarithmic search, overflow midpoints, and hashing.",
        "Trees": "Binary search tree global invariants, leaf depth vs height, traversals, and balance."
      };

      this.practiceTopicsGrid.innerHTML = SUPPORTED_CONCEPTS.map(topic => {
        const stat = stats[topic] || {
          questionsCompleted: 0,
          totalQuestions: 5,
          verifiedCount: 0,
          misconceptionsDetected: 0,
          recurringCount: 0,
          status: 'Not Started',
          progressPercent: 0
        };

        const badgeClass = stat.status === 'Recovered' ? 'badge-recovered'
          : stat.status === 'Needs Practice' ? 'badge-persisting'
          : stat.status === 'In Progress' ? 'badge-in-progress'
          : 'badge-not-started';

        const actionText = (stat.questionsCompleted > 0 && stat.questionsCompleted < stat.totalQuestions)
          ? `Continue ${topic} &rarr;`
          : (stat.questionsCompleted >= stat.totalQuestions)
          ? `Review ${topic} &rarr;`
          : `Start ${topic} &rarr;`;

        return `
          <div class="topic-card" data-topic="${topic}">
            <div class="topic-card-header">
              <span class="topic-card-name">${topic}</span>
              <span class="topic-card-badge ${badgeClass}">${stat.status}</span>
            </div>
            <p class="topic-card-desc">${topicDescriptions[topic] || 'Core data structure conceptual foundations.'}</p>
            
            <div class="topic-card-stats">
              <div class="topic-stat-item">
                <span class="stat-num">${stat.questionsCompleted} / ${stat.totalQuestions}</span>
                <span class="stat-label">completed</span>
              </div>
              <div class="topic-stat-item">
                <span class="stat-num stat-verified">${stat.verifiedCount}</span>
                <span class="stat-label">verified</span>
              </div>
              <div class="topic-stat-item">
                <span class="stat-num stat-misc">${stat.misconceptionsDetected}</span>
                <span class="stat-label">misconceptions</span>
              </div>
            </div>

            <div class="topic-card-progress">
              <div class="progress-bar-bg" style="height: 6px;">
                <div class="progress-bar-fill" style="width: ${stat.progressPercent}%;"></div>
              </div>
              <div class="progress-text-row">
                <span>Progress</span>
                <span>${stat.progressPercent}%</span>
              </div>
            </div>

            <button type="button" class="btn-topic-action" data-topic="${topic}">
              ${actionText}
            </button>
          </div>
        `;
      }).join('');

      this.practiceTopicsGrid.querySelectorAll('.topic-card, .btn-topic-action').forEach(el => {
        el.addEventListener('click', (e) => {
          const topic = el.getAttribute('data-topic');
          if (topic) {
            this.openPracticeTopic(topic);
          }
        });
      });
    }

    async openPracticeTopic(topicName, questionId = null) {
      this.currentTopic = topicName;
      if (this.practiceTopicsView) this.practiceTopicsView.style.display = 'none';
      if (this.practiceWorkspaceView) this.practiceWorkspaceView.style.display = 'block';

      // Update Topbar Title
      if (this.practiceMetaTopic) {
        this.practiceMetaTopic.textContent = `Topic: ${topicName}`;
      }

      // Highlight active inline nav pill
      if (this.practiceTopicInlineNav) {
        this.practiceTopicInlineNav.querySelectorAll('.topic-nav-pill').forEach(pill => {
          pill.classList.toggle('active', pill.getAttribute('data-topic') === topicName);
        });
      }

      // Filter questions for this topic
      const topicQuestions = Object.values(QUESTION_BANK).filter(q => q.concept === topicName);
      if (topicQuestions.length === 0) return;

      const userId = auth.currentUser ? auth.currentUser.id : 'guest_user';
      const state = await db.getLearnerState(userId);
      const recoveries = await db.getRecoveryResults(userId);
      const interactions = await db.getInteractions(userId);

      const completedIds = new Set((state.concepts && state.concepts[topicName] && state.concepts[topicName].questions_completed) || []);
      interactions.filter(i => i.concept === topicName && (i.status === 'completed' || i.status === 'verified' || i.diagnostic_status === 'correct')).forEach(i => completedIds.add(i.question_id));
      recoveries.filter(r => r.concept === topicName && r.question_id).forEach(r => completedIds.add(r.question_id));

      const verifiedIds = new Set(recoveries.filter(r => r.concept === topicName && r.verified && r.question_id).map(r => r.question_id));

      // Render Question Tabs
      if (this.practiceTabsContainer) {
        this.practiceTabsContainer.innerHTML = topicQuestions.map((q, idx) => {
          const isDone = completedIds.has(q.id);
          const isVer = verifiedIds.has(q.id);
          const statusIcon = isVer ? '&#10004;' : isDone ? '&#9679;' : '';
          return `
            <button type="button" class="concept-tab" data-q="${q.id}" data-concept-name="${topicName}">
              Q${idx + 1}: ${q.title.split(' ')[0]} ${statusIcon ? `<span style="font-size:0.75rem; margin-left:2px; color:${isVer ? '#059669':'#2563EB'};">${statusIcon}</span>` : ''}
            </button>
          `;
        }).join('');

        this.practiceTabsContainer.querySelectorAll('.concept-tab').forEach(tab => {
          tab.addEventListener('click', (e) => {
            const qId = e.currentTarget.getAttribute('data-q');
            this.loadPracticeQuestion(qId);
          });
        });
      }

      // Pick target question (continue where left off or first uncompleted)
      let targetQId = questionId;
      if (!targetQId) {
        const savedCurrent = (state.concepts && state.concepts[topicName] && state.concepts[topicName].current_question_id);
        if (savedCurrent && topicQuestions.some(q => q.id === savedCurrent)) {
          targetQId = savedCurrent;
        } else {
          const uncompleted = topicQuestions.find(q => !completedIds.has(q.id));
          targetQId = uncompleted ? uncompleted.id : topicQuestions[0].id;
        }
      }

      this.loadPracticeQuestion(targetQId);
    }

    loadPracticeQuestion(questionId) {
      this.currentQuestionId = questionId;
      this.currentSocraticStage = 0;
      const qData = QUESTION_BANK[questionId];
      if (!qData) return;

      this.currentTopic = qData.concept;
      if (this.practiceMetaTopic) {
        this.practiceMetaTopic.textContent = `Topic: ${qData.concept}`;
      }
      if (this.practiceConceptTitle) {
        this.practiceConceptTitle.textContent = qData.title;
      }
      if (this.practicePromptText) {
        this.practicePromptText.textContent = `“${qData.prompt}”`;
      }
      if (this.practiceContextText) {
        this.practiceContextText.textContent = qData.context;
      }
      const customQEl = document.getElementById('user-custom-question');
      if (customQEl) {
        customQEl.value = qData.prompt;
      }

      this.practiceAnswerInput.value = '';
      this.practiceAnswerInput.placeholder = qData.answerPlaceholder || 'Write your answer in your own words...';
      this.practiceReasoningInput.value = '';
      this.practiceReasoningInput.placeholder = qData.reasoningPlaceholder || 'Explain your reasoning in your own words...';

      if (this.practiceTabsContainer) {
        this.practiceTabsContainer.querySelectorAll('.concept-tab').forEach(tab => {
          tab.classList.toggle('active', tab.getAttribute('data-q') === questionId);
        });
      }

      this.practiceInteractiveContainer.innerHTML = '';
    }

    // "I Don't Know the Answer" Handler (Progressive Concept Explanation Flow)
    async handleUnknownAnswer() {
      const customQuestionEl = document.getElementById('user-custom-question');
      const customQ = customQuestionEl ? customQuestionEl.value.trim() : '';

      this.practiceAnswerInput.value = "I don't know the answer";
      this.practiceReasoningInput.value = "I don't know the reasoning yet";

      if (customQ) {
        await this.handlePracticeSubmit();
        return;
      }

      const qData = QUESTION_BANK[this.currentQuestionId];
      if (!qData) {
        this.showToast("Please enter what you are trying to understand above.");
        if (customQuestionEl) customQuestionEl.focus();
        return;
      }

      const userId = auth.currentUser ? auth.currentUser.id : 'guest_user';

      // Track uncertainty / knowledge-gap state: answerStatus: unknown, reasoningStatus: unknown
      // "I don't know" must NOT automatically create a misconception
      if (auth.currentUser) {
        await db.recordInteraction(
          userId,
          this.currentQuestionId,
          qData.concept,
          "I don't know the answer",
          "",
          { type: 'DONT_KNOW', diagnosticStatus: 'knowledge_gap' },
          {
            answerStatus: 'unknown',
            reasoningStatus: 'unknown',
            diagnosticStatus: 'knowledge_gap',
            status: 'in_progress',
            outcomeType: 'unknown_answer'
          }
        );
      }

      this.practiceInteractiveContainer.innerHTML = '';

      const explanationParas = getQuestionExplanation(qData);
      const thinkPrompt = getQuestionThinkPrompt(qData);
      const thinkPlaceholder = getQuestionThinkPlaceholder(qData);

      const progressiveCard = document.createElement('div');
      progressiveCard.className = 'progressive-flow-card guided-box';
      progressiveCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span class="status-badge" style="background: #EFF6FF; color: #1D4ED8; font-weight: 700;">Guided Learning Flow</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">&bull; Diagnostic status: Uncertain (Knowledge-gap, no misconception assumed)</span>
        </div>
        <h4 class="diagnosis-headline" style="color: #1E3A8A; font-size: 1.15rem; margin-bottom: 0.45rem;">
          That&rsquo;s completely okay. Let&rsquo;s start with the basic idea.
        </h4>
        <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 1.1rem;">
          Admitting uncertainty is a key part of learning. Rather than guessing, let's explore the core concepts step by step:
        </p>

        <div class="flow-step-container">
          <!-- STEP 1: CONCEPT EXPLANATION -->
          <div class="flow-step-block block-concept-explanation">
            <div class="flow-step-header">
              <span class="flow-step-badge">Step 1</span>
              <span class="flow-step-title">CONCEPT EXPLANATION</span>
            </div>
            <div class="concept-explanation-text">
              ${explanationParas.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>

          <div class="flow-arrow-down">&darr;</div>

          <!-- STEP 2: LET'S THINK ABOUT IT -->
          <div class="flow-step-block block-think-about-it">
            <div class="flow-step-header">
              <span class="flow-step-badge">Step 2</span>
              <span class="flow-step-title">LET&rsquo;S THINK ABOUT IT</span>
            </div>
            <div class="think-prompt-text">
              &ldquo;${thinkPrompt}&rdquo;
            </div>
          </div>

          <div class="flow-arrow-down">&darr;</div>

          <!-- STEP 3: YOUR REASONING -->
          <div class="flow-step-block block-your-reasoning guided-box">
            <div class="flow-step-header">
              <span class="flow-step-badge">Step 3</span>
              <span class="flow-step-title">YOUR REASONING</span>
            </div>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 0.65rem;">
              Based on the concept above, explain your thinking in your own words:
            </p>
            <div class="form-group">
              <textarea id="input-progressive-reasoning" class="text-area" placeholder="${thinkPlaceholder}" style="min-height: 85px;"></textarea>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted);">
                Focus on the core concept rather than programming syntax
              </span>
              <button type="button" class="btn-primary" id="btn-submit-progressive-reasoning" style="padding: 0.5rem 1.35rem;">
                Submit Reasoning &rarr;
              </button>
            </div>
          </div>
        </div>

        <div id="progressive-flow-feedback" style="margin-top: 1.15rem;"></div>
      `;

      this.practiceInteractiveContainer.appendChild(progressiveCard);

      const inputReasoning = progressiveCard.querySelector('#input-progressive-reasoning');
      const btnSubmit = progressiveCard.querySelector('#btn-submit-progressive-reasoning');
      const feedbackBox = progressiveCard.querySelector('#progressive-flow-feedback');

      btnSubmit.addEventListener('click', async () => {
        const text = inputReasoning.value.trim();
        if (!text) {
          this.showToast("Please enter your thoughts before submitting.");
          inputReasoning.focus();
          return;
        }

        this.showLoading('Analyzing your reasoning...');
        await new Promise(r => setTimeout(r, 350));
        this.hideLoading();

        const lower = text.toLowerCase();
        const stage0 = qData.socraticStages && qData.socraticStages[0];

        // Evaluate whether the student demonstrated understanding
        const isCorrect = stage0 && stage0.correctedCheck
          ? stage0.correctedCheck(lower)
          : (lower.includes("not part of") || lower.includes("implementation") || lower.includes("choice") || lower.includes("empty") || lower.includes("underflow") || lower.includes("no,") || lower.includes("not wrong") || lower.includes("no concept") || lower.includes("correct"));

        // Check if response contains concrete evidence of persistent misconception
        const isPersistent = stage0 && stage0.persistentCheck
          ? stage0.persistentCheck(lower)
          : false;

        if (isCorrect) {
          // Student demonstrates understanding -> update state and continue into recovery/transfer workflow
          if (auth.currentUser) {
            await db.markQuestionCompleted(userId, qData.concept, this.currentQuestionId, 'guided_completed');
            await db.recordInteraction(
              userId,
              this.currentQuestionId,
              qData.concept,
              "Guided response",
              text,
              { type: 'CONCEPT_UNDERSTOOD', diagnosticStatus: 'correct' },
              {
                answerStatus: 'provided',
                reasoningStatus: 'provided',
                diagnosticStatus: 'correct',
                status: 'completed',
                outcomeType: 'guided_completed'
              }
            );
          }

          feedbackBox.innerHTML = `
            <div class="diagnosis-card state-understood" style="margin-top: 1rem; border-left: 4px solid #10B981;">
              <span class="status-badge" style="background: #D1FAE5; color: #065F46; font-weight: 700;">Concept Understood</span>
              <h4 class="diagnosis-headline" style="color: #065F46; font-size: 1.1rem; margin-top: 0.35rem;">
                Great reasoning! You grasped the foundational concept.
              </h4>
              <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 1rem;">
                By thinking through the fundamental constraints rather than relying on language-specific quirks, you arrived at the correct abstract model.
              </p>

              <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-md); padding: 0.9rem; margin-bottom: 1rem;">
                <div style="font-weight: 700; font-size: 0.82rem; color: #166534; text-transform: uppercase; margin-bottom: 0.25rem;">Next Step: Verification</div>
                <div style="font-size: 0.88rem; color: #1E293B;">
                  Now let's verify that your understanding generalizes across different scenarios with a transfer question.
                </div>
              </div>

              <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                <button type="button" class="btn-primary" id="btn-guided-transfer" style="padding: 0.5rem 1.35rem;">
                  Verify Transfer Understanding &rarr;
                </button>
                <button type="button" class="btn-secondary" id="btn-guided-next">
                  Next Question &rarr;
                </button>
                <button type="button" class="btn-secondary" id="btn-guided-back-topics">
                  &larr; Back to Topics
                </button>
              </div>
            </div>
          `;

          feedbackBox.querySelector('#btn-guided-transfer')?.addEventListener('click', () => {
            this.renderTransferQuestion(qData);
            const transferEl = document.getElementById('transfer-container');
            if (transferEl) transferEl.scrollIntoView({ behavior: 'smooth' });
          });

          feedbackBox.querySelector('#btn-guided-next')?.addEventListener('click', () => {
            const allQ = Object.values(QUESTION_BANK).filter(q => q.concept === qData.concept);
            const nextIdx = allQ.findIndex(q => q.id === this.currentQuestionId) + 1;
            if (nextIdx < allQ.length) {
              this.loadPracticeQuestion(allQ[nextIdx].id);
            } else {
              this.showPracticeTopics();
            }
          });

          feedbackBox.querySelector('#btn-guided-back-topics')?.addEventListener('click', () => {
            this.showPracticeTopics();
          });
        } else if (isPersistent) {
          // Specific evidence of a misconception exhibited -> record misconception and guide via stage 2
          if (auth.currentUser) {
            await db.recordMisconception(
              userId,
              qData.concept,
              qData.misconceptionKey || 'abstract_vs_implementation',
              'Language implementation details dictate data structure definition',
              'Distinguishing abstract specification from concrete language/runtime implementation choices.',
              "I don't know the answer",
              text,
              (qData.socraticStages && qData.socraticStages[1]?.prompt) || "What fundamental condition is common to both implementations?",
              'Detected'
            );
            await db.recordInteraction(
              userId,
              this.currentQuestionId,
              qData.concept,
              "Guided response",
              text,
              { type: 'MISCONCEPTION_IDENTIFIED', diagnosticStatus: 'persistent' },
              {
                answerStatus: 'provided',
                reasoningStatus: 'provided',
                diagnosticStatus: 'persistent',
                status: 'in_progress',
                outcomeType: 'misconception'
              }
            );
          }

          const stage1 = (qData.socraticStages && qData.socraticStages[1]) || {
            prompt: "If two implementations handle an empty collection differently, what fundamental condition is common to both?",
            placeholder: "What fundamental condition do both implementations encounter?"
          };

          feedbackBox.innerHTML = `
            <div class="diagnosis-card state-persistent" style="margin-top: 1rem; border-left: 4px solid #EF4444;">
              <span class="status-badge" style="background: #FEE2E2; color: #991B1B; font-weight: 700;">Misconception Detected</span>
              <h4 class="diagnosis-headline" style="color: #991B1B; font-size: 1.05rem; margin-top: 0.35rem;">
                Notice the distinction between concrete implementations and the abstract concept.
              </h4>
              <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 1rem;">
                Your reasoning assumes that the specific behavior of one language (e.g. returning -1) is an absolute rule of the data structure. Let's look deeper:
              </p>

              <div class="socratic-container" style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
                <div style="font-weight: 700; font-size: 0.8rem; text-transform: uppercase; color: #B45309; margin-bottom: 0.35rem;">
                  Socratic Guided Question
                </div>
                <div style="font-weight: 600; color: #1E293B; margin-bottom: 0.75rem;">
                  &ldquo;${stage1.prompt}&rdquo;
                </div>
                <div class="form-group">
                  <textarea id="input-socratic-stage2" class="text-area" placeholder="${stage1.placeholder}"></textarea>
                </div>
                <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
                  <button type="button" class="btn-primary" id="btn-submit-socratic-stage2" style="padding: 0.45rem 1.25rem;">
                    Submit Reflection &rarr;
                  </button>
                </div>
              </div>
              <div id="socratic-stage2-feedback"></div>
            </div>
          `;

          const inputStage2 = feedbackBox.querySelector('#input-socratic-stage2');
          const btnSubmitStage2 = feedbackBox.querySelector('#btn-submit-socratic-stage2');
          const stage2Feedback = feedbackBox.querySelector('#socratic-stage2-feedback');

          btnSubmitStage2.addEventListener('click', async () => {
            const sText = inputStage2.value.trim();
            if (!sText) return;
            this.showLoading('Analyzing reflection...');
            await new Promise(r => setTimeout(r, 300));
            this.hideLoading();

            const sLower = sText.toLowerCase();
            const sUnderstood = stage1.correctedCheck ? stage1.correctedCheck(sLower) : (sLower.includes("empty") || sLower.includes("underflow") || sLower.includes("no element"));
            if (sUnderstood) {
              if (auth.currentUser) {
                await db.markQuestionCompleted(userId, qData.concept, this.currentQuestionId, 'guided_completed');
              }
              stage2Feedback.innerHTML = `
                <div class="diagnosis-card state-understood" style="margin-top: 0.75rem;">
                  <span class="status-badge" style="background: #D1FAE5; color: #065F46;">Reflection Complete</span>
                  <h4 class="diagnosis-headline" style="color: #065F46;">Exactly! The common property is that the collection contains zero elements.</h4>
                  <div style="margin-top: 0.75rem;">
                    <button type="button" class="btn-primary" id="btn-stage2-transfer">
                      Verify Transfer Understanding &rarr;
                    </button>
                  </div>
                </div>
              `;
              stage2Feedback.querySelector('#btn-stage2-transfer')?.addEventListener('click', () => {
                this.renderTransferQuestion(qData);
              });
            } else {
              stage2Feedback.innerHTML = `
                <div class="diagnosis-card state-insufficient" style="margin-top: 0.75rem;">
                  <p class="diagnosis-text">Consider: both implementations encounter an empty data structure with zero elements available to remove.</p>
                </div>
              `;
            }
          });
        } else {
          // Ambiguous / uncertainty -> do NOT create a misconception
          feedbackBox.innerHTML = `
            <div class="diagnosis-card state-insufficient" style="margin-top: 1rem;">
              <span class="status-badge" style="background: #FEF3C7; color: #92400E; font-weight: 700;">Exploration in Progress</span>
              <h4 class="diagnosis-headline" style="color: #92400E; font-size: 1.05rem; margin-top: 0.35rem;">
                Good thought. Let's look at the core condition.
              </h4>
              <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 0.75rem;">
                Notice: The data structure specification doesn't dictate whether a program returns a sentinel value or raises an error. The crucial concept is simply: <em>what is in the collection when there are 0 elements?</em>
              </p>
              <p style="font-size: 0.84rem; color: var(--text-muted);">
                Try re-phrasing your answer above focusing on whether an element actually exists to be retrieved.
              </p>
            </div>
          `;
        }
      });
    }

    // "I Don't Know Why" Handler (Short Refresher + Guided Prompt)
    async handleUnknownReasoning() {
      const customQuestionEl = document.getElementById('user-custom-question');
      const customQ = customQuestionEl ? customQuestionEl.value.trim() : '';

      const answer = this.practiceAnswerInput.value.trim();
      if (!answer) {
        this.showToast("Please provide your answer first, or choose 'I don't know the answer'.");
        this.practiceAnswerInput.focus();
        return;
      }

      this.practiceReasoningInput.value = "I don't know why";

      if (customQ) {
        await this.handlePracticeSubmit();
        return;
      }

      const qData = QUESTION_BANK[this.currentQuestionId];
      if (!qData) {
        this.showToast("Please enter an academic question or concept to analyze.");
        if (customQuestionEl) customQuestionEl.focus();
        return;
      }
      const userId = auth.currentUser ? auth.currentUser.id : 'guest_user';

      // Do NOT mark answer correct or incorrect immediately. Track states separately:
      // answerStatus: provided, reasoningStatus: unknown
      if (auth.currentUser) {
        await db.recordInteraction(
          userId,
          this.currentQuestionId,
          qData.concept,
          answer,
          "I don't know why",
          { type: 'UNKNOWN_REASONING', diagnosticStatus: 'reasoning_gap' },
          {
            answerStatus: 'provided',
            reasoningStatus: 'unknown',
            diagnosticStatus: 'reasoning_gap',
            status: 'in_progress',
            outcomeType: 'unknown_reasoning'
          }
        );
      }

      this.practiceInteractiveContainer.innerHTML = '';

      const refresherParas = getQuestionRefresher(qData);
      const refresherPrompt = getQuestionRefresherPrompt(qData);

      const reasonCard = document.createElement('div');
      reasonCard.className = 'progressive-flow-card guided-box';
      reasonCard.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <span class="status-badge" style="background: #F3E8FF; color: #6B21A8; font-weight: 700;">Reasoning Refresher</span>
          <span style="font-size: 0.8rem; color: var(--text-muted);">&bull; Answer provided: &ldquo;${answer}&rdquo; &bull; Status: Investigating Reasoning</span>
        </div>
        <h4 class="diagnosis-headline" style="color: #581C87; font-size: 1.15rem; margin-bottom: 0.45rem;">
          You have an answer, but you're not sure about the reasoning. Let's look at what the operation actually means.
        </h4>
        <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 1.1rem;">
          Your answer may be based on a correct idea, but we need to understand the reasoning behind it. In computer science, getting the right output by chance is different from holding a reliable mental model:
        </p>

        <div class="flow-step-container">
          <!-- STEP 1: CONCEPT REFRESHER -->
          <div class="flow-step-block block-concept-explanation">
            <div class="flow-step-header">
              <span class="flow-step-badge" style="background: #EDE9FE; color: #6D28D9;">Step 1</span>
              <span class="flow-step-title" style="color: #6D28D9;">CONCEPT REFRESHER</span>
            </div>
            <div class="concept-explanation-text">
              ${refresherParas.map(p => `<p>${p}</p>`).join('')}
            </div>
          </div>

          <div class="flow-arrow-down">&darr;</div>

          <!-- STEP 2: LET'S THINK ABOUT IT -->
          <div class="flow-step-block block-think-about-it">
            <div class="flow-step-header">
              <span class="flow-step-badge">Step 2</span>
              <span class="flow-step-title">LET&rsquo;S THINK ABOUT IT</span>
            </div>
            <div class="think-prompt-text">
              &ldquo;${refresherPrompt}&rdquo;
            </div>
          </div>

          <div class="flow-arrow-down">&darr;</div>

          <!-- STEP 3: YOUR REASONING -->
          <div class="flow-step-block block-your-reasoning guided-box">
            <div class="flow-step-header">
              <span class="flow-step-badge">Step 3</span>
              <span class="flow-step-title">YOUR REASONING</span>
            </div>
            <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 0.65rem;">
              Explain what intuition or experience led you to your answer &ldquo;${answer}&rdquo;:
            </p>
            <div class="form-group">
              <textarea id="input-uncover-reasoning" class="text-area" placeholder="Explain your intuition or how you arrived at this answer..." style="min-height: 85px;"></textarea>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <span style="font-size: 0.78rem; color: var(--text-muted);">
                Explain what underlying rule or experience influenced you
              </span>
              <button type="button" class="btn-primary" id="btn-submit-uncover-reasoning" style="padding: 0.5rem 1.35rem;">
                Submit Reasoning &rarr;
              </button>
            </div>
          </div>
        </div>

        <div id="uncover-reasoning-feedback"></div>
      `;

      this.practiceInteractiveContainer.appendChild(reasonCard);

      const inputUncover = reasonCard.querySelector('#input-uncover-reasoning');
      const btnSubmitUncover = reasonCard.querySelector('#btn-submit-uncover-reasoning');

      btnSubmitUncover.addEventListener('click', async () => {
        const text = inputUncover.value.trim();
        if (!text) {
          this.showToast("Please enter your reasoning before submitting.");
          inputUncover.focus();
          return;
        }

        this.practiceReasoningInput.value = text;
        await this.handlePracticeSubmit();
      });
    }

    async handlePracticeSubmit() {
      if (this.isSubmittingPractice) return;

      const customQuestionEl = document.getElementById('user-custom-question');
      const customQuestion = customQuestionEl ? customQuestionEl.value.trim() : '';
      const answer = this.practiceAnswerInput.value.trim();
      const reasoning = this.practiceReasoningInput.value.trim();
      const confidenceEl = document.getElementById('practice-confidence-input');
      const confidence = confidenceEl ? confidenceEl.value : '';

      if (!customQuestion) {
        this.showToast("Please enter an academic question or concept to analyze.");
        if (customQuestionEl) customQuestionEl.focus();
        return;
      }
      if (!answer) {
        this.showToast("Please provide your answer or choose 'I don't know the answer'.");
        this.practiceAnswerInput.focus();
        return;
      }
      if (!reasoning) {
        this.showToast("Please explain your reasoning or choose 'I don't know why'.");
        this.practiceReasoningInput.focus();
        return;
      }

      if (customQuestion.length > 5000 || answer.length > 5000 || reasoning.length > 5000) {
        this.showToast("Input is unusually long. Please keep your question and reasoning focused.");
        return;
      }

      this.isSubmittingPractice = true;
      const userId = (auth.currentUser && auth.currentUser.id) ? auth.currentUser.id : 'student_demo_user';
      const qData = QUESTION_BANK[this.currentQuestionId] || { concept: 'General', socraticStages: [] };

      this.setIsAnalyzing(true);

      try {
        let diagnosis;
        try {
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('timeout')), 8000);
          });
          diagnosis = await Promise.race([
            diagnosticEngine.diagnoseCustom(
              userId,
              customQuestion,
              answer,
              reasoning,
              confidence
            ),
            timeoutPromise
          ]);
        } catch (error) {
          console.error("Diagnosis error / timeout:", error);
          this.showToast("Analysis unavailable. Please try again.");
          return;
        }

        if (!diagnosis) {
          this.showToast("Analysis unavailable. Please try again.");
          return;
        }

        this.currentDiagnosis = diagnosis;
        this.currentCustomQuestion = customQuestion;

        const effectiveQId = diagnosis.questionId || ('custom_' + Date.now());
        const concept = diagnosis.concept || qData.concept || 'Data Structures';
        const finalQData = QUESTION_BANK[this.currentQuestionId] || { concept, socraticStages: [] };

        const outcomeType = diagnosis.type === 'MISCONCEPTION_DETECTED' ? 'misconception_detected'
          : diagnosis.type === 'CONCEPT_UNDERSTOOD' ? 'concept_understood'
          : diagnosis.type === 'DONT_KNOW' ? 'unknown_answer'
          : diagnosis.type === 'UNKNOWN_REASONING' ? 'unknown_reasoning'
          : 'insufficient_evidence';

        const status = diagnosis.type === 'CONCEPT_UNDERSTOOD' ? 'completed' : 'in_progress';

        try {
          await db.recordInteraction(
            userId,
            effectiveQId,
            concept,
            answer,
            reasoning,
            diagnosis,
            {
              questionText: customQuestion,
              answerStatus: diagnosis.answerAssessment || 'provided',
              reasoningStatus: diagnosis.reasoningAssessment || 'provided',
              diagnosticStatus: diagnosis.diagnosisType || diagnosis.status || 'analyzed',
              status,
              outcomeType
            }
          );

          if (diagnosis.type === 'MISCONCEPTION_DETECTED') {
            await db.recordMisconception(
              userId,
              concept,
              diagnosis.misconceptionKey || 'custom_misconception',
              diagnosis.title || 'Misconception',
              diagnosis.underlyingConcept || concept,
              answer,
              reasoning,
              diagnosis.socraticQuestion || '',
              'Detected',
              diagnosis.semanticCategory || 'conceptual_invariant'
            );
          } else if (diagnosis.type === 'CONCEPT_UNDERSTOOD') {
            await db.markQuestionCompleted(userId, concept, effectiveQId, 'completed');
          }
        } catch (dbErr) {
          console.warn('Database recording notice:', dbErr);
        }

        this.renderDiagnosis(diagnosis, finalQData, answer, reasoning);
      } catch (error) {
        console.error(error);
        this.showToast("Analysis unavailable. Please try again.");
      } finally {
        this.isSubmittingPractice = false;
        this.setIsAnalyzing(false);
      }
    }

    renderDiagnosis(diagnosis, qData, answer, reasoning) {
      this.practiceInteractiveContainer.innerHTML = '';

      if (diagnosis.type === 'OUT_OF_SCOPE') {
        const card = document.createElement('div');
        card.className = 'diagnosis-card state-insufficient';
        card.style.borderLeft = '4px solid #64748B';
        card.innerHTML = `
          <span class="status-badge" style="background: #F1F5F9; color: #475569; font-weight: 700;">Outside supported scope</span>
          <h4 class="diagnosis-headline" style="color: #334155; margin-top: 0.35rem;">Outside supported scope</h4>
          <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 0.75rem; white-space: pre-line;">
${diagnosis.studentExplanation || 'Outside supported scope\nMisconceptionOS is designed to diagnose reasoning in college-level academic subjects. Please enter a study-related question.'}
          </p>
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); padding: 0.85rem; font-size: 0.85rem; color: var(--text-muted);">
            <strong>Supported Domains:</strong> Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, Object-Oriented Programming, Machine Learning, Computer Architecture, Discrete Mathematics, and college-level academic subjects.
          </div>
        `;
        this.practiceInteractiveContainer.appendChild(card);
        return;
      }

      if (diagnosis.type === 'DONT_KNOW') {
        const card = document.createElement('div');
        card.className = 'diagnosis-card state-insufficient';
        card.style.borderLeft = '4px solid #6366F1';
        card.innerHTML = `
          <span class="status-badge" style="background: #EEF2FF; color: #4338CA; font-weight: 700;">Knowledge Gap</span>
          <h4 class="diagnosis-headline" style="color: #3730A3; margin-top: 0.35rem;">${diagnosis.title}</h4>
          <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 0.85rem;">
            ${diagnosis.studentExplanation}
          </p>
          ${diagnosis.correctExplanation ? `
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); padding: 0.9rem; margin-top: 0.5rem;">
              <div style="font-weight: 700; font-size: 0.8rem; text-transform: uppercase; color: #4338CA; margin-bottom: 0.25rem;">Core Principle &amp; Correct Explanation</div>
              <div style="font-size: 0.9rem; color: #1E293B;">${diagnosis.correctExplanation}</div>
            </div>
          ` : ''}
        `;
        this.practiceInteractiveContainer.appendChild(card);
        return;
      }

      if (diagnosis.type === 'UNKNOWN_REASONING') {
        const card = document.createElement('div');
        card.className = 'diagnosis-card state-insufficient';
        card.style.borderLeft = '4px solid #F59E0B';
        card.innerHTML = `
          <span class="status-badge" style="background: #FEF3C7; color: #92400E; font-weight: 700;">Reasoning Gap</span>
          <h4 class="diagnosis-headline" style="color: #92400E; margin-top: 0.35rem;">${diagnosis.title}</h4>
          <p class="diagnosis-text" style="color: var(--text-secondary); margin-bottom: 0.85rem;">
            ${diagnosis.studentExplanation}
          </p>
          ${diagnosis.correctExplanation ? `
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-md); padding: 0.9rem; margin-top: 0.5rem;">
              <div style="font-weight: 700; font-size: 0.8rem; text-transform: uppercase; color: #B45309; margin-bottom: 0.25rem;">Underlying Mechanism</div>
              <div style="font-size: 0.9rem; color: #1E293B;">${diagnosis.correctExplanation}</div>
            </div>
          ` : ''}
        `;
        this.practiceInteractiveContainer.appendChild(card);
        if (diagnosis.needsSocratic) {
          this.renderSocraticSection(qData, diagnosis);
        }
        return;
      }

      if (diagnosis.type === 'INSUFFICIENT_EVIDENCE' || diagnosis.diagnosisType === 'uncertain') {
        const card = document.createElement('div');
        card.className = 'diagnosis-card state-insufficient';
        card.innerHTML = `
          <span class="status-badge">${diagnosis.status}</span>
          <h4 class="diagnosis-headline">${diagnosis.title}</h4>
          <p class="diagnosis-text">${diagnosis.studentExplanation}</p>
        `;
        this.practiceInteractiveContainer.appendChild(card);
        if (diagnosis.needsSocratic) {
          this.renderSocraticSection(qData, diagnosis);
        }
        return;
      }

      if (diagnosis.type === 'CONCEPT_UNDERSTOOD') {
        const card = document.createElement('div');
        card.className = 'diagnosis-card state-understood';
        card.innerHTML = `
          <span class="status-badge" style="background: #D1FAE5; color: #065F46; font-weight: 700;">${diagnosis.status}</span>
          <h4 class="diagnosis-headline" style="color: #065F46; margin-top: 0.35rem;">${diagnosis.title}</h4>
          <p class="diagnosis-text" style="color: var(--text-secondary);">${diagnosis.studentExplanation}</p>
          <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="btn-primary" id="btn-next-after-understood">
              Ask Another Question &rarr;
            </button>
            <button type="button" class="btn-secondary" id="btn-back-topics-understood">
              &larr; View Home
            </button>
          </div>
        `;
        this.practiceInteractiveContainer.appendChild(card);

        card.querySelector('#btn-next-after-understood')?.addEventListener('click', () => {
          const customQEl = document.getElementById('user-custom-question');
          if (customQEl) {
            customQEl.value = '';
            customQEl.focus();
          }
          this.practiceAnswerInput.value = '';
          this.practiceReasoningInput.value = '';
          const confEl = document.getElementById('practice-confidence-input');
          if (confEl) confEl.value = '';
          this.practiceInteractiveContainer.innerHTML = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        card.querySelector('#btn-back-topics-understood')?.addEventListener('click', () => {
          window.location.hash = '#student-home';
        });
        return;
      }

      const isRecurring = diagnosis.recurring && diagnosis.recurring.isRecurring;
      const card = document.createElement('div');
      card.className = `diagnosis-card ${isRecurring ? 'state-recurring' : 'state-misconception'}`;

      let recurringHtml = '';
      if (isRecurring) {
        recurringHtml = `
          <div class="recurring-comparison">
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--pastel-purple-text); margin-bottom: 0.25rem;">
              Recurring Misconception Pattern Detected:
            </div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">
              ${diagnosis.recurring.underlyingConcept}
            </div>
            <div class="comparison-grid">
              <div class="comparison-col">
                <div class="col-label">${diagnosis.recurring.previousConcept} Question Reasoning</div>
                <div class="col-value">&ldquo;${diagnosis.recurring.previousEvidence.reasoning || diagnosis.recurring.previousEvidence}&rdquo;</div>
              </div>
              <div class="comparison-col">
                <div class="col-label">${diagnosis.concept || qData.concept} Question Reasoning</div>
                <div class="col-value">&ldquo;${reasoning}&rdquo;</div>
              </div>
            </div>
            <p class="synthesis-note">
              &ldquo;${diagnosis.recurring.synthesis}&rdquo;
            </p>
            <button class="btn-strengthen" id="btn-strengthen-concept">
              Strengthen This Concept
            </button>
          </div>
        `;
      }

      card.innerHTML = `
        <span class="status-badge">${diagnosis.status}</span>
        <div style="margin-top: 1.5rem;">
          <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">What You Understand</h5>
          <p class="diagnosis-text" style="font-size: 0.95rem; margin-bottom: 1rem;">${diagnosis.whatYouUnderstand || 'Your answer touches on the correct underlying domain.'}</p>
          
          <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">What Your Reasoning Reveals</h5>
          <p class="diagnosis-text" style="font-size: 0.95rem; margin-bottom: 1rem;">${diagnosis.studentExplanation}</p>
          
          <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">Misconception / Gap</h5>
          <p class="diagnosis-text" style="font-size: 0.95rem; margin-bottom: 1rem; font-weight: 500; color: var(--pastel-red-text);">${diagnosis.title} - ${diagnosis.underlyingConcept || diagnosis.concept || 'Knowledge Gap'}</p>
          
          <h5 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.3rem;">Why We Identified It</h5>
          <p class="diagnosis-text" style="font-size: 0.95rem; margin-bottom: 1rem;">Based on your explanation: "${reasoning}", there is missing evidence of the core requirement.</p>
        </div>
        ${recurringHtml}
      `;

      this.practiceInteractiveContainer.appendChild(card);

      if (isRecurring) {
        const btnStrengthen = card.querySelector('#btn-strengthen-concept');
        if (btnStrengthen) {
          btnStrengthen.addEventListener('click', () => {
            this.renderSocraticSection(qData, diagnosis);
            btnStrengthen.disabled = true;
            btnStrengthen.textContent = 'Guiding Socratic Dialogue Active';
          });
        }
      } else if (diagnosis.needsSocratic) {
        this.renderSocraticSection(qData, diagnosis);
      }
    }

    renderSocraticSection(qData, diagnosis) {
      const existing = document.getElementById('socratic-container');
      if (existing) existing.remove();

      this.currentDiagnosis = diagnosis || this.currentDiagnosis;
      const socraticPrompt = (diagnosis && diagnosis.socraticQuestion)
        || (this.currentDiagnosis && this.currentDiagnosis.socraticQuestion)
        || (qData && qData.socraticStages && qData.socraticStages[this.currentSocraticStage]?.prompt)
        || "Let's think carefully about the underlying operational mechanism.";
      const socraticPlaceholder = (diagnosis && diagnosis.subconcept)
        ? `Explain how the principle of ${diagnosis.subconcept} applies here...`
        : ((qData && qData.socraticStages && qData.socraticStages[this.currentSocraticStage]?.placeholder) || "Explain your reasoning...");

      const socraticCard = document.createElement('div');
      socraticCard.id = 'socratic-container';
      socraticCard.className = 'card socratic-section';
      socraticCard.innerHTML = `
        <div class="socratic-header">Let&rsquo;s think about it.</div>
        <div class="socratic-prompt" id="socratic-prompt-text">&ldquo;${socraticPrompt}&rdquo;</div>
        
        <div class="form-group">
          <label class="form-label" for="input-socratic">Your reasoning:</label>
          <textarea id="input-socratic" class="text-area" placeholder="${socraticPlaceholder}"></textarea>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.78rem; color: var(--text-muted);">
            Evaluate how your reasoning develops through dialogue
          </span>
          <button type="button" class="btn-primary" id="btn-submit-socratic" style="padding: 0.5rem 1.25rem;">
            Submit
          </button>
        </div>

        <div id="socratic-response-feedback" style="margin-top: 1.25rem;"></div>
      `;

      this.practiceInteractiveContainer.appendChild(socraticCard);

      const inputSocratic = socraticCard.querySelector('#input-socratic');
      const btnSubmit = socraticCard.querySelector('#btn-submit-socratic');

      btnSubmit.addEventListener('click', () => {
        this.handleSocraticSubmit(inputSocratic.value.trim());
      });
    }

    async handleSocraticSubmit(reasoningText) {
      if (!reasoningText) return;

      this.showLoading('Evaluating your response...');

      const feedbackContainer = document.getElementById('socratic-response-feedback');
      const qData = QUESTION_BANK[this.currentQuestionId] || { concept: (this.currentDiagnosis && this.currentDiagnosis.concept) || 'Data Structures' };
      const userId = auth.currentUser ? auth.currentUser.id : 'guest_user';

      let result;
      if (this.currentDiagnosis && (this.currentDiagnosis.misconceptionKey || this.currentDiagnosis.socraticQuestion)) {
        result = diagnosticEngine.evaluateSocraticDynamic(this.currentDiagnosis, reasoningText);
      } else {
        result = diagnosticEngine.evaluateSocratic(
          this.currentQuestionId,
          this.currentSocraticStage,
          reasoningText
        );
      }

      this.hideLoading();

      if (result.status === 'MISCONCEPTION_PERSISTS') {
        if (auth.currentUser) {
          const concept = (this.currentDiagnosis && this.currentDiagnosis.concept) || qData.concept;
          const key = (this.currentDiagnosis && this.currentDiagnosis.misconceptionKey) || 'abstract_vs_implementation';
          await db.updateMisconceptionStatus(userId, concept, key, 'Persisting');
        }

        feedbackContainer.innerHTML = `
          <div class="diagnosis-card state-persists" style="margin: 0;">
            <span class="status-badge">Misconception persists</span>
            <p class="diagnosis-text">${result.explanation}</p>
            <div style="margin-top: 0.85rem; padding-top: 0.85rem; border-top: 1px solid var(--pastel-amber-border);">
              <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--pastel-amber-text); margin-bottom: 0.25rem;">
                Next Guided Question:
              </div>
              <div style="font-weight: 600; color: var(--text-primary); font-size: 0.96rem;">
                &ldquo;${result.nextQuestion}&rdquo;
              </div>
            </div>
          </div>
        `;
        if (result.nextStageIndex !== undefined) {
          this.currentSocraticStage = result.nextStageIndex;
        }
      } else if (result.status === 'CONCEPT_UNDERSTOOD') {
        if (auth.currentUser) {
          const concept = (this.currentDiagnosis && this.currentDiagnosis.concept) || qData.concept;
          const key = (this.currentDiagnosis && this.currentDiagnosis.misconceptionKey) || 'abstract_vs_implementation';
          await db.updateMisconceptionStatus(userId, concept, key, 'Improving');
        }

        feedbackContainer.innerHTML = `
          <div class="diagnosis-card state-understood" style="margin: 0 0 1rem 0;">
            <span class="status-badge" style="background: #D1FAE5; color: #065F46;">Concept understood</span>
            <p class="diagnosis-text">${result.explanation}</p>
            <div style="font-size: 0.84rem; color: var(--pastel-emerald-text); font-weight: 500;">
              Next step: Verify your understanding with an independent transfer question.
            </div>
          </div>
        `;

        this.renderTransferQuestion(qData, this.currentDiagnosis);
      }
    }

    renderTransferQuestion(qData, diagnosis) {
      const existing = document.getElementById('transfer-container');
      if (existing) existing.remove();

      this.currentDiagnosis = diagnosis || this.currentDiagnosis;
      const transferPrompt = (this.currentDiagnosis && this.currentDiagnosis.transferQuestion && this.currentDiagnosis.transferQuestion.prompt)
        || (qData && qData.transferQuestion && qData.transferQuestion.prompt)
        || "How would this principle apply in a different scenario?";
      const transferPlaceholder = (this.currentDiagnosis && this.currentDiagnosis.transferQuestion && this.currentDiagnosis.transferQuestion.placeholder)
        || (qData && qData.transferQuestion && qData.transferQuestion.placeholder)
        || "Explain your transfer reasoning...";

      const transferCard = document.createElement('div');
      transferCard.id = 'transfer-container';
      transferCard.className = 'transfer-section';
      transferCard.innerHTML = `
        <span class="transfer-badge">Transfer Verification</span>
        <h4 class="transfer-prompt">&ldquo;${transferPrompt}&rdquo;</h4>
        
        <div class="form-group">
          <textarea id="input-transfer" class="text-area" placeholder="${transferPlaceholder}"></textarea>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.78rem; color: var(--text-muted);">
            Tests whether understanding generalizes to other situations
          </span>
          <button type="button" class="btn-primary" id="btn-submit-transfer" style="padding: 0.5rem 1.25rem;">
            Submit
          </button>
        </div>

        <div id="transfer-feedback" style="margin-top: 1rem;"></div>
      `;

      this.practiceInteractiveContainer.appendChild(transferCard);

      const inputTransfer = transferCard.querySelector('#input-transfer');
      const btnSubmit = transferCard.querySelector('#btn-submit-transfer');
      const feedbackBox = transferCard.querySelector('#transfer-feedback');

      btnSubmit.addEventListener('click', async () => {
        const text = inputTransfer.value.trim();
        if (!text) return;

        this.showLoading('Verifying transfer...');

        let evalResult;
        if (this.currentDiagnosis && this.currentDiagnosis.transferQuestion) {
          evalResult = diagnosticEngine.evaluateTransferDynamic(this.currentDiagnosis, text);
        } else {
          evalResult = diagnosticEngine.evaluateTransfer(this.currentQuestionId, text);
        }
        const userId = auth.currentUser ? auth.currentUser.id : 'guest_user';
        const concept = (this.currentDiagnosis && this.currentDiagnosis.concept) || (qData && qData.concept) || 'Data Structures';
        const miscKey = (this.currentDiagnosis && this.currentDiagnosis.misconceptionKey) || (qData && qData.misconceptionKey) || 'abstract_vs_implementation';

        if (auth.currentUser) {
          await db.recordRecovery(userId, concept, evalResult.verified, evalResult.explanation, this.currentQuestionId || 'dynamic_q');
          if (evalResult.verified) {
            await db.markQuestionCompleted(userId, concept, this.currentQuestionId || 'dynamic_q', 'verified');
            await db.updateMisconceptionStatus(
              userId,
              concept,
              miscKey,
              'Recovered',
              evalResult.explanation
            );
          } else {
            await db.updateMisconceptionStatus(
              userId,
              concept,
              miscKey,
              'Needs Practice',
              evalResult.explanation
            );
          }
        }

        this.hideLoading();

        if (evalResult.verified) {
          feedbackBox.innerHTML = `
            <div class="diagnosis-card state-understood" style="margin: 0;">
              <span class="status-badge" style="background: #D1FAE5; color: #065F46;">Recovery verified</span>
              <p class="diagnosis-text">${evalResult.explanation}</p>
              <div style="margin-top: 0.85rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <button class="btn-primary" id="btn-next-question-flow" style="background: #059669;">
                  Continue Next Question &rarr;
                </button>
                <button class="btn-secondary" id="btn-back-to-topics-from-rec">
                  &larr; Back to Topics
                </button>
                <button class="btn-secondary" id="btn-view-progress">
                  View Diagnostic Profile &rarr;
                </button>
              </div>
            </div>
          `;

          feedbackBox.querySelector('#btn-next-question-flow')?.addEventListener('click', () => {
            const allTopicQ = Object.values(QUESTION_BANK).filter(q => q.concept === concept);
            const currentIdx = allTopicQ.findIndex(q => q.id === this.currentQuestionId);
            if (currentIdx !== -1 && currentIdx + 1 < allTopicQ.length) {
              this.loadPracticeQuestion(allTopicQ[currentIdx + 1].id);
            } else {
              const customQEl = document.getElementById('user-custom-question');
              if (customQEl) customQEl.value = '';
              this.practiceAnswerInput.value = '';
              this.practiceReasoningInput.value = '';
              const confEl = document.getElementById('practice-confidence-input');
              if (confEl) confEl.value = '';
              this.practiceInteractiveContainer.innerHTML = '';
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          });

          feedbackBox.querySelector('#btn-back-to-topics-from-rec')?.addEventListener('click', () => {
            window.location.hash = auth.currentUser ? '#student-home' : '#practice';
          });

          feedbackBox.querySelector('#btn-view-progress')?.addEventListener('click', () => {
            window.location.hash = '#progress';
          });
        } else {
          feedbackBox.innerHTML = `
            <div class="diagnosis-card state-persists" style="margin: 0;">
              <span class="status-badge">${evalResult.heading || 'Misconception persists'}</span>
              <p class="diagnosis-text">${evalResult.explanation}</p>
            </div>
          `;
        }
      });
    }

    // Student Home Dashboard Renderer (Requirements 15 & 16)
    async renderStudentHome() {
      if (!auth.currentUser) return;
      const userId = auth.currentUser.id;

      document.getElementById('student-greeting').textContent = `Welcome back, ${auth.currentUser.full_name}`;

      const interactions = await db.getInteractions(userId);

      const continueBox = document.getElementById('student-home-continue-box');
      const recList = document.getElementById('student-home-recommended-list');
      const summaryBox = document.getElementById('student-home-summary-box');

      // Your Diagnostic Activity Box
      continueBox.innerHTML = `
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1.25rem; text-align: left;">
          <p style="font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Ready to test your understanding?</p>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.95rem;">Bring your own question, explain your answer and reasoning, and MisconceptionOS will analyze what your reasoning reveals.</p>
          <button class="btn-primary" id="btn-home-analyze-now" style="font-size: 0.9rem; padding: 0.55rem 1.25rem;">
            Analyze My Understanding &rarr;
          </button>
        </div>
      `;
      continueBox.querySelector('#btn-home-analyze-now').addEventListener('click', () => {
        window.location.hash = '#practice';
      });

      // Recent Analysis List
      if (interactions.length === 0) {
        recList.innerHTML = `
          <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.95rem; border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
            <p style="margin-bottom: 0.5rem; font-weight: 600; color: var(--text-secondary);">No diagnostic history yet.</p>
            <p>Your analyzed questions and recovery results will appear here.</p>
          </div>
        `;
      } else {
        const recent = interactions.slice(-5).reverse();
        recList.innerHTML = recent.map(int => `
          <div class="rec-item" style="cursor: default;">
            <div style="width: 100%;">
              <div class="rec-item-title" style="font-size: 0.95rem; margin-bottom: 0.2rem;">${int.concept || 'General'}</div>
              <div class="rec-item-desc" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90%;">Answered on: ${new Date(int.timestamp).toLocaleDateString()}</div>
              <div class="rec-item-desc" style="margin-top: 0.4rem; font-weight: 500; color: ${int.diagnostic_status === 'misconception' ? 'var(--pastel-red-text)' : 'var(--text-secondary)'};">
                Status: ${int.diagnostic_status}
              </div>
            </div>
          </div>
        `).join('');
      }

      // Summary Box
      let activeCount = 0;
      let recoveredCount = 0;
      const misconceptions = await db.getMisconceptions(userId);
      misconceptions.forEach(m => {
        if (m.status === 'Recovered') recoveredCount++;
        else activeCount++;
      });

      summaryBox.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
          <div class="metric-pill" style="padding: 0.75rem;">
            <span class="metric-num" style="font-size: 1.35rem;">${interactions.length}</span>
            <span class="metric-desc" style="font-size: 0.76rem;">Total Analyses</span>
          </div>
          <div class="metric-pill pill-recovered" style="padding: 0.75rem;">
            <span class="metric-num" style="font-size: 1.35rem; color: var(--pastel-emerald-text);">${recoveredCount}</span>
            <span class="metric-desc" style="font-size: 0.76rem;">Concepts Verified</span>
          </div>
          <div class="metric-pill pill-active" style="padding: 0.75rem;">
            <span class="metric-num" style="font-size: 1.35rem; color: var(--pastel-rose-text);">${activeCount}</span>
            <span class="metric-desc" style="font-size: 0.76rem;">Active Misconceptions</span>
          </div>
        </div>
      `;
    }
  }

  window.__appDb = db;
  window.__appAuth = auth;
  window.__diagnosticEngine = diagnosticEngine;
  window.__DiagnosticEngine = DiagnosticEngine;
  window.__QUESTION_BANK = QUESTION_BANK;
  window.__MISCONCEPTION_CATALOG = MISCONCEPTION_CATALOG;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__appInstance = new MisconceptionApp();
      window.app = window.__appInstance;
    });
  } else {
    window.__appInstance = new MisconceptionApp();
    window.app = window.__appInstance;
  }
})();
