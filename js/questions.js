// MisconceptionOS - Comprehensive Data Structures Question Bank
// 5 Questions per topic across 5 supported topics (25 questions total)
// Stack, Queue, Linked List, Searching, Trees

export const QUESTION_BANK = {
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

export const SUPPORTED_CONCEPTS = [
  "Stack",
  "Queue",
  "Linked List",
  "Searching",
  "Trees"
];
