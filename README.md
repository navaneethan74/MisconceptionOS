# MisconceptionOS

## Team

### Insight Innovation

#### Team Leader
- **Name:** Navaneethan VK
- **Phone:** 9141604043
- **Email:** navaneethan7407@gmail.com
- **College:** Bannari Amman Institute of Technology
- **Department:** Artificial Intelligence and Data Science

#### Team Member 2
- **Name:** Nakshatra S
- **Phone:** 7397755959
- **Email:** nakshatrasureshkumar@gmail.com
- **College:** Bannari Amman Institute of Technology
- **Department:** Artificial Intelligence and Data Science

#### Team Member 3
- **Name:** Kevin John Victor U
- **Phone:** 6383666949
- **Email:** kevinjv.u2k7@gmail.com
- **College:** Bannari Amman Institute of Technology
- **Department:** Computer Science and Engineering

#### Team Member 4
- **Name:** Kavya K
- **Phone:** 7604905174
- **Email:** kavyakanakaraj.2007@gmail.com
- **College:** Bannari Amman Institute of Technology
- **Department:** Computer Science and Engineering


## Overview
**MisconceptionOS** is an intelligent pedagogical diagnostic system engineered to analyze student cognitive reasoning in college-level academic and technical subjects. Unlike traditional learning management systems that merely check whether a student selected the right answer or repeated key phrases, MisconceptionOS examines *why* a student arrived at their conclusion. By decoupling answer correctness from underlying mental models, the platform identifies root misconceptions, knowledge gaps, and reasoning gaps, provides adaptive Socratic intervention, and verifies durable cognitive recovery through independent transfer challenges.

## Problem Statement
Standard computer science and engineering assessments rely heavily on binary correctness: either the test suite passes or it fails; either the multiple-choice option is right or it is wrong. This leaves critical learning blind spots:
1. **False Positives (Lucky Guesses / Flawed Reasoning)**: A student may guess the correct time complexity (e.g., $O(1)$) by thinking that an array "shifts elements instantly," harboring a fundamental misunderstanding of memory architectures.
2. **False Negatives (Superficial Syntax Mistakes)**: A student may understand pointer reference mechanics perfectly but make a minor off-by-one naming error.
3. **Inability to Diagnose "I Don't Know"**: Traditional systems treat ignorance as a failure rather than distinguishing between an absent prerequisite (knowledge gap) and hesitation in logical deduction (reasoning gap).
4. **Superficial Interventions**: Providing the correct answer immediately short-circuits reflection, failing to dispel persistent underlying misconceptions.

## Solution
MisconceptionOS addresses these challenges by:
- Inspecting student reasoning explanations directly through dynamic semantic analysis.
- Differentiating between 6 key cognitive states:
  - **Case A**: Correct Answer + Correct Reasoning $\rightarrow$ Validated Understanding.
  - **Case B**: Correct Answer + Flawed Reasoning $\rightarrow$ Latent Misconception / Reasoning Flaw.
  - **Case C**: Wrong Answer + Flawed Reasoning $\rightarrow$ Explicit Conceptual Misconception.
  - **Case D**: "I don't know" $\rightarrow$ Knowledge Gap (progressive guided concept refresher).
  - **Case E**: Correct Answer + "I don't know why" $\rightarrow$ Reasoning Gap (mechanistic exploration).
  - **Case F**: Hesitant / Uncertain Reasoning $\rightarrow$ Socratic Clarification Prompt (no premature diagnosis).
- Guiding the learner through multi-stage Socratic dialogue that challenges the flawed assumption without giving away the answer.
- Verifying recovery using an isomorphic transfer scenario before marking a concept understood.
- Retaining persistent diagnostic memory across topics to detect recurring cognitive patterns.

## Key Features
- **Dynamic Multi-Subject Analysis**: Accepts arbitrary college-level academic questions across computer science and engineering disciplines.
- **Academic Scope Gatekeeping**: Validates questions against academic and technical domains, rejecting out-of-scope non-academic queries (e.g., sports, entertainment, casual chat) with clear pedagogical guidance.
- **Dual Diagnostic Intelligence**: Features an integrated local semantic diagnostic engine with optional Google Gemini API LLM evaluation fallback.
- **Cognitive Diagnostic Memory**: Tracks first detected timestamp, last detected timestamp, occurrence count, affected concepts, resolution status, and recovery histories in IndexedDB.
- **Recurring Misconception Detection**: Correlates flawed mental models across distinct topics (e.g., confusing abstraction with implementation across stacks, queues, and linked lists).
- **Two-Tier Role Workflows**: Tailored, distraction-free experiences for both **Students** (diagnostics, Socratic dialogues, profile mastery) and **Teachers** (cohort analytics, evidence inspector, misconception heatmaps).
- **Zero-Crash Resilience**: Built-in 8-second async diagnostic timeouts, 10-second modal fail-safes, non-blocking fallback rendering, and form input validation.

