import React from 'react';

import { useAuth } from '../auth_context.jsx';
import { LogoMark } from '../components/Logo.jsx';

/* ── Shared keyframes (same as login.jsx) ─────────────────────── */
const KEYFRAMES = `
  @keyframes ap-pulse { from{opacity:.5} to{opacity:1} }
  @keyframes ap-fadein {
    from { opacity:0; transform:translateY(16px) }
    to   { opacity:1; transform:translateY(0) }
  }
  @keyframes ap-shake {
    0%,100% { transform:translateX(0) }
    20%     { transform:translateX(-8px) }
    40%     { transform:translateX( 8px) }
    60%     { transform:translateX(-5px) }
    80%     { transform:translateX( 5px) }
  }
  @keyframes ap-spin { to { transform:rotate(360deg) } }
  @keyframes ap-logo-glow {
    from { box-shadow: 0 0 0 1px rgba(0,166,255,.28),0 4px 20px rgba(0,166,255,.20) }
    to   { box-shadow: 0 0 0 1px rgba(0,166,255,.50),0 4px 32px rgba(0,166,255,.40) }
  }

  .ap-anim-pulse { animation: ap-pulse 8s ease-in-out infinite alternate; }
  .ap-anim-fadein0 { animation: ap-fadein .55s ease both; }
  .ap-anim-fadein1 { animation: ap-fadein .65s .07s ease both; }
  .ap-anim-fadein2 { animation: ap-fadein .70s .14s ease both; }
  .ap-anim-fadein3 { animation: ap-fadein .75s .22s ease both; }
  .ap-anim-fadein4 { animation: ap-fadein .80s .30s ease both; }
  .ap-anim-fadein5 { animation: ap-fadein .85s .40s ease both; }
  .ap-anim-shake   { animation: ap-shake .4s ease; }
  .ap-anim-spin    { animation: ap-spin .8s linear infinite; }

  .ap-logo { animation: ap-logo-glow 3s ease-in-out infinite alternate; }
  .ap-logo::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg,rgba(255,255,255,.22) 0%,transparent 55%);
  }

  .ap-input:focus {
    outline: none;
    border-color: rgba(0,166,255,.45) !important;
    box-shadow: 0 0 0 3px rgba(0,166,255,.12), inset 0 1px 0 rgba(255,255,255,.04);
  }
  .ap-input.ap-error {
    border-color: rgba(248,113,113,.5) !important;
    box-shadow: 0 0 0 3px rgba(248,113,113,.10);
  }

  .ap-social:hover {
    border-color: rgba(0,166,255,.28) !important;
    background: rgba(0,166,255,.06) !important;
    color: #e2e8f0 !important;
  }

  .ap-btn-primary::after {
    content:''; position:absolute;
    top:0; left:-120%; width:55%; height:100%;
    background: linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
    transform: skewX(-18deg); transition: left .5s ease;
  }
  .ap-btn-primary:hover::after { left:170%; }

  /* password strength bar */
  @keyframes su-bar-grow { from{width:0} to{width:var(--bar-w)} }
  .su-bar-fill { animation: su-bar-grow .25s ease both; }
`;

let _kfInjected = false;

function injectKeyframes() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('su-kf')) return;
  const tag = document.createElement('style');

  tag.id = 'su-kf';
  tag.textContent = KEYFRAMES;
  document.head.appendChild(tag);
  _kfInjected = true;
}
injectKeyframes();

/* ── Password strength ────────────────────────────────────────── */
function getStrength(pw) {
  if (!pw) return { color: 'transparent', label: '', score: 0 };
  let s = 0;

  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { color: '#f87171', label: 'Weak' },
    { color: '#f87171', label: 'Weak' },
    { color: '#fbbf24', label: 'Fair' },
    { color: '#34d399', label: 'Good' },
    { color: '#22d3ee', label: 'Strong' }
  ];

  return { score: s, ...map[s] };
}

/* ── Social button ────────────────────────────────────────────── */
function SocialBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className='ap-social flex flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[10px] border-none py-3 text-[13px] font-medium text-slate-400 transition-all duration-150'
      style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)' }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

const GitHubIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' />
  </svg>
);

const GoogleIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24'>
    <path
      fill='#4285F4'
      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
    />
    <path
      fill='#34A853'
      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
    />
    <path
      fill='#FBBC05'
      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
    />
    <path
      fill='#EA4335'
      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
    />
  </svg>
);

/* ── Ambient background ───────────────────────────────────────── */
function AuthBg() {
  return (
    <>
      <div
        className='ap-anim-pulse pointer-events-none fixed inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 1100px 550px at 15% 10%,rgba(0,166,255,.09) 0%,transparent 68%),radial-gradient(ellipse 800px 450px at 88% 90%,rgba(125,0,255,.08) 0%,transparent 68%)'
        }}
      />
      <div
        className='pointer-events-none fixed inset-0 z-0'
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)',
          backgroundImage:
            'linear-gradient(rgba(0,166,255,.032) 1px,transparent 1px),linear-gradient(90deg,rgba(0,166,255,.032) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 20%,transparent 100%)'
        }}
      />
      <div className='pointer-events-none fixed -top-[160px] -left-[140px] z-0 h-[500px] w-[500px] rounded-full bg-[#00a6ff] opacity-[.11] blur-[110px]' />
      <div className='pointer-events-none fixed -right-[90px] -bottom-[100px] z-0 h-[400px] w-[400px] rounded-full bg-[#7d00ff] opacity-[.10] blur-[110px]' />
    </>
  );
}

