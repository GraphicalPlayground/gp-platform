import React from 'react';
import { tv } from 'tailwind-variants';
import { useAuth } from '../auth_context.jsx';
import { LogoFull } from '../components/Logo.jsx';

/* ─────────────────────────────────────────────────────────────────
   IMAGE SLOTS
   Drop your screenshots in apps/frontend/public/images/ and fill
   in the paths below. All images are lazy-loaded, object-cover.
   ───────────────────────────────────────────────────────────────── */
const IMAGES = {
  heroScreenshot: null,      // e.g. '/images/hero-renderer.png'   — a C++ renderer or Vulkan pipeline screenshot
  track1: null,              // e.g. '/images/track-rendering.png' — GLSL/HLSL code + rendered triangle
  track2: null,              // e.g. '/images/track-vulkan.png'    — Vulkan API diagram or render pass
  track3: null,              // e.g. '/images/track-ecs.png'       — ECS architecture diagram / memory layout
  track4: null,              // e.g. '/images/track-physics.png'   — physics simulation wireframe
  lessonThumb: null,         // e.g. '/images/lesson-example.png'  — code + output side by side
  testimonialAvatar1: null,
  testimonialAvatar2: null,
  testimonialAvatar3: null,
};

/* ── Button variants ─────────────────────────────────────────────── */
const btn = tv({
  base: [
    'relative inline-flex items-center justify-center gap-2 overflow-hidden cursor-pointer',
    'rounded-[10px] border-none outline-none',
    'text-[15px] font-bold tracking-[0.15px]',
    'transition-[transform,box-shadow,filter] duration-[180ms] ease-out',
    'hover:-translate-y-0.5 active:translate-y-0',
  ],
  variants: {
    variant: {
      primary: [
        'text-white px-[28px] py-[14px]',
        'bg-gradient-to-br from-sky-500 to-violet-600',
        'shadow-[0_0_0_1px_rgba(14,165,233,0.38),0_8px_28px_rgba(14,165,233,0.28),inset_0_1px_0_rgba(255,255,255,0.14)]',
        'hover:brightness-110',
        'hover:shadow-[0_0_0_1px_rgba(14,165,233,0.55),0_14px_36px_rgba(14,165,233,0.38),inset_0_1px_0_rgba(255,255,255,0.14)]',
      ],
      ghost: [
        'text-slate-300 px-[24px] py-[13px]',
        'bg-transparent backdrop-blur-sm',
        'shadow-[0_0_0_1px_rgba(148,163,184,0.16),inset_0_1px_0_rgba(255,255,255,0.04)]',
        'hover:text-white',
        'hover:shadow-[0_0_0_1px_rgba(148,163,184,0.30),0_6px_20px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.06)]',
      ],
      sm: [
        'text-sky-400 px-[14px] py-[7px] text-[12px]',
        'bg-sky-500/10 backdrop-blur-sm',
        'shadow-[0_0_0_1px_rgba(14,165,233,0.18)]',
        'hover:bg-sky-500/20 hover:text-sky-300',
      ],
    },
  },
  defaultVariants: { variant: 'primary' },
});

/* ── Data ────────────────────────────────────────────────────────── */
const TRACKS = [
  {
    accent: '#38bdf8',
    desc: 'Math for graphics, modern C++, build systems, and an introduction to the GP Engine. Everything you need before writing a single shader.',
    icon: '◈',
    id: 1,
    img: IMAGES.track1,
    lessons: 10,
    level: 'Start Here',
    modules: 3,
    tag: 'Tier 1',
    title: 'Foundations',
  },
  {
    accent: '#a855f7',
    desc: 'Rasterization pipeline, HLSL & GLSL shader programming, texturing, lighting models, and GPU architecture internals.',
    icon: '△',
    id: 2,
    img: IMAGES.track2,
    lessons: 13,
    level: 'Intermediate',
    modules: 5,
    tag: 'Tier 2',
    title: 'Core Graphics Programming',
  },
  {
    accent: '#10b981',
    desc: 'PBR, global illumination, ray tracing & path tracing, shadow techniques, temporal reprojection, anti-aliasing, and post-processing.',
    icon: '⬡',
    id: 3,
    img: IMAGES.track3,
    lessons: 14,
    level: 'Advanced',
    modules: 5,
    tag: 'Tier 3',
    title: 'Advanced Rendering',
  },
  {
    accent: '#f59e0b',
    desc: 'RHI design, render graphs, GPU-driven culling, production engine case studies (UE5, DOOM Eternal), and a capstone renderer build.',
    icon: '◉',
    id: 4,
    img: IMAGES.track4,
    lessons: 21,
    level: 'Expert',
    modules: 7,
    tag: 'Tier 4',
    title: 'Engine Architecture & Expert Systems',
  },
];

