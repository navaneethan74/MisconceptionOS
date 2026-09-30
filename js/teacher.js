// MisconceptionOS - Teacher Dashboard & Student Pedagogical Inspector
import { db } from './db.js';

export class TeacherController {
  constructor() {
    this.currentStudentId = null;
  }

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

        <!-- Metric Cards -->
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

        <!-- Recent Students Activity -->
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

    // Bind inspection buttons
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

        <!-- Concept Status Cards -->
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

        <!-- Detailed Misconceptions Log with Pedagogical Evidence -->
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

        <!-- Raw Interactions Log -->
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
}

export const teacherController = new TeacherController();