## How It Works

```
Question (Dynamic or Curated)
      │
      ▼
Answer + Reasoning + Confidence
      │
      ▼
Cognitive State Diagnosis (Case A - F & Scope Check)
      │
      ├───────────────────────┬────────────────────────┐
      ▼                       ▼                        ▼
[Correct Reasoning]    [Knowledge / Reasoning Gap]  [Misconception Detected]
      │                       │                        │
      │                       ▼                        ▼
      │              [Guided Refresher]        [Socratic Intervention]
      │                                                │
      │                                                ▼
      │                                       [Corrected Reasoning]
      │                                                │
      │                                                ▼
      └───────────────────────────────────────► [Transfer Verification]
                                                       │
                                                       ▼
                                            [Recovery Verified Status]
                                                       │
                                                       ▼
                                            [Diagnostic Memory Store]
```

1. **Question**: Learner enters an academic question or selects a curated concept.
2. **Answer**: Learner inputs their proposed answer.
3. **Reasoning**: Learner explains their thought process and underlying justification.
4. **Diagnosis**: Engine evaluates domain validity, answer accuracy, reasoning coherence, and cognitive alignment.
5. **Socratic Intervention**: If a misconception is identified, targeted non-prescriptive questions prompt the learner to resolve the contradiction.
6. **Recovery Verification**: Learner must demonstrate conceptual mastery on an independent transfer problem before recovery is declared.
7. **Diagnostic Memory**: Interactions and cognitive patterns are saved to the persistent learner history.

## Supported Academic Scope
MisconceptionOS is explicitly calibrated for **college-level academic and technical coursework**, including:
- **Data Structures**: Stacks, Queues, Linked Lists, Binary Search Trees, Heaps, Hash Tables, Graphs.
- **Algorithms**: Asymptotic Analysis ($O, \Omega, \Theta$), Sorting, Recursion, Dynamic Programming, Graph Traversals.
- **Database Management Systems (DBMS)**: Normalization (1NF through BCNF), ACID Properties, Transactions, Indexing, Joins.
- **Operating Systems**: Deadlock Detection and Avoidance, Process Synchronization, Virtual Memory, Paging, Scheduling.
- **Computer Networks**: OSI & TCP/IP Layers, Routing Protocols, Flow & Congestion Control, TCP vs. UDP.
- **Object-Oriented Programming (OOP)**: Inheritance vs. Composition, Polymorphism, Encapsulation, Abstract Data Types.
- **Programming Concepts**: Memory allocation, pointers vs. references, recursion, scope in Java, Python, C++.
- **Machine Learning & Artificial Intelligence**: Overfitting vs. Underfitting, Bias-Variance Tradeoff, Loss Functions, Gradient Descent.
- **Computer Architecture**: Pipelining, Cache Memory, CPU Registers, Instruction Cycles.
- **Discrete Mathematics**: Logic, Set Theory, Combinatorics, Graph Theory, Proofs.

### Out-of-Scope Detection
Non-academic or off-topic inputs (e.g., sports, trivia, greeting messages, casual chat) are identified and rejected with the standard message:
> **Outside supported scope**  
> MisconceptionOS is designed to diagnose reasoning in college-level academic subjects. Please enter a study-related question.

## Student Workflow
1. **Access**: Navigate to the platform; log in with student credentials or continue as a demo student.
2. **Analyze / Practice**:
   - Access via the **Analyze** or **Start Practice** navigation items.
   - Enter an academic question (e.g., *"What is the time complexity of deleting from the middle of a Singly Linked List given only a pointer to that node?"*).
   - Enter your answer and your step-by-step reasoning.
   - Select your confidence level (High, Moderate, Low, or Not Sure).
3. **Receive Diagnosis**:
   - Immediate breakdown distinguishing what you understand from where your mental model diverges.
4. **Socratic Dialogue**:
   - Respond to targeted counter-examples and guided questions.
5. **Transfer Verification**:
   - Apply the reconstructed concept to a novel transfer case.
6. **Diagnostic Profile & History**:
   - View cognitive mastery percentages, resolved misconceptions, and ongoing learning recommendations in the **Profile** and **History** tabs.

## Teacher Workflow
1. **Access**: Sign in using educator credentials (`teacher@misconceptionos.edu`).
2. **Dashboard Overview**:
   - View aggregated cohort metrics: active learners, identified misconceptions, recurring patterns, and verified recoveries.