/* ── Curriculum (all 20 modules, grouped by tier) ──────────────── */
/* Moved to the dedicated /catalog page. */

const STEPS = [
  {
    num: '01',
    title: 'Pick an Engineering Track',
    desc: 'From Tier 1 Foundations to Tier 4 Engine Architecture, structured from first principles, no experience assumed.',
  },
  {
    num: '02',
    title: 'Code It from Scratch',
    desc: 'Every lesson is hands-on C++ or GLSL/HLSL. No black boxes. You write every system, understand every line.',
  },
  {
    num: '03',
    title: 'Ship Your Own Renderer',
    desc: 'The Tier 4 capstone is a path-traced deferred hybrid renderer you own entirely. Ship it to your portfolio.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'I always wanted to understand what happens below the engine layer. This platform is the only place that actually teaches it step by step.',
    name: 'Alex R.',
    role: 'Graphics Programmer',
    avatar: IMAGES.testimonialAvatar1,
  },
  {
    quote: 'The Vulkan track is brutal in the best way. I finally understand command buffers and synchronization after years of avoiding it.',
    name: 'Jonas M.',
    role: 'Engine Developer',
    avatar: IMAGES.testimonialAvatar2,
  },
  {
    quote: 'ECS from scratch. No Unity, no Unreal. Just pure C++ and solid theory. Exactly what I was looking for.',
    name: 'Hana T.',
    role: 'Systems Programmer',
    avatar: IMAGES.testimonialAvatar3,
  },
];

const STATS = [
  { value: '8k+',  label: 'Engine Devs' },
  { value: '20',   label: 'Modules' },
  { value: '58',   label: 'Chapters' },
  { value: '100%', label: 'Free to Start' },
];

