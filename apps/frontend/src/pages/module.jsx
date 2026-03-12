import { useNavigate, useParams } from 'react-router-dom';

import { LogoCompact } from '../components/Logo.jsx';
import { CATALOG, getProgress } from '../auth_store.js';

/* ─────────────────────────────────────────────────────────────────
   module.jsx  —  Module Detail / Lesson Overview
   Route: /module/:moduleId

   Full-screen page that shows what you'll learn in this module,
   the chapter list, your progress, and a start/continue CTA.

   Since this is a fake platform, "Start" and chapter clicks all
   land on the same single stub lesson page (the first chapter).
   ───────────────────────────────────────────────────────────────── */

/* ── Keyframes ── */
const KF = `
  @keyframes md-fadein  { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
  @keyframes md-slidein { from { opacity: 0; transform: translateX(32px) } to { opacity: 1; transform: none } }
  @keyframes md-pulse   { from { opacity: .5 } to { opacity: 1 } }
  @keyframes md-shimmer {
    0%   { background-position: -200% center }
    100% { background-position:  200% center }
  }

  .md-f0 { animation: md-fadein .45s ease both }
  .md-f1 { animation: md-fadein .45s .07s ease both }
  .md-f2 { animation: md-fadein .45s .14s ease both }
  .md-f3 { animation: md-fadein .45s .21s ease both }
  .md-f4 { animation: md-fadein .45s .28s ease both }
  .md-slide { animation: md-slidein .4s ease both }
  .md-pulse-bg { animation: md-pulse 7s ease-in-out infinite alternate }

  .md-shimmer {
    background: linear-gradient(90deg, #38bdf8 0%, #c084fc 40%, #38bdf8 80%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: md-shimmer 3s linear infinite;
  }

  .md-chapter-row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,.065);
    background: rgba(255,255,255,.025);
  }
  .md-chapter-row.done {
    border-color: rgba(0,166,255,.18);
  }

  .md-btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    padding: 14px 32px; border-radius: 12px; border: none; cursor: pointer;
    font-size: 15px; font-weight: 800; color: #fff; letter-spacing: .01em;
    background: linear-gradient(135deg, #0ea5e9, #7c3aed);
    box-shadow: 0 6px 24px rgba(14,165,233,.28), inset 0 1px 0 rgba(255,255,255,.12);
    transition: opacity .15s, transform .15s, box-shadow .15s;
  }
  .md-btn-primary:hover {
    opacity: .92;
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(14,165,233,.38), inset 0 1px 0 rgba(255,255,255,.12);
  }
  .md-btn-primary:active { transform: translateY(0) }

  .md-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 10px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: #94a3b8;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.09);
    transition: background .15s, color .15s, border-color .15s;
  }
  .md-btn-ghost:hover { background: rgba(255,255,255,.09); color: #e2e8f0; border-color: rgba(0,166,255,.22) }
`;

let _kfInjected = false;
function injectKf() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('md-kf')) return;
  const t = document.createElement('style');
  t.id = 'md-kf'; t.textContent = KF;
  document.head.appendChild(t);
  _kfInjected = true;
}
injectKf();

/* ── Icon helpers ── */
const IcoBack   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoPlay   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IcoCheck  = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoLock   = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