3. **Learner Evidence Inspector**:
   - Drill down into specific student records to inspect full reasoning transcripts, answers, and Socratic reflection submissions.
4. **Misconception Heatmap**:
   - Identify common cognitive stumbling blocks across concepts to tailor in-class instruction.
5. **Pedagogical Privacy Safeguard**:
   - Raw model scratchpads/hidden chains-of-thought are kept private; only actionable student evidence and pedagogical diagnoses are surfaced.

## AI/LLM Architecture
MisconceptionOS features a hybrid architecture designed for zero downtime and low latency:
1. **Dynamic Prompt Construction**: When an external LLM (e.g., Gemini) is configured via API key, the system structures the user's Question, Answer, Reasoning, Confidence, and prior student interaction history into an evidence-based pedagogical rubric.
2. **Semantic Verification & Fallback Engine**: If no API key is supplied or when offline, MisconceptionOS runs its built-in rule-based semantic inference engine. It extracts:
   - Terminology relevance and scope indicators.
   - Structural reasoning patterns (e.g., whether the rationale actually proves the conclusion or merely restates it).
   - Invariant contradictions (e.g., equating physical array continuity with logical node references).
3. **Structured Schema Output**: Diagnoses conform to a strict schema containing:
   - `concept`, `subconcept`, `status`, `answerAssessment`, `reasoningAssessment`, `title`, `whatYouUnderstand`, `studentExplanation`, `socraticQuestion`, `transferQuestion`, and `recurring`.

## Technology Stack
- **Frontend Architecture**: Modern Semantic HTML5, Vanilla JavaScript (ES2022+), Modular MVC Pattern.
- **Styling**: Native CSS3 with custom variables, CSS Grid, Flexbox, glassmorphism accents, and accessible contrast ratios.
- **Client Storage & Persistence**: IndexedDB API (`DatabaseEngine`) providing offline-first schema-migrated relational storage.
- **Security & Cryptography**: Native Web Cryptography API (`crypto.subtle`) implementing PBKDF2 key derivation with unique per-user salts and SHA-256 password hashing.
- **LLM / AI Integration**: Google Gemini API client integration (REST) with automatic local semantic fallback.

## Database
Client-side persistence is implemented via browser IndexedDB under the database name `MisconceptionOS_DB` (Version 2), organized into 5 relational object stores:
1. `users`: Stores user accounts, cryptographic salts, PBKDF2 password hashes, roles (`student`, `teacher`), and creation dates.
2. `interactions`: Stores full diagnostic attempts, submitted questions, answers, student reasoning, diagnostic outputs, and timestamps.
3. `misconceptions`: Stores identified conceptual errors with tracking fields:
   - `first_detected`: Initial identification timestamp.
   - `last_detected`: Most recent occurrence timestamp.
   - `occurrence_count`: Frequency of occurrence across topics.
   - `affected_concepts`: Array of subject domains impacted.
   - `status`: Current cognitive state (`Detected`, `Persisting`, `Improving`, `Recovered`).
   - `recovery_history`: Detailed audit log of recovery attempts and transfer responses.
4. `progress`: Stores concept-level completion tallies and question mastery states.
5. `recoveries`: Stores transfer verification logs and evidence-based recovery records.

## Project Structure
```
n:/m2/
├── index.html            # Main Single Page Application shell & navigation
├── app.js                # Core bundled controller, router, views & diagnostic engine
├── styles.css            # Complete design system, layouts, and responsive themes
├── package.json          # Project metadata, run scripts, and configuration
├── .gitignore            # Git exclusion rules for node_modules, .env, and caches
├── .env.example          # Safe configuration template without secrets
├── js/                   # Source modular components (pre-bundle modules)
│   ├── app.js            # Base application initializers
│   ├── auth.js           # Authentication & WebCrypto cryptography
│   ├── db.js             # IndexedDB database management
│   ├── diagnostic.js     # Diagnostic logic & Socratic evaluator
│   ├── questions.js      # Concept banks & transfer questions
│   ├── progress.js       # Student progress & mastery controller
│   └── teacher.js        # Educator dashboard & cohort analytics
└── README.md             # Production documentation & audit report
```

## Setup
To run MisconceptionOS locally:

1. **Clone the repository**:
   ```bash
   git clone [INSERT PUBLIC GITHUB URL HERE]
   cd misconceptionos
   ```

2. **Configure Environment Variables (Optional)**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(Note: The system works completely out-of-the-box using its built-in engine even without an API key).*

3. **Install Dependencies / Verify Node Environment**:
   ```bash
   npm run lint
   ```

## Environment Variables
The following environment variable names are supported (never commit real values to version control):
- `GEMINI_API_KEY`: *(Optional)* API key for Google Gemini LLM evaluation.
- `PORT`: *(Optional)* Port for local static server (defaults to 8080).

