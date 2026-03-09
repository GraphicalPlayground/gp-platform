import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoCompact } from '../components/Logo.jsx';
import { CATALOG } from '../auth_store.js';

/* ─────────────────────────────────────────────────────────────────
   catalog.jsx  —  Course Catalog / Library
   Layout:  Track rail (left)  ›  Module list (right)
            Click a module     ›  Detail drawer slides in from right
   Auth-guarded: /catalog requires login.
   ───────────────────────────────────────────────────────────────── */

/* ── Keyframes ── */
const KF = `
  @keyframes cl-fadein  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
  @keyframes cl-slidein { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
  @keyframes cl-pulse   { from{opacity:.55} to{opacity:1} }
  @keyframes cl-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

  .cl-f0 { animation: cl-fadein  .4s ease both }
  .cl-f1 { animation: cl-fadein  .4s .06s ease both }
  .cl-f2 { animation: cl-fadein  .4s .12s ease both }
  .cl-f3 { animation: cl-fadein  .4s .18s ease both }
  .cl-f4 { animation: cl-fadein  .4s .24s ease both }
  .cl-slide { animation: cl-slidein .3s ease both }
  .cl-pulse { animation: cl-pulse 6s ease-in-out infinite alternate }

  .cl-shimmer-text {
    background: linear-gradient(90deg,#38bdf8 0%,#c084fc 40%,#38bdf8 80%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: cl-shimmer 3s linear infinite;
  }

  .cl-track-btn {
    width: 100%; text-align: left; border: none; cursor: pointer;
    border-radius: 12px; padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
    transition: background .15s, box-shadow .15s;
    background: transparent;
  }
  .cl-track-btn:hover { background: rgba(255,255,255,.05) }
  .cl-track-btn.active { background: rgba(255,255,255,.07) }

  .cl-mod-row {
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,.07);
    background: rgba(255,255,255,.03);
    cursor: pointer;
    transition: border-color .15s, background .15s, box-shadow .15s;
    overflow: hidden;
  }
  .cl-mod-row:hover {
    border-color: rgba(0,166,255,.18);
    background: rgba(0,166,255,.04);
    box-shadow: 0 4px 24px rgba(0,0,0,.35);
  }
  .cl-mod-row.selected {
    border-color: rgba(0,166,255,.35);
    box-shadow: 0 0 0 1px rgba(0,166,255,.10), 0 8px 32px rgba(0,0,0,.4);
  }

  .cl-detail-panel {
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,.08);
    background: rgba(10,10,18,.85);
    backdrop-filter: blur(18px);
    overflow: hidden;
  }

  .cl-img-placeholder {
    width: 100%; aspect-ratio: 16/7;
    background: linear-gradient(135deg, rgba(255,255,255,.04) 0%, rgba(255,255,255,.02) 100%);
    border-bottom: 1px solid rgba(255,255,255,.06);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }

  .cl-btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px; border-radius: 10px; border: none; cursor: pointer;
    font-size: 13px; font-weight: 700; color: #fff;
    background: linear-gradient(135deg,#0ea5e9,#7c3aed);
    box-shadow: 0 6px 20px rgba(14,165,233,.25);
    transition: opacity .15s, box-shadow .15s;
  }
  .cl-btn-primary:hover { opacity:.9; box-shadow: 0 8px 28px rgba(14,165,233,.38) }

  .cl-btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 18px; border-radius: 10px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: #94a3b8;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.09);
    transition: background .15s, color .15s, border-color .15s;
  }
  .cl-btn-ghost:hover { background: rgba(255,255,255,.09); color: #e2e8f0; border-color: rgba(0,166,255,.22) }
`;

let _kfInjected = false;
function injectKf() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('cl-kf')) return;
  const t = document.createElement('style');
  t.id = 'cl-kf'; t.textContent = KF;
  document.head.appendChild(t);
  _kfInjected = true;
}
injectKf();

/* ── Derived track list from CATALOG ── */
const TRACKS = (() => {
  const seen = new Map();
  for (const mod of CATALOG) {
    if (!seen.has(mod.track)) {
      seen.set(mod.track, {
        id:       mod.track,
        label:    mod.track,
        tier:     mod.tier,
        tierLabel: mod.tierLabel,
        color:    mod.color,
        modules:  [],
      });
    }
    seen.get(mod.track).modules.push(mod);
  }
  return [...seen.values()];
})();

/* ── Icons ── */
const IcoBack   = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoPlay   = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IcoBook   = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
const IcoList   = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>;
const IcoChevR  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoImage  = <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{color:'rgba(255,255,255,.12)'}}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IcoLock   = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

/* ─────────────────────────────────────────────────────────────────
   MODULE IMAGE PLACEHOLDER
   Leave space for a real cover image later.
   ───────────────────────────────────────────────────────────────── */