/* ── Progress bar ── */
function ProgressBar({ value, color }) {
  return (
    <div style={{ width: '100%', height: 6, borderRadius: 99, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
      <div style={{
        height: '100%', borderRadius: 99,
        width: `${Math.min(100, Math.max(0, value))}%`,
        background: `linear-gradient(90deg, ${color}, ${color}aa)`,
        boxShadow: `0 0 8px ${color}66`,
        transition: 'width .6s ease',
      }} />
    </div>
  );
}

/* ── Image placeholder (same style as catalog) ── */
function ModuleCover({ color }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '21/7', position: 'relative', overflow: 'hidden',
      background: 'rgba(255,255,255,.025)',
      borderBottom: '1px solid rgba(255,255,255,.06)',
    }}>
      {/* blobs */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 60% 80% at 20% 50%, ${color}18 0%, transparent 70%),
                     radial-gradient(ellipse 40% 60% at 80% 20%, ${color}0e 0%, transparent 70%)`,
      }} />
      {/* grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${color}12 1px, transparent 1px),
                          linear-gradient(90deg, ${color}12 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />
      {/* label */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 8,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={`${color}30`} strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,.15)', letterSpacing: '0.12em', fontWeight: 700 }}>
          MODULE COVER
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function ModulePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();

  // Find module in catalog
  const mod = CATALOG.find(m => m.id === moduleId) ?? CATALOG[0];

  // Progress for this module
  const progress = getProgress();
  const courseProgress = progress.courses.find(c => c.id === mod.id);
  const completedCount = courseProgress?.completedLessons ?? 0;
  const totalCount = mod.chapters.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const started = completedCount > 0;

  function handleStartContinue() {
    // Will navigate to the lesson/project page (not built yet)
    navigate(`/lesson/${mod.id}`);
  }

  // ── Module overview ──
  return (
    <div
      className="relative min-h-screen bg-[#06060a] text-slate-100 antialiased"
      style={{ fontFamily: "'Inter',ui-sans-serif,system-ui,sans-serif" }}
    >
      {/* Ambient bg */}
      <div className="md-pulse-bg pointer-events-none fixed inset-0 z-0" style={{
        background: `radial-gradient(ellipse 800px 500px at 15% 0%, ${mod.color}0f 0%, transparent 65%),
                     radial-gradient(ellipse 600px 400px at 85% 100%, rgba(125,0,255,.07) 0%, transparent 65%)`,
      }} />

      {/* ── Top bar ── */}
      <header className="relative z-10 sticky top-0" style={{
        background: 'rgba(6,6,10,.9)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LogoCompact size={28} href="/" />
            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.08)' }} />
            <button className="md-btn-ghost" style={{ padding: '7px 14px', fontSize: 13 }}
              onClick={() => navigate('/catalog')}>
              {IcoBack} Catalog
            </button>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.08em',
            color: mod.color, background: `${mod.color}18`,
            border: `1px solid ${mod.color}30`,
            borderRadius: 6, padding: '3px 10px',
          }}>
            {mod.tierLabel}
          </span>
        </div>
      </header>

      {/* ── Cover image ── */}
      <div className="relative z-10">
        <ModuleCover color={mod.color} />
      </div>

      {/* ── Body ── */}
      <div className="relative z-10" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Two-column layout: left = info, right = sticky card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: 40,
          alignItems: 'start',
          marginTop: 40,
        }}>

          {/* ── Left: module info ── */}
          <div>
            {/* Module number */}
            <p className="md-f0" style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Module {mod.id.replace('mod-', '').replace(/^0/, '')}
            </p>

            {/* Title */}
            <h1 className="md-f1" style={{ fontSize: 36, fontWeight: 900, color: '#f8fafc', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: 20 }}>
              {mod.title}
            </h1>

            {/* Stats row */}
            <div className="md-f2" style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
              {[
                { label: 'Chapters', value: `${totalCount}` },
                { label: 'Language', value: 'C++ · GLSL' },
                { label: 'Level', value: mod.tierLabel.split('-')[0].trim() },
                { label: 'Track', value: mod.track },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: 10, color: '#475569', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{s.label}</p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* What you'll learn */}
            <div className="md-f3" style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                What you'll learn
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mod.chapters.map((ch, i) => (
                    <div
                      key={ch.id}
                      className="md-chapter-row"
                    >
                      {/* Number badge */}
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${mod.color}14`,
                        border: `1px solid ${mod.color}28`,
                      }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: mod.color }}>{String(i + 1).padStart(2, '0')}</span>
                      </div>

                      {/* Title */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#cbd5e1', lineHeight: 1.35 }}>
                          {ch.title}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: sticky action card ── */}
          <div className="md-slide" style={{ position: 'sticky', top: 76 }}>
            <div style={{
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,.09)',
              background: 'rgba(10,10,18,.85)',
              backdropFilter: 'blur(18px)',
              overflow: 'hidden',
              boxShadow: `0 0 0 1px ${mod.color}14, 0 24px 64px rgba(0,0,0,.5)`,
            }}>
              {/* Card cover accent */}
              <div style={{
                height: 4,
                background: `linear-gradient(90deg, ${mod.color}, ${mod.color}44)`,
              }} />

              <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Progress */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Progress
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: started ? mod.color : '#334155' }}>
                      {pct}%
                    </span>
                  </div>
                  <ProgressBar value={pct} color={mod.color} />
                  <p style={{ fontSize: 12, color: '#475569', marginTop: 8 }}>
                    {completedCount} of {totalCount} chapters complete
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }} />

                {/* CTA */}
                <button className="md-btn-primary" onClick={handleStartContinue}>
                  {IcoPlay}
                  {started ? (completedCount >= totalCount ? 'Review module' : 'Continue') : 'Start module'}
                </button>

                {/* Next chapter hint */}
                {started && completedCount < totalCount && (
                  <p style={{ fontSize: 12, color: '#475569', textAlign: 'center', lineHeight: 1.6 }}>
                    Up next:{' '}
                    <span style={{ color: '#94a3b8', fontWeight: 600 }}>
                      {mod.chapters[completedCount]?.title}
                    </span>
                  </p>
                )}

                {/* Module meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                  {[
                    { label: `${totalCount} chapters` },
                    { label: 'C++ · GLSL · HLSL' },
                    { label: 'All skill levels welcome' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: mod.color, opacity: 0.6, flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 12, color: '#64748b' }}>{item.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