/* ── Keyframes + special-class helpers ──────────────────────────── */
const KEYFRAMES = `
  @keyframes lp-pulse {
    from { opacity: .6 } to { opacity: 1 }
  }
  @keyframes lp-grid-scroll {
    from { background-position: 0 0 } to { background-position: 72px 72px }
  }
  @keyframes lp-scan {
    from { background-position: 0 0 } to { background-position: 0 200px }
  }
  @keyframes lp-orb1 {
    0%,100% { transform: translate(0,0)   scale(1)    }
    40%     { transform: translate(55px,40px)  scale(1.06) }
    75%     { transform: translate(-20px,60px) scale(.97)  }
  }
  @keyframes lp-orb2 {
    0%,100% { transform: translate(0,0)         scale(1)    }
    45%     { transform: translate(-60px,-35px)  scale(1.07) }
    80%     { transform: translate(28px,-52px)   scale(.95)  }
  }
  @keyframes lp-blink {
    0%,100% { opacity: 1 } 50% { opacity: .2 }
  }
  @keyframes lp-shimmer {
    from { background-position: 0% center }
    to   { background-position: 200% center }
  }
  @keyframes lp-fadein {
    from { opacity: 0; transform: translateY(14px) }
    to   { opacity: 1; transform: translateY(0) }
  }
  @keyframes lp-slide-up {
    from { opacity: 0; transform: translateY(30px) }
    to   { opacity: 1; transform: translateY(0) }
  }
  @keyframes lp-card-appear {
    from { opacity: 0; transform: scale(.96) translateY(12px) }
    to   { opacity: 1; transform: scale(1)   translateY(0) }
  }

  /* animation helpers */
  .lp-anim-pulse  { animation: lp-pulse 8s ease-in-out infinite alternate; }
  .lp-anim-grid   { animation: lp-grid-scroll 20s linear infinite; }
  .lp-anim-scan   { animation: lp-scan 6s linear infinite; }
  .lp-anim-orb1   { animation: lp-orb1 22s ease-in-out infinite; }
  .lp-anim-orb2   { animation: lp-orb2 26s ease-in-out infinite; }
  .lp-anim-blink  { animation: lp-blink 2.4s ease-in-out infinite; }

  .lp-anim-f0  { animation: lp-fadein .5s ease both; }
  .lp-anim-f1  { animation: lp-fadein .6s  .06s ease both; }
  .lp-anim-f2  { animation: lp-fadein .7s  .13s ease both; }
  .lp-anim-f3  { animation: lp-fadein .8s  .22s ease both; }
  .lp-anim-f4  { animation: lp-fadein .9s  .32s ease both; }
  .lp-anim-f5  { animation: lp-fadein  1s  .45s ease both; }
  .lp-anim-f6  { animation: lp-fadein  1s  .60s ease both; }
  .lp-anim-f7  { animation: lp-fadein  1s  .80s ease both; }

  .lp-anim-su0 { animation: lp-slide-up .7s .1s  ease both; }
  .lp-anim-su1 { animation: lp-slide-up .7s .22s ease both; }
  .lp-anim-su2 { animation: lp-slide-up .7s .34s ease both; }
  .lp-anim-su3 { animation: lp-slide-up .7s .46s ease both; }

  .lp-anim-ca0 { animation: lp-card-appear .6s .1s  ease both; }
  .lp-anim-ca1 { animation: lp-card-appear .6s .22s ease both; }
  .lp-anim-ca2 { animation: lp-card-appear .6s .34s ease both; }
  .lp-anim-ca3 { animation: lp-card-appear .6s .46s ease both; }

  /* gradient text */
  .lp-title-accent {
    display: inline;
    background: linear-gradient(90deg, #00a6ff 0%, #a855f7 50%, #00a6ff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: lp-shimmer 4s linear infinite, lp-fadein .7s .13s ease both;
  }

  /* primary button hover shine */
  .lp-btn-shine::after {
    content: ''; position: absolute;
    top: 0; left: -120%; width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.18), transparent);
    transform: skewX(-18deg); transition: left .5s ease;
  }
  .lp-btn-shine:hover::after { left: 170%; }

  /* logo inner shine */
  .lp-logo::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,.22) 0%, transparent 55%);
  }

  /* track card hover lift */
  .lp-track-card { transition: transform .25s ease, box-shadow .25s ease; }
  .lp-track-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 0 1px rgba(0,166,255,.18), 0 30px 60px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.07);
  }

  /* hero screenshot frame — desktop only */
  .lp-hero-frame {
    position: absolute;
    right: 0; top: 50%;
    transform: translateY(-50%);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(0,166,255,.14);
    box-shadow: 0 0 0 1px rgba(0,166,255,.07), 0 40px 80px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.05);
    animation: lp-card-appear .9s .5s ease both;
  }
  @media (max-width: 1023px) { .lp-hero-frame { display: none !important; } }

  /* lesson preview window */
  .lp-code-win {
    border-radius: 14px;
    border: 1px solid rgba(0,166,255,.10);
    background: linear-gradient(135deg, rgba(0,166,255,.05) 0%, rgba(125,0,255,.03) 100%);
    backdrop-filter: blur(12px);
    box-shadow: 0 0 0 1px rgba(0,166,255,.06), 0 32px 64px rgba(0,0,0,.48);
  }
`;

let _kfInjected = false;
function injectKeyframes() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('lp-kf')) return;
  const tag = document.createElement('style');
  tag.id = 'lp-kf';
  tag.textContent = KEYFRAMES;
  document.head.appendChild(tag);
  _kfInjected = true;
}
injectKeyframes();

