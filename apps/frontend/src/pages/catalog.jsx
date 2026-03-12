import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoCompact } from '../components/Logo.jsx';
import { CATALOG } from '../auth_store.js';

/* ─────────────────────────────────────────────────────────────────
   catalog.jsx  —  Course Catalog / Library
   Layout:  Track rail (left)  ›  Module list (right)
            Click a module     ›  Navigate to /module/:id
   Auth-guarded: /catalog requires login.
   ───────────────────────────────────────────────────────────────── */

/* ── Keyframes ── */
const KF = `
  @keyframes cl-fadein  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
  @keyframes cl-pulse   { from{opacity:.55} to{opacity:1} }
  @keyframes cl-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

  .cl-f0 { animation: cl-fadein  .4s ease both }
  .cl-f1 { animation: cl-fadein  .4s .06s ease both }
  .cl-f2 { animation: cl-fadein  .4s .12s ease both }
  .cl-f3 { animation: cl-fadein  .4s .18s ease both }
  .cl-f4 { animation: cl-fadein  .4s .24s ease both }
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
const IcoChevR  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>;

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
function ModuleRow({ mod, animDelay, onClick }) {
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
          color: '#334155',
          transition: 'color .15s',
          flexShrink: 0,
        }}>
          {IcoChevR}
        </span>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function CatalogPage() {
  const navigate = useNavigate();

  const [activeTrackId, setActiveTrackId] = React.useState(TRACKS[0].id);

  const activeTrack = TRACKS.find(t => t.id === activeTrackId) ?? TRACKS[0];

  function selectTrack(id) {
    setActiveTrackId(id);
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

        {/* ── Two-column layout ── */}
        <div className="grid gap-6" style={{ gridTemplateColumns: '220px 1fr', alignItems: 'start' }}>

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
                animDelay={i * 40}
                onClick={() => navigate(`/module/${mod.id}`)}
              />
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}