function ModuleImagePlaceholder({ color }) {
  return (
    <div className="cl-img-placeholder">
      {/* Subtle gradient blobs */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 70% 60% at 30% 50%, ${color}14 0%, transparent 70%),
                     radial-gradient(ellipse 50% 70% at 80% 30%, ${color}0a 0%, transparent 70%)`,
      }} />
      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${color}10 1px, transparent 1px),
                          linear-gradient(90deg, ${color}10 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      {/* Centre icon + label */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {IcoImage}
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,.18)', letterSpacing: '0.08em', fontWeight: 600 }}>
          MODULE COVER
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TRACK RAIL  (left column)
   ───────────────────────────────────────────────────────────────── */
function TrackRail({ activeTrackId, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {TRACKS.map(track => {
        const active = track.id === activeTrackId;
        return (
          <button
            key={track.id}
            className={`cl-track-btn${active ? ' active' : ''}`}
            onClick={() => onSelect(track.id)}
          >
            {/* Color pip */}
            <span style={{
              width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
              background: track.color,
              boxShadow: active ? `0 0 8px ${track.color}` : 'none',
              transition: 'box-shadow .2s',
            }} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? '#f1f5f9' : '#64748b',
                transition: 'color .15s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {track.label}
              </p>
              <p style={{ fontSize: 11, color: '#334155', marginTop: 1 }}>
                {track.modules.length} modules
              </p>
            </div>

            {active && (
              <span style={{ color: track.color, flexShrink: 0 }}>{IcoChevR}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MODULE ROW  (centre column)
   ───────────────────────────────────────────────────────────────── */
function ModuleRow({ mod, selected, animDelay, onClick }) {
  return (
    <div
      className={`cl-mod-row cl-f1`}
      style={{ animationDelay: `${animDelay}ms` }}
      onClick={onClick}
    >
      <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>

        {/* Module number badge */}
        <div style={{
          width: 42, height: 42, borderRadius: 10, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${mod.color}14`, border: `1px solid ${mod.color}28`,
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: mod.color, letterSpacing: '0.04em' }}>
            {mod.id.replace('mod-', '')}
          </span>
        </div>

        {/* Title + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3 }}>
            {mod.title}
          </p>
          <p style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>
            {mod.chapters.length} chapter{mod.chapters.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Arrow */}
        <span style={{
          color: selected ? mod.color : '#334155',
          transition: 'color .15s, transform .15s',
          transform: selected ? 'translateX(3px)' : 'none',
          flexShrink: 0,
        }}>
          {IcoChevR}
        </span>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MODULE DETAIL PANEL  (right column)
   ───────────────────────────────────────────────────────────────── */
