(function() {
  'use strict';

  const API_BASE = window.location.origin + '/api';

  // ======================= EMAIL-SCOPED STORAGE =======================
  function getStoragePrefix() {
    const email = localStorage.getItem('ts_active_user_email') || 'default';
    return 'ts_' + email.replace(/[^a-zA-Z0-9]/g, '_') + '_';
  }

  // ======================= SVG ICONS =======================
  const ICONS = {
    logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ts-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#10b981" /><stop offset="100%" stop-color="#06b6d4" /></linearGradient><filter id="ts-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2" result="blur"/><feFlood flood-color="#10b981" flood-opacity="0.45"/><feComposite in2="blur" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter><style>.ts-stream{stroke:rgba(16,185,129,0.12);stroke-width:0.4;stroke-dasharray:2 6;animation:ts-flow 3s linear infinite}.ts-stream:nth-child(2){animation-delay:1s}.ts-stream:nth-child(3){animation-delay:2s}@keyframes ts-flow{to{stroke-dashoffset:-16}}.ts-pulse{animation:ts-breathe 2.5s ease-in-out infinite;transform-origin:20px 6px}@keyframes ts-breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.75;transform:scale(1.08)}}</style></defs><rect x="0" y="0" width="40" height="40" rx="10" fill="#0a0a0a" /><path d="M4 12 L36 12" class="ts-stream" /><path d="M4 20 L36 20" class="ts-stream" /><path d="M4 28 L36 28" class="ts-stream" /><rect x="2" y="2" width="36" height="36" rx="8" stroke="url(#ts-grad)" stroke-width="0.5" fill="none" opacity="0.2" /><g filter="url(#ts-glow)"><path d="M20 6 L6 13 L20 20 L34 13 Z" stroke="url(#ts-grad)" stroke-width="2" stroke-linejoin="round" fill="rgba(16,185,129,0.08)" /><path d="M6 20 L20 27 L34 20" stroke="url(#ts-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M6 27 L20 34 L34 27" stroke="url(#ts-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g><circle cx="20" cy="6" r="1.5" fill="#10b981" class="ts-pulse" /><circle cx="20" cy="20" r="1.2" fill="#06b6d4" /><circle cx="20" cy="34" r="1.5" fill="#10b981" /><path d="M6 13 L6 27" stroke="url(#ts-grad)" stroke-width="1" stroke-linecap="round" opacity="0.25" /><path d="M34 13 L34 27" stroke="url(#ts-grad)" stroke-width="1" stroke-linecap="round" opacity="0.25" /></svg>`,
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
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    dollar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
    briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
  };

  window.ICONS = ICONS;

  // ======================= LOCAL STORAGE HELPERS =======================
  const DB = {
    get(key, def) {
      try { 
        const raw = localStorage.getItem(getStoragePrefix() + key);
        return raw !== null ? JSON.parse(raw) : def; 
      } catch { return def; }
    },
    set(key, val) { 
      localStorage.setItem(getStoragePrefix() + key, JSON.stringify(val)); 
    },
    remove(key) { 
      localStorage.removeItem(getStoragePrefix() + key); 
    }
  };

  window.TS_DB = DB;

  // ======================= AUTH / SESSION =======================
  const Auth = {
    isLoggedIn() {
      const token = this.getToken();
      const user = this.getUser();
      return !!(token && user);
    },
    getUser() { 
      try {
        const raw = localStorage.getItem(getStoragePrefix() + 'user');
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    },
    getToken() { 
      try {
        const raw = localStorage.getItem(getStoragePrefix() + 'token');
        return raw ? JSON.parse(raw) : null;
      } catch { return null; }
    },
    setSession(token, user) {
      if (user && user.email) {
        localStorage.setItem('ts_active_user_email', user.email);
      }
      DB.set('token', token);
      DB.set('user', user);
      DB.set('session_time', Date.now());
    },
    logout() {
      localStorage.removeItem('ts_active_user_email');
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
        el.className = 'ts-loading-overlay';
        el.innerHTML = `
          <div class="ts-spinner"></div>
          <p style="margin-top:12px;color:#eaecef;font-size:13px;font-weight:600;font-family:system-ui,sans-serif;">${msg}</p>
        `;
        document.body.appendChild(el);
      } else {
        const p = el.querySelector('p');
        if (p) p.textContent = msg;
        el.classList.remove('hidden');
        el.style.display = '';
      }
    },
    hideLoading() {
      const el = document.getElementById('ts-loading-overlay');
      if (el) { el.classList.add('hidden'); el.style.display = 'none'; }
    },
    showToast(message, type = 'info') {
      const el = document.createElement('div');
      el.className = `ts-toast ts-toast-${type}`;
      el.innerHTML = message;
      document.body.appendChild(el);
      requestAnimationFrame(() => el.classList.add('show'));
      setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => el.remove(), 350);
      }, 3000);
    },
    showModal(title, content, actions = []) {
      const modal = document.createElement('div');
      modal.className = 'ts-modal-overlay';
      modal.innerHTML = `
        <div class="ts-modal-card">
          <div class="ts-modal-header">
            <h3 class="ts-modal-title">${title}</h3>
            <button class="ts-modal-close ts-modal-close-btn">${ICONS.close}</button>
          </div>
          <div class="ts-modal-body">${content}</div>
          <div class="ts-modal-actions"></div>
        </div>
      `;
      const actionsContainer = modal.querySelector('.ts-modal-actions');
      actions.forEach((action) => {
        const btn = document.createElement('button');
        btn.className = `ts-btn ${action.primary ? 'ts-btn-primary' : 'ts-btn-secondary'}`;
        btn.textContent = action.text;
        btn.onclick = () => { action.onClick(); if (action.close !== false) modal.remove(); };
        actionsContainer.appendChild(btn);
      });
      modal.querySelector('.ts-modal-close-btn').onclick = () => modal.remove();
      modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
      document.body.appendChild(modal);
    }
  };

  // ======================= GLOBAL STYLES =======================
  function injectGlobalStyles() {
    if (document.getElementById('ts-global-styles')) return;
    const style = document.createElement('style');
    style.id = 'ts-global-styles';
    style.textContent = `
      .ts-header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        background: #0b0e11;
        border-bottom: 1px solid #1e2329;
        gap: 6px;
        position: sticky;
        top: 0;
        z-index: 40;
      }
      .ts-header-left, .ts-header-right {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
      }
      .ts-header-roll {
        display: flex;
        align-items: center;
        gap: 2px;
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        flex: 1;
        justify-content: center;
      }
      .ts-header-roll::-webkit-scrollbar { display: none; }
      .ts-header-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border-radius: 6px;
        color: #848e9c;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.12s ease;
        flex-shrink: 0;
        position: relative;
      }
      .ts-header-btn:hover { background: #1e2329; color: #eaecef; }
      .ts-header-btn.active { background: #1e2329; color: #f0b90b; box-shadow: inset 0 0 0 1px #2b3139; }
      .ts-header-btn svg { width: 18px; height: 18px; }
      .ts-logo-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        color: #eaecef;
      }
      .ts-logo-btn > svg { width: 26px; height: 26px; }
      .ts-badge {
        position: absolute;
        top: 2px;
        right: 2px;
        min-width: 14px;
        height: 14px;
        padding: 0 3px;
        background: #f6465d;
        color: #fff;
        font-size: 9px;
        font-weight: 700;
        border-radius: 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        pointer-events: none;
      }
      .ts-footer-nav {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 4px 6px 8px;
        background: #0b0e11;
        border-top: 1px solid #1e2329;
        position: sticky;
        bottom: 0;
        z-index: 40;
      }
      .ts-footer-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 4px 2px;
        color: #848e9c;
        text-decoration: none;
        font-size: 10px;
        font-weight: 600;
        font-family: system-ui, -apple-system, Segoe UI, sans-serif;
        border-radius: 6px;
        transition: all 0.12s ease;
        min-width: 52px;
        letter-spacing: 0.2px;
      }
      .ts-footer-link:hover { color: #eaecef; }
      .ts-footer-link.active { color: #f0b90b; }
      .ts-footer-link svg { width: 20px; height: 20px; stroke-width: 2; }
      .ts-loading-overlay {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        background: rgba(11, 14, 17, 0.9); backdrop-filter: blur(4px);
      }
      .ts-spinner {
        width: 36px; height: 36px;
        border: 3px solid #1e2329; border-top-color: #f0b90b; border-radius: 50%;
        animation: ts-spin 0.7s linear infinite;
      }
      @keyframes ts-spin { to { transform: rotate(360deg); } }
      .ts-toast {
        position: fixed; top: 64px; right: 12px; z-index: 9998;
        padding: 10px 14px; border-radius: 8px; font-size: 12px; font-weight: 600;
        color: #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.45);
        transform: translateX(calc(100% + 20px));
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: system-ui, -apple-system, Segoe UI, sans-serif;
        max-width: 320px; line-height: 1.4; pointer-events: none;
      }
      .ts-toast.show { transform: translateX(0); }
      .ts-toast-info { background: #1e2329; border: 1px solid #2b3139; color: #eaecef; }
      .ts-toast-success { background: #0ecb81; color: #0b0e11; }
      .ts-toast-warning { background: #f0b90b; color: #0b0e11; }
      .ts-toast-error { background: #f6465d; color: #fff; }
      .ts-modal-overlay {
        position: fixed; inset: 0; z-index: 9997;
        display: flex; align-items: center; justify-content: center;
        background: rgba(11, 14, 17, 0.82); backdrop-filter: blur(5px);
        padding: 16px;
      }
      .ts-modal-card {
        background: #1e2329; border: 1px solid #2b3139; border-radius: 10px;
        box-shadow: 0 24px 48px rgba(0,0,0,0.55);
        max-width: 440px; width: 100%; overflow: hidden;
        animation: ts-modal-in 0.18s ease-out;
      }
      @keyframes ts-modal-in {
        from { opacity: 0; transform: scale(0.97) translateY(6px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      .ts-modal-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 18px; border-bottom: 1px solid #2b3139;
      }
      .ts-modal-title { font-size: 15px; font-weight: 700; color: #eaecef; margin: 0; font-family: system-ui, sans-serif; }
      .ts-modal-close {
        background: none; border: none; color: #848e9c; cursor: pointer;
        padding: 4px; display: inline-flex; border-radius: 6px; transition: all 0.12s;
      }
      .ts-modal-close:hover { color: #eaecef; background: #2b3139; }
      .ts-modal-body { padding: 18px; color: #b7bdc6; font-size: 13px; line-height: 1.5; }
      .ts-modal-actions { display: flex; gap: 8px; justify-content: flex-end; padding: 0 18px 18px; }
      .ts-btn {
        padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 700;
        border: none; cursor: pointer; transition: all 0.12s;
        font-family: system-ui, -apple-system, Segoe UI, sans-serif; letter-spacing: 0.3px;
      }
      .ts-btn-primary { background: #f0b90b; color: #0b0e11; }
      .ts-btn-primary:hover { background: #ffe252; }
      .ts-btn-secondary { background: #2b3139; color: #eaecef; }
      .ts-btn-secondary:hover { background: #474d57; }
      .ts-more-dropdown {
        position: absolute; top: 52px; left: 8px; z-index: 50; width: 220px;
        background: #1e2329; border: 1px solid #2b3139; border-radius: 10px;
        box-shadow: 0 16px 40px rgba(0,0,0,0.55); overflow: hidden;
        animation: ts-dropdown-in 0.14s ease-out;
      }
      @keyframes ts-dropdown-in {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .ts-more-item {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px; color: #b7bdc6; text-decoration: none;
        font-size: 12px; font-weight: 600; transition: all 0.12s;
        font-family: system-ui, sans-serif;
      }
      .ts-more-item:hover { background: #2b3139; color: #eaecef; }
      .ts-more-item svg { width: 16px; height: 16px; stroke-width: 2; flex-shrink: 0; }
      .ts-more-divider { height: 1px; background: #2b3139; margin: 4px 0; }
      .ts-panel {
        background: #151a20; border: 1px solid #1e2329; border-radius: 8px;
        padding: 14px; margin-bottom: 10px;
      }
      .ts-panel-title {
        font-size: 12px; font-weight: 700; color: #848e9c;
        text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;
        font-family: system-ui, sans-serif;
      }
      .ts-tag {
        display: inline-flex; align-items: center; gap: 4px;
        padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;
        font-family: ui-monospace, Menlo, Monaco, Consolas, monospace;
      }
      .ts-tag-green { background: rgba(14, 203, 129, 0.12); color: #0ecb81; }
      .ts-tag-red { background: rgba(246, 70, 93, 0.12); color: #f6465d; }
      .ts-tag-blue { background: rgba(240, 185, 11, 0.1); color: #f0b90b; }
    `;
    document.head.appendChild(style);
  }

  // ======================= GLOBAL HEADER / FOOTER =======================
  function injectGlobalUI() {
    const isLogged = Auth.isLoggedIn();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Inject header
    const header = document.getElementById('ts-global-header');
    if (header && isLogged) {
      const unseenCount = (DB.get('notifications', []) || []).filter(n => !n.read && !n.dismissed).length;
      header.innerHTML = `
        <div class="ts-header-bar">
          <div class="ts-header-left">
            <button id="btn-more" class="ts-header-btn" title="Menu">${ICONS.more}</button>
            <a href="index.html" class="ts-logo-btn" title="Trade Station">${ICONS.logo}</a>
          </div>
          <div class="ts-header-roll">
            <button onclick="location.href='dashboard.html'" class="ts-header-btn ${currentPage==='dashboard.html'?'active':''}" title="Dashboard">${ICONS.house}</button>
            <button onclick="location.href='quotes.html'" class="ts-header-btn ${currentPage==='quotes.html'?'active':''}" title="Quotes">${ICONS.quotes}</button>
            <button onclick="location.href='charts.html'" class="ts-header-btn ${currentPage==='charts.html'?'active':''}" title="Charts">${ICONS.chart}</button>
            <button onclick="location.href='trade.html'" class="ts-header-btn ${currentPage==='trade.html'?'active':''}" title="Trades">${ICONS.trades}</button>
            <button onclick="location.href='history.html'" class="ts-header-btn ${currentPage==='history.html'?'active':''}" title="History">${ICONS.history}</button>
            <button onclick="location.href='mailbox.html'" class="ts-header-btn ${currentPage==='mailbox.html'?'active':''}" title="Mailbox">${ICONS.mailbox}</button>
            <button onclick="location.href='profile.html'" class="ts-header-btn ${currentPage==='profile.html'?'active':''}" title="Profile">${ICONS.user}</button>
            <button onclick="location.href='settings.html'" class="ts-header-btn ${currentPage==='settings.html'?'active':''}" title="Settings">${ICONS.gear}</button>
          </div>
          <div class="ts-header-right">
            <button onclick="location.href='notifications.html'" class="ts-header-btn relative ${currentPage==='notifications.html'?'active':''}" title="Notifications">
              ${ICONS.bell}
              ${unseenCount > 0 ? `<span class="ts-badge">${unseenCount > 9 ? '9+' : unseenCount}</span>` : ''}
            </button>
          </div>
        </div>
        <div id="more-dropdown" class="ts-more-dropdown hidden">
          <a href="profile.html" class="ts-more-item">${ICONS.user} Account / Profile</a>
          <a href="news.html" class="ts-more-item">${ICONS.newspaper} News</a>
          <a href="mailbox.html" class="ts-more-item">${ICONS.mailbox} Mail</a>
          <a href="settings.html" class="ts-more-item">${ICONS.gear} Settings</a>
          <a href="market.html" class="ts-more-item">${ICONS.market} Market</a>
          <div class="ts-more-divider"></div>
          <button onclick="TS_Auth.logout()" class="ts-more-item" style="width:100%;border:none;background:none;cursor:pointer;color:#f6465d;">${ICONS.close} Logout</button>
        </div>
      `;
      document.getElementById('btn-more')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('more-dropdown').classList.toggle('hidden');
      });
      document.addEventListener('click', (e) => {
        const drop = document.getElementById('more-dropdown');
        const btn = document.getElementById('btn-more');
        if (drop && !drop.classList.contains('hidden') && !drop.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
          drop.classList.add('hidden');
        }
      });
    }

    // Inject footer
    const footer = document.getElementById('ts-global-footer');
    if (footer && isLogged) {
      footer.innerHTML = `
        <nav class="ts-footer-nav">
          <a href="quotes.html" class="ts-footer-link ${currentPage==='quotes.html'?'active':''}">${ICONS.quotes}<span>Quotes</span></a>
          <a href="charts.html" class="ts-footer-link ${currentPage==='charts.html'?'active':''}">${ICONS.chart}<span>Charts</span></a>
          <a href="trade.html" class="ts-footer-link ${currentPage==='trade.html'?'active':''}">${ICONS.trades}<span>Trades</span></a>
          <a href="history.html" class="ts-footer-link ${currentPage==='history.html'?'active':''}">${ICONS.history}<span>History</span></a>
          <a href="mailbox.html" class="ts-footer-link ${currentPage==='mailbox.html'?'active':''}">${ICONS.mailbox}<span>Mailbox</span></a>
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
        const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=d7cq1t9r01qv03eta4rgd7cq1t9r01qv03eta4s0`);
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
