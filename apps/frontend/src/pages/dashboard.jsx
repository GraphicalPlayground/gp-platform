import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../auth_context.jsx';
import { CATALOG, getProgress, markAnnouncementRead } from '../auth_store.js';
import { LogoCompact } from '../components/Logo.jsx';

/* ─────────────────────────────────────────────────────────────────
   dashboard.jsx — Main hub after login
   ───────────────────────────────────────────────────────────────── */

/* ── Keyframes ── */
const KF = `
  @keyframes db-fadein  { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
  @keyframes db-pulse   { from{opacity:.5} to{opacity:1} }
  @keyframes db-bar-in  { from{width:0} to{width:var(--w)} }
  @keyframes db-ring-in { from{stroke-dashoffset:var(--full)} to{stroke-dashoffset:var(--offset)} }
  @keyframes db-glow-pop { 0%{box-shadow:0 0 0 0 rgba(14,165,233,.5)} 70%{box-shadow:0 0 0 12px rgba(14,165,233,0)} 100%{box-shadow:0 0 0 0 rgba(14,165,233,0)} }
  @keyframes db-streak { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
  @keyframes db-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

  .db-f0 { animation: db-fadein .45s ease both }
  .db-f1 { animation: db-fadein .45s .06s ease both }
  .db-f2 { animation: db-fadein .45s .12s ease both }
  .db-f3 { animation: db-fadein .45s .18s ease both }
  .db-f4 { animation: db-fadein .45s .24s ease both }
  .db-f5 { animation: db-fadein .45s .30s ease both }
  .db-pulse { animation: db-pulse 7s ease-in-out infinite alternate }

  .db-ring { animation: db-ring-in 1.1s .3s cubic-bezier(.22,1,.36,1) both }
  .db-glow-pop { animation: db-glow-pop 2s ease infinite }
  .db-streak-anim { animation: db-streak 2.5s ease-in-out infinite }

  .db-shimmer-text {
    background: linear-gradient(90deg,#38bdf8 0%,#c084fc 40%,#38bdf8 80%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: db-shimmer 3s linear infinite;
  }

  .db-card {
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.035);
    border-radius: 14px;
    transition: border-color .18s, background .18s, box-shadow .18s;
  }
  .db-card:hover {
    border-color: rgba(0,166,255,.18);
    background: rgba(0,166,255,.04);
    box-shadow: 0 0 0 1px rgba(0,166,255,.06), 0 8px 32px rgba(0,0,0,.3);
  }
  .db-card-glow {
    border: 1px solid rgba(14,165,233,.22);
    background: linear-gradient(135deg,rgba(14,165,233,.07),rgba(124,58,237,.05));
    border-radius: 14px;
    box-shadow: 0 0 0 1px rgba(14,165,233,.08), inset 0 1px 0 rgba(255,255,255,.06);
  }

  .db-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; border-radius: 9px;
    font-size: 13px; font-weight: 500;
    color: #94a3b8; cursor: pointer;
    transition: background .15s, color .15s;
    text-decoration: none; border: none; background: transparent; width: 100%; text-align: left;
  }
  .db-nav-item:hover  { background: rgba(255,255,255,.06); color: #e2e8f0 }
  .db-nav-item.active { background: rgba(0,166,255,.10); color: #38bdf8 }

  .db-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer;
    font-size: 13px; font-weight: 600; color: #fff;
    background: linear-gradient(135deg,#0ea5e9,#7c3aed);
    box-shadow: 0 6px 20px rgba(14,165,233,.22);
    transition: opacity .15s, box-shadow .15s;
  }
  .db-btn-primary:hover { opacity: .9; box-shadow: 0 8px 28px rgba(14,165,233,.32) }

  .db-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px; border-radius: 10px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: #94a3b8;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.09);
    transition: background .15s, color .15s, border-color .15s;
  }
  .db-btn-ghost:hover { background: rgba(255,255,255,.09); color: #e2e8f0; border-color: rgba(0,166,255,.22) }

  .db-track-bar-fill {
    transition: width .8s cubic-bezier(.22,1,.36,1);
  }
`;

let _kfInjected = false;

function injectKf() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('db-kf')) return;
  const t = document.createElement('style');

  t.id = 'db-kf';
  t.textContent = KF;
  document.head.appendChild(t);
  _kfInjected = true;
}
injectKf();

/* ── Helpers ── */
function pct(done, total) {
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

function relTime(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);

  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);

  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);

  return `${d}d ago`;
}

