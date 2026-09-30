// MisconceptionOS - Main Application Controller
import { questionsData } from './data/questions.js';
import { learnerState } from './core/learnerState.js';
import { diagnosticEngine } from './core/diagnostic.js';
import { interventionManager } from './core/intervention.js';
import { recoveryVerifier } from './core/recovery.js';

class MisconceptionApp {
  constructor() {
    this.currentQuestionId = 'stack_underflow';
    this.currentSocraticStage = 0;
    this.latestDiagnosis = null;

    this.initDOMElements();
    this.bindEvents();
    this.loadQuestion(this.currentQuestionId);
    this.renderProgressView();
    this.updateEvidencePanel();
  }

  initDOMElements() {
    // Navigation
    this.navLinks = document.querySelectorAll('.nav-link');
    this.views = {
      home: document.getElementById('view-home'),
      practice: document.getElementById('view-practice'),
      progress: document.getElementById('view-progress')
    };

    // Practice Elements
    this.conceptTabs = document.querySelectorAll('.concept-tab');
    this.conceptHeading = document.getElementById('current-concept-heading');
    this.questionPrompt = document.getElementById('question-prompt');
    this.questionContext = document.getElementById('question-context');
    this.practiceForm = document.getElementById('practice-form');
    this.inputAnswer = document.getElementById('input-answer');
    this.inputReasoning = document.getElementById('input-reasoning');
    this.btnSubmitAnswer = document.getElementById('btn-submit-answer');
    this.resultsContainer = document.getElementById('interactive-results-container');

    // Home CTA
    this.btnStartPractice = document.getElementById('btn-start-practice');
    this.navBrand = document.getElementById('nav-brand');

    // Progress Elements
    this.conceptsList = document.getElementById('history-concepts-list');
    this.miscList = document.getElementById('history-misconceptions-list');
    this.recoveryList = document.getElementById('history-recovery-list');
    this.btnResetHistory = document.getElementById('btn-reset-history');

    // Evidence Drawer
    this.evidenceDrawer = document.getElementById('evidence-drawer');
    this.btnToggleEvidence = document.getElementById('btn-toggle-evidence');
    this.drawerHeader = document.getElementById('evidence-drawer-header');
    this.evConcept = document.getElementById('ev-concept');
    this.evReasoning = document.getElementById('ev-reasoning');
    this.evMisconception = document.getElementById('ev-misconception');
    this.evRelated = document.getElementById('ev-related');
    this.evIntervention = document.getElementById('ev-intervention');
    this.evRecovery = document.getElementById('ev-recovery');

    // Reviewer Quick Preset Buttons
    this.btnDemoTest1 = document.getElementById('btn-demo-test1');
    this.btnDemoTest2 = document.getElementById('btn-demo-test2');
    this.btnDemoTest3 = document.getElementById('btn-demo-test3');
    this.btnDemoTest4 = document.getElementById('btn-demo-test4');
    this.btnDemoTest5 = document.getElementById('btn-demo-test5');
    this.btnDemoTest6 = document.getElementById('btn-demo-test6');
  }