## Running the Application
MisconceptionOS is a zero-dependency web application that can be run with any standard local HTTP server:

- **Using Node.js / npx**:
  ```bash
  npx -y serve . -l 8080
  ```
  Or via npm script:
  ```bash
  npm run serve
  ```

- **Using Python 3**:
  ```bash
  python -m http.server 8080
  ```
  Or via npm script:
  ```bash
  npm start
  ```

- **Open in Browser**:
  Navigate to `http://localhost:8080` in Chrome, Firefox, Safari, or Edge.

### Default Reviewer Credentials
- **Student Account**:
  - Email: `student@misconceptionos.edu`
  - Password: `StudentPass123!`
- **Teacher Account**:
  - Email: `teacher@misconceptionos.edu`
  - Password: `TeacherPass123!`

## Testing
MisconceptionOS has been verified across the 8 required diagnostic and pedagogical test cases:

1. **Correct Answer + Correct Reasoning (Case A)**:
   - *Question*: "What is the time complexity of pushing an element onto an array-based stack with sufficient remaining capacity?"
   - *Answer*: "O(1)"
   - *Reasoning*: "It directly writes to the top index pointer and increments top without shifting any existing elements."
   - *Result*: Concept Understood; verified understanding.
2. **Correct Answer + Flawed Reasoning (Case B)**:
   - *Question*: "What is the time complexity of deleting a node from the middle of a Singly Linked List given only a pointer to that node?"
   - *Answer*: "O(1)"
   - *Reasoning*: "You just delete it and shift all the elements to the left by one position."
   - *Result*: Misconception Detected (`pointer_vs_array_memory_model`); shifts do not occur in linked node chains.
3. **Wrong Answer + Flawed Reasoning (Case C)**:
   - *Question*: "What occurs if you attempt to pop an element from an empty stack?"
   - *Answer*: "It returns -1 or null."
   - *Reasoning*: "In Java and C, functions always return -1 when a data structure has nothing in it."
   - *Result*: Misconception Detected (`abstract_vs_implementation`); language return convention confused with abstract stack underflow error condition.
4. **Knowledge Gap ("I Don't Know") (Case D)**:
   - *Input*: "I don't know the answer"
   - *Result*: Knowledge Gap identified without penalizing or inventing a misconception; launches 3-step progressive concept explanation flow.
5. **Reasoning Gap ("I Don't Know Why") (Case E)**:
   - *Input*: Answer provided + "I don't know why"
   - *Result*: Reasoning Gap identified; prompts structural refresher on the operational mechanism.
6. **Uncertain / Hesitant Reasoning (Case F)**:
   - *Input*: "Maybe O(1)? I guess it might be fast, but I'm not really sure."
   - *Result*: Exploration in Progress / Insufficient Evidence; requests clarification rather than assigning an incorrect diagnosis.
7. **Socratic Recovery & Transfer Verification**:
   - *Flow*: Guided question leads student to recognize pointer reassignment $\rightarrow$ Transfer challenge verifies applying reference updates to a doubly linked list $\rightarrow$ Marks "Recovery verified".
8. **Out-of-Scope Input**:
   - *Question*: "Who won the cricket World Cup?" or "Give me a birthday message."
   - *Result*: Polite rejection indicating the platform is focused on college-level academic coursework.

## Limitations
- **External LLM Latency & Quotas**: When utilizing external Gemini API keys, network latency or rate-limiting may occur. The system mitigates this with an 8-second timeout falling back gracefully to local semantic analysis.
- **Subject Depth**: The local offline rule-base has high semantic depth in Computer Science and Engineering (Data Structures, Algorithms, DBMS, OS, Networks, OOP, Discrete Math, ML). Interdisciplinary non-CS questions will rely on the Gemini API for comprehensive deep evaluation.
- **Client-Side Persistence**: IndexedDB data is persistent per browser instance. Clearing browser application cache resets local state unless synced to an external database.

## GitHub Repository
GitHub Repository:  
https://github.com/navaneethan74/MisconceptionOS  
*(Public Repository: AI-powered diagnostic system that analyzes student reasoning, detects misconceptions, and verifies learning recovery).*

## Demo / Live Application
Demo URL:  
[INSERT DEPLOYED APPLICATION URL HERE (e.g., GitHub Pages or Vercel)]  
*(Note: Please update this placeholder with your live deployed URL if available).*

## Team Summary
- **Team Name:** Insight Innovation
- **Leader:** Navaneethan VK (AI & DS)
- **Members:** Nakshatra S (AI & DS), Kevin John Victor U (CSE), Kavya K (CSE)
- **Institution:** Bannari Amman Institute of Technology

