import React from 'react';

import { LogoMark } from '../components/Logo.jsx';

/* ─────────────────────────────────────────────────────────────────
   onboarding.jsx  —  First-time welcome tour (3 steps)
   Called after sign-up. Receives a single prop:
     onFinish()  — called when user completes or skips. Caller is
                   responsible for markOnboardingDone() + navigation.
   ───────────────────────────────────────────────────────────────── */

/* ── Keyframes ── */
const KEYFRAMES = `
  @keyframes ob-fadein {
    from { opacity:0; transform:translateY(20px) }
    to   { opacity:1; transform:translateY(0) }
  }
  @keyframes ob-pulse { from{opacity:.5} to{opacity:1} }
  @keyframes ob-bar {
    from { transform: scaleX(0) }
    to   { transform: scaleX(1) }
  }
  @keyframes ob-float {
    0%,100% { transform: translateY(0) }
    50%     { transform: translateY(-8px) }
  }
  @keyframes ob-glow {
    from { box-shadow: 0 0 0 1px rgba(0,166,255,.25), 0 0 24px rgba(0,166,255,.15) }
    to   { box-shadow: 0 0 0 1px rgba(0,166,255,.50), 0 0 40px rgba(0,166,255,.30) }
  }

  .ob-fadein   { animation: ob-fadein .5s ease both }
  .ob-fadein-1 { animation: ob-fadein .5s .08s ease both }
  .ob-fadein-2 { animation: ob-fadein .5s .16s ease both }
  .ob-fadein-3 { animation: ob-fadein .5s .24s ease both }
  .ob-fadein-4 { animation: ob-fadein .5s .34s ease both }
  .ob-pulse    { animation: ob-pulse 6s ease-in-out infinite alternate }
  .ob-float    { animation: ob-float 4s ease-in-out infinite }
  .ob-glow     { animation: ob-glow  3s ease-in-out infinite alternate }
`;

let _kfInjected = false;

function injectKf() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('ob-kf')) return;
  const t = document.createElement('style');

  t.id = 'ob-kf';
  t.textContent = KEYFRAMES;
  document.head.appendChild(t);
  _kfInjected = true;
}
injectKf();

/* ── Step data ── */
const STEPS = [
  {
    body: [
      { icon: '🧮', text: 'Start from math & C++. Module 1 covers everything you need' },
      { icon: '🔺', text: 'Rasterization, shaders, Vulkan, PBR, ray tracing. Step by step' },
      { icon: '🏗️', text: 'RHI design, render graphs, ECS, physics. Tier 3 & 4' },
      { icon: '🆓', text: '100% free. No paywalls. No fluff.' }
    ],
    cta: 'Show me how it works →',
    emoji: null,
    headline: 'Welcome to Graphical Playground',
    icon: (
      <svg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='url(#ob-g1)' strokeWidth='1.6'>
        <defs>
          <linearGradient id='ob-g1' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#00a6ff' />
            <stop offset='100%' stopColor='#7d00ff' />
          </linearGradient>
        </defs>
        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
      </svg>
    ),
    id: 'welcome',
    sub: "You're about to learn how to build game engines from scratch. Not use them. Build them."
  },
  {
    cards: [
      {
        color: '#0ea5e9',
        desc: 'Foundations → Core Graphics → Advanced Rendering → Engine Architecture. Go at your own pace.',
        title: '4 Tiers'
      },
      {
        color: '#a855f7',
        desc: 'Each module is a focused engineering subject: math, shaders, PBR, render graphs, ECS and more.',
        title: '20 Modules'
      },
      {
        color: '#10b981',
        desc: 'Hands-on C++ & GLSL. Every tier ends with a capstone project you actually ship.',
        title: '58 Chapters'
      }
    ],
    cta: 'Got it, what do I build first? →',
    headline: "How it's structured",
    icon: (
      <svg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='url(#ob-g2)' strokeWidth='1.6'>
        <defs>
          <linearGradient id='ob-g2' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#00a6ff' />
            <stop offset='100%' stopColor='#7d00ff' />
          </linearGradient>
        </defs>
        <rect x='3' y='3' width='7' height='7' />
        <rect x='14' y='3' width='7' height='7' />
        <rect x='3' y='14' width='7' height='7' />
        <rect x='14' y='14' width='7' height='7' />
      </svg>
    ),
    id: 'navigate',
    sub: '4 tiers, 20 modules, 58 chapters. Each one building directly on the last.'
  },
  {
    code: `// Module 1 → Chapter 1.1 | Scalar Mathematics
// Everything in graphics starts here.

float lerp(float a, float b, float t) {
    return a + t * (b - a);
}

// Interpolate two colours at t=0.5
float r = lerp(0.0f, 1.0f, 0.5f);  // → 0.5
float g = lerp(0.2f, 0.8f, 0.5f);  // → 0.5
float b = lerp(0.0f, 0.0f, 0.5f);  // → 0.0
// You now understand the core primitive behind
// every gradient, blend, and animation on a GPU.`,
    cta: "Let's build →",
    headline: 'Your first chapter',
    icon: (
      <svg width='44' height='44' viewBox='0 0 24 24' fill='none' stroke='url(#ob-g3)' strokeWidth='1.6'>
        <defs>
          <linearGradient id='ob-g3' x1='0%' y1='0%' x2='100%' y2='100%'>
            <stop offset='0%' stopColor='#00a6ff' />
            <stop offset='100%' stopColor='#7d00ff' />
          </linearGradient>
        </defs>
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </svg>
    ),
    id: 'first-project',
    sub: "Start with Module 1, Mathematical Foundations. Chapter 1.1 is Scalar Mathematics & Notation. By Module 3 you'll be writing your first Vulkan instance."
  }
];