/* ── Icons ── */
const Icon = {
  arrow: (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <line x1='5' y1='12' x2='19' y2='12' />
      <polyline points='12 5 19 12 12 19' />
    </svg>
  ),
  bell: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
      <path d='M13.73 21a2 2 0 0 1-3.46 0' />
    </svg>
  ),
  book: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
      <path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
    </svg>
  ),
  check: (
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
      <polyline points='20 6 9 17 4 12' />
    </svg>
  ),
  flame: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' />
    </svg>
  ),
  grid: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <rect x='3' y='3' width='7' height='7' />
      <rect x='14' y='3' width='7' height='7' />
      <rect x='3' y='14' width='7' height='7' />
      <rect x='14' y='14' width='7' height='7' />
    </svg>
  ),
  home: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  ),
  logout: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <polyline points='16 17 21 12 16 7' />
      <line x1='21' y1='12' x2='9' y2='12' />
    </svg>
  ),
  map: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <polygon points='1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6' />
      <line x1='8' y1='2' x2='8' y2='18' />
      <line x1='16' y1='6' x2='16' y2='22' />
    </svg>
  ),
  new: (
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  ),
  play: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <polygon points='5 3 19 12 5 21 5 3' />
    </svg>
  ),
  plus: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </svg>
  ),
  settings: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <circle cx='12' cy='12' r='3' />
      <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
    </svg>
  ),
  tip: (
    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <circle cx='12' cy='12' r='10' />
      <line x1='12' y1='8' x2='12' y2='12' />
      <line x1='12' y1='16' x2='12.01' y2='16' />
    </svg>
  ),
  user: (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  ),
  zap: (
    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
      <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
    </svg>
  )
};

const ANN_META = {
  new: { bg: 'rgba(56,189,248,.10)', color: '#38bdf8', icon: Icon.new, label: 'New' },
  tip: { bg: 'rgba(251,191,36,.10)', color: '#fbbf24', icon: Icon.tip, label: 'Tip' },
  update: { bg: 'rgba(52,211,153,.10)', color: '#34d399', icon: Icon.check, label: 'Update' }
};

/* ── Track definitions — match CATALOG tracks in auth_store ── */
const TRACKS = [
  {
    color: '#38bdf8',
    desc: 'Math, C++, platform orientation (Modules 1–3)',
    id: 'Foundations',
    label: 'Foundations'
  },
  {
    color: '#a855f7',
    desc: 'Rasterization, shaders, lighting, GPU arch (Modules 4–8)',
    id: 'Core Graphics',
    label: 'Core Graphics Programming'
  },
  {
    color: '#10b981',
    desc: 'PBR, GI, ray tracing, shadows, TAA (Modules 9–13)',
    id: 'Advanced Rendering',
    label: 'Advanced Rendering'
  },
  {
    color: '#f59e0b',
    desc: 'RHI, render graph, culling, capstone (Modules 14–20)',
    id: 'Engine Architecture',
    label: 'Engine Architecture'
  }
];

/* ── Progress bar ── */
function ProgressBar({ color, value }) {
  return (
    <div className='h-1.5 w-full overflow-hidden rounded-full' style={{ background: 'rgba(255,255,255,.08)' }}>
      <div
        className='h-full rounded-full'
        style={{
          background: color,
          transition: 'width .5s ease',
          width: `${value}%`
        }}
      />
    </div>
  );
}

