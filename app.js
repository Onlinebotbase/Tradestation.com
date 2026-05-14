(function() {
  'use strict';

  const API_BASE = window.location.origin + '/api';

  // ======================= SVG ICONS =======================
  const ICONS = {
    logo: `<svg viewBox="0 0 200 40" class="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="8" width="24" height="24" rx="4" fill="#2563EB"/><path d="M6 20L10 16L14 22L18 12" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="32" y="27" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#111827">Trade Station</text></svg>`,
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

  // ======================= LOCAL STORAGE HELPERS =======================
  const DB = {
    get(key, def) {
      try { return JSON.parse(localStorage.getItem('ts_' + key)) || def; } catch { return def; }
    },
    set(key, val) { localStorage.setItem('ts_' + key, JSON.stringify(val)); },
    remove(key) { localStorage.removeItem('ts_' + key); }
  };

  window.TS_DB = DB;

  // ======================= AUTH / SESSION =======================
  const Auth = {
    isLoggedIn() {
      const token = DB.get('token', null);
      const user = DB.get('user', null);
      return !!(token && user);
    },
    getUser() { return DB.get('user', null); },
    getToken() { return DB.get('token', null); },
    setSession(token, user) {
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

  // ======================= UI HELPERS =======================
  window.TS_UI = {
    showLoading(msg = 'Processing...') {
      let el = document.getElementById('ts-loading-overlay');
      if (!el) {
        el = document.createElement('div');
        el.id = 'ts-loading-overlay';
        el.className = 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm';
        el.innerHTML = `
          <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p class="text-white font-medium text-lg">${msg}</p>
        `;
        document.body.appendChild(el);
      } else {
        el.querySelector('p').textContent = msg;
        el.classList.remove('hidden');
      }
    },
    hideLoading() {
      const el = document.getElementById('ts-loading-overlay');
      if (el) el.classList.add('hidden');
    },
    showToast(message, type = 'info') {
      const colors = { info: 'bg-blue-600', success: 'bg-green-600', warning: 'bg-yellow-600', error: 'bg-red-600' };
      const el = document.createElement('div');
      el.className = `fixed top-20 right-4 z-[9998] px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium ${colors[type] || colors.info} transform transition-all duration-300 translate-x-full`;
      el.innerHTML = message;
      document.body.appendChild(el);
      requestAnimationFrame(() => el.classList.remove('translate-x-full'));
      setTimeout(() => {
        el.classList.add('translate-x-full');
        setTimeout(() => el.remove(), 300);
      }, 3000);
    },
    showModal(title, content, actions = []) {
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 z-[9997] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4';
      modal.innerHTML = `
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">${title}</h3>
            <button class="ts-modal-close text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">${ICONS.close}</button>
          </div>
          <div class="text-gray-700 dark:text-gray-300 mb-6">${content}</div>
          <div class="flex gap-3 justify-end ts-modal-actions"></div>
        </div>
      `;
      const actionsContainer = modal.querySelector('.ts-modal-actions');
      actions.forEach((action, i) => {
        const btn = document.createElement('button');
        btn.className = `px-4 py-2 rounded-lg text-sm font-medium ${action.primary ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200'}`;
        btn.textContent = action.text;
        btn.onclick = () => { action.onClick(); if (action.close !== false) modal.remove(); };
        actionsContainer.appendChild(btn);
      });
      modal.querySelector('.ts-modal-close').onclick = () => modal.remove();
      modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
      document.body.appendChild(modal);
    }
  };

  // ======================= GLOBAL HEADER / FOOTER =======================
  function injectGlobalUI() {
    const isLogged = Auth.isLoggedIn();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Inject header
    const header = document.getElementById('ts-global-header');
    if (header && isLogged) {
      const user = Auth.getUser();
      const unseenCount = (DB.get('notifications', []) || []).filter(n => !n.read && !n.dismissed).length;
      header.innerHTML = `
        <div class="flex items-center justify-between px-4 py-3 bg-gray-900 text-white border-b border-gray-800">
          <button id="btn-more" class="p-2 rounded-lg hover:bg-gray-800 transition-colors relative" title="More">${ICONS.more}</button>
          <div class="flex items-center gap-1">
            <button onclick="location.href='dashboard.html'" class="p-2 rounded-lg hover:bg-gray-800 transition-colors ${currentPage==='dashboard.html'?'bg-gray-800':''}" title="Dashboard">${ICONS.house}</button>
            <button onclick="location.href='symbol.html'" class="p-2 rounded-lg hover:bg-gray-800 transition-colors" title="Add Symbol">${ICONS.plus}</button>
          </div>
          <button onclick="location.href='notifications.html'" class="p-2 rounded-lg hover:bg-gray-800 transition-colors relative ${currentPage==='notifications.html'?'bg-gray-800':''}" title="Notifications">
            ${ICONS.bell}
            ${unseenCount > 0 ? `<span class="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">${unseenCount > 9 ? '9+' : unseenCount}</span>` : ''}
          </button>
        </div>
        <div id="more-dropdown" class="hidden absolute top-14 left-2 z-50 w-52 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          <a href="dashboard.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">${ICONS.user} Account</a>
          <a href="news.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">${ICONS.newspaper} News</a>
          <a href="mailbox.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">${ICONS.mailbox} Mail</a>
          <a href="settings.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">${ICONS.gear} Settings</a>
          <a href="market.html" class="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-sm text-gray-200">${ICONS.market} Market</a>
          <div class="border-t border-gray-700"></div>
          <button onclick="TS_Auth.logout()" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-sm text-red-400 text-left">${ICONS.close} Logout</button>
        </div>
      `;
      document.getElementById('btn-more')?.addEventListener('click', () => {
        document.getElementById('more-dropdown').classList.toggle('hidden');
      });
    }

    // Inject footer
    const footer = document.getElementById('ts-global-footer');
    if (footer && isLogged) {
      footer.innerHTML = `
        <nav class="flex items-center justify-around px-2 py-2 bg-gray-900 text-gray-400 border-t border-gray-800">
          <a href="quotes.html" class="flex flex-col items-center gap-1 p-2 rounded-lg ${currentPage==='quotes.html'?'text-blue-400':'hover:text-white'}">${ICONS.quotes}<span class="text-[10px]">Quotes</span></a>
          <a href="charts.html" class="flex flex-col items-center gap-1 p-2 rounded-lg ${currentPage==='charts.html'?'text-blue-400':'hover:text-white'}">${ICONS.chart}<span class="text-[10px]">Charts</span></a>
          <a href="trade.html" class="flex flex-col items-center gap-1 p-2 rounded-lg ${currentPage==='trade.html'?'text-blue-400':'hover:text-white'}">${ICONS.trades}<span class="text-[10px]">Trades</span></a>
          <a href="history.html" class="flex flex-col items-center gap-1 p-2 rounded-lg ${currentPage==='history.html'?'text-blue-400':'hover:text-white'}">${ICONS.history}<span class="text-[10px]">History</span></a>
          <a href="mailbox.html" class="flex flex-col items-center gap-1 p-2 rounded-lg ${currentPage==='mailbox.html'?'text-blue-400':'hover:text-white'}">${ICONS.mailbox}<span class="text-[10px]">Mailbox</span></a>
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
      if (amount >= 5500) return { name: 'Premium Plan', rate: 30.5 };
      if (amount >= 1500) return { name: 'Bronze Plan', rate: 25.95 };
      if (amount >= 250) return { name: 'Gold Plan', rate: 20.95 };
      if (amount >= 55) return { name: 'Standard Plan', rate: 15.95 };
      return { name: 'Starter Plan', rate: 10.95 };
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
      // Update trades
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
      
      // Update holdings
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
    
    // Update investments every second for live feel
    setInterval(() => {
      if (Auth.isLoggedIn()) {
        window.TS_Invest.updateAll();
      }
    }, 1000);

    // Auto-hide welcome banner after 15s
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
