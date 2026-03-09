/* ─────────────────────────────────────────────────────────────────
   auth_store.js  —  Fake single-account auth
   There is exactly ONE real account. Everything else is theatre.

   The "session" is a fake token stored in localStorage so it
   survives page refreshes. No network calls. No real backend.
   ───────────────────────────────────────────────────────────────── */

const ACCOUNT = {
  avatar: null,
  email: 'dev@graphicalplayground.com',
  name: 'Engine Dev',
  password: 'Vulkan1337!',
  username: 'enginedev' // swap with '/images/avatar-me.jpg' if you have one
};

const SESSION_KEY = 'gp_session';
const RESET_KEY = 'gp_reset_requested';
const ONBOARD_KEY = 'gp_onboarding_done';

/* ── Helpers ──────────────────────────────────────────────────── */

/** Returns the stored session object, or null */
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** True if there is an active session */
export function isLoggedIn() {
  return getSession() !== null;
}

/**
 * Attempt to log in.
 * @returns {{ ok: true, user: object } | { ok: false, error: string }}
 */
export function login(email, password) {
  // Simulate a tiny network delay feel — callers should await this
  const emailMatch = email.trim().toLowerCase() === ACCOUNT.email.toLowerCase();
  const passwordMatch = password === ACCOUNT.password;

  if (!emailMatch || !passwordMatch) {
    return { error: 'Invalid email or password.', ok: false };
  }

  const session = {
    avatar: ACCOUNT.avatar,
    // fake token
    email: ACCOUNT.email,
    loggedInAt: new Date().toISOString(),
    name: ACCOUNT.name,
    token: btoa(`${ACCOUNT.email}:${Date.now()}`),
    username: ACCOUNT.username
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { ok: true, user: session };
}

/**
 * "Sign up" — always succeeds (creates the same single session).
 * In a real app this would POST to an API.
 */
export function signUp(email, _password, _name) {
  const session = {
    avatar: ACCOUNT.avatar,
    email: ACCOUNT.email,
    loggedInAt: new Date().toISOString(),
    name: ACCOUNT.name,
    token: btoa(`${ACCOUNT.email}:${Date.now()}`),
    username: ACCOUNT.username
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  // Always reset onboarding so a new sign-up goes through the tour
  localStorage.removeItem(ONBOARD_KEY);

  return { ok: true, user: session };
}

/** Clear the session */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(RESET_KEY);
}

/**
 * Fake password reset.
 * Always says an email was sent, regardless of address.
 */
export function requestPasswordReset(email) {
  // We store the requested email so the UI can show "check your inbox"
  localStorage.setItem(RESET_KEY, JSON.stringify({ at: new Date().toISOString(), email }));

  return { ok: true };
}

/** Returns the last reset-requested email, or null */
export function getResetRequest() {
  try {
    const raw = localStorage.getItem(RESET_KEY);

    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ── Onboarding ───────────────────────────────────────────────── */

/** True if the user has already finished the onboarding tour. */
export function hasCompletedOnboarding() {
  return localStorage.getItem(ONBOARD_KEY) === 'true';
}

/** Call this when the user finishes (or skips) the onboarding tour. */
export function markOnboardingDone() {
  localStorage.setItem(ONBOARD_KEY, 'true');
}

/* ── Course progress ──────────────────────────────────────────── */

const PROGRESS_KEY = 'gp_progress';

/* ── Full curriculum catalog ──────────────────────────────────── */
export const CATALOG = [
  /* ═══════════════════ TIER 1 — FOUNDATIONS ════════════════════ */
  {
    chapters: [
      { id: 'mod-01-c1', title: 'Scalar Mathematics & Notation' },
      { id: 'mod-01-c2', title: 'Vectors & the Geometric Toolkit' },
      { id: 'mod-01-c3', title: 'Matrices & Transformations' },
      { id: 'mod-01-c4', title: 'Quaternions & Rotations' },
      { id: 'mod-01-c5', title: 'Geometry & Analytic Tools' }
    ],
    color: '#38bdf8',
    id: 'mod-01',
    tier: 1,
    tierLabel: 'Tier 1 — Foundations',
    title: 'Mathematical Foundations for Graphics Engineering',
    track: 'Foundations'
  },
  {
    chapters: [
      { id: 'mod-02-c1', title: 'Modern C++ Bootcamp' },
      { id: 'mod-02-c2', title: 'Data Structures & Algorithms for Rendering' },
      { id: 'mod-02-c3', title: 'Build Systems & Project Hygiene' }
    ],
    color: '#38bdf8',
    id: 'mod-02',
    tier: 1,
    tierLabel: 'Tier 1 — Foundations',
    title: 'C++ for Graphics Engineers',
    track: 'Foundations'
  },
  {
    chapters: [
      { id: 'mod-03-c1', title: 'Platform Orientation' },
      { id: 'mod-03-c2', title: 'Understanding the GP Engine Philosophy' }
    ],
    color: '#38bdf8',
    id: 'mod-03',
    tier: 1,
    tierLabel: 'Tier 1 — Foundations',
    title: 'Introduction to the GP Engine & Cloud Platform',
    track: 'Foundations'
  },

  /* ══════════════ TIER 2 — CORE GRAPHICS PROGRAMMING ══════════ */
  {
    chapters: [
      { id: 'mod-04-c1', title: 'Pipeline Stages Overview' },
      { id: 'mod-04-c2', title: 'Tessellation & Geometry Shaders' },
      { id: 'mod-04-c3', title: 'Depth & Visibility' }
    ],
    color: '#a855f7',
    id: 'mod-04',
    tier: 2,
    tierLabel: 'Tier 2 — Core Graphics Programming',
    title: 'The Rasterization Pipeline',
    track: 'Core Graphics'
  },
  {
    chapters: [
      { id: 'mod-05-c1', title: 'Shader Language Fundamentals' },
      { id: 'mod-05-c2', title: 'Compute Shaders' },
      { id: 'mod-05-c3', title: 'Shader Optimization & Profiling' }
    ],
    color: '#a855f7',
    id: 'mod-05',
    tier: 2,
    tierLabel: 'Tier 2 — Core Graphics Programming',
    title: 'Shader Programming — HLSL & GLSL',
    track: 'Core Graphics'
  },
  {
    chapters: [
      { id: 'mod-06-c1', title: 'Texture Fundamentals' },
      { id: 'mod-06-c2', title: 'UV Mapping & Atlasing' },
      { id: 'mod-06-c3', title: 'Material System Design' }
    ],
    color: '#a855f7',
    id: 'mod-06',
    tier: 2,
    tierLabel: 'Tier 2 — Core Graphics Programming',
    title: 'Texturing, Sampling & Materials',
    track: 'Core Graphics'
  },
  {
    chapters: [
      { id: 'mod-07-c1', title: 'Classic Shading Models' },
      { id: 'mod-07-c2', title: 'Deferred & Forward Rendering' }
    ],
    color: '#a855f7',
    id: 'mod-07',
    tier: 2,
    tierLabel: 'Tier 2 — Core Graphics Programming',
    title: 'Lighting & Shading Models',
    track: 'Core Graphics'
  },
  {
    chapters: [
      { id: 'mod-08-c1', title: 'GPU Hardware Deep Dive' },
      { id: 'mod-08-c2', title: 'Memory & Bandwidth' }
    ],
    color: '#a855f7',
    id: 'mod-08',
    tier: 2,
    tierLabel: 'Tier 2 — Core Graphics Programming',
    title: 'GPU Architecture & the Memory Hierarchy',
    track: 'Core Graphics'
  },

  /* ══════════════ TIER 3 — ADVANCED RENDERING ══════════════════ */
  {
    chapters: [
      { id: 'mod-09-c1', title: 'The Physics of Light' },
      { id: 'mod-09-c2', title: 'Microfacet Theory & BRDF Models' },
      { id: 'mod-09-c3', title: 'Image-Based Lighting & HDR' }
    ],
    color: '#10b981',
    id: 'mod-09',
    tier: 3,
    tierLabel: 'Tier 3 — Advanced Rendering',
    title: 'Physically Based Rendering (PBR)',
    track: 'Advanced Rendering'
  },
  {
    chapters: [
      { id: 'mod-10-c1', title: 'Ambient Occlusion' },
      { id: 'mod-10-c2', title: 'Real-Time Global Illumination' },
      { id: 'mod-10-c3', title: 'Baked Lighting & Lightmaps' }
    ],
    color: '#10b981',
    id: 'mod-10',
    tier: 3,
    tierLabel: 'Tier 3 — Advanced Rendering',
    title: 'Global Illumination Techniques',
    track: 'Advanced Rendering'
  },
  {
    chapters: [
      { id: 'mod-11-c1', title: 'Ray Tracing Foundations' },
      { id: 'mod-11-c2', title: 'Path Tracing' },
      { id: 'mod-11-c3', title: 'Denoising & Reconstruction' }
    ],
    color: '#10b981',
    id: 'mod-11',
    tier: 3,
    tierLabel: 'Tier 3 — Advanced Rendering',
    title: 'Ray Tracing & Path Tracing',
    track: 'Advanced Rendering'
  },
  {
    chapters: [
      { id: 'mod-12-c1', title: 'Shadow Maps' },
      { id: 'mod-12-c2', title: 'Screen-Space & Hybrid Shadow Techniques' }
    ],
    color: '#10b981',
    id: 'mod-12',
    tier: 3,
    tierLabel: 'Tier 3 — Advanced Rendering',
    title: 'Shadows',
    track: 'Advanced Rendering'
  },
  {
    chapters: [
      { id: 'mod-13-c1', title: 'Anti-Aliasing Strategies' },
      { id: 'mod-13-c2', title: 'Temporal Reprojection Systems' },
      { id: 'mod-13-c3', title: 'Post-Processing Stack' }
    ],
    color: '#10b981',
    id: 'mod-13',
    tier: 3,
    tierLabel: 'Tier 3 — Advanced Rendering',
    title: 'Temporal Techniques & Anti-Aliasing',
    track: 'Advanced Rendering'
  },

  /* ══════════ TIER 4 — ENGINE ARCHITECTURE & EXPERT SYSTEMS ════ */
  {
    chapters: [
      { id: 'mod-14-c1', title: 'Low-Level API Mastery' },
      { id: 'mod-14-c2', title: 'Building an RHI Abstraction Layer' }
    ],
    color: '#f59e0b',
    id: 'mod-14',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Render Hardware Interface (RHI) Design',
    track: 'Engine Architecture'
  },
  {
    chapters: [
      { id: 'mod-15-c1', title: 'The Render Graph Concept' },
      { id: 'mod-15-c2', title: 'Resource Management & Aliasing' }
    ],
    color: '#f59e0b',
    id: 'mod-15',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Frame Graph & Render Graph Architecture',
    track: 'Engine Architecture'
  },
  {
    chapters: [
      { id: 'mod-16-c1', title: 'CPU-Side Culling' },
      { id: 'mod-16-c2', title: 'GPU-Driven Culling' },
      { id: 'mod-16-c3', title: 'Level of Detail (LOD) Systems' }
    ],
    color: '#f59e0b',
    id: 'mod-16',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Visibility, Culling & Scene Representation',
    track: 'Engine Architecture'
  },
  {
    chapters: [
      { id: 'mod-17-c1', title: 'Unreal Engine 5 — System Architecture' },
      { id: 'mod-17-c2', title: 'DECIMA Engine (Guerrilla Games)' },
      { id: 'mod-17-c3', title: 'ID Tech 7 (id Software — DOOM Eternal)' },
      { id: 'mod-17-c4', title: "Anvil Engine (Ubisoft — Assassin's Creed)" }
    ],
    color: '#f59e0b',
    id: 'mod-17',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Modern Production Engine Rendering Systems',
    track: 'Engine Architecture'
  },
  {
    chapters: [
      { id: 'mod-18-c1', title: 'Terrain & Open World Rendering' },
      { id: 'mod-18-c2', title: 'Atmospheric & Volumetric Rendering' },
      { id: 'mod-18-c3', title: 'Water & Fluid Rendering' },
      { id: 'mod-18-c4', title: 'Character & Skin Rendering' }
    ],
    color: '#f59e0b',
    id: 'mod-18',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Specialized Rendering Domains',
    track: 'Engine Architecture'
  },
  {
    chapters: [
      { id: 'mod-19-c1', title: 'CPU & Threading Architecture' },
      { id: 'mod-19-c2', title: 'GPU Profiling & Optimization' }
    ],
    color: '#f59e0b',
    id: 'mod-19',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Low-Level Optimization & Performance Engineering',
    track: 'Engine Architecture'
  },
  {
    chapters: [
      { id: 'mod-20-c1', title: 'Capstone Project — Path-Traced Deferred Hybrid Renderer' },
      { id: 'mod-20-c2', title: 'Certification & Industry Readiness' }
    ],
    color: '#f59e0b',
    id: 'mod-20',
    tier: 4,
    tierLabel: 'Tier 4 — Engine Architecture & Expert Systems',
    title: 'Capstone: Build Your Own Renderer',
    track: 'Engine Architecture'
  }
];

/**
 * Default "seed" progress — shows the first module partially started.
 * completedLessons counts completed chapters.
 * lastLesson = most recently touched chapter.
 */
const DEFAULT_PROGRESS = {
  announcements: [
    {
      at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      body: 'All 5 modules of Tier 2 are available, including GPU Architecture & the Memory Hierarchy.',
      id: 'ann-01',
      read: false,
      title: 'Tier 2 — Core Graphics is now live',
      type: 'new'
    },
    {
      at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      body: 'Even if you know the math — Ch 1.3 (Matrices & Transformations) reveals how rendering engines think about it. Do not skip.',
      id: 'ann-02',
      read: false,
      title: 'Tip: start with Module 1',
      type: 'tip'
    }
  ],
  courses: [
    {
      color: '#38bdf8',
      completedLessons: 2,
      id: 'mod-01',
      lastLesson: {
        at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        id: 'mod-01-c2',
        title: 'Vectors & the Geometric Toolkit'
      },
      title: 'Mathematical Foundations for Graphics Engineering',
      totalLessons: 5,
      track: 'Foundations'
    },
    {
      color: '#a855f7',
      completedLessons: 0,
      id: 'mod-04',
      lastLesson: null,
      title: 'The Rasterization Pipeline',
      totalLessons: 3,
      track: 'Core Graphics'
    }
  ]
};

/** Returns the full progress object (seeded from DEFAULT_PROGRESS on first call). */
export function getProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);

    return raw ? JSON.parse(raw) : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

/** Persist a full progress object back to localStorage. */
export function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

/** Mark a single announcement as read by id. */
export function markAnnouncementRead(id) {
  const p = getProgress();

  p.announcements = p.announcements.map((a) => (a.id === id ? { ...a, read: true } : a));
  saveProgress(p);
}