/* ── Sidebar nav item ── */
function NavItem({ active, icon, label, onClick }) {
  return (
    <button className={`db-nav-item${active ? ' active' : ''}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* ── Course card (enrolled course with progress) ── */
function CourseCard({ animClass, course, onContinue, onStart }) {
  const p = pct(course.completedLessons, course.totalLessons);
  const started = course.completedLessons > 0;

  return (
    <div className={`db-card flex flex-col gap-4 p-5 ${animClass}`}>
      {/* Header */}
      <div className='flex items-start justify-between gap-3'>
        <div>
          <span className='text-[10px] font-bold tracking-[1.5px] uppercase' style={{ color: course.color }}>
            {course.track}
          </span>
          <h3 className='mt-0.5 text-[14px] leading-snug font-bold text-white'>{course.title}</h3>
        </div>
        <span className='shrink-0 text-[12px] font-semibold' style={{ color: started ? course.color : '#475569' }}>
          {p}%
        </span>
      </div>

      {/* Progress bar */}
      <ProgressBar value={p} color={course.color} />

      {/* Lesson count + last lesson */}
      <div className='flex items-center justify-between text-[12px] text-slate-500'>
        <span>
          {course.completedLessons} / {course.totalLessons} lessons
        </span>
        {course.lastLesson && (
          <span className='max-w-[180px] truncate text-slate-600'>Last: {course.lastLesson.title}</span>
        )}
      </div>

      {/* Action */}
      <button
        className='db-btn-primary w-full justify-center'
        onClick={() => (started ? onContinue(course) : onStart(course))}
      >
        {started ? Icon.play : Icon.plus}
        {started ? 'Continue' : 'Start course'}
      </button>
    </div>
  );
}

/* ── Recent lesson row ── */
function RecentLessonRow({ course }) {
  if (!course.lastLesson) return null;

  return (
    <div className='group flex cursor-pointer items-center gap-4 rounded-[10px] px-3 py-3 transition-colors hover:bg-white/[.04]'>
      <div
        className='flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]'
        style={{ background: `${course.color}18`, border: `1px solid ${course.color}30` }}
      >
        <span style={{ color: course.color }}>{Icon.play}</span>
      </div>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-[13px] font-medium text-slate-200'>{course.lastLesson.title}</p>
        <p className='mt-0.5 text-[11px] text-slate-500'>{course.title}</p>
      </div>
      <div className='flex shrink-0 items-center gap-2'>
        <span className='text-[11px] text-slate-600'>{relTime(course.lastLesson.at)}</span>
        <span className='text-slate-600 opacity-0 transition-opacity group-hover:opacity-100'>{Icon.arrow}</span>
      </div>
    </div>
  );
}

/* ── Announcement card ── */
function AnnouncementCard({ ann, onDismiss }) {
  const meta = ANN_META[ann.type] ?? ANN_META.tip;

  return (
    <div className='db-card flex gap-3 px-4 py-4' style={{ opacity: ann.read ? 0.5 : 1, transition: 'opacity .3s' }}>
      <div
        className='mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px]'
        style={{ background: meta.bg, color: meta.color }}
      >
        {meta.icon}
      </div>
      <div className='min-w-0 flex-1'>
        <div className='flex items-start justify-between gap-2'>
          <p className='text-[13px] leading-snug font-semibold text-slate-200'>{ann.title}</p>
          <span
            className='shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold'
            style={{ background: meta.bg, color: meta.color }}
          >
            {meta.label}
          </span>
        </div>
        <p className='mt-1 text-[12px] leading-[1.6] text-slate-400'>{ann.body}</p>
        <div className='mt-2 flex items-center justify-between'>
          <span className='text-[11px] text-slate-600'>{relTime(ann.at)}</span>
          {!ann.read && (
            <button
              className='text-[11px] text-sky-500 transition-colors hover:text-sky-400'
              onClick={() => onDismiss(ann.id)}
            >
              Mark read
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Stat chip ── */
function Stat({ color, label, value }) {
  return (
    <div className='db-card flex flex-col gap-1 px-4 py-3'>
      <span className='text-[22px] font-extrabold' style={{ color }}>
        {value}
      </span>
      <span className='text-[11px] tracking-[1px] text-slate-500 uppercase'>{label}</span>
    </div>
  );
}

/* ── XP ring (SVG circle progress) ── */
function XpRing({ level, maxXp, xp }) {
  const R = 44;
  const CIRC = 2 * Math.PI * R;
  const pct = Math.min(xp / maxXp, 1);
  const offset = CIRC * (1 - pct);

  return (
    <div className='relative flex items-center justify-center' style={{ height: 110, width: 110 }}>
      {/* Glow backdrop */}
      <div
        className='absolute inset-0 rounded-full opacity-30 blur-[18px]'
        style={{ background: 'radial-gradient(circle,#0ea5e9,transparent 70%)' }}
      />
      <svg width='110' height='110' viewBox='0 0 110 110' style={{ transform: 'rotate(-90deg)' }}>
        {/* track */}
        <circle cx='55' cy='55' r={R} fill='none' stroke='rgba(255,255,255,.06)' strokeWidth='7' />
        {/* fill */}
        <circle
          className='db-ring'
          cx='55'
          cy='55'
          r={R}
          fill='none'
          stroke='url(#xpGrad)'
          strokeWidth='7'
          strokeLinecap='round'
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ '--full': CIRC, '--offset': offset }}
        />
        <defs>
          <linearGradient id='xpGrad' x1='0' y1='0' x2='1' y2='0'>
            <stop offset='0%' stopColor='#0ea5e9' />
            <stop offset='100%' stopColor='#a855f7' />
          </linearGradient>
        </defs>
      </svg>
      <div className='absolute flex flex-col items-center leading-none'>
        <span className='mb-0.5 text-[11px] font-bold tracking-[1px] text-slate-500 uppercase'>LVL</span>
        <span className='db-shimmer-text text-[26px] font-extrabold'>{level}</span>
        <span className='mt-0.5 text-[10px] text-slate-600'>
          {xp} / {maxXp} XP
        </span>
      </div>
    </div>
  );
}

/* ── Streak badge ── */
function StreakBadge({ streak }) {
  return (
    <div className='db-streak-anim flex flex-col items-center gap-1'>
      <div
        className='db-glow-pop flex h-12 w-12 items-center justify-center rounded-full'
        style={{
          background: 'linear-gradient(135deg,rgba(251,146,60,.15),rgba(239,68,68,.12))',
          border: '1px solid rgba(251,146,60,.3)'
        }}
      >
        <span style={{ color: '#fb923c', fontSize: 20 }}>🔥</span>
      </div>
      <span className='text-[18px] font-extrabold' style={{ color: '#fb923c' }}>
        {streak}
      </span>
      <span className='text-[10px] tracking-[1px] text-slate-500 uppercase'>day streak</span>
    </div>
  );
}

/* ── Track overview panel ── */
function TrackOverviewPanel({ courses }) {
  return (
    <div className='db-card-glow flex flex-col gap-5 p-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span style={{ color: '#38bdf8' }}>{Icon.map}</span>
          <h2 className='text-[13px] font-bold tracking-[1.2px] text-white uppercase'>Track Progress</h2>
        </div>
        <span className='text-[11px] text-slate-600'>
          {courses.filter((c) => c.completedLessons > 0).length} / {TRACKS.length} active
        </span>
      </div>

      {/* Tracks */}
      <div className='flex flex-col gap-4'>
        {TRACKS.map((track) => {
          const trackCourses = courses.filter((c) => c.track === track.id);
          const done = trackCourses.reduce((s, c) => s + c.completedLessons, 0);
          const total = trackCourses.reduce((s, c) => s + c.totalLessons, 0);
          const p = total > 0 ? Math.round((done / total) * 100) : 0;
          const active = done > 0;

          return (
            <div key={track.id} className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  {/* Color dot */}
                  <span
                    className='inline-block h-2 w-2 shrink-0 rounded-full'
                    style={{
                      background: active ? track.color : 'rgba(255,255,255,.15)',
                      boxShadow: active ? `0 0 6px ${track.color}` : 'none'
                    }}
                  />
                  <span className='text-[13px] font-semibold' style={{ color: active ? '#e2e8f0' : '#475569' }}>
                    {track.label}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-[11px] text-slate-600'>
                    {done}/{total} lessons
                  </span>
                  <span
                    className='min-w-[36px] text-right text-[12px] font-bold'
                    style={{ color: active ? track.color : '#334155' }}
                  >
                    {p}%
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div
                className='h-1.5 w-full overflow-hidden rounded-full'
                style={{ background: 'rgba(255,255,255,.06)' }}
              >
                <div
                  className='db-track-bar-fill h-full rounded-full'
                  style={{
                    background: active ? `linear-gradient(90deg,${track.color},${track.color}aa)` : 'transparent',
                    boxShadow: active ? `0 0 8px ${track.color}66` : 'none',
                    width: `${p}%`
                  }}
                />
              </div>

              {/* Desc */}
              <p className='text-[11px] text-slate-600'>{track.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */

const USER_COURSES_KEY = 'gp_user_courses';

/**
 * Generate course data from CATALOG.
 * Picks 4 random modules for the user's enrolled courses.
 */
function generateCoursesFromCatalog() {
  // Shuffle and pick 4 modules
  const shuffled = [...CATALOG].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, 4);

  return selected.map((module, idx) => {
    const totalLessons = module.chapters.length;
    // Give first module some progress, others 0-2 lessons
    const completedLessons = idx === 0 ? 2 : Math.floor(Math.random() * 3);
    const lastLesson =
      completedLessons > 0
        ? {
            at: new Date(Date.now() - 1000 * 60 * 60 * (idx + 1) * 2).toISOString(),
            id: module.chapters[completedLessons - 1].id,
            title: module.chapters[completedLessons - 1].title
          }
        : null;

    return {
      color: module.color,
      completedLessons,
      id: module.id,
      lastLesson,
      title: module.title,
      totalLessons,
      track: module.track
    };
  });
}

/**
 * Get or create user's enrolled courses.
 * Persists to localStorage so courses stay consistent across refreshes.
 */
function getUserCourses() {
  try {
    const stored = localStorage.getItem(USER_COURSES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // If parse fails, fall through to generate new
  }

  // Generate new courses and save them
  const courses = generateCoursesFromCatalog();
  localStorage.setItem(USER_COURSES_KEY, JSON.stringify(courses));
  return courses;
}

export default function DashboardPage() {
  const { logout, session } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(() => getProgress());
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // mobile

  // Track active tab via URL hash
  const [tab, setTab] = React.useState(() => {
    const hash = window.location.hash.slice(1); // Remove '#'
    return hash || 'dashboard';
  });

  // Update tab when hash changes
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setTab(hash || 'dashboard');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Helper to change tab and update URL hash
  const changeTab = (newTab) => {
    setTab(newTab);
    setSidebarOpen(false);
    window.location.hash = newTab;
  };

  // Get persisted courses (only generates once, then saved to localStorage)
  const courses = React.useMemo(() => getUserCourses(), []);
  const announcements = progress.announcements;
  const activeCourses = courses.filter((c) => c.completedLessons > 0);
  const recentLessons = courses
    .filter((c) => c.lastLesson)
    .sort((a, b) => new Date(b.lastLesson.at) - new Date(a.lastLesson.at));
  const unreadCount = announcements.filter((a) => !a.read).length;
  const totalLessons = courses.reduce((s, c) => s + c.completedLessons, 0);

  // XP & level derived from progress
  const xpPerLesson = 40;
  const xpTotal = totalLessons * xpPerLesson;
  const level = Math.max(1, Math.floor(xpTotal / 500) + 1);
  const xpInLevel = xpTotal % 500;
  const xpForNext = 500;
  const streak = progress.streak ?? 1;

  function dismissAnnouncement(id) {
    markAnnouncementRead(id);
    setProgress(getProgress());
  }

  function handleContinue(course) {
    navigate(`/module/${course.id}`);
  }

  function handleStart(course) {
    navigate(`/module/${course.id}`);
  }

  const greeting = (() => {
    const h = new Date().getHours();

    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';

    return 'Good evening';
  })();

  /* ── Sidebar ── */
  const Sidebar = ({ mobile = false }) => (
    <aside
      className={mobile ? 'flex flex-col gap-1' : 'flex h-full flex-col gap-1'}
      style={mobile ? {} : { flexShrink: 0, width: 220 }}
    >
      {!mobile && (
        <div className='mb-6 px-1'>
          <LogoCompact size={30} href='/' />
        </div>
      )}

      <NavItem
        icon={Icon.grid}
        label='Dashboard'
        active={tab === 'dashboard'}
        onClick={() => changeTab('dashboard')}
      />
      <NavItem
        icon={Icon.book}
        label='My Courses'
        active={tab === 'courses'}
        onClick={() => changeTab('courses')}
      />
      <NavItem icon={Icon.map} label='Catalog' active={false} onClick={() => navigate('/catalog')} />
      <NavItem
        icon={Icon.bell}
        label={unreadCount > 0 ? `Notifications (${unreadCount})` : 'Notifications'}
        active={tab === 'notifs'}
        onClick={() => changeTab('notifs')}
      />

      <div className='flex-1' />
      <div className='mt-4 pt-4' style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <NavItem icon={Icon.user} label='Profile' active={tab === 'profile'} onClick={() => changeTab('profile')} />
        <NavItem icon={Icon.settings} label='Settings' active={tab === 'settings'} onClick={() => changeTab('settings')} />
        <NavItem
          icon={Icon.logout}
          label='Sign Out'
          active={false}
          onClick={() => {
            logout();
            navigate('/', { replace: true });
          }}
        />
      </div>
    </aside>
  );

  /* ── Main content ── */
  const Main = () => (
    <div className='flex min-w-0 flex-1 flex-col gap-7 pb-12'>
      {/* ── Greeting ── */}
      <div className='db-f0 flex flex-wrap items-start justify-between gap-4'>
        <div>
          <p className='mb-1 text-[13px] text-slate-500'>{greeting},</p>
          <h1 className='text-[26px] leading-tight font-extrabold tracking-tight text-white'>
            {session?.name ?? 'Developer'} 👋
          </h1>
        </div>
        <div className='flex items-center gap-2'>
          <button className='db-btn-ghost' onClick={() => navigate('/')}>
            {Icon.home}
            <span>Home</span>
          </button>
          <button className='db-btn-primary' onClick={() => setTab('courses')}>
            {Icon.plus}
            <span>New course</span>
          </button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className='db-f1 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        <Stat label='Enrolled' value={courses.length} color='#38bdf8' />
        <Stat label='In progress' value={activeCourses.length} color='#a78bfa' />
        <Stat label='Lessons done' value={totalLessons} color='#34d399' />
        <Stat label='Notifications' value={unreadCount} color='#fbbf24' />
      </div>

      {/* ── XP / Streak / Track hero ── */}
      <div className='db-f2 grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {/* XP ring + streak */}
        <div className='db-card-glow flex items-center gap-6 px-6 py-5 lg:col-span-1'>
          <XpRing xp={xpInLevel} maxXp={xpForNext} level={level} />
          <div className='flex flex-col gap-4'>
            <div>
              <p className='mb-1 text-[11px] tracking-[1px] text-slate-500 uppercase'>Total XP</p>
              <p className='db-shimmer-text text-[20px] font-extrabold'>{xpTotal.toLocaleString()}</p>
            </div>
            <StreakBadge streak={streak} />
          </div>
        </div>

        {/* Track overview */}
        <div className='lg:col-span-2'>
          <TrackOverviewPanel courses={courses} />
        </div>
      </div>

      {/* ── Continue where you left off ── */}
      {activeCourses.length > 0 && (
        <section className='db-f2 flex flex-col gap-3'>
          <h2 className='text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>Continue learning</h2>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            {activeCourses.map((c, i) => (
              <CourseCard
                key={c.id}
                course={c}
                onContinue={handleContinue}
                onStart={handleStart}
                animClass={`db-f${Math.min(i + 2, 5)}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── All enrolled courses ── */}
      <section className='db-f3 flex flex-col gap-3'>
        <h2 className='text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>All courses</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {courses.map((c, i) => (
            <CourseCard
              key={c.id}
              course={c}
              onContinue={handleContinue}
              onStart={handleStart}
              animClass={`db-f${Math.min(i + 2, 5)}`}
            />
          ))}
        </div>
      </section>

      {/* ── Recent lessons + announcements (two-column) ── */}
      <div className='db-f4 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Recent lessons */}
        <section className='flex flex-col gap-3'>
          <h2 className='text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>Recent lessons</h2>
          <div className='db-card flex flex-col px-2 py-2'>
            {recentLessons.length > 0 ? (
              recentLessons.map((c) => <RecentLessonRow key={c.id} course={c} />)
            ) : (
              <div className='py-8 text-center text-[13px] text-slate-600'>
                No lessons started yet. Pick a course above.
              </div>
            )}
          </div>
        </section>

        {/* Announcements */}
        <section className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>Announcements</h2>
            {unreadCount > 0 && (
              <span
                className='rounded-full px-2 py-0.5 text-[11px] font-bold'
                style={{ background: 'rgba(56,189,248,.12)', color: '#38bdf8' }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          <div className='flex flex-col gap-3'>
            {announcements.length > 0 ? (
              announcements.map((a) => <AnnouncementCard key={a.id} ann={a} onDismiss={dismissAnnouncement} />)
            ) : (
              <div className='db-card py-8 text-center text-[13px] text-slate-600'>All caught up!</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );

  /* ── Placeholder panels for other tabs ── */
  const Placeholder = ({ title }) => (
    <div className='flex flex-1 flex-col items-center justify-center gap-3 text-slate-600'>
      <svg width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.2'>
        <circle cx='12' cy='12' r='10' />
        <line x1='12' y1='8' x2='12' y2='12' />
        <line x1='12' y1='16' x2='12.01' y2='16' />
      </svg>
      <p className='text-[14px] text-slate-500'>{title}, coming soon</p>
    </div>
  );

  /* ── Profile Section ── */
  const ProfileSection = () => (
    <div className='flex min-w-0 flex-1 flex-col gap-7 pb-12'>
      <div className='db-f0'>
        <h1 className='text-[26px] leading-tight font-extrabold tracking-tight text-white'>Profile</h1>
        <p className='mt-1 text-[13px] text-slate-500'>Manage your account information</p>
      </div>

      <div className='db-f1 max-w-[720px]'>
        <div className='db-card flex flex-col gap-6 p-6'>
          {/* Avatar & Basic Info */}
          <div className='flex items-center gap-6'>
            <div
              className='flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-[32px]'
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#7c3aed)' }}
            >
              {session?.avatar ? (
                <img src={session.avatar} alt='Avatar' className='h-full w-full rounded-full object-cover' />
              ) : (
                <span>👤</span>
              )}
            </div>
            <div className='flex-1'>
              <h2 className='text-[18px] font-bold text-white'>{session?.name ?? 'Developer'}</h2>
              <p className='mt-0.5 text-[13px] text-slate-400'>@{session?.username ?? 'enginedev'}</p>
              <p className='mt-1 text-[12px] text-slate-500'>{session?.email ?? 'dev@graphicalplayground.com'}</p>
            </div>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-3 gap-4 pt-4' style={{ borderTop: '1px solid rgba(255,255,255,.06)' }}>
            <div className='flex flex-col gap-1'>
              <span className='db-shimmer-text text-[20px] font-extrabold'>{level}</span>
              <span className='text-[11px] text-slate-500'>Level</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='db-shimmer-text text-[20px] font-extrabold'>{xpTotal.toLocaleString()}</span>
              <span className='text-[11px] text-slate-500'>Total XP</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[20px] font-extrabold' style={{ color: '#fb923c' }}>
                {streak}
              </span>
              <span className='text-[11px] text-slate-500'>Day Streak</span>
            </div>
          </div>

          {/* Edit button */}
          <button className='db-btn-ghost mt-2 justify-center'>
            {Icon.settings}
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Learning Progress */}
      <div className='db-f2 max-w-[720px]'>
        <h2 className='mb-3 text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>Learning Progress</h2>
        <div className='db-card flex flex-col gap-4 p-5'>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            <div className='flex flex-col gap-1'>
              <span className='text-[20px] font-bold' style={{ color: '#38bdf8' }}>
                {courses.length}
              </span>
              <span className='text-[11px] text-slate-500'>Courses Enrolled</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[20px] font-bold' style={{ color: '#a78bfa' }}>
                {totalLessons}
              </span>
              <span className='text-[11px] text-slate-500'>Lessons Completed</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[20px] font-bold' style={{ color: '#34d399' }}>
                {activeCourses.length}
              </span>
              <span className='text-[11px] text-slate-500'>Active Courses</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-[20px] font-bold' style={{ color: '#fbbf24' }}>
                {Math.round((totalLessons / courses.reduce((s, c) => s + c.totalLessons, 0)) * 100) || 0}%
              </span>
              <span className='text-[11px] text-slate-500'>Overall Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ── Settings Section ── */
  const SettingsSection = () => (
    <div className='flex min-w-0 flex-1 flex-col gap-7 pb-12'>
      <div className='db-f0'>
        <h1 className='text-[26px] leading-tight font-extrabold tracking-tight text-white'>Settings</h1>
        <p className='mt-1 text-[13px] text-slate-500'>Customize your learning experience</p>
      </div>

      {/* Account Settings */}
      <div className='db-f1 max-w-[720px]'>
        <h2 className='mb-3 text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>Account</h2>
        <div className='db-card flex flex-col gap-5 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[14px] font-semibold text-white'>Email Address</p>
              <p className='mt-0.5 text-[12px] text-slate-500'>{session?.email ?? 'dev@graphicalplayground.com'}</p>
            </div>
            <button className='db-btn-ghost'>Change</button>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }} />
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[14px] font-semibold text-white'>Password</p>
              <p className='mt-0.5 text-[12px] text-slate-500'>••••••••••</p>
            </div>
            <button className='db-btn-ghost'>Change</button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className='db-f2 max-w-[720px]'>
        <h2 className='mb-3 text-[13px] font-bold tracking-[1.5px] text-slate-400 uppercase'>Preferences</h2>
        <div className='db-card flex flex-col gap-5 p-6'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[14px] font-semibold text-white'>Email Notifications</p>
              <p className='mt-0.5 text-[12px] text-slate-500'>Receive updates about new courses and announcements</p>
            </div>
            <div
              className='relative h-6 w-11 cursor-pointer rounded-full'
              style={{ background: 'rgba(14,165,233,.3)' }}
            >
              <div
                className='absolute top-1 h-4 w-4 rounded-full transition-all'
                style={{ background: '#0ea5e9', right: '4px' }}
              />
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)' }} />
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[14px] font-semibold text-white'>Dark Mode</p>
              <p className='mt-0.5 text-[12px] text-slate-500'>Always enabled for optimal coding experience</p>
            </div>
            <div
              className='relative h-6 w-11 cursor-pointer rounded-full'
              style={{ background: 'rgba(14,165,233,.3)' }}
            >
              <div
                className='absolute top-1 h-4 w-4 rounded-full transition-all'
                style={{ background: '#0ea5e9', right: '4px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className='db-f3 max-w-[720px]'>
        <h2 className='mb-3 text-[13px] font-bold tracking-[1.5px] text-red-400 uppercase'>Danger Zone</h2>
        <div className='flex flex-col gap-4 rounded-[14px] border p-6' style={{ borderColor: 'rgba(239,68,68,.3)', background: 'rgba(239,68,68,.05)' }}>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-[14px] font-semibold text-white'>Delete Account</p>
              <p className='mt-0.5 text-[12px] text-slate-500'>Permanently delete your account and all data</p>
            </div>
            <button
              className='db-btn-ghost'
              style={{ borderColor: 'rgba(239,68,68,.3)', color: '#ef4444' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const tabContent = {
    courses: <Main />,
    dashboard: <Main />, // reuse for now — will be its own page
    notifs: (
      <div className='flex flex-1 flex-col gap-4 pb-12'>
        <h1 className='text-[22px] font-extrabold text-white'>Notifications</h1>
        <div className='flex max-w-[640px] flex-col gap-3'>
          {announcements.map((a) => (
            <AnnouncementCard key={a.id} ann={a} onDismiss={dismissAnnouncement} />
          ))}
        </div>
      </div>
    ),
    profile: <ProfileSection />,
    settings: <SettingsSection />
  };

  return (
    <div
      className='relative min-h-screen bg-[#06060a] text-slate-100 antialiased'
      style={{ fontFamily: "'Inter',ui-sans-serif,system-ui,sans-serif" }}
    >
      {/* Ambient bg */}
      <div
        className='db-pulse pointer-events-none fixed inset-0 z-0'
        style={{
          background:
            'radial-gradient(ellipse 900px 500px at 0% 0%,rgba(0,166,255,.07) 0%,transparent 65%),radial-gradient(ellipse 700px 400px at 100% 100%,rgba(125,0,255,.06) 0%,transparent 65%)'
        }}
      />

      {/* ── Mobile top bar ── */}
      <div
        className='fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-4 py-3 md:hidden'
        style={{
          backdropFilter: 'blur(14px)',
          background: 'rgba(6,6,10,.90)',
          borderBottom: '1px solid rgba(255,255,255,.06)'
        }}
      >
        <LogoCompact size={28} />
        <button onClick={() => setSidebarOpen((v) => !v)} className='p-1 text-slate-400 hover:text-white'>
          {sidebarOpen ? (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          ) : (
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div className='fixed inset-0 z-40 flex md:hidden' onClick={() => setSidebarOpen(false)}>
          <div
            className='flex h-full w-[260px] flex-col gap-1 p-5'
            style={{
              backdropFilter: 'blur(16px)',
              background: 'rgba(8,8,14,.97)',
              borderRight: '1px solid rgba(255,255,255,.07)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='mb-5'>
              <LogoCompact size={28} />
            </div>
            <Sidebar mobile />
          </div>
          <div className='flex-1' style={{ background: 'rgba(0,0,0,.5)' }} />
        </div>
      )}

      {/* ── Desktop layout ── */}
      <div className='relative z-10 flex min-h-screen'>
        {/* Desktop sidebar */}
        <div
          className='sticky top-0 hidden h-screen flex-col px-4 py-6 md:flex'
          style={{
            backdropFilter: 'blur(12px)',
            background: 'rgba(6,6,10,.6)',
            borderRight: '1px solid rgba(255,255,255,.06)',
            width: 240
          }}
        >
          <Sidebar />
        </div>

        {/* Main scroll area */}
        <main className='flex min-w-0 flex-1 flex-col gap-0 px-5 pt-[72px] md:px-10 md:pt-10'>
          {tabContent[tab] ?? <Main />}
        </main>
      </div>
    </div>
  );
}
