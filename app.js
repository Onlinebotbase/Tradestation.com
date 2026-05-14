(function() {
  'use strict';

  const API_BASE = window.location.origin + '/api';

  // ======================= SVG ICONS =======================
  const ICONS = {
    tsLogo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ts-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
        <filter id="ts-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feFlood flood-color="#10b981" flood-opacity="0.45"/>
          <feComposite in2="blur" operator="in"/>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <style>
          .ts-stream { stroke: rgba(16, 185, 129, 0.12); stroke-width: 0.4; stroke-dasharray: 2 6; animation: ts-flow 3s linear infinite; }
          .ts-stream:nth-child(2) { animation-delay: 1s; }
          .ts-stream:nth-child(3) { animation-delay: 2s; }
          @keyframes ts-flow { to { stroke-dashoffset: -16; } }
          .ts-pulse { animation: ts-breathe 2.5s ease-in-out infinite; transform-origin: 20px 6px; }
          @keyframes ts-breathe { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.75; transform: scale(1.08); } }
        </style>
      </defs>
      <rect x="0" y="0" width="40" height="40" rx="10" fill="#0a0a0a" />
      <path d="M4 12 L36 12" class="ts-stream" />
      <path d="M4 20 L36 20" class="ts-stream" />
      <path d="M4 28 L36 28" class="ts-stream" />
      <rect x="2" y="2" width="36" height="36" rx="8" stroke="url(#ts-grad)" stroke-width="0.5" fill="none" opacity="0.2" />
      <g filter="url(#ts-glow)">
        <path d="M20 6 L6 13 L20 20 L34 13 Z" stroke="url(#ts-grad)" stroke-width="2" stroke-linejoin="round" fill="rgba(16,185,129,0.08)" />
        <path d="M6 20 L20 27 L34 20" stroke="url(#ts-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M6 27 L20 34 L34 27" stroke="url(#ts-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <circle cx="20" cy="6" r="1.5" fill="#10b981" class="ts-pulse" />
      <circle cx="20" cy="20" r="1.2" fill="#06b6d4" />
      <circle cx="20" cy="34" r="1.5" fill="#10b981" />
      <path d="M6 13 L6 27" stroke="url(#ts-grad)" stroke-width="1" stroke-linecap="round" opacity="0.25" />
      <path d="M34 13 L34 27" stroke="url(#ts-grad)" stroke-width="1" stroke-linecap="round" opacity="0.25" />
    </svg>`,
    house: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    quotes: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    trades: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
    history: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    mailbox: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    bell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
    more: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    gear: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    newspaper: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>`,
    market: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"></path><path d="M16 7h6v6"></path></svg>`,
    deposit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>`,
    withdraw: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`,
    order: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    hold: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
    buy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>`,
    sell: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
    qr: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
    arrowUpCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>`,
    arrowDownCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="8 12 12 16 16 12"></polyline><line x1="12" y1="8" x2="12" y2="16"></line></svg>`,
    chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`,
    cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`
  };

  window.ICONS = ICONS;

  // ======================= EMAIL-SCOPED LOCAL STORAGE =======================
  // Each email gets its own isolated localStorage namespace so a new email
  // on the same browser sees a completely fresh dashboard.
  const DB = {
    _ns() {
      const user = Auth.getUser();
      if (user && user.email) {
        return user.email.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_';
      }
      return 'global_';
    },
    get(key, def) {
      try {
        const raw = localStorage.getItem('ts_' + this._ns() + key);
        return raw !== null ? JSON.parse(raw) : def;
      } catch { return def; }
    },
    set(key, val) {
      localStorage.setItem('ts_' + this._ns() + key, JSON.stringify(val));
    },
    remove(key) {
      localStorage.removeItem('ts_' + this._ns() + key);
    }
  };

  window.TS_DB = DB;

  // ======================= AUTH / SESSION =======================
  const Auth = {
    isLoggedIn() {
      const token = DB.get('token', null);
      const user = DB.get('user', null);
      return !!(token && user && user.email);
    },
    getUser() { return DB.get('user', null); },
    getToken() { return DB.get('token', null); },
    setSession(token, user) {
      if (!user || !user.email) { console.error('Session requires email for account isolation'); return; }
      DB.set('token', token);
      DB.set('user', user);
      DB.set('session_time', Date.now());
    },
    logout() {
      DB.remove('token');
      DB.remove('user');
      DB.remove('session_time');
      window.location.href = 'index.html';
    },
    requireAuth() {
      if (!this.isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
      }
      return true;
    }
  };

  window.TS_Auth = Auth;

  // ======================= API HELPERS =======================
  async function api(path, options = {}) {
    const url = API_BASE + path;
    const token = Auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };
    try {
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        Auth.logout();
        return { error: 'Unauthorized' };
      }
      return await res.json();
    } catch (err) {
      console.error('API error:', err);
      return { error: err.message, offline: true };
    }
  }

  window.TS_API = api;

  // ======================= UI HELPERS (MT5 Dark Fintech) =======================
  window.TS_UI = {
    showLoading(msg = 'Processing...') {
      let el = document.getElementById('ts-loading-overlay');
      if (!el) {
        el = document.createElement('div');
        el.id = 'ts-loading-overlay';
        el.className = 'ts-loading-overlay';
        el.innerHTML = `
          <div class="ts-loading-box">
            <div class="ts-loading-logo">${ICONS.tsLogo}</div>
            <div class="ts-loading-track"><div class="ts-loading-track-bar"></div></div>
            <p class="ts-loading-text">${msg}</p>
          </div>
        `;
        document.body.appendChild(el);
      } else {
        const txt = el.querySelector('.ts-loading-text');
        if (txt) txt.textContent = msg;
        el.classList.remove('hidden');
      }
    },
    hideLoading() {
      const el = document.getElementById('ts-loading-overlay');
      if (el) el.classList.add('hidden');
    },
    showToast(message, type = 'info') {
      const icons = { info: ICONS.info, success: ICONS.success, warning: ICONS.warning, error: ICONS.error };
      const colors = { info: '#2563eb', success: '#10b981', warning: '#f59e0b', error: '#ef4444' };
      const el = document.createElement('div');
      el.className = 'ts-toast';
      el.style.borderLeftColor = colors[type] || colors.info;
      el.innerHTML = `
        <div class="ts-toast-icon">${icons[type] || icons.info}</div>
        <div class="ts-toast-body">${message}</div>
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => el.classList.add('ts-toast-visible'));
      setTimeout(() => {
        el.classList.remove('ts-toast-visible');
        setTimeout(() => el.remove(), 350);
      }, 3000);
    },
    showModal(title, content, actions = []) {
      const modal = document.createElement('div');
      modal.className = 'ts-modal-backdrop';
      modal.innerHTML = `
        <div class="ts-modal-panel">
          <div class="ts-modal-header">
            <h3 class="ts-modal-title">${title}</h3>
            <button class="ts-modal-close">${ICONS.close}</button>
          </div>
          <div class="ts-modal-body">${content}</div>
          <div class="ts-modal-actions"></div>
        </div>
      `;
      const actionsContainer = modal.querySelector('.ts-modal-actions');
      actions.forEach((action) => {
        const btn = document.createElement('button');
        btn.className = action.primary ? 'ts-modal-btn-primary' : 'ts-modal-btn-secondary';
        btn.textContent = action.text;
        btn.onclick = () => { action.onClick(); if (action.close !== false) modal.remove(); };
        actionsContainer.appendChild(btn);
      });
      modal.querySelector('.ts-modal-close').onclick = () => modal.remove();
      modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
      document.body.appendChild(modal);
    }
  };

  // ======================= GLOBAL HEADER / FOOTER (MT5 Single-Line Roll) =======================
  function injectGlobalUI() {
    const isLogged = Auth.isLoggedIn();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Inject MT5 dark fintech stylesheet once
    if (!document.getElementById('ts-mt5-styles')) {
      const style = document.createElement('style');
      style.id = 'ts-mt5-styles';
      style.textContent = `
        .ts-header-bar{background:#0a0a0a;border-bottom:1px solid #171717;position:sticky;top:0;z-index:60;}
        .ts-header-track{display:flex;align-items:center;gap:2px;padding:3px 6px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}
        .ts-header-track::-webkit-scrollbar{display:none;}
        .ts-header-logo{display:flex;align-items:center;gap:6px;flex-shrink:0;padding-right:8px;border-right:1px solid #1f1f1f;margin-right:4px;cursor:pointer;}
        .ts-header-logo>svg{width:26px;height:26px;}
        .ts-logo-text{color:#e5e5e5;font-size:12px;font-weight:700;letter-spacing:.3px;white-space:nowrap;font-family:system-ui,-apple-system,sans-serif;}
        .ts-header-roll{display:flex;align-items:center;gap:1px;flex:1;}
        .ts-hbtn{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:3px 7px;border-radius:5px;background:transparent;border:none;color:#888;cursor:pointer;transition:all .12s;position:relative;min-width:48px;flex-shrink:0;outline:none;}
        .ts-hbtn:hover{background:rgba(255,255,255,.05);color:#f0f0f0;}
        .ts-hbtn-active{background:rgba(16,185,129,.12)!important;color:#10b981!important;}
        .ts-hbtn svg{width:17px;height:17px;stroke-width:2;}
        .ts-hbtn-label{font-size:8.5px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;white-space:nowrap;font-family:system-ui,sans-serif;}
        .ts-hbtn-badge{position:absolute;top:1px;right:2px;min-width:14px;height:14px;background:#ef4444;color:#fff;font-size:9px;font-weight:700;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 3px;border:1.5px solid #0a0a0a;}
        .ts-footer-bar{display:flex;align-items:center;justify-content:space-around;background:#0a0a0a;border-top:1px solid #171717;padding:2px 0 6px;position:fixed;bottom:0;left:0;right:0;z-index:60;}
        .ts-fbtn{display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 0;color:#6b6b6b;text-decoration:none;flex:1;max-width:90px;transition:color .15s;}
        .ts-fbtn-active{color:#10b981;}
        .ts-fbtn svg{width:19px;height:19px;stroke-width:2;}
        .ts-fbtn-label{font-size:9px;font-weight:600;letter-spacing:.2px;font-family:system-ui,sans-serif;}
        .ts-more-dropdown{position:absolute;top:50px;right:6px;z-index:70;width:220px;background:#111;border:1px solid #222;border-radius:10px;box-shadow:0 20px 40px rgba(0,0,0,.6);overflow:hidden;}
        .ts-more-item{display:flex;align-items:center;gap:10px;padding:10px 14px;color:#c1c1c1;font-size:13px;text-decoration:none;transition:background .12s;border-bottom:1px solid #1a1a1a;}
        .ts-more-item:last-child{border-bottom:none;}
        .ts-more-item:hover{background:#1a1a1a;color:#fff;}
        .ts-more-item svg{width:16px;height:16px;stroke-width:2;flex-shrink:0;}
        .ts-more-danger{color:#ef4444;}
        .ts-more-danger:hover{color:#f87171;}
        .ts-loading-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.85);backdrop-filter:blur(4px);}
        .ts-loading-box{display:flex;flex-direction:column;align-items:center;gap:14px;}
        .ts-loading-logo svg{width:44px;height:44px;}
        .ts-loading-track{width:140px;height:3px;background:#222;border-radius:2px;overflow:hidden;}
        .ts-loading-track-bar{width:40%;height:100%;background:linear-gradient(90deg,#10b981,#06b6d4);border-radius:2px;animation:tsLoadSlide 1.2s ease-in-out infinite;}
        @keyframes tsLoadSlide{0%{transform:translateX(-120%);}100%{transform:translateX(280%);}}
        .ts-loading-text{color:#a1a1a1;font-size:13px;font-weight:500;font-family:system-ui,sans-serif;}
        .ts-toast{position:fixed;top:18px;right:18px;z-index:9998;display:flex;align-items:center;gap:10px;padding:12px 16px;background:#0f0f0f;border:1px solid #222;border-left:3px solid #2563eb;border-radius:8px;box-shadow:0 10px 30px rgba(0,0,0,.5);color:#e5e5e5;font-size:13px;font-weight:500;transform:translateX(120%);transition:transform .35s cubic-bezier(.22,1,.36,1);max-width:320px;font-family:system-ui,sans-serif;}
        .ts-toast-visible{transform:translateX(0);}
        .ts-toast-icon{display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex-shrink:0;}
        .ts-toast-icon svg{width:18px;height:18px;}
        .ts-modal-backdrop{position:fixed;inset:0;z-index:9997;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.75);backdrop-filter:blur(3px);padding:16px;}
        .ts-modal-panel{background:#0f0f0f;border:1px solid #222;border-radius:12px;box-shadow:0 24px 60px rgba(0,0,0,.7);max-width:420px;width:100%;overflow:hidden;}
        .ts-modal-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1a1a1a;}
        .ts-modal-title{color:#f0f0f0;font-size:15px;font-weight:700;font-family:system-ui,sans-serif;}
        .ts-modal-close{background:transparent;border:none;color:#666;cursor:pointer;padding:4px;display:flex;align-items:center;justify-content:center;border-radius:6px;transition:all .15s;}
        .ts-modal-close:hover{color:#fff;background:#1a1a1a;}
        .ts-modal-close svg{width:18px;height:18px;}
        .ts-modal-body{padding:16px;color:#c1c1c1;font-size:13.5px;line-height:1.6;font-family:system-ui,sans-serif;}
        .ts-modal-actions{display:flex;gap:8px;justify-content:flex-end;padding:12px 16px;border-top:1px solid #1a1a1a;}
        .ts-modal-btn-primary,.ts-modal-btn-secondary{padding:8px 14px;border-radius:6px;font-size:12.5px;font-weight:600;border:none;cursor:pointer;transition:all .15s;font-family:system-ui,sans-serif;}
        .ts-modal-btn-primary{background:#10b981;color:#fff;}
        .ts-modal-btn-primary:hover{background:#059669;}
        .ts-modal-btn-secondary{background:#1a1a1a;color:#c1c1c1;}
        .ts-modal-btn-secondary:hover{background:#252525;color:#fff;}
      `;
      document.head.appendChild(style);
    }

    // Inject Header
    const header = document.getElementById('ts-global-header');
    if (header && isLogged) {
      const unseenCount = (DB.get('notifications', []) || []).filter(n => !n.read && !n.dismissed).length;
      header.innerHTML = `
        <div class="ts-header-bar">
          <div class="ts-header-track">
            <div class="ts-header-logo" onclick="location.href='dashboard.html'" title="Trade Station">
              ${ICONS.tsLogo}
              <span class="ts-logo-text">Trade Station</span>
            </div>
            <div class="ts-header-roll">
              <button onclick="location.href='dashboard.html'" class="ts-hbtn ${currentPage==='dashboard.html'?'ts-hbtn-active':''}" title="Dashboard">
                ${ICONS.house}
                <span class="ts-hbtn-label">Dashboard</span>
              </button>
              <button onclick="location.href='quotes.html'" class="ts-hbtn ${currentPage==='quotes.html'?'ts-hbtn-active':''}" title="Quotes">
                ${ICONS.quotes}
                <span class="ts-hbtn-label">Quotes</span>
              </button>
              <button onclick="location.href='charts.html'" class="ts-hbtn ${currentPage==='charts.html'?'ts-hbtn-active':''}" title="Charts">
                ${ICONS.chart}
                <span class="ts-hbtn-label">Charts</span>
              </button>
              <button onclick="location.href='trade.html'" class="ts-hbtn ${currentPage==='trade.html'?'ts-hbtn-active':''}" title="Trades">
                ${ICONS.trades}
                <span class="ts-hbtn-label">Trades</span>
              </button>
              <button onclick="location.href='symbol.html'" class="ts-hbtn ${currentPage==='symbol.html'?'ts-hbtn-active':''}" title="Add Symbol">
                ${ICONS.plus}
                <span class="ts-hbtn-label">Add</span>
              </button>
              <button onclick="location.href='profile.html'" class="ts-hbtn ${currentPage==='profile.html'?'ts-hbtn-active':''}" title="Profile">
                ${ICONS.user}
                <span class="ts-hbtn-label">Profile</span>
              </button>
              <button onclick="location.href='settings.html'" class="ts-hbtn ${currentPage==='settings.html'?'ts-hbtn-active':''}" title="Settings">
                ${ICONS.gear}
                <span class="ts-hbtn-label">Settings</span>
              </button>
              <button onclick="location.href='notifications.html'" class="ts-hbtn ${currentPage==='notifications.html'?'ts-hbtn-active':''}" title="Notifications">
                ${ICONS.bell}
                <span class="ts-hbtn-label">Alerts</span>
                ${unseenCount > 0 ? `<span class="ts-hbtn-badge">${unseenCount > 9 ? '9+' : unseenCount}</span>` : ''}
              </button>
              <button id="btn-more" class="ts-hbtn" title="More">
                ${ICONS.more}
                <span class="ts-hbtn-label">More</span>
              </button>
            </div>
          </div>
          <div id="more-dropdown" class="ts-more-dropdown hidden">
            <a href="profile.html" class="ts-more-item">${ICONS.user} Account</a>
            <a href="news.html" class="ts-more-item">${ICONS.newspaper} News</a>
            <a href="mailbox.html" class="ts-more-item">${ICONS.mailbox} Mailbox</a>
            <a href="settings.html" class="ts-more-item">${ICONS.gear} Settings</a>
            <a href="market.html" class="ts-more-item">${ICONS.market} Market</a>
            <div style="border-top:1px solid #1a1a1a;"></div>
            <button onclick="TS_Auth.logout()" class="ts-more-item ts-more-danger" style="width:100%;background:transparent;border:none;cursor:pointer;">
              ${ICONS.close} Logout
            </button>
          </div>
        </div>
      `;
      const btnMore = document.getElementById('btn-more');
      const dropdown = document.getElementById('more-dropdown');
      if (btnMore && dropdown) {
        btnMore.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
          if (!dropdown.classList.contains('hidden') && !e.target.closest('#btn-more') && !e.target.closest('#more-dropdown')) {
            dropdown.classList.add('hidden');
          }
        });
      }
    }

    // Inject Footer
    const footer = document.getElementById('ts-global-footer');
    if (footer && isLogged) {
      footer.innerHTML = `
        <nav class="ts-footer-bar">
          <a href="quotes.html" class="ts-fbtn ${currentPage==='quotes.html'?'ts-fbtn-active':''}">
            ${ICONS.quotes}
            <span class="ts-fbtn-label">Quotes</span>
          </a>
          <a href="charts.html" class="ts-fbtn ${currentPage==='charts.html'?'ts-fbtn-active':''}">
            ${ICONS.chart}
            <span class="ts-fbtn-label">Charts</span>
          </a>
          <a href="trade.html" class="ts-fbtn ${currentPage==='trade.html'?'ts-fbtn-active':''}">
            ${ICONS.trades}
            <span class="ts-fbtn-label">Trades</span>
          </a>
          <a href="history.html" class="ts-fbtn ${currentPage==='history.html'?'ts-fbtn-active':''}">
            ${ICONS.history}
            <span class="ts-fbtn-label">History</span>
          </a>
          <a href="mailbox.html" class="ts-fbtn ${currentPage==='mailbox.html'?'ts-fbtn-active':''}">
            ${ICONS.mailbox}
            <span class="ts-fbtn-label">Mailbox</span>
          </a>
        </nav>
      `;
    }
  }

  // ======================= COINGECKO HELPERS =======================
  window.TS_Market = {
    async getCoins() {
      const cached = DB.get('coins_cache', null);
      const cacheTime = DB.get('coins_cache_time', 0);
      if (cached && Date.now() - cacheTime < 120000) return cached;
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100&page=1&sparkline=false');
        const data = await res.json();
        DB.set('coins_cache', data);
        DB.set('coins_cache_time', Date.now());
        return data;
      } catch {
        return cached || [];
      }
    },
    async getCoin(symbol) {
      const coins = await this.getCoins();
      return coins.find(c => c.symbol.toLowerCase() === symbol.toLowerCase());
    },
    async getNews() {
      const cached = DB.get('news_cache', null);
      const cacheTime = DB.get('news_cache_time', 0);
      if (cached && Date.now() - cacheTime < 300000) return cached;
      try {
        const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${process.env?.FINNHUB_API_KEY || 'd7cq1t9r01qv03eta4rgd7cq1t9r01qv03eta4s0'}`);
        const data = await res.json();
        DB.set('news_cache', data);
        DB.set('news_cache_time', Date.now());
        return data;
      } catch {
        return cached || [];
      }
    },
    async getExchangeRates() {
      const cached = DB.get('forex_cache', null);
      const cacheTime = DB.get('forex_cache_time', 0);
      if (cached && Date.now() - cacheTime < 300000) return cached;
      try {
        const res = await fetch('https://v6.exchangerate-api.com/v6/45602791eb9f29e022a7ce3f/latest/USD');
        const data = await res.json();
        DB.set('forex_cache', data);
        DB.set('forex_cache_time', Date.now());
        return data;
      } catch {
        return cached || { conversion_rates: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 148 } };
      }
    }
  };

  // ======================= TRADE / HOLDING LOGIC =======================
  window.TS_Invest = {
    getTrades() { return DB.get('trades', []); },
    getHoldings() { return DB.get('holdings', []); },
    saveTrades(trades) { DB.set('trades', trades); },
    saveHoldings(holdings) { DB.set('holdings', holdings); },
    
    calculateLiveValue(inv) {
      const now = Date.now();
      const start = new Date(inv.startDate || inv.createdAt).getTime();
      const elapsedMinutes = Math.max(0, (now - start) / 60000);
      const dailyReturn = (inv.amount || 0) * ((inv.dailyReturnRate || 0) / 100);
      const minuteReturn = dailyReturn / 1440;
      return (inv.amount || 0) + (minuteReturn * elapsedMinutes);
    },
    
    getPlanForAmount(amount) {
      if (amount >= 5500) return { name: 'Premium Plan', rate: 95.95 };
      if (amount >= 1500) return { name: 'Bronze Plan', raste: 85.95 };
      if (amount >= 250) return { name: 'Gold Plan', rate: 75.95 };
      if (amount >= 55) return { name: 'Standard Plan', rate: 65.95 };
      return { name: 'Starter Plan', rate: 55.95 };
    },

    addTrade(trade) {
      const trades = this.getTrades();
      trade.id = 'TRD-' + Date.now();
      trade.status = 'active';
      trade.startDate = new Date().toISOString();
      trade.currentValue = trade.amount;
      trades.unshift(trade);
      this.saveTrades(trades);
      return trade;
    },

    addHolding(holding) {
      const holdings = this.getHoldings();
      holding.id = 'HLD-' + Date.now();
      holding.status = 'active';
      holding.startDate = new Date().toISOString();
      holding.currentValue = holding.amount;
      const plan = this.getPlanForAmount(holding.amount);
      holding.dailyReturnRate = plan.rate;
      holding.planName = plan.name;
      holdings.unshift(holding);
      this.saveHoldings(holdings);
      return holding;
    },

    updateAll() {
      const trades = this.getTrades().map(t => {
        if (t.status === 'active') {
          t.currentValue = this.calculateLiveValue(t);
          const end = new Date(t.endDate).getTime();
          if (Date.now() >= end) {
            t.status = 'completed';
            t.profit = t.currentValue - t.amount;
          }
        }
        return t;
      });
      this.saveTrades(trades);
      
      const holdings = this.getHoldings().map(h => {
        if (h.status === 'active') {
          h.currentValue = this.calculateLiveValue(h);
          const end = new Date(h.endDate).getTime();
          if (Date.now() >= end) {
            h.status = 'completed';
            h.profit = h.currentValue - h.amount;
          }
        }
        return h;
      });
      this.saveHoldings(holdings);
    }
  };

  // ======================= NOTIFICATIONS =======================
  window.TS_Notifications = {
    getAll() { return DB.get('notifications', []); },
    add(notif) {
      const all = this.getAll();
      notif.id = 'NOT-' + Date.now();
      notif.createdAt = new Date().toISOString();
      notif.read = false;
      notif.dismissed = false;
      all.unshift(notif);
      DB.set('notifications', all.slice(0, 50));
    },
    dismiss(id) {
      const all = this.getAll().map(n => n.id === id ? { ...n, dismissed: true } : n);
      DB.set('notifications', all);
    },
    markRead(id) {
      const all = this.getAll().map(n => n.id === id ? { ...n, read: true } : n);
      DB.set('notifications', all);
    },
    clearAll() { DB.set('notifications', []); }
  };

  // ======================= WITHDRAWAL SUSPENSION =======================
  window.TS_Withdraw = {
    getAttempts() { return DB.get('withdraw_attempts', 0); },
    addAttempt() {
      const attempts = this.getAttempts() + 1;
      DB.set('withdraw_attempts', attempts);
      if (attempts >= 5) {
        const until = new Date();
        until.setHours(until.getHours() + 48);
        DB.set('withdraw_suspended_until', until.toISOString());
      }
      return attempts;
    },
    isSuspended() {
      const until = DB.get('withdraw_suspended_until', null);
      if (!until) return false;
      return new Date(until) > new Date();
    },
    getSuspensionTime() {
      const until = DB.get('withdraw_suspended_until', null);
      return until ? new Date(until) : null;
    },
    resetAttempts() { DB.set('withdraw_attempts', 0); },
    validateCode(code) {
      const codes = [
        '483921','175064','902718','634285','217509','856430','490127','731694',
        '562803','308417','941256','128374','675820','203519','487960','819432',
        '356701','740528'
      ];
      const used = DB.get('used_withdraw_codes', []);
      if (used.includes(code)) return false;
      if (codes.includes(code)) {
        used.push(code);
        DB.set('used_withdraw_codes', used);
        this.resetAttempts();
        return true;
      }
      return false;
    }
  };

  // ======================= DEPOSIT CODES =======================
  window.TS_Deposit = {
    validateCode(code) {
      const codes = [
        '482915','930472','158203','764981','502319','847261','319586','672450','248391','905836',
        '731258','629047','580124','417902','896351','264098','152983','309472','741826','589320',
        '620583','958210','203874','742985','894621','510293','673420','248765','901632','437892'
      ];
      const used = DB.get('used_deposit_codes', []);
      if (used.includes(code)) return false;
      if (codes.includes(code)) {
        used.push(code);
        DB.set('used_deposit_codes', used);
        return true;
      }
      return false;
    }
  };

  // ======================= BALANCE HELPERS =======================
  window.TS_Balance = {
    get() {
      const user = Auth.getUser();
      return DB.get('balance', user?.balance || 0);
    },
    set(val) {
      DB.set('balance', val);
      const user = Auth.getUser();
      if (user) { user.balance = val; DB.set('user', user); }
    },
    add(val) { this.set(this.get() + val); },
    subtract(val) { this.set(this.get() - val); }
  };

  // ======================= INIT =======================
  document.addEventListener('DOMContentLoaded', () => {
    injectGlobalUI();
    
    setInterval(() => {
      if (Auth.isLoggedIn()) {
        window.TS_Invest.updateAll();
      }
    }, 1000);

    const banner = document.getElementById('ts-welcome-banner');
    if (banner && !DB.get('welcome_dismissed', false)) {
      setTimeout(() => {
        banner.classList.add('hidden');
        DB.set('welcome_dismissed', true);
      }, 15000);
      banner.querySelector('.ts-dismiss')?.addEventListener('click', () => {
        banner.classList.add('hidden');
        DB.set('welcome_dismissed', true);
      });
    }
  });

})();
