// MisconceptionOS - Authentication & Session Service
import { db } from './db.js';

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
    // 1. Validation
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

    // 2. Create Profile in Database
    await db.createProfile(fullName, email, password, role);

    // 3. Automatically Authenticate
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

export const auth = new AuthService();
