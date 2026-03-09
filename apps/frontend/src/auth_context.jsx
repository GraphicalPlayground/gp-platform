/**
 * auth_context.jsx — Global auth state via React Context.
 *
 * Wraps auth_store.js so any component in the tree can call:
 *
 *   const { session, loggedIn, login, signUp, logout } = useAuth();
 *
 * …without prop drilling. The context re-renders the tree whenever
 * auth state changes (login / logout / signUp), so the navbar,
 * protected routes, and user menus all update automatically.
 *
 * Usage:
 *   // main.jsx
 *   <AuthProvider>
 *     <BrowserRouter>…</BrowserRouter>
 *   </AuthProvider>
 *
 *   // any component
 *   import { useAuth } from './auth_context.jsx';
 *   const { loggedIn, session, logout } = useAuth();
 */

import React from 'react';

import * as store from './auth_store.js';
/* ── Context ───────────────────────────────────────────────────── */
const AuthContext = React.createContext(null);

/* ─────────────────────────────────────────────────────────────────
   PROVIDER
   ───────────────────────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  // Initialize from whatever is already in localStorage so a hard-
  // refresh keeps you logged in — same as a real site with a cookie.
  const [session, setSession] = React.useState(() => store.getSession());

  const loggedIn = session !== null;

  /* ── login ── */
  async function login(email, password) {
    // Give callers back the full result so they can handle errors
    const result = store.login(email, password);

    if (result.ok) setSession(result.user);

    return result;
  }

  /* ── signUp ── */
  async function signUp(email, password, name) {
    const result = store.signUp(email, password, name);

    if (result.ok) setSession(result.user);

    return result;
  }

  /* ── logout ── */
  function logout() {
    store.logout();
    setSession(null);
  }

  /* ── requestPasswordReset ── */
  function requestPasswordReset(email) {
    return store.requestPasswordReset(email);
  }

  /* ── onboarding ── */
  function markOnboardingDone() {
    store.markOnboardingDone();
  }

  function hasCompletedOnboarding() {
    return store.hasCompletedOnboarding();
  }

  const value = {
    hasCompletedOnboarding,

    // full user object or null
    loggedIn,
    // boolean shorthand
    login,
    logout,
    markOnboardingDone,
    requestPasswordReset,
    session,
    signUp
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─────────────────────────────────────────────────────────────────
   HOOK
   ───────────────────────────────────────────────────────────────── */
export function useAuth() {
  const ctx = React.useContext(AuthContext);

  if (!ctx) throw new Error('useAuth() must be used inside <AuthProvider>');

  return ctx;
}
