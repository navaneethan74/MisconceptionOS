// MisconceptionOS - Persistent Transactional Database Engine (IndexedDB + WebCrypto)
// Implements secure PBKDF2 salted hashing, session management, and role-based data isolation.

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

        // 1. User Profiles
        if (!db.objectStoreNames.contains('profiles')) {
          const profileStore = db.createObjectStore('profiles', { keyPath: 'id' });
          profileStore.createIndex('email', 'email', { unique: true });
          profileStore.createIndex('role', 'role', { unique: false });
        }

        // 2. Learner State
        if (!db.objectStoreNames.contains('learner_state')) {
          db.createObjectStore('learner_state', { keyPath: 'user_id' });
        }

        // 3. Misconceptions History
        if (!db.objectStoreNames.contains('misconceptions')) {
          const miscStore = db.createObjectStore('misconceptions', { keyPath: 'id' });
          miscStore.createIndex('user_id', 'user_id', { unique: false });
          miscStore.createIndex('user_concept', ['user_id', 'concept'], { unique: false });
        }

        // 4. Interactions Log
        if (!db.objectStoreNames.contains('interactions')) {
          const intStore = db.createObjectStore('interactions', { keyPath: 'id' });
          intStore.createIndex('user_id', 'user_id', { unique: false });
        }

        // 5. Recovery / Transfer Results
        if (!db.objectStoreNames.contains('recovery_results')) {
          const recStore = db.createObjectStore('recovery_results', { keyPath: 'id' });
          recStore.createIndex('user_id', 'user_id', { unique: false });
        }

        // 6. Active Sessions
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions', { keyPath: 'token' });
        }
      };

      request.onsuccess = (e) => {
        this.db = e.target.result;
        // Resolve immediately so ready() succeeds and does not deadlock!
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

  // --------------------------------------------------------------------------
  // Cryptography: PBKDF2 Password Hashing & Token Generation
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // Seed Default Reviewer Accounts
  // --------------------------------------------------------------------------
  async seedInitialAccounts() {
    if (!this.db) return;
    const teacherEmail = 'teacher@misconceptionos.edu';
    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction('profiles', 'readonly');
        const store = tx.objectStore('profiles');
        const index = store.index('email');
        const req = index.get(teacherEmail);
        req.onsuccess = async () => {
          if (!req.result) {
            const { hashHex, saltHex } = await this.hashPassword('TeacherPass123!');
            const teacherProfile = {
              id: 'usr_teacher_demo',
              user_id: 'usr_teacher_demo',
              full_name: 'Prof. Eleanor Vance',
              email: teacherEmail,
              password_hash: hashHex,
              salt: saltHex,
              role: 'teacher',
              created_at: Date.now()
            };
            try {
              const addTx = this.db.transaction('profiles', 'readwrite');
              addTx.objectStore('profiles').add(teacherProfile);
            } catch (e) {}
          }
          resolve();
        };
        req.onerror = () => resolve();
      } catch (e) {
        resolve();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Generic Transaction Helpers
  // --------------------------------------------------------------------------
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

  // --------------------------------------------------------------------------
  // User Profile & Authentication Methods
  // --------------------------------------------------------------------------
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

    // Initialize clean learner state if student
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
        console.warn('Learner state initial insert notice:', err);
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

  // --------------------------------------------------------------------------
  // Learner State & Pedagogical History Queries
  // --------------------------------------------------------------------------
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

  async recordMisconception(userId, concept, misconceptionKey, title, underlyingConcept, answer, reasoning, interventionGiven, status = 'Detected') {
    const existing = await this.getMisconceptions(userId);
    const match = existing.find(m => m.concept === concept && m.misconception_key === misconceptionKey);

    if (match) {
      match.occurrence_count = (match.occurrence_count || 1) + 1;
      match.status = status;
      match.evidence = { answer, reasoning };
      match.intervention_given = interventionGiven;
      match.updated_at = Date.now();
      await this.put('misconceptions', match);
      return match;
    }

    const priorWithSameKey = existing.filter(m => m.misconception_key === misconceptionKey);
    const isRecurring = priorWithSameKey.length > 0;
    const count = isRecurring ? priorWithSameKey.length + 1 : 1;

    if (isRecurring) {
      for (const prior of priorWithSameKey) {
        prior.is_recurring = true;
        prior.occurrence_count = count;
        await this.put('misconceptions', prior);
      }
    }

    const item = {
      id: 'misc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      user_id: userId,
      concept,
      misconception_key: misconceptionKey,
      title,
      underlying_concept: underlyingConcept,
      evidence: { answer, reasoning },
      occurrence_count: count,
      is_recurring: isRecurring,
      status,
      intervention_given: interventionGiven,
      transfer_result: null,
      created_at: Date.now(),
      updated_at: Date.now()
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
      }
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
      
      // Add questions marked in learner_state
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

      // Verified questions (transfers verified)
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

  // --------------------------------------------------------------------------
  // Teacher View Data Aggregation (Strictly Reads Public Learning Data)
  // --------------------------------------------------------------------------
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

export const db = new DatabaseEngine();
