// MisconceptionOS - Dynamic Student Progress & Learning History Controller
import { db } from './db.js';
import { SUPPORTED_CONCEPTS } from './questions.js';

export class ProgressController {
  constructor() {
    this.container = null;
  }

  async render(containerElement, userId) {
    this.container = containerElement;
    if (!this.container || !userId) return;

    // Load real data from database
    const state = await db.getLearnerState(userId);
    const misconceptions = await db.getMisconceptions(userId);
    const interactions = await db.getInteractions(userId);
    const recoveries = await db.getRecoveryResults(userId);
    const topicStats = await db.getTopicStats(userId);

    // If completely new student with no interaction
    if (interactions.length === 0 && misconceptions.length === 0) {
      this.renderEmptyState();
      return;
    }

    // 1. Calculate Dynamic Overall Progress from actual topic stats
    let totalPoints = 0;
    let recoveredCount = 0;

    const conceptProgressMap = {};
    SUPPORTED_CONCEPTS.forEach(concept => {
      const stat = topicStats[concept] || { progressPercent: 0, status: 'Not Started', verifiedCount: 0 };
      conceptProgressMap[concept] = { status: stat.status, progress: stat.progressPercent };
      totalPoints += stat.progressPercent;
      if (stat.verifiedCount > 0) recoveredCount++;
    });

    const maxPoints = SUPPORTED_CONCEPTS.length * 100;
    const overallPercentage = Math.round((totalPoints / maxPoints) * 100);

    // 2. Misconception Metrics
    const totalMisconceptions = misconceptions.length;
    const recoveredMisconceptions = misconceptions.filter(m => m.status === 'Recovered' || m.status === 'verified').length;
    const activeMisconceptions = misconceptions.filter(m => m.status !== 'Recovered' && m.status !== 'verified').length;
    
    // Check recurring misconceptions
    const miscKeyCounts = {};
    misconceptions.forEach(m => {
      miscKeyCounts[m.misconception_key] = (miscKeyCounts[m.misconception_key] || 0) + 1;
    });
    const recurringCount = Object.values(miscKeyCounts).filter(count => count > 1).length;

    // 3. Adaptive "Continue Learning" Recommendation
    const nextRecommendation = this.computeRecommendation(conceptProgressMap, misconceptions);

    // 4. Render Layout
    this.container.innerHTML = `
      <div class="progress-wrapper">

        <!-- Top Header & Summary Grid -->
        <div class="progress-hero-grid">
          
          <!-- Circular Progress Ring Card -->
          <div class="progress-card overall-ring-card">
            <h3 class="card-section-label">Overall Progress</h3>
            <div class="ring-container">
              <svg class="progress-ring" width="130" height="130" viewBox="0 0 130 130">
                <circle class="ring-bg" stroke="#E5E7EB" stroke-width="10" fill="transparent" r="54" cx="65" cy="65" />
                <circle class="ring-indicator" id="svg-ring-indicator" stroke="#2563EB" stroke-width="10" stroke-linecap="round" fill="transparent" r="54" cx="65" cy="65" />
              </svg>
              <div class="ring-label">
                <span class="ring-percentage">${overallPercentage}%</span>
                <span class="ring-subtext">Completed</span>
              </div>
            </div>
            <div class="overall-meta">
              <span>Concepts Recovered: <strong>${recoveredCount} / ${SUPPORTED_CONCEPTS.length}</strong></span>
            </div>
          </div>

          <!-- Misconception Summary Metrics Card -->
          <div class="progress-card metrics-card">
            <h3 class="card-section-label">Misconception Status</h3>
            <div class="metrics-grid">
              <div class="metric-pill">
                <span class="metric-num">${totalMisconceptions}</span>
                <span class="metric-desc">Total Detected</span>
              </div>
              <div class="metric-pill pill-active">
                <span class="metric-num">${activeMisconceptions}</span>
                <span class="metric-desc">Active</span>
              </div>
              <div class="metric-pill pill-recovered">
                <span class="metric-num">${recoveredMisconceptions}</span>
                <span class="metric-desc">Recovered</span>
              </div>
              <div class="metric-pill pill-recurring">
                <span class="metric-num">${recurringCount}</span>
                <span class="metric-desc">Recurring Patterns</span>
              </div>
            </div>

            <!-- Continue Learning Recommendation -->
            <div class="recommendation-box">
              <div class="rec-label">Adaptive Recommendation</div>
              <div class="rec-text">${nextRecommendation.text}</div>
              <button class="btn-rec-action" id="btn-rec-action" data-concept="${nextRecommendation.targetConcept}">
                ${nextRecommendation.actionText}
              </button>
            </div>
          </div>

        </div>

        <!-- Concept-Level Progress Section -->
        <div class="progress-card" style="margin-top: 1.5rem;">
          <h3 class="card-section-label">Topic-Level Learning Breakdown</h3>
          <div class="concept-breakdown-list">
            ${SUPPORTED_CONCEPTS.map(concept => {
              const stat = topicStats[concept] || {
                progressPercent: 0,
                questionsCompleted: 0,
                totalQuestions: 5,
                verifiedCount: 0,
                misconceptionsDetected: 0,
                recurringCount: 0,
                status: 'Not Started'
              };
              const badgeClass = this.getStatusBadgeClass(stat.status);
              return `
                <div class="concept-row" style="margin-bottom: 1.25rem;">
                  <div class="concept-row-header" style="margin-bottom: 0.35rem; align-items: flex-start;">
                    <div>
                      <span class="concept-row-title" style="font-weight: 700; font-size: 1.05rem;">${concept}</span>
                      <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.2rem;">
                        <strong>${stat.questionsCompleted} / ${stat.totalQuestions}</strong> completed &bull; 
                        <strong style="color: var(--pastel-emerald-text);">${stat.verifiedCount}</strong> verified &bull; 
                        <span>${stat.misconceptionsDetected} misconceptions ${stat.recurringCount > 0 ? `(${stat.recurringCount} recurring)` : ''}</span>
                      </div>
                    </div>
                    <span class="concept-row-badge ${badgeClass}">${stat.status} &bull; ${stat.progressPercent}%</span>
                  </div>
                  <div class="progress-bar-bg" style="height: 8px;">
                    <div class="progress-bar-fill" style="width: ${stat.progressPercent}%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Chronological Learning History -->
        <div class="progress-card" style="margin-top: 1.5rem;">
          <h3 class="card-section-label">Chronological Learning &amp; Evidence History</h3>
          <div class="history-timeline">
            ${this.renderTimeline(interactions, misconceptions, recoveries)}
          </div>
        </div>

      </div>
    `;

    // Animate SVG Ring
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

    // Bind recommendation action
    const btnRec = this.container.querySelector('#btn-rec-action');
    if (btnRec) {
      btnRec.addEventListener('click', (e) => {
        const concept = e.currentTarget.getAttribute('data-concept');
        const practiceTab = document.querySelector(`.concept-tab[data-concept-name="${concept}"]`) || document.querySelector('.concept-tab');
        if (practiceTab) practiceTab.click();
        const practiceNav = document.querySelector('.nav-link[data-view="practice"]');
        if (practiceNav) practiceNav.click();
      });
    }
  }

  computeRecommendation(conceptMap, misconceptions) {
    // 1. If any active recurring misconception exists
    const unrecovered = misconceptions.filter(m => m.status !== 'Recovered' && m.status !== 'verified');
    if (unrecovered.length > 0) {
      const first = unrecovered[0];
      return {
        text: `Strengthen ${first.concept} — review the concept of "${first.underlying_concept}".`,
        actionText: `Practice ${first.concept} →`,
        targetConcept: first.concept
      };
    }

    // 2. Check for unstarted concepts
    for (const concept of SUPPORTED_CONCEPTS) {
      if (conceptMap[concept].status === 'Not Started') {
        return {
          text: `Explore a new topic: Practice ${concept} to expand your foundational knowledge.`,
          actionText: `Start ${concept} →`,
          targetConcept: concept
        };
      }
    }

    // 3. All concepts covered
    return {
      text: "Outstanding work! All core concepts have verified recovery status.",
      actionText: "Review Stack Practice →",
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

    // Merge and sort chronological events
    const events = [];

    interactions.forEach(i => {
      events.push({
        type: 'interaction',
        timestamp: i.created_at,
        concept: i.concept,
        data: i
      });
    });

    misconceptions.forEach(m => {
      events.push({
        type: 'misconception',
        timestamp: m.updated_at || m.created_at,
        concept: m.concept,
        data: m
      });
    });

    recoveries.forEach(r => {
      events.push({
        type: 'recovery',
        timestamp: r.created_at,
        concept: r.concept,
        data: r
      });
    });

    events.sort((a, b) => b.timestamp - a.timestamp);

    return events.slice(0, 10).map(evt => {
      const dateStr = new Date(evt.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      if (evt.type === 'interaction') {
        return `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="timeline-title">${evt.concept}: Question Attempted</span>
                <span class="timeline-date">${dateStr}</span>
              </div>
              <div class="timeline-body">
                <strong>Your reasoning:</strong> &ldquo;${evt.data.reasoning}&rdquo;
              </div>
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
                <div><em>Underlying issue:</em> ${evt.data.underlying_concept}</div>
                ${evt.data.occurrence_count > 1 ? `<div style="color: var(--pastel-purple-text); font-weight: 500;">Recurring pattern (Encountered ${evt.data.occurrence_count} times)</div>` : ''}
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
                <p style="margin-top: 0.35rem; color: var(--text-secondary);">${evt.data.notes}</p>
              </div>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  renderEmptyState() {
    this.container.innerHTML = `
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

    const btn = this.container.querySelector('#btn-empty-start-practice');
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

export const progressController = new ProgressController();