/* ── Shared glass card style ────────────────────────────────────── */
const GLASS = {
  border: '1px solid rgba(0,166,255,.09)',
  background: 'linear-gradient(135deg,rgba(0,166,255,.055) 0%,rgba(125,0,255,.035) 100%)',
  backdropFilter: 'blur(14px)',
  boxShadow: '0 0 0 1px rgba(0,166,255,.05),0 24px 48px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.045)',
};

/* ── Tiny helpers ───────────────────────────────────────────────── */
function Avatar({ src, name, size = 40 }) {
  return src ? (
    <img src={src} alt={name} loading="lazy"
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size, border: '2px solid rgba(0,166,255,.18)' }} />
  ) : (
    <div className="rounded-full shrink-0 flex items-center justify-center text-[13px] font-bold text-sky-300"
      style={{
        width: size, height: size,
        background: 'linear-gradient(135deg,rgba(0,166,255,.22),rgba(125,0,255,.22))',
        border: '2px solid rgba(0,166,255,.18)',
      }}>
      {name?.[0]}
    </div>
  );
}

/** Drop-in image slot — shows a placeholder when no src is provided */
function ImageSlot({ src, alt = 'screenshot', className = '' }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" className={`object-cover w-full h-full ${className}`} />;
  }
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${className}`}
      style={{ background: 'rgba(0,166,255,.04)' }}>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="rgba(0,166,255,.28)" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span className="text-[10px] text-slate-700 tracking-[1.2px] uppercase">Image Slot</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function LandingPage({ onLogin, onSignUp, onCatalog }) {
  const { loggedIn, session, logout } = useAuth();
  const [mobileNav, setMobileNav] = React.useState(false);
  const [userMenu,  setUserMenu]  = React.useState(false);

  const handleSignUp  = () => onSignUp?.();
  const handleLogin   = () => onLogin?.();
  const handleCatalog = () => onCatalog?.();

  // Close user menu on outside click
  const userMenuRef = React.useRef(null);
  React.useEffect(() => {
    if (!userMenu) return;
    function handler(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenu(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [userMenu]);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden bg-[#06060a] text-slate-100 antialiased"
      style={{ fontFamily: "'Inter',ui-sans-serif,system-ui,sans-serif" }}
    >

      {/* ════════════════════════════════════════
          AMBIENT BACKGROUND (fixed, below everything)
      ════════════════════════════════════════ */}
      <div className="lp-anim-pulse pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 1200px 600px at 10% 8%,rgba(0,166,255,.10) 0%,transparent 68%),radial-gradient(ellipse 900px 500px at 90% 88%,rgba(125,0,255,.09) 0%,transparent 68%)' }} />
      <div className="lp-anim-grid pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,166,255,.038) 1px,transparent 1px),linear-gradient(90deg,rgba(0,166,255,.038) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)',
        }} />
      <div className="lp-anim-scan pointer-events-none fixed inset-0 z-0"
        style={{ background: 'repeating-linear-gradient(to bottom,transparent 0px,transparent 3px,rgba(0,166,255,.013) 3px,rgba(0,166,255,.013) 4px)' }} />
      <div className="lp-anim-orb1 pointer-events-none fixed rounded-full blur-[110px] opacity-[.13] w-[600px] h-[600px] bg-[#00a6ff] -top-[180px] -left-[160px] z-0" />
      <div className="lp-anim-orb2 pointer-events-none fixed rounded-full blur-[110px] opacity-[.12] w-[480px] h-[480px] bg-[#7d00ff] -bottom-[120px] -right-[100px] z-0" />

      {/* ════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{ borderBottom: '1px solid rgba(0,166,255,.07)', background: 'rgba(6,6,10,.82)', backdropFilter: 'blur(18px)' }}>
        <div className="mx-auto flex items-center justify-between w-[min(1200px,94%)] py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <LogoFull height={36} />
          </div>
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-[13px] text-slate-400">
            <a href="#tracks"       className="hover:text-sky-400 transition-colors duration-150">Tracks</a>
            <a href="#how-it-works" className="hover:text-sky-400 transition-colors duration-150">How It Works</a>
            <a href="#community"    className="hover:text-sky-400 transition-colors duration-150">Community</a>
          </div>
          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            {loggedIn ? (
              /* ── Logged-in user menu ── */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenu(v => !v)}
                  className="flex items-center gap-2.5 rounded-[10px] px-3 py-2 transition-colors duration-150"
                  style={{ border: '1px solid rgba(0,166,255,.14)', background: userMenu ? 'rgba(0,166,255,.08)' : 'rgba(255,255,255,.04)' }}
                >
                  {/* Avatar initials */}
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#00a6ff,#7d00ff)' }}>
                    {(session?.name ?? 'U').charAt(0).toUpperCase()}
                  </span>
                  <span className="text-[13px] font-medium text-slate-200">{session?.name ?? 'Account'}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className="text-slate-500 transition-transform duration-150"
                    style={{ transform: userMenu ? 'rotate(180deg)' : 'none' }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {/* Dropdown */}
                {userMenu && (
                  <div className="absolute right-0 mt-2 w-52 rounded-[12px] overflow-hidden z-50"
                    style={{ border: '1px solid rgba(0,166,255,.12)', background: 'rgba(10,10,18,.95)', backdropFilter: 'blur(16px)', boxShadow: '0 16px 48px rgba(0,0,0,.6)' }}>

                    {/* User info header */}
                    <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                      <p className="text-[13px] font-semibold text-slate-200">{session?.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{session?.email}</p>
                    </div>

                    {/* Menu items */}
                    <div className="py-1.5">
                      <a href="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-300 hover:text-white hover:bg-white/[.05] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                        Dashboard
                      </a>
                      <a href="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-300 hover:text-white hover:bg-white/[.05] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Profile
                      </a>
                      <a href="/settings" className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-300 hover:text-white hover:bg-white/[.05] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                        Settings
                      </a>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }} className="py-1.5">
                      <button
                        onClick={() => { setUserMenu(false); logout(); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-red-400 hover:text-red-300 hover:bg-red-500/[.07] transition-colors text-left">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged-out buttons ── */
              <>
                <button className={btn({ variant: 'ghost' })} onClick={handleLogin}
                  style={{ padding: '8px 18px', fontSize: 13 }}>Login</button>
                <button className={`${btn({ variant: 'primary' })} lp-btn-shine`} onClick={handleSignUp}
                  style={{ padding: '9px 20px', fontSize: 13 }}>Sign Up Free</button>
              </>
            )}
          </div>
          {/* Hamburger */}
          <button className="md:hidden text-slate-400 hover:text-white p-1" onClick={() => setMobileNav(v => !v)} aria-label="Toggle menu">
            {mobileNav
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
        {mobileNav && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4 text-[14px] text-slate-400"
            style={{ borderTop: '1px solid rgba(0,166,255,.07)' }}>
            <a href="#tracks"       className="hover:text-sky-400 pt-4 transition-colors" onClick={() => setMobileNav(false)}>Tracks</a>
            <a href="#how-it-works" className="hover:text-sky-400 transition-colors"      onClick={() => setMobileNav(false)}>How It Works</a>
            <a href="#community"    className="hover:text-sky-400 transition-colors"      onClick={() => setMobileNav(false)}>Community</a>
            {loggedIn ? (
              <div className="flex flex-col gap-1 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
                <div className="flex items-center gap-2.5 py-2">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#00a6ff,#7d00ff)' }}>
                    {(session?.name ?? 'U').charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-200 leading-tight">{session?.name}</p>
                    <p className="text-[11px] text-slate-500">{session?.email}</p>
                  </div>
                </div>
                <a href="/dashboard" className="text-slate-300 hover:text-sky-400 transition-colors py-1" onClick={() => setMobileNav(false)}>Dashboard</a>
                <a href="/profile"   className="text-slate-300 hover:text-sky-400 transition-colors py-1" onClick={() => setMobileNav(false)}>Profile</a>
                <button className="text-left text-red-400 hover:text-red-300 transition-colors py-1 mt-1"
                  onClick={() => { setMobileNav(false); logout(); }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex gap-3 pt-2">
                <button className={btn({ variant: 'ghost' })}                                onClick={handleLogin}  style={{ fontSize: 13, padding: '8px 16px' }}>Login</button>
                <button className={`${btn({ variant: 'primary' })} lp-btn-shine`}            onClick={handleSignUp} style={{ fontSize: 13, padding: '9px 18px' }}>Sign Up Free</button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Spacer so content isn't hidden under the fixed navbar (~65px tall) */}
      <div className="h-[65px] shrink-0" />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative z-10 mx-auto w-[min(1200px,94%)] pt-[80px] pb-[90px] flex items-center">
        {/* Left copy */}
        <div className="max-w-[580px]">
          {/* Eyebrow */}
          <div className="lp-anim-f0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-sky-400 px-3.5 py-1.5 rounded-full mb-6"
            style={{ border: '1px solid rgba(0,166,255,.2)', background: 'rgba(0,166,255,.06)' }}>
            <span className="lp-anim-blink w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            Build Game Engines from Scratch
          </div>

          {/* H1 */}
          <h1 className="lp-anim-f1 text-[clamp(34px,5.2vw,62px)] font-extrabold leading-[1.04] tracking-[-1.5px] text-white mb-5">
            Learn to code<br />
            <span className="lp-title-accent">game engines, not use them</span>
          </h1>

          {/* Subtitle */}
          <p className="lp-anim-f2 text-[16px] leading-[1.75] text-slate-400 mb-2">
            <strong className="text-slate-200">Graphical Playground</strong> is the first structured learning platform
            for engine programmers: real-time rendering, Vulkan, ECS, physics engines. Built for developers who want to go low-level.
          </p>
          <p className="lp-anim-f2 text-[15px] leading-[1.75] text-slate-500 mb-10">
            C++, GLSL, HLSL, Vulkan, OpenGL. No magic. No black boxes. Just systems.
          </p>

          {/* CTAs */}
          <div className="lp-anim-f3 flex flex-wrap gap-3 items-center">
            <button className={`${btn({ variant: 'primary' })} lp-btn-shine`} onClick={handleSignUp}>
              Start Learning, it&apos;s free
            </button>
            <button className={btn({ variant: 'ghost' })} onClick={handleLogin}>
              I have an account
            </button>
          </div>

          {/* Trust stats */}
          <div className="lp-anim-f4 flex flex-wrap gap-7 mt-11 pt-9"
            style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-[26px] font-extrabold text-white tracking-[-0.5px] leading-none">{value}</div>
                <div className="text-[11px] text-slate-600 mt-1 uppercase tracking-[1px]">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero screenshot frame (desktop only) */}
        <div className="lp-hero-frame" style={{ width: 'min(460px,38vw)', aspectRatio: '16/10' }}>
          <div className="w-full h-full flex flex-col">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 shrink-0"
              style={{ background: 'rgba(0,0,0,.45)', borderBottom: '1px solid rgba(0,166,255,.08)' }}>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/55" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/55" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/55" />
              <span className="flex-1 mx-3 text-[10px] text-slate-600 truncate">renderer.cpp | Vulkan Swapchain Init</span>
            </div>
            <div className="flex-1">
              <ImageSlot src={IMAGES.heroScreenshot} alt="Unreal Engine viewport" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRACKS  (SoloLearn-style course cards)
      ════════════════════════════════════════ */}
      <section id="tracks" className="relative z-10 py-[90px]"
        style={{ borderTop: '1px solid rgba(0,166,255,.06)' }}>
        <div className="mx-auto w-[min(1200px,94%)]">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="lp-anim-su0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-violet-400 px-3.5 py-1.5 rounded-full mb-4"
              style={{ border: '1px solid rgba(168,85,247,.22)', background: 'rgba(168,85,247,.06)' }}>
              Learning Tracks
            </div>
            <h2 className="lp-anim-su1 text-[clamp(26px,3.8vw,46px)] font-extrabold tracking-[-1px] text-white leading-tight mb-4">
              Go from hello triangle to full engine
            </h2>
            <p className="lp-anim-su2 max-w-[520px] mx-auto text-[15px] text-slate-400 leading-[1.75]">
              Each track is structured like an engineering course: theory, hands-on C++ implementation, and real low-level projects you own entirely.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRACKS.map((t, i) => (
              <div key={t.id}
                className={`lp-track-card lp-anim-ca${i} flex flex-col rounded-[16px] overflow-hidden`}
                style={GLASS}>
                {/* Thumbnail */}
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <ImageSlot src={t.img} alt={t.title} />
                  <div className="absolute top-2.5 left-2.5 text-[10px] font-bold tracking-[1.5px] uppercase px-2 py-0.5 rounded-full"
                    style={{ color: t.accent, background: `${t.accent}1A`, border: `1px solid ${t.accent}33` }}>
                    {t.level}
                  </div>
                </div>
                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-2">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[18px]" style={{ color: t.accent }}>{t.icon}</span>
                    <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-slate-500">{t.tag}</span>
                  </div>
                  <h3 className="text-[15px] font-bold text-white leading-tight">{t.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-[1.65] flex-1">{t.desc}</p>
                  <div className="mt-3 pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                    <span className="text-[12px] text-slate-500">{t.modules} modules · {t.lessons} chapters</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className={`${btn({ variant: 'primary' })} lp-anim-su3 lp-btn-shine`}
              style={{ fontSize: 14, padding: '12px 32px' }} onClick={handleCatalog}>
              Explore the full catalog →
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section id="how-it-works" className="relative z-10 py-[90px]"
        style={{ borderTop: '1px solid rgba(0,166,255,.06)' }}>
        <div className="mx-auto w-[min(1200px,94%)]">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Steps */}
            <div className="flex-1 max-w-[520px]">
              <div className="lp-anim-su0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-sky-400 px-3.5 py-1.5 rounded-full mb-6"
                style={{ border: '1px solid rgba(0,166,255,.2)', background: 'rgba(0,166,255,.06)' }}>
                How It Works
              </div>
              <h2 className="lp-anim-su1 text-[clamp(24px,3.5vw,42px)] font-extrabold tracking-[-1px] text-white leading-tight mb-10">
                Built for low-level thinkers
              </h2>
              <div className="flex flex-col gap-8">
                {STEPS.map((s, i) => (
                  <div key={s.num} className={`lp-anim-su${i} flex gap-5`}>
                    <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-black text-sky-400"
                      style={{ background: 'rgba(0,166,255,.10)', border: '1px solid rgba(0,166,255,.22)', boxShadow: '0 0 18px rgba(0,166,255,.12)' }}>
                      {s.num}
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-white mb-1.5">{s.title}</h3>
                      <p className="text-[14px] text-slate-400 leading-[1.7]">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson preview card */}
            <div className="lp-anim-ca0 flex-1 w-full max-w-[500px] lp-code-win overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3"
                style={{ background: 'rgba(0,0,0,.35)', borderBottom: '1px solid rgba(0,166,255,.08)' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                <span className="flex-1 mx-2 text-[11px] text-slate-600">Lesson 4 | Render Pass · Vulkan & Modern Graphics</span>
              </div>
              {/* Lesson thumb */}
              <div style={{ height: 190 }}>
                <ImageSlot src={IMAGES.lessonThumb} alt="Lesson preview" />
              </div>
              {/* Code */}
              <div className="px-5 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] text-slate-600 uppercase tracking-[1.2px]">render_pass.cpp</span>
                  <span className="ml-auto text-[10px] text-emerald-400/70 tracking-[1px]">● saved</span>
                </div>
                <pre className="text-[12px] leading-[1.9] text-slate-400/70 whitespace-pre font-mono overflow-x-auto">
                  <span className="text-slate-500">// 🎓 Lesson: Create your first Vulkan render pass</span>{'\n'}
                  <span className="text-violet-400">VkAttachmentDescription</span>{' color_attachment{};\n'}
                  {'color_attachment.format  = '}<span className="text-emerald-400">swapchain_format</span>{';\n'}
                  {'color_attachment.loadOp  = '}<span className="text-amber-400">VK_ATTACHMENT_LOAD_OP_CLEAR</span>{';\n'}
                  {'color_attachment.storeOp = '}<span className="text-amber-400">VK_ATTACHMENT_STORE_OP_STORE</span>{';'}
                </pre>
              </div>
              {/* Progress */}
              <div className="px-5 pb-5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span>Track progress</span>
                  <span className="text-sky-400">4 / 34 lessons</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[.06] overflow-hidden">
                  <div className="h-full rounded-full"
                    style={{ width: '12.5%', background: 'linear-gradient(90deg,#00a6ff,#7d00ff)', boxShadow: '0 0 8px rgba(0,166,255,.5)' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section id="community" className="relative z-10 py-[90px]"
        style={{ borderTop: '1px solid rgba(0,166,255,.06)' }}>
        <div className="mx-auto w-[min(1200px,94%)]">
          <div className="mb-12 text-center">
            <div className="lp-anim-su0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-emerald-400 px-3.5 py-1.5 rounded-full mb-4"
              style={{ border: '1px solid rgba(16,185,129,.22)', background: 'rgba(16,185,129,.06)' }}>
              Community
            </div>
            <h2 className="lp-anim-su1 text-[clamp(24px,3.5vw,42px)] font-extrabold tracking-[-1px] text-white leading-tight">
              Engine devs already love it
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`lp-anim-ca${i} rounded-[16px] p-6 flex flex-col gap-4`} style={GLASS}>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] text-slate-300 leading-[1.75] flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
                  <Avatar src={t.avatar} name={t.name} />
                  <div>
                    <div className="text-[13px] font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BOTTOM CTA BAND
      ════════════════════════════════════════ */}
      <section className="relative z-10 py-[90px]"
        style={{ borderTop: '1px solid rgba(0,166,255,.06)' }}>
        <div className="mx-auto w-[min(860px,92%)] text-center">
          <div className="lp-anim-su0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[2px] uppercase text-sky-400 px-3.5 py-1.5 rounded-full mb-6"
            style={{ border: '1px solid rgba(0,166,255,.2)', background: 'rgba(0,166,255,.06)' }}>
            <span className="lp-anim-blink w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            Ready to build?
          </div>
          <h2 className="lp-anim-su1 text-[clamp(28px,4.5vw,52px)] font-extrabold tracking-[-1.5px] text-white leading-tight mb-5">
            Learn engine programming<br />
            <span className="lp-title-accent">the way engineers do.</span>
          </h2>
          <p className="lp-anim-su2 text-[16px] text-slate-400 leading-[1.75] max-w-[500px] mx-auto mb-10">
            Join thousands of developers building renderers, physics engines, and ECS systems from first principles.
          </p>
          <div className="lp-anim-su3 flex justify-center flex-wrap gap-4">
            <button className={`${btn({ variant: 'primary' })} lp-btn-shine`}
              style={{ fontSize: 16, padding: '15px 36px' }} onClick={handleSignUp}>
              Create Free Account
            </button>
            <button className={btn({ variant: 'ghost' })}
              style={{ fontSize: 15, padding: '14px 28px' }} onClick={handleLogin}>
              Sign In
            </button>
          </div>
          <p className="lp-anim-f7 mt-5 text-[12px] text-slate-600">No credit card · Free forever on core tracks · C++ & graphics focus</p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="relative z-10 py-8 text-center text-[12px] text-slate-600 tracking-[.4px]"
        style={{ borderTop: '1px solid rgba(255,255,255,.04)' }}>
        <div className="mx-auto w-[min(1200px,94%)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Graphical Playground · Built for engine programmers</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-sky-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