const VIEW = { FORM: 'form', LOADING: 'loading', SUCCESS: 'success' };

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function SignUpPage({ onBack, onGoLogin, onSignUp, onSuccess }) {
  const auth = useAuth();
  const doSignUp = onSignUp ?? auth.signUp;
  const [view, setView] = React.useState(VIEW.FORM);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPw] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  const [showCf, setShowCf] = React.useState(false);
  const [agreed, setAgreed] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [shake, setShake] = React.useState(false);

  const strength = getStrength(password);

  /* ── Validate ── */
  function validate() {
    const e = {};

    if (!name.trim()) e.name = 'Name is required.';
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email.';
    if (!password) e.password = 'Password is required.';
    else if (password.length < 8) e.password = 'Must be at least 8 characters.';
    if (confirm !== password) e.confirm = 'Passwords do not match.';
    if (!agreed) e.agreed = 'You must agree to continue.';

    return e;
  }

  /* ── Submit ── */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      triggerShake();

      return;
    }
    setErrors({});
    setView(VIEW.LOADING);

    await new Promise((r) => setTimeout(r, 1100));

    const result = await doSignUp(email, password, name.trim());

    if (result.ok) {
      setView(VIEW.SUCCESS);
      setTimeout(() => onSuccess?.(result.user), 1500);
    } else {
      setView(VIEW.FORM);
      setErrors({ form: result.error });
      triggerShake();
    }
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  /* ── Fake social signup ── */
  async function handleSocial(provider) {
    setView(VIEW.LOADING);
    await new Promise((r) => setTimeout(r, 1100));
    const result = await doSignUp(provider + '@social.fake', 'social', provider + ' User');

    if (result.ok) {
      setView(VIEW.SUCCESS);
      setTimeout(() => onSuccess?.(result.user), 1500);
    }
  }

  /* ── Render ── */
  return (
    <div
      className='relative flex min-h-screen items-center justify-center bg-[#06060a] px-4 py-10 text-slate-100 antialiased'
      style={{ fontFamily: "'Inter',ui-sans-serif,system-ui,sans-serif" }}
    >
      <AuthBg />

      {/* ── Back button ── */}
      {onBack && (
        <button
          onClick={onBack}
          className='absolute top-5 left-5 z-20 flex items-center gap-1.5 text-[13px] text-slate-500 transition-colors hover:text-slate-200'
          style={{ background: 'none', border: 'none', borderRadius: 8, cursor: 'pointer', padding: '6px 10px' }}
        >
          <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
            <polyline points='15 18 9 12 15 6' />
          </svg>
          Back
        </button>
      )}

      <div className='relative z-10 w-full max-w-[440px]'>
        {/* Logo + brand */}
        <div className='ap-anim-fadein0 mb-8 flex flex-col items-center'>
          <LogoMark size={48} style={{ marginBottom: 16 }} />
          <span className='text-[17px] font-semibold tracking-[.3px]'>Graphical Playground</span>
          <span className='mt-1 text-[13px] text-slate-500'>Engine programming for builders</span>
        </div>

        {/* ── SUCCESS state ── */}
        {view === VIEW.SUCCESS && (
          <div
            className='ap-anim-fadein0 rounded-[18px] p-10 text-center'
            style={{
              backdropFilter: 'blur(14px)',
              background: 'linear-gradient(135deg,rgba(0,166,255,.06),rgba(125,0,255,.04))',
              border: '1px solid rgba(0,166,255,.10)'
            }}
          >
            <div
              className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15'
              style={{ border: '1px solid rgba(16,185,129,.25)' }}
            >
              <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='#10b981' strokeWidth='2.2'>
                <polyline points='20 6 9 17 4 12' />
              </svg>
            </div>
            <h3 className='mb-2 text-[20px] font-bold text-white'>Account created!</h3>
            <p className='text-[13px] text-slate-400'>Taking you to your dashboard…</p>
            <div className='mx-auto mt-5 h-8 w-8'>
              <div
                className='ap-anim-spin h-8 w-8 rounded-full'
                style={{ border: '2px solid rgba(0,166,255,.15)', borderTopColor: '#00a6ff' }}
              />
            </div>
          </div>
        )}

        {/* ── LOADING state ── */}
        {view === VIEW.LOADING && (
          <div className='ap-anim-fadein0 flex flex-col items-center gap-4 py-16'>
            <div
              className='ap-anim-spin h-8 w-8 rounded-full'
              style={{ border: '2px solid rgba(0,166,255,.15)', borderTopColor: '#00a6ff' }}
            />
            <span className='text-[13px] text-slate-500'>Creating your account…</span>
          </div>
        )}

        {/* ── FORM state ── */}
        {view === VIEW.FORM && (
          <div
            className={`overflow-hidden rounded-[18px] ${shake ? 'ap-anim-shake' : ''}`}
            style={{
              backdropFilter: 'blur(14px)',
              background: 'linear-gradient(135deg,rgba(0,166,255,.06),rgba(125,0,255,.04))',
              border: '1px solid rgba(0,166,255,.10)',
              boxShadow: '0 0 0 1px rgba(0,166,255,.05),0 32px 64px rgba(0,0,0,.5)'
            }}
          >
            {/* Header */}
            <div className='px-7 pt-6 pb-5' style={{ borderBottom: '1px solid rgba(0,166,255,.08)' }}>
              <h2 className='text-[18px] font-bold text-white'>Create your account</h2>
              <p className='mt-0.5 text-[13px] text-slate-500'>Start building your engine from scratch, for free.</p>
            </div>

            <div className='p-7'>
              {/* ── Social signup ── */}
              <div className='ap-anim-fadein1 mb-5 flex gap-3'>
                <SocialBtn icon={<GitHubIcon />} label='GitHub' onClick={() => handleSocial('github')} />
                <SocialBtn icon={<GoogleIcon />} label='Google' onClick={() => handleSocial('google')} />
              </div>

              {/* Divider */}
              <div className='ap-anim-fadein2 mb-5 flex items-center gap-3'>
                <div className='h-px flex-1 bg-white/[.06]' />
                <span className='text-[11px] tracking-[1.5px] text-slate-600 uppercase'>or with email</span>
                <div className='h-px flex-1 bg-white/[.06]' />
              </div>

              {/* Form error banner */}
              {errors.form && (
                <div
                  className='ap-anim-fadein0 mb-4 flex items-center gap-2 rounded-[8px] px-4 py-3 text-[13px] text-red-400'
                  style={{ background: 'rgba(248,113,113,.08)', border: '1px solid rgba(248,113,113,.18)' }}
                >
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <circle cx='12' cy='12' r='10' />
                    <line x1='12' y1='8' x2='12' y2='12' />
                    <line x1='12' y1='16' x2='12.01' y2='16' />
                  </svg>
                  {errors.form}
                </div>
              )}

              <form onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
                {/* Name */}
                <div className='ap-anim-fadein2 flex flex-col gap-1.5'>
                  <label className='text-[12px] font-semibold tracking-[1px] text-slate-400 uppercase'>
                    Display Name
                  </label>
                  <input
                    type='text'
                    autoComplete='name'
                    placeholder='Your name'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    className={`ap-input w-full rounded-[10px] bg-white/[.04] px-4 py-3 text-[14px] text-slate-100 placeholder-slate-600 ${errors.name ? 'ap-error' : ''}`}
                    style={{ border: `1px solid ${errors.name ? 'rgba(248,113,113,.4)' : 'rgba(255,255,255,.09)'}` }}
                  />
                  {errors.name && <span className='text-[12px] text-red-400'>{errors.name}</span>}
                </div>

                {/* Email */}
                <div className='ap-anim-fadein3 flex flex-col gap-1.5'>
                  <label className='text-[12px] font-semibold tracking-[1px] text-slate-400 uppercase'>Email</label>
                  <input
                    type='email'
                    autoComplete='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((p) => ({ ...p, email: undefined }));
                    }}
                    className={`ap-input w-full rounded-[10px] bg-white/[.04] px-4 py-3 text-[14px] text-slate-100 placeholder-slate-600 ${errors.email ? 'ap-error' : ''}`}
                    style={{ border: `1px solid ${errors.email ? 'rgba(248,113,113,.4)' : 'rgba(255,255,255,.09)'}` }}
                  />
                  {errors.email && <span className='text-[12px] text-red-400'>{errors.email}</span>}
                </div>

                {/* Password */}
                <div className='ap-anim-fadein4 flex flex-col gap-1.5'>
                  <label className='text-[12px] font-semibold tracking-[1px] text-slate-400 uppercase'>Password</label>
                  <div className='relative'>
                    <input
                      type={showPw ? 'text' : 'password'}
                      autoComplete='new-password'
                      placeholder='Min 8 characters'
                      value={password}
                      onChange={(e) => {
                        setPw(e.target.value);
                        setErrors((p) => ({ ...p, password: undefined }));
                      }}
                      className={`ap-input w-full rounded-[10px] bg-white/[.04] py-3 pr-11 pl-4 text-[14px] text-slate-100 placeholder-slate-600 ${errors.password ? 'ap-error' : ''}`}
                      style={{
                        border: `1px solid ${errors.password ? 'rgba(248,113,113,.4)' : 'rgba(255,255,255,.09)'}`
                      }}
                    />
                    <button
                      type='button'
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300'
                      onClick={() => setShowPw((v) => !v)}
                      aria-label='Toggle password visibility'
                    >
                      {showPw ? (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94' />
                          <path d='M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19' />
                          <line x1='1' y1='1' x2='23' y2='23' />
                        </svg>
                      ) : (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className='mt-0.5 flex items-center gap-2.5'>
                      <div className='h-1 flex-1 overflow-hidden rounded-full bg-white/[.07]'>
                        <div
                          className='su-bar-fill h-full rounded-full transition-all duration-300'
                          style={{ background: strength.color, width: `${strength.score * 25}%` }}
                        />
                      </div>
                      <span className='text-[11px] font-medium' style={{ color: strength.color }}>
                        {strength.label}
                      </span>
                    </div>
                  )}
                  {errors.password && <span className='text-[12px] text-red-400'>{errors.password}</span>}
                </div>

                {/* Confirm password */}
                <div className='ap-anim-fadein5 flex flex-col gap-1.5'>
                  <label className='text-[12px] font-semibold tracking-[1px] text-slate-400 uppercase'>
                    Confirm Password
                  </label>
                  <div className='relative'>
                    <input
                      type={showCf ? 'text' : 'password'}
                      autoComplete='new-password'
                      placeholder='Repeat password'
                      value={confirm}
                      onChange={(e) => {
                        setConfirm(e.target.value);
                        setErrors((p) => ({ ...p, confirm: undefined }));
                      }}
                      className={`ap-input w-full rounded-[10px] bg-white/[.04] py-3 pr-11 pl-4 text-[14px] text-slate-100 placeholder-slate-600 ${errors.confirm ? 'ap-error' : ''}`}
                      style={{
                        border: `1px solid ${errors.confirm ? 'rgba(248,113,113,.4)' : 'rgba(255,255,255,.09)'}`
                      }}
                    />
                    <button
                      type='button'
                      className='absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300'
                      onClick={() => setShowCf((v) => !v)}
                      aria-label='Toggle password visibility'
                    >
                      {showCf ? (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94' />
                          <path d='M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19' />
                          <line x1='1' y1='1' x2='23' y2='23' />
                        </svg>
                      ) : (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* Match indicator */}
                  {confirm.length > 0 && !errors.confirm && (
                    <div className='flex items-center gap-1.5'>
                      {confirm === password ? (
                        <>
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='#34d399'
                            strokeWidth='2.5'
                          >
                            <polyline points='20 6 9 17 4 12' />
                          </svg>
                          <span className='text-[11px] text-emerald-400'>Passwords match</span>
                        </>
                      ) : (
                        <>
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='#f87171'
                            strokeWidth='2.5'
                          >
                            <line x1='18' y1='6' x2='6' y2='18' />
                            <line x1='6' y1='6' x2='18' y2='18' />
                          </svg>
                          <span className='text-[11px] text-red-400'>No match yet</span>
                        </>
                      )}
                    </div>
                  )}
                  {errors.confirm && <span className='text-[12px] text-red-400'>{errors.confirm}</span>}
                </div>

                {/* Terms checkbox */}
                <div className='ap-anim-fadein5 flex flex-col gap-1'>
                  <label className='flex cursor-pointer items-start gap-3 select-none'>
                    <div className='relative mt-0.5 flex-shrink-0'>
                      <input
                        type='checkbox'
                        checked={agreed}
                        onChange={(e) => {
                          setAgreed(e.target.checked);
                          setErrors((p) => ({ ...p, agreed: undefined }));
                        }}
                        className='sr-only'
                      />
                      <div
                        className='flex h-4 w-4 items-center justify-center rounded-[4px] transition-all'
                        style={{
                          background: agreed ? 'linear-gradient(135deg,#0ea5e9,#7c3aed)' : 'rgba(255,255,255,.04)',
                          border: `1.5px solid ${agreed ? '#0ea5e9' : errors.agreed ? 'rgba(248,113,113,.5)' : 'rgba(255,255,255,.18)'}`
                        }}
                      >
                        {agreed && (
                          <svg width='9' height='9' viewBox='0 0 12 12' fill='none' stroke='white' strokeWidth='2.5'>
                            <polyline points='10 3 5 8 2 5' />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className='text-[12.5px] leading-[1.5] text-slate-400'>
                      I agree to the{' '}
                      <span className='cursor-pointer text-sky-400 hover:text-sky-300'>Terms of Service</span> and{' '}
                      <span className='cursor-pointer text-sky-400 hover:text-sky-300'>Privacy Policy</span>
                    </span>
                  </label>
                  {errors.agreed && <span className='ml-7 text-[12px] text-red-400'>{errors.agreed}</span>}
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  className='ap-btn-primary relative mt-1 w-full cursor-pointer overflow-hidden rounded-[10px] border-none py-[14px] text-[15px] font-bold text-white'
                  style={{
                    background: 'linear-gradient(135deg,#0ea5e9,#7c3aed)',
                    boxShadow: '0 8px 28px rgba(14,165,233,.25)'
                  }}
                >
                  Create Account — it&apos;s free
                </button>
              </form>

              {/* Footer link */}
              <p className='mt-6 text-center text-[13px] text-slate-500'>
                Already have an account?{' '}
                <button className='font-semibold text-sky-400 transition-colors hover:text-sky-300' onClick={onGoLogin}>
                  Sign In
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