/* ── Step indicator dots ── */
function Dots({ current, onChange, total }) {
  return (
    <div className='flex items-center gap-2'>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          aria-label={`Step ${i + 1}`}
          style={{
            background: i === current ? 'linear-gradient(90deg,#00a6ff,#7d00ff)' : 'rgba(255,255,255,.18)',
            border: 'none',
            borderRadius: 999,
            cursor: 'pointer',
            height: 8,
            transition: 'width .25s ease, background .25s ease',
            width: i === current ? 22 : 8
          }}
        />
      ))}
    </div>
  );
}

/* ── Ambient BG (same pattern as auth pages) ── */
function Bg() {
  return (
    <>
      <div
        className='ob-pulse pointer-events-none fixed inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 1100px 550px at 15% 10%,rgba(0,166,255,.10) 0%,transparent 68%),radial-gradient(ellipse 800px 450px at 88% 90%,rgba(125,0,255,.09) 0%,transparent 68%)'
        }}
      />
      <div
        className='pointer-events-none fixed inset-0 z-0'
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)',
          backgroundImage:
            'linear-gradient(rgba(0,166,255,.030) 1px,transparent 1px),linear-gradient(90deg,rgba(0,166,255,.030) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)'
        }}
      />
    </>
  );
}

/* ── Step 0: Welcome ── */
function StepWelcome({ step }) {
  return (
    <div className='mx-auto flex max-w-[520px] flex-col items-center text-center'>
      <div
        className='ob-fadein ob-float ob-glow mb-8 flex h-20 w-20 items-center justify-center rounded-[20px]'
        style={{ background: 'rgba(0,166,255,.08)', border: '1px solid rgba(0,166,255,.18)' }}
      >
        {step.icon}
      </div>
      <h1 className='ob-fadein-1 mb-3 text-[clamp(24px,4vw,34px)] leading-tight font-extrabold tracking-tight text-white'>
        {step.headline}
      </h1>
      <p className='ob-fadein-2 mb-8 max-w-[420px] text-[15px] leading-[1.7] text-slate-400'>{step.sub}</p>
      <ul className='ob-fadein-3 flex w-full max-w-[400px] flex-col gap-3 text-left'>
        {step.body.map((item, i) => (
          <li
            key={i}
            className='flex items-start gap-3 rounded-[10px] px-4 py-3'
            style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)' }}
          >
            <span className='mt-0.5 text-[18px] leading-none'>{item.icon}</span>
            <span className='text-[13.5px] leading-[1.6] text-slate-300'>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Step 1: How to navigate ── */
function StepNavigate({ step }) {
  return (
    <div className='mx-auto flex max-w-[580px] flex-col items-center text-center'>
      <div
        className='ob-fadein ob-float ob-glow mb-8 flex h-20 w-20 items-center justify-center rounded-[20px]'
        style={{ background: 'rgba(0,166,255,.08)', border: '1px solid rgba(0,166,255,.18)' }}
      >
        {step.icon}
      </div>
      <h1 className='ob-fadein-1 mb-3 text-[clamp(22px,4vw,32px)] leading-tight font-extrabold tracking-tight text-white'>
        {step.headline}
      </h1>
      <p className='ob-fadein-2 mb-8 max-w-[440px] text-[15px] leading-[1.7] text-slate-400'>{step.sub}</p>
      <div className='ob-fadein-3 grid w-full grid-cols-1 gap-4 sm:grid-cols-3'>
        {step.cards.map((card, i) => (
          <div
            key={i}
            className='flex flex-col gap-2 rounded-[12px] p-5 text-left'
            style={{ background: 'rgba(255,255,255,.04)', border: `1px solid ${card.color}28` }}
          >
            <div className='mb-1 h-2 w-2 rounded-full' style={{ background: card.color }} />
            <p className='text-[14px] font-bold text-white'>{card.title}</p>
            <p className='text-[12.5px] leading-[1.65] text-slate-400'>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 2: First project ── */
function StepFirstProject({ step }) {
  return (
    <div className='mx-auto flex max-w-[600px] flex-col items-center text-center'>
      <div
        className='ob-fadein ob-float ob-glow mb-8 flex h-20 w-20 items-center justify-center rounded-[20px]'
        style={{ background: 'rgba(0,166,255,.08)', border: '1px solid rgba(0,166,255,.18)' }}
      >
        {step.icon}
      </div>
      <h1 className='ob-fadein-1 mb-3 text-[clamp(22px,4vw,32px)] leading-tight font-extrabold tracking-tight text-white'>
        {step.headline}
      </h1>
      <p className='ob-fadein-2 mb-6 max-w-[460px] text-[15px] leading-[1.7] text-slate-400'>{step.sub}</p>
      {/* Code block */}
      <div
        className='ob-fadein-3 w-full overflow-hidden rounded-[12px] text-left'
        style={{ background: 'rgba(6,6,10,.8)', border: '1px solid rgba(0,166,255,.14)' }}
      >
        {/* Fake chrome bar */}
        <div
          className='flex items-center gap-1.5 px-4 py-3'
          style={{ background: 'rgba(255,255,255,.03)', borderBottom: '1px solid rgba(255,255,255,.06)' }}
        >
          <span className='h-3 w-3 rounded-full bg-red-500/60' />
          <span className='h-3 w-3 rounded-full bg-yellow-500/60' />
          <span className='h-3 w-3 rounded-full bg-green-500/60' />
          <span className='ml-3 font-mono text-[11px] text-slate-600'>math_foundations.cpp | Module 1, Ch 1.1</span>
        </div>
        <pre
          className='overflow-x-auto p-5 text-[12px] leading-[1.8]'
          style={{ color: '#94a3b8', fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace" }}
        >
          {step.code.split('\n').map((line, i) => {
            // Naive syntax highlighting
            const highlighted = line
              .replace(/(\/\/.*$)/g, '<span style="color:#4b5563;font-style:italic">$1</span>')
              .replace(/\b(float|int|return|const)\b/g, '<span style="color:#38bdf8">$1</span>')
              .replace(/\b(lerp)\b/g, '<span style="color:#a78bfa">$1</span>')
              .replace(/\b([0-9]+\.[0-9]+f?)\b/g, '<span style="color:#34d399">$1</span>')
              .replace(/"([^"]*)"/g, '<span style="color:#fbbf24">"$1"</span>')
              .replace(/\b(nullptr|true|false)\b/g, '<span style="color:#f87171">$1</span>');

            return (
              <span key={i} className='block'>
                <span
                  style={{
                    color: '#1f2937',
                    display: 'inline-block',
                    fontSize: 11,
                    marginRight: 12,
                    minWidth: 20,
                    textAlign: 'right',
                    userSelect: 'none'
                  }}
                >
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: highlighted }} />
              </span>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

const STEP_COMPONENTS = [StepWelcome, StepNavigate, StepFirstProject];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function OnboardingPage({ onFinish, onGoToModule }) {
  const [step, setStep] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const total = STEPS.length;
  const isLastStep = step === total - 1;

  function goTo(n) {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setStep(n);
      setExiting(false);
    }, 220);
  }

  function next() {
    step < total - 1 ? goTo(step + 1) : onGoToModule?.();
  }
  function skip() {
    onFinish?.();
  }

  const StepView = STEP_COMPONENTS[step];
  const currentStep = STEPS[step];

  return (
    <div
      className='relative flex min-h-screen flex-col overflow-hidden bg-[#06060a] text-slate-100 antialiased'
      style={{ fontFamily: "'Inter',ui-sans-serif,system-ui,sans-serif" }}
    >
      <Bg />

      {/* ── Top bar ── */}
      <div className='relative z-10 flex items-center justify-between px-6 py-5'>
        <LogoMark size={32} />
        <button onClick={skip} className='text-[12px] text-slate-600 transition-colors hover:text-slate-400'>
          Skip tour
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className='relative z-10 h-[2px] w-full' style={{ background: 'rgba(255,255,255,.06)' }}>
        <div
          style={{
            background: 'linear-gradient(90deg,#00a6ff,#7d00ff)',
            height: '100%',
            transition: 'width .4s ease',
            width: `${((step + 1) / total) * 100}%`
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className='relative z-10 flex flex-1 flex-col items-center justify-center px-5 py-10'>
        <div
          key={step}
          style={{
            opacity: exiting ? 0 : 1,
            transform: exiting ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity .22s ease, transform .22s ease',
            width: '100%'
          }}
        >
          <StepView step={currentStep} />
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div className='relative z-10 flex flex-col items-center gap-4 px-5 pb-10'>
        {/* CTA buttons */}
        {isLastStep ? (
          <div className='flex items-center gap-3'>
            {/* Primary: go to Dashboard */}
            <button
              onClick={() => onFinish?.()}
              className='relative cursor-pointer rounded-[12px] px-8 py-4 text-[15px] font-semibold text-slate-400 transition-colors hover:text-white'
              style={{
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.10)',
                minWidth: 160
              }}
            >
              Go to Dashboard
            </button>
            {/* Secondary: go to Module 01 (blue, prominent) */}
            <button
              onClick={() => onGoToModule?.()}
              className='relative cursor-pointer overflow-hidden rounded-[12px] border-none px-10 py-4 text-[15px] font-bold text-white'
              style={{
                background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)',
                boxShadow: '0 8px 28px rgba(14,165,233,.35)',
                minWidth: 200
              }}
            >
              Start Module 01 →
            </button>
          </div>
        ) : (
          <button
            onClick={next}
            className='relative cursor-pointer overflow-hidden rounded-[12px] border-none px-10 py-4 text-[15px] font-bold text-white'
            style={{
              background: 'linear-gradient(135deg,#0ea5e9,#7c3aed)',
              boxShadow: '0 8px 28px rgba(14,165,233,.28)',
              minWidth: 220
            }}
          >
            {currentStep.cta}
          </button>
        )}

        {/* Dots + step label */}
        <div className='flex flex-col items-center gap-2'>
          <Dots total={total} current={step} onChange={goTo} />
          <span className='text-[11px] text-slate-600'>
            Step {step + 1} of {total}
          </span>
        </div>
      </div>
    </div>
  );
}