function ModuleDetail({ mod, onClose }) {
  return (
    <div key={mod.id} className="cl-detail-panel cl-slide" style={{ display: 'flex', flexDirection: 'column' }}>

      {/* Cover image placeholder */}
      <ModuleImagePlaceholder color={mod.color} />

      {/* Content */}
      <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Track + tier badge */}
        <div style={{ display: 'flex', items: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
            color: mod.color, background: `${mod.color}16`,
            borderRadius: 6, padding: '3px 8px', border: `1px solid ${mod.color}28`,
          }}>
            {mod.tierLabel}
          </span>
        </div>

        {/* Module number + title */}
        <div>
          <p style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>
            MODULE {mod.id.replace('mod-', '').replace(/^0/, '')}
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#f8fafc', lineHeight: 1.25 }}>
            {mod.title}
          </h2>
        </div>

        {/* Learning objectives (derived from chapters as a teaser) */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
            What you'll learn
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {mod.chapters.map((ch, i) => (
              <li key={ch.id ?? i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{
                  marginTop: 2, flexShrink: 0, width: 18, height: 18, borderRadius: '50%',
                  background: `${mod.color}16`, border: `1px solid ${mod.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: mod.color }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.55 }}>{ch.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#475569' }}>{IcoList}</span>
            <span style={{ fontSize: 12, color: '#64748b' }}>
              {mod.chapters.length} chapters
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#475569' }}>{IcoBook}</span>
            <span style={{ fontSize: 12, color: '#64748b' }}>C++ · GLSL</span>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="cl-btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            {IcoPlay}
            Start module
          </button>
        </div>

        {/* Close (mobile / dismiss) */}
        {onClose && (
          <button className="cl-btn-ghost" style={{ justifyContent: 'center' }} onClick={onClose}>
            {IcoBack} Back to modules
          </button>
        )}

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function CatalogPage() {
  const navigate = useNavigate();

  const [activeTrackId,  setActiveTrackId]  = React.useState(TRACKS[0].id);
  const [selectedModId,  setSelectedModId]  = React.useState(TRACKS[0].modules[0]?.id ?? null);
  const [showDetail,     setShowDetail]     = React.useState(false); // mobile

  const activeTrack  = TRACKS.find(t => t.id === activeTrackId) ?? TRACKS[0];
  const selectedMod  = activeTrack.modules.find(m => m.id === selectedModId) ?? null;

  function selectTrack(id) {
    setActiveTrackId(id);
    const track = TRACKS.find(t => t.id === id);
    setSelectedModId(track?.modules[0]?.id ?? null);
    setShowDetail(false);
  }

  function selectMod(id) {
    setSelectedModId(id);
    setShowDetail(true);
  }

  return (
    <div
      className="relative min-h-screen bg-[#06060a] text-slate-100 antialiased"
      style={{ fontFamily: "'Inter',ui-sans-serif,system-ui,sans-serif" }}
    >
      {/* Ambient bg */}
      <div className="cl-pulse pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 900px 500px at 10% 0%,rgba(0,166,255,.07) 0%,transparent 65%),radial-gradient(ellipse 700px 400px at 90% 100%,rgba(125,0,255,.06) 0%,transparent 65%)' }} />

      {/* ── Top bar ── */}
      <header className="relative z-10 sticky top-0"
        style={{ background: 'rgba(6,6,10,.88)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div className="mx-auto w-[min(1400px,96%)] h-[60px] flex items-center justify-between gap-4">

          <div className="flex items-center gap-4">
            <LogoCompact size={28} href="/" />
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,.08)' }} />
            <h1 className="cl-shimmer-text" style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.01em' }}>
              Course Catalog
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="cl-btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }}
              onClick={() => navigate('/dashboard')}>
              {IcoBack}
              Dashboard
            </button>
          </div>

        </div>
      </header>

      {/* ── Body ── */}
      <div className="relative z-10 mx-auto w-[min(1400px,96%)] py-8">

        {/* ── Page title row ── */}
        <div className="cl-f0 mb-8">
          <p style={{ fontSize: 12, color: '#475569', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            4 Tracks · 20 Modules · 58 Chapters
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Everything you need to build<br />
            <span className="cl-shimmer-text">a game engine from scratch.</span>
          </h2>
        </div>

        {/* ── Three-column layout ── */}
        <div className="grid gap-6" style={{ gridTemplateColumns: '220px 1fr 380px', alignItems: 'start' }}>

          {/* ── Col 1: Track rail ── */}
          <div className="cl-f1 sticky top-[76px]"
            style={{ background: 'rgba(255,255,255,.025)', borderRadius: 16, border: '1px solid rgba(255,255,255,.07)', padding: '12px 8px' }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: '#334155', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px 10px' }}>
              Tracks
            </p>
            <TrackRail activeTrackId={activeTrackId} onSelect={selectTrack} />
          </div>

          {/* ── Col 2: Module list ── */}
          <div key={activeTrackId} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Track header */}
            <div className="cl-f0 flex items-center gap-3 mb-2">
              <span style={{
                width: 12, height: 12, borderRadius: '50%', background: activeTrack.color,
                boxShadow: `0 0 10px ${activeTrack.color}`,
              }} />
              <div>
                <p style={{ fontSize: 11, color: '#475569', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {activeTrack.tierLabel}
                </p>
                <p style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', marginTop: 2 }}>
                  {activeTrack.label}
                </p>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: '#334155' }}>
                {activeTrack.modules.length} modules
              </span>
            </div>

            {activeTrack.modules.map((mod, i) => (
              <ModuleRow
                key={mod.id}
                mod={mod}
                selected={mod.id === selectedModId}
                animDelay={i * 40}
                onClick={() => selectMod(mod.id)}
              />
            ))}
          </div>

          {/* ── Col 3: Detail panel (desktop) ── */}
          <div className="sticky top-[76px]">
            {selectedMod ? (
              <ModuleDetail mod={selectedMod} />
            ) : (
              /* Empty state */
              <div className="cl-f2 cl-detail-panel"
                style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, marginBottom: 4,
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#334155' }}>{IcoBook}</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#334155' }}>Select a module</p>
                <p style={{ fontSize: 12, color: '#1e293b', maxWidth: 200 }}>
                  Click any module on the left to see its chapters and learning objectives.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Mobile: full-screen detail overlay ── */}
      {showDetail && selectedMod && (
        <div className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: 'rgba(6,6,10,.97)', backdropFilter: 'blur(16px)' }}>
          <div className="relative z-10 mx-auto max-w-[600px] pt-4 pb-12 px-4">
            <ModuleDetail mod={selectedMod} onClose={() => setShowDetail(false)} />
          </div>
        </div>
      )}

    </div>
  );
}