  bindEvents() {
    // Navigation
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        this.switchView(view);
      });
    });

    this.navBrand.addEventListener('click', (e) => {
      e.preventDefault();
      this.switchView('home');
    });

    if (this.btnStartPractice) {
      this.btnStartPractice.addEventListener('click', () => {
        this.switchView('practice');
      });
    }

    // Concept Selector Tabs
    this.conceptTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const qId = e.currentTarget.getAttribute('data-concept');
        this.loadQuestion(qId);
      });
    });

    // Form submission
    this.practiceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAnswerSubmit();
    });

    // Evidence panel toggle
    const toggleEvidence = () => {
      this.evidenceDrawer.classList.toggle('open');
    };
    this.btnToggleEvidence.addEventListener('click', toggleEvidence);
    this.drawerHeader.addEventListener('click', toggleEvidence);

    // Progress reset
    this.btnResetHistory.addEventListener('click', () => {
      if (confirm("Reset learning history for testing?")) {
        learnerState.reset();
        this.renderProgressView();
        this.updateEvidencePanel();
        this.resultsContainer.innerHTML = '';
      }
    });

    // Preset Reviewer Tests
    this.bindReviewerTests();
  }

  switchView(viewName) {
    this.navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-view') === viewName);
    });

    Object.keys(this.views).forEach(key => {
      this.views[key].classList.toggle('active', key === viewName);
    });

    if (viewName === 'progress') {
      this.renderProgressView();
    }
  }

  loadQuestion(questionId) {
    this.currentQuestionId = questionId;
    this.currentSocraticStage = 0;
    this.latestDiagnosis = null;

    const q = questionsData[questionId];
    if (!q) return;

    this.conceptHeading.textContent = `Concept: ${q.concept}`;
    this.questionPrompt.textContent = `“${q.prompt}”`;
    this.questionContext.textContent = q.context;

    this.inputAnswer.value = '';
    this.inputAnswer.placeholder = q.answerPlaceholder;
    this.inputReasoning.value = '';
    this.inputReasoning.placeholder = q.reasoningPlaceholder;

    this.conceptTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-concept') === questionId);
    });

    this.resultsContainer.innerHTML = '';
    this.updateEvidencePanel();
  }

  handleAnswerSubmit() {
    const answer = this.inputAnswer.value.trim();
    const reasoning = this.inputReasoning.value.trim();
    const qData = questionsData[this.currentQuestionId];

    if (!answer || !reasoning) return;

    // Run diagnostic
    const diagnosis = diagnosticEngine.diagnose(
      this.currentQuestionId,
      qData.concept,
      answer,
      reasoning
    );
    this.latestDiagnosis = diagnosis;

    // Record interaction in learner state
    learnerState.recordInteraction(
      this.currentQuestionId,
      qData.concept,
      answer,
      reasoning,
      diagnosis
    );

    if (diagnosis.type === 'MISCONCEPTION_DETECTED') {
      learnerState.recordMisconception(
        qData.concept,
        diagnosis.misconceptionKey,
        diagnosis.title,
        diagnosis.underlyingConcept,
        answer,
        reasoning,
        qData.socraticStages[0]?.prompt || '',
        'detected'
      );
    }

    this.renderDiagnosis(diagnosis, qData, answer, reasoning);
    this.updateEvidencePanel();
  }

  renderDiagnosis(diagnosis, qData, answer, reasoning) {
    this.resultsContainer.innerHTML = '';

    // 1. If Insufficient Evidence
    if (diagnosis.type === 'INSUFFICIENT_EVIDENCE') {
      const card = document.createElement('div');
      card.className = 'diagnosis-card state-insufficient';
      card.innerHTML = `
        <span class="status-badge">${diagnosis.status}</span>
        <h4 class="diagnosis-headline">Clarification Needed</h4>
        <p class="diagnosis-text">${diagnosis.studentExplanation}</p>
      `;
      this.resultsContainer.appendChild(card);
      return;
    }

    // 2. If Concept Understood Immediately
    if (diagnosis.type === 'CONCEPT_UNDERSTOOD') {
      const card = document.createElement('div');
      card.className = 'diagnosis-card state-understood';
      card.innerHTML = `
        <span class="status-badge">${diagnosis.status}</span>
        <h4 class="diagnosis-headline">Accurate Reasoning</h4>
        <p class="diagnosis-text">${diagnosis.studentExplanation}</p>
        <span class="underlying-concept-pill">Concept: ${diagnosis.underlyingConcept}</span>
      `;
      this.resultsContainer.appendChild(card);
      return;
    }

    // 3. Misconception Detected (including Recurring or Different)
    const isRecurring = diagnosis.recurring && diagnosis.recurring.isRecurring;
    const card = document.createElement('div');
    card.className = `diagnosis-card ${isRecurring ? 'state-recurring' : 'state-misconception'}`;

    let recurringHtml = '';
    if (isRecurring) {
      recurringHtml = `
        <div class="recurring-comparison">
          <div style="font-weight: 600; font-size: 0.95rem; color: var(--pastel-purple-text); margin-bottom: 0.25rem;">
            Underlying concept to revisit:
          </div>
          <div style="font-size: 1.05rem; font-weight: 600; color: var(--text-primary);">
            ${diagnosis.recurring.underlyingConcept}
          </div>
          <div class="comparison-grid">
            <div class="comparison-col">
              <div class="col-label">${diagnosis.recurring.previousConcept} Question Reasoning</div>
              <div class="col-value">&ldquo;${diagnosis.recurring.previousEvidence.reasoning}&rdquo;</div>
            </div>
            <div class="comparison-col">
              <div class="col-label">${qData.concept} Question Reasoning</div>
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
      <h4 class="diagnosis-headline">${diagnosis.title}</h4>
      <p class="diagnosis-text">${diagnosis.studentExplanation}</p>
      <div>
        <span class="underlying-concept-pill">Underlying Misconception: ${diagnosis.underlyingConcept}</span>
      </div>
      ${recurringHtml}
    `;
    this.resultsContainer.appendChild(card);

    if (isRecurring) {
      const btnStrengthen = card.querySelector('#btn-strengthen-concept');
      if (btnStrengthen) {
        btnStrengthen.addEventListener('click', () => {
          this.renderSocraticSection(qData);
          btnStrengthen.disabled = true;
          btnStrengthen.textContent = 'Guiding Socratic Dialogue Active';
        });
      }
    }

    // Render Socratic Intervention unless it is recurring waiting for strengthen click
    if (!isRecurring && diagnosis.needsSocratic) {
      this.renderSocraticSection(qData);
    }
  }

  renderSocraticSection(qData) {
    // Remove any existing socratic container
    const existing = document.getElementById('socratic-container');
    if (existing) existing.remove();

    const stage = qData.socraticStages[this.currentSocraticStage];
    if (!stage) return;

    const socraticCard = document.createElement('div');
    socraticCard.id = 'socratic-container';
    socraticCard.className = 'card socratic-section';
    socraticCard.innerHTML = `
      <div class="socratic-header">Let&rsquo;s think about it.</div>
      <div class="socratic-prompt" id="socratic-prompt-text">&ldquo;${stage.prompt}&rdquo;</div>
      
      <div class="form-group" style="margin-top: 1rem;">
        <label class="form-label" for="input-socratic">Your reasoning:</label>
        <textarea 
          id="input-socratic" 
          class="text-area" 
          placeholder="${stage.placeholder}" 
          style="min-height: 80px;"
        ></textarea>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.85rem;">
        <button type="button" class="reviewer-btn" id="btn-socratic-wrong-test" style="font-size: 0.78rem;">
          Fill: Still-wrong reasoning ("Yes, because an empty stack should always return -1.")
        </button>
        <button type="button" class="reviewer-btn" id="btn-socratic-right-test" style="font-size: 0.78rem;">
          Fill: Corrected reasoning ("-1 is not part of the definition...")
        </button>
      </div>

      <div class="form-actions">
        <span style="font-size: 0.8rem; color: var(--text-muted);">
          Evaluate how your reasoning changes
        </span>
        <button type="button" class="btn-submit" id="btn-submit-socratic">Submit</button>
      </div>

      <div id="socratic-response-feedback" style="margin-top: 1.25rem;"></div>
    `;

    this.resultsContainer.appendChild(socraticCard);

    // Bind socratic events
    const inputSocratic = socraticCard.querySelector('#input-socratic');
    const btnSubmit = socraticCard.querySelector('#btn-submit-socratic');
    const btnWrong = socraticCard.querySelector('#btn-socratic-wrong-test');
    const btnRight = socraticCard.querySelector('#btn-socratic-right-test');

    btnWrong.addEventListener('click', () => {
      inputSocratic.value = "Yes, because an empty stack should always return -1.";
    });

    btnRight.addEventListener('click', () => {
      inputSocratic.value = "-1 is not part of the definition of a stack. It is one possible implementation choice. The important point is that an empty stack has no element to remove.";
    });

    btnSubmit.addEventListener('click', () => {
      this.handleSocraticSubmit(inputSocratic.value.trim());
    });
  }

  handleSocraticSubmit(reasoningText) {
    if (!reasoningText) return;

    const feedbackContainer = document.getElementById('socratic-response-feedback');
    const qData = questionsData[this.currentQuestionId];

    const result = interventionManager.evaluateSocraticResponse(
      this.currentQuestionId,
      this.currentSocraticStage,
      reasoningText
    );

    this.updateEvidencePanel(reasoningText, result.status);

    if (result.status === 'MISCONCEPTION_PERSISTS') {
      feedbackContainer.innerHTML = `
        <div class="diagnosis-card state-persists" style="margin-bottom: 0;">
          <span class="status-badge">Misconception persists</span>
          <p class="diagnosis-text">${result.explanation}</p>
          <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--pastel-amber-border);">
            <div style="font-size: 0.82rem; font-weight: 600; text-transform: uppercase; color: var(--pastel-amber-text); margin-bottom: 0.35rem;">
              Next Guided Question:
            </div>
            <div style="font-weight: 600; color: var(--text-primary); font-size: 0.98rem;">
              &ldquo;${result.nextQuestion}&rdquo;
            </div>
          </div>
        </div>
      `;
      this.currentSocraticStage = result.nextStageIndex;
    } else if (result.status === 'CONCEPT_UNDERSTOOD') {
      feedbackContainer.innerHTML = `
        <div class="diagnosis-card state-understood" style="margin-bottom: 1rem;">
          <span class="status-badge">Concept understood</span>
          <p class="diagnosis-text">${result.explanation}</p>
          <div style="font-size: 0.84rem; color: var(--pastel-emerald-text); font-weight: 500;">
            Next step: Verify your understanding with a transfer question.
          </div>
        </div>
      `;

      // Render Transfer Question Card
      this.renderTransferQuestion(qData);
    }
  }

  renderTransferQuestion(qData) {
    const existing = document.getElementById('transfer-container');
    if (existing) existing.remove();

    const transferCard = document.createElement('div');
    transferCard.id = 'transfer-container';
    transferCard.className = 'transfer-section';
    transferCard.innerHTML = `
      <span class="transfer-badge">Transfer Verification</span>
      <h4 class="transfer-prompt">&ldquo;${qData.transferQuestion.prompt}&rdquo;</h4>
      
      <div class="form-group">
        <textarea 
          id="input-transfer" 
          class="text-area" 
          placeholder="${qData.transferQuestion.placeholder}"
          style="min-height: 75px;"
        ></textarea>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 0.85rem;">
        <button type="button" class="reviewer-btn" id="btn-transfer-correct-fill" style="font-size: 0.78rem;">
          Fill: Correct response ("No, throwing an exception is an implementation choice...")
        </button>
      </div>

      <div class="form-actions">
        <span style="font-size: 0.8rem; color: var(--text-muted);">
          Checks whether the understanding transfers to new programming environments
        </span>
        <button type="button" class="btn-submit" id="btn-submit-transfer">Submit</button>
      </div>

      <div id="transfer-feedback" style="margin-top: 1rem;"></div>
    `;

    this.resultsContainer.appendChild(transferCard);

    const inputTransfer = transferCard.querySelector('#input-transfer');
    const btnSubmit = transferCard.querySelector('#btn-submit-transfer');
    const btnFillCorrect = transferCard.querySelector('#btn-transfer-correct-fill');
    const feedbackBox = transferCard.querySelector('#transfer-feedback');

    btnFillCorrect.addEventListener('click', () => {
      inputTransfer.value = "No, throwing an exception is just an implementation choice to report stack underflow. It does not contradict the abstract concept of underflow.";
    });

    btnSubmit.addEventListener('click', () => {
      const text = inputTransfer.value.trim();
      if (!text) return;

      const evalResult = recoveryVerifier.evaluateTransfer(this.currentQuestionId, text);
      this.updateEvidencePanel(text, evalResult.heading);

      if (evalResult.verified) {
        feedbackBox.innerHTML = `
          <div class="diagnosis-card state-understood" style="margin: 0;">
            <span class="status-badge" style="background: #D1FAE5; color: #065F46;">Recovery verified</span>
            <p class="diagnosis-text">${evalResult.explanation}</p>
            <div style="margin-top: 0.75rem;">
              <button class="btn-submit" id="btn-proceed-queue" style="background: #059669;">
                Next Concept: Practice Queue &rarr;
              </button>
            </div>
          </div>
        `;
        const btnQueue = feedbackBox.querySelector('#btn-proceed-queue');
        if (btnQueue) {
          btnQueue.addEventListener('click', () => {
            this.loadQuestion('queue_underflow');
          });
        }
      } else {
        feedbackBox.innerHTML = `
          <div class="diagnosis-card state-persists" style="margin: 0;">
            <span class="status-badge">${evalResult.heading}</span>
            <p class="diagnosis-text">${evalResult.explanation}</p>
          </div>
        `;
      }

      this.renderProgressView();
    });
  }

  renderProgressView() {
    const history = learnerState.getHistory();

    // 1. Concepts Practiced
    const conceptKeys = Object.keys(history.concepts);
    this.conceptsList.innerHTML = conceptKeys.map(name => {
      const c = history.concepts[name];
      const isPracticed = c.practiced;
      const statusBadge = isPracticed 
        ? `<span class="history-badge badge-verified">Practiced</span>` 
        : `<span class="history-badge" style="background: var(--bg-muted); color: var(--text-muted);">Not started</span>`;
      return `
        <div class="history-item">
          <div class="history-item-main">
            <span class="history-item-concept">${name}</span>
            <span class="history-item-subtitle">${isPracticed ? 'Reviewed in diagnostic practice' : 'Available in Data Structures curriculum'}</span>
          </div>
          <div>${statusBadge}</div>
        </div>
      `;
    }).join('');

    // 2. Misconceptions Encountered
    if (history.misconceptions.length === 0) {
      this.miscList.innerHTML = `
        <div class="empty-history">No misconceptions identified yet. Begin practice to analyze reasoning.</div>
      `;
    } else {
      // Group by misconceptionKey
      const grouped = {};
      history.misconceptions.forEach(m => {
        if (!grouped[m.misconceptionKey]) {
          grouped[m.misconceptionKey] = [];
        }
        grouped[m.misconceptionKey].push(m);
      });

      this.miscList.innerHTML = Object.keys(grouped).map(key => {
        const group = grouped[key];
        const first = group[0];
        const isRecurringAcrossConcepts = group.length > 1;
        const conceptsInvolved = [...new Set(group.map(x => x.concept))].join(' & ');

        const badgeClass = isRecurringAcrossConcepts ? 'badge-recurring' : 'badge-review';
        const badgeText = isRecurringAcrossConcepts ? 'Recurring Misconception' : 'Isolated Misconception';

        return `
          <div class="history-item" style="flex-direction: column; align-items: flex-start; gap: 0.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
              <span class="history-item-concept">${first.underlyingConcept}</span>
              <span class="history-badge ${badgeClass}">${badgeText}</span>
            </div>
            <div class="history-item-subtitle">
              Observed in: <strong>${conceptsInvolved}</strong>
            </div>
            <div style="font-size: 0.84rem; color: var(--text-muted); background: var(--bg-subtle); padding: 0.4rem 0.6rem; border-radius: 4px; width: 100%;">
              Latest status: <em>${group[group.length - 1].status}</em> &bull; &ldquo;${group[group.length - 1].evidence.reasoning.substring(0, 70)}...&rdquo;
            </div>
          </div>
        `;
      }).join('');
    }

    // 3. Recovery Verification
    const recoveryKeys = Object.keys(history.recoveryStatus);
    if (recoveryKeys.length === 0) {
      this.recoveryList.innerHTML = `
        <div class="empty-history">No transfer verifications completed yet.</div>
      `;
    } else {
      this.recoveryList.innerHTML = recoveryKeys.map(cName => {
        const r = history.recoveryStatus[cName];
        return `
          <div class="history-item">
            <div class="history-item-main">
              <span class="history-item-concept">${cName} Concept</span>
              <span class="history-item-subtitle">${r.notes}</span>
            </div>
            <span class="history-badge ${r.verified ? 'badge-verified' : 'badge-review'}">
              ${r.status}
            </span>
          </div>
        `;
      }).join('');
    }
  }

  updateEvidencePanel(customReasoning = null, statusOverride = null) {
    const qData = questionsData[this.currentQuestionId];
    this.evConcept.textContent = qData.concept;

    if (customReasoning) {
      this.evReasoning.textContent = customReasoning;
    } else if (this.inputReasoning && this.inputReasoning.value) {
      this.evReasoning.textContent = this.inputReasoning.value;
    } else {
      this.evReasoning.textContent = "No interaction yet";
    }

    if (this.latestDiagnosis) {
      this.evMisconception.textContent = this.latestDiagnosis.underlyingConcept || "None detected";
      if (this.latestDiagnosis.recurring && this.latestDiagnosis.recurring.isRecurring) {
        this.evRelated.textContent = `Yes — previous in ${this.latestDiagnosis.recurring.previousConcept} ("${this.latestDiagnosis.recurring.title}")`;
      } else {
        this.evRelated.textContent = "None in history";
      }
    }

    if (statusOverride) {
      this.evIntervention.textContent = `Socratic status: ${statusOverride}`;
    } else if (this.latestDiagnosis && this.latestDiagnosis.needsSocratic) {
      this.evIntervention.textContent = "Socratic guidance active";
    } else {
      this.evIntervention.textContent = "None required";
    }

    const rec = learnerState.state.recoveryStatus[qData.concept];
    if (rec) {
      this.evRecovery.textContent = rec.status;
    } else {
      this.evRecovery.textContent = "Not evaluated yet";
    }
  }

  bindReviewerTests() {
    // TEST 1: Stack + "return -1" reasoning -> Misconception detected
    this.btnDemoTest1.addEventListener('click', () => {
      this.switchView('practice');
      this.loadQuestion('stack_underflow');
      this.inputAnswer.value = "It returns -1.";
      this.inputReasoning.value = "There is no element to remove, so the function should return -1 to show that the stack is empty.";
      this.handleAnswerSubmit();
    });

    // TEST 2: Same misconception after Socratic question -> Misconception persists
    this.btnDemoTest2.addEventListener('click', () => {
      this.switchView('practice');
      this.loadQuestion('stack_underflow');
      this.inputAnswer.value = "It returns -1.";
      this.inputReasoning.value = "There is no element to remove, so the function should return -1 to show that the stack is empty.";
      this.handleAnswerSubmit();

      setTimeout(() => {
        const inputSocratic = document.getElementById('input-socratic');
        if (inputSocratic) {
          inputSocratic.value = "Yes, because an empty stack should always return -1.";
          this.handleSocraticSubmit(inputSocratic.value);
        }
      }, 50);
    });

    // TEST 3: Corrected reasoning -> Concept understood
    this.btnDemoTest3.addEventListener('click', () => {
      this.switchView('practice');
      this.loadQuestion('stack_underflow');
      this.inputAnswer.value = "It returns -1.";
      this.inputReasoning.value = "There is no element to remove, so the function should return -1 to show that the stack is empty.";
      this.handleAnswerSubmit();

      setTimeout(() => {
        const inputSocratic = document.getElementById('input-socratic');
        if (inputSocratic) {
          inputSocratic.value = "-1 is not part of the definition of a stack. It is one possible implementation choice. The important point is that an empty stack has no element to remove.";
          this.handleSocraticSubmit(inputSocratic.value);
        }
      }, 50);
    });

    // TEST 4: Transfer question -> Recovery verified
    this.btnDemoTest4.addEventListener('click', () => {
      this.switchView('practice');
      this.loadQuestion('stack_underflow');
      this.inputAnswer.value = "It returns -1.";
      this.inputReasoning.value = "There is no element to remove, so the function should return -1 to show that the stack is empty.";
      this.handleAnswerSubmit();

      setTimeout(() => {
        const inputSocratic = document.getElementById('input-socratic');
        if (inputSocratic) {
          inputSocratic.value = "-1 is not part of the definition of a stack. It is one possible implementation choice. The important point is that an empty stack has no element to remove.";
          this.handleSocraticSubmit(inputSocratic.value);

          setTimeout(() => {
            const inputTransfer = document.getElementById('input-transfer');
            const btnSubmitTransfer = document.getElementById('btn-submit-transfer');
            if (inputTransfer && btnSubmitTransfer) {
              inputTransfer.value = "No, throwing an exception is just an implementation choice to report stack underflow. It does not contradict the abstract concept of underflow.";
              btnSubmitTransfer.click();
            }
          }, 50);
        }
      }, 50);
    });

    // TEST 5: Queue + similar reasoning -> Recurring misconception detected
    this.btnDemoTest5.addEventListener('click', () => {
      // Ensure Stack misconception is seeded in history first
      learnerState.recordMisconception(
        "Stack",
        "abstract_vs_implementation",
        "Abstract Behavior vs Implementation Behavior",
        "Abstract behavior vs implementation behavior",
        "It returns -1.",
        "There is no element to remove, so the function should return -1 to show that the stack is empty.",
        "If another stack implementation throws an exception...",
        "detected"
      );

      this.switchView('practice');
      this.loadQuestion('queue_underflow');
      this.inputAnswer.value = "It returns -1.";
      this.inputReasoning.value = "An empty data structure should return -1 when we try to remove something.";
      this.handleAnswerSubmit();
    });

    // TEST 6: Stack principle + FIFO reasoning -> Different misconception detected
    this.btnDemoTest6.addEventListener('click', () => {
      this.switchView('practice');
      this.loadQuestion('stack_principle');
      this.inputAnswer.value = "FIFO";
      this.inputReasoning.value = "The first element added should be the first element removed.";
      this.handleAnswerSubmit();
    });
  }
}

// Initialize on DOM load
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    new MisconceptionApp();
  });
} else {
  new MisconceptionApp();
}
