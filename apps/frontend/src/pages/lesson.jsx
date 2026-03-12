import React, { useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';

import { LogoCompact } from '../components/Logo.jsx';
import { CATALOG } from '../auth_store.js';

/* ─────────────────────────────────────────────────────────────────
   lesson.jsx  —  Coding Environment
   Route: /lesson/:moduleId

   LeetCode-style 3-panel layout:
     Left   (25%) — Lesson brief / subject description
     Centre (50%) — Monaco code editor (VS Code engine)
     Right  (25%) — Result viewport (16:9 video / render preview)

   Panels are separated by draggable dividers.
   The result pane can be fullscreened.
   ───────────────────────────────────────────────────────────────── */

/* ── Keyframes & static CSS ── */
const KF = `
  @keyframes ls-fadein { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
  .ls-f0 { animation: ls-fadein .35s ease both }
  .ls-f1 { animation: ls-fadein .35s .06s ease both }
  .ls-f2 { animation: ls-fadein .35s .12s ease both }

  /* Divider handle */
  .ls-divider {
    width: 6px; cursor: col-resize; flex-shrink: 0;
    background: rgba(255,255,255,.04);
    transition: background .15s;
    position: relative; z-index: 20;
  }
  .ls-divider:hover, .ls-divider.active {
    background: rgba(0,166,255,.25);
  }
  .ls-divider::after {
    content: ''; position: absolute;
    left: 50%; top: 50%; transform: translate(-50%, -50%);
    width: 2px; height: 32px; border-radius: 2px;
    background: rgba(255,255,255,.12);
  }
  .ls-divider:hover::after, .ls-divider.active::after {
    background: rgba(0,166,255,.5);
  }

  /* Tab buttons */
  .ls-tab {
    padding: 8px 16px; border: none; cursor: pointer;
    font-size: 12px; font-weight: 600; color: #64748b;
    background: transparent; border-bottom: 2px solid transparent;
    transition: color .15s, border-color .15s;
  }
  .ls-tab:hover { color: #94a3b8 }
  .ls-tab.active { color: #e2e8f0; border-bottom-color: #0ea5e9 }

  /* Run button */
  .ls-btn-run {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 16px; border-radius: 8px; border: none; cursor: pointer;
    font-size: 12px; font-weight: 700; color: #fff;
    background: linear-gradient(135deg, #22c55e, #16a34a);
    box-shadow: 0 4px 14px rgba(34,197,94,.3);
    transition: opacity .15s, transform .1s;
  }
  .ls-btn-run:hover { opacity: .9 }
  .ls-btn-run:active { transform: scale(.97) }

  /* Ghost buttons */
  .ls-btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-radius: 6px; cursor: pointer;
    font-size: 12px; font-weight: 500; color: #64748b;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    transition: background .15s, color .15s;
  }
  .ls-btn-ghost:hover { background: rgba(255,255,255,.08); color: #94a3b8 }

  /* Fullscreen overlay */
  .ls-fs-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(6,6,10,.96);
    backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }

  /* Scrollbar for panels */
  .ls-scroll::-webkit-scrollbar { width: 6px }
  .ls-scroll::-webkit-scrollbar-track { background: transparent }
  .ls-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,.08); border-radius: 3px }
  .ls-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,.15) }
`;

let _kfInjected = false;
function injectKf() {
  if (_kfInjected || typeof document === 'undefined' || document.getElementById('ls-kf')) return;
  const t = document.createElement('style');
  t.id = 'ls-kf'; t.textContent = KF;
  document.head.appendChild(t);
  _kfInjected = true;
}
injectKf();

/* ── Icons ── */
const IcoBack    = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoPlay    = <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const IcoExpand  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const IcoShrink  = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" y1="10" x2="21" y2="3"/><line x1="3" y1="21" x2="10" y2="14"/></svg>;
const IcoCheck   = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoFile    = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IcoTerminal = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>;

/* ── Stub starter code per module ── */
const STARTER_CODE = `#include <iostream>
#include <cmath>

// ────────────────────────────────────────────
// GP Engine - Module Exercise
// Write your solution below
// ────────────────────────────────────────────

int main() {
    // TODO: Implement your solution here

    std::cout << "Hello, GP Engine!" << std::endl;
    return 0;
}
`;

/* ── Fake console output lines ── */
const FAKE_OUTPUT = [
  { text: '$ g++ -std=c++20 -O2 -o main main.cpp',      type: 'cmd' },
  { text: 'Compiling main.cpp...',                        type: 'info' },
  { text: 'Build succeeded (0 warnings, 0 errors)',       type: 'success' },
  { text: '$ ./main',                                     type: 'cmd' },
  { text: 'Hello, GP Engine!',                            type: 'output' },
  { text: '',                                             type: 'blank' },
  { text: 'Process exited with code 0',                   type: 'info' },
];

/* ─────────────────────────────────────────────────────────────────
   DRAGGABLE DIVIDER HOOK
   Returns: [leftPct, rightPct, dividerProps1, dividerProps2]
   ───────────────────────────────────────────────────────────────── */
function usePanelLayout(initialLeft = 25, initialRight = 25) {
  const [leftPct, setLeftPct]   = React.useState(initialLeft);
  const [rightPct, setRightPct] = React.useState(initialRight);
  const dragging = useRef(null);        // 'left' | 'right' | null
  const containerRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct  = ((e.clientX - rect.left) / rect.width) * 100;

    if (dragging.current === 'left') {
      const clamped = Math.min(Math.max(pct, 12), 50);
      setLeftPct(clamped);
    } else {
      const clamped = Math.min(Math.max(100 - pct, 12), 50);
      setRightPct(clamped);
    }
  }, []);

  const onMouseUp = useCallback(() => {
    dragging.current = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const startDrag = useCallback((side) => () => {
    dragging.current = side;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  return { containerRef, leftPct, rightPct, startDragLeft: startDrag('left'), startDragRight: startDrag('right') };
}

/* ─────────────────────────────────────────────────────────────────
   LEFT PANEL — Lesson / Subject
   ───────────────────────────────────────────────────────────────── */
function LessonPanel({ mod, chapter }) {
  const [tab, setTab] = React.useState('brief');  // brief | objectives

  return (
    <div className="ls-f0" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d14' }}>

      {/* Panel header */}
      <div style={{
        padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,.06)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(255,255,255,.02)',
      }}>
        <span style={{ color: mod.color }}>{IcoFile}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0', letterSpacing: '.01em' }}>
          Lesson
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <button className={`ls-tab${tab === 'brief' ? ' active' : ''}`} onClick={() => setTab('brief')}>Brief</button>
        <button className={`ls-tab${tab === 'objectives' ? ' active' : ''}`} onClick={() => setTab('objectives')}>Objectives</button>
      </div>

      {/* Content */}
      <div className="ls-scroll" style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
        {tab === 'brief' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Module badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '.1em',
                color: mod.color, background: `${mod.color}18`,
                padding: '3px 8px', borderRadius: 5, border: `1px solid ${mod.color}30`,
              }}>
                {mod.tierLabel}
              </span>
            </div>

            {/* Module title */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: '#475569', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                MODULE {mod.id.replace('mod-', '').replace(/^0/, '')} · CHAPTER {chapter.idx + 1}
              </p>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9', lineHeight: 1.3 }}>
                {chapter.title}
              </h2>
            </div>

            {/* Separator */}
            <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }} />

            {/* Description placeholder */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
                In this exercise, you'll implement the core concepts covered in
                <strong style={{ color: '#e2e8f0' }}> {chapter.title}</strong>.
                Use the code editor on the right to write your solution in C++.
              </p>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
                When you're ready, click the <strong style={{ color: '#22c55e' }}>Run</strong> button
                to compile and see the output in the result panel. The visual preview will
                update to reflect your rendered output.
              </p>

              {/* Hints box */}
              <div style={{
                padding: '14px 16px', borderRadius: 10,
                background: 'rgba(14,165,233,.06)',
                border: '1px solid rgba(14,165,233,.12)',
              }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#0ea5e9', marginBottom: 6, letterSpacing: '.04em' }}>
                  💡 HINTS
                </p>
                <ul style={{ fontSize: 12, color: '#7dd3fc', lineHeight: 1.7, paddingLeft: 16, margin: 0 }}>
                  <li>Start by reading the included headers</li>
                  <li>Use <code style={{ color: '#38bdf8', background: 'rgba(56,189,248,.1)', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>std::cout</code> to print debug output</li>
                  <li>Check the Objectives tab for acceptance criteria</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#475569', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              Learning Objectives
            </p>
            {mod.chapters.map((ch, i) => (
              <div key={ch.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px', borderRadius: 8,
                background: i === chapter.idx ? 'rgba(14,165,233,.08)' : 'transparent',
                border: `1px solid ${i === chapter.idx ? 'rgba(14,165,233,.15)' : 'rgba(255,255,255,.04)'}`,
              }}>
                <span style={{
                  marginTop: 1, width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: i < chapter.idx ? 'rgba(34,197,94,.15)' : `${mod.color}12`,
                  border: `1px solid ${i < chapter.idx ? 'rgba(34,197,94,.3)' : `${mod.color}25`}`,
                }}>
                  {i < chapter.idx ? (
                    <span style={{ color: '#22c55e' }}>{IcoCheck}</span>
                  ) : (
                    <span style={{ fontSize: 9, fontWeight: 800, color: i === chapter.idx ? mod.color : '#475569' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  )}
                </span>
                <span style={{
                  fontSize: 13, lineHeight: 1.5,
                  color: i === chapter.idx ? '#e2e8f0' : i < chapter.idx ? '#64748b' : '#475569',
                  fontWeight: i === chapter.idx ? 600 : 400,
                }}>
                  {ch.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   CENTRE PANEL — Code Editor
   ───────────────────────────────────────────────────────────────── */
function CodePanel({ code, onChange, onRun }) {
  const editorRef = useRef(null);
  const [editorTab, setEditorTab] = React.useState('main.cpp'); // single file for now

  function handleMount(editor, monaco) {
    editorRef.current = editor;

    /* Define a custom dark theme that's close to VS Code's Dark+ */
    monaco.editor.defineTheme('gp-dark', {
      base: 'vs-dark',
      colors: {
        'editor.background':                '#0d0d14',
        'editor.foreground':                '#d4d4d4',
        'editorLineNumber.foreground':      '#3a3a52',
        'editorLineNumber.activeForeground':'#858599',
        'editor.selectionBackground':       '#264f78',
        'editor.lineHighlightBackground':   '#ffffff06',
        'editorCursor.foreground':          '#0ea5e9',
        'editorWidget.background':          '#0d0d14',
        'editorSuggestWidget.background':   '#111118',
        'list.hoverBackground':             '#1a1a28',
        'scrollbarSlider.background':       '#ffffff10',
        'scrollbarSlider.hoverBackground':  '#ffffff18',
      },
      inherit: true,
      rules: [],
    });
    monaco.editor.setTheme('gp-dark');

    /* Focus the editor */
    editor.focus();
  }

  return (
    <div className="ls-f1" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d14' }}>

      {/* Editor toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 12px', height: 42, borderBottom: '1px solid rgba(255,255,255,.06)',
        background: 'rgba(255,255,255,.02)',
      }}>
        {/* File tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <button
            className={`ls-tab active`}
            style={{ fontSize: 12, padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ color: '#0ea5e9' }}>{IcoFile}</span>
            {editorTab}
          </button>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="ls-btn-run" onClick={onRun}>
            {IcoPlay} Run
          </button>
        </div>
      </div>

      {/* Monaco editor */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Editor
          defaultLanguage="cpp"
          defaultValue={code}
          height="100%"
          loading={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#475569', fontSize: 13 }}>
              Loading editor…
            </div>
          }
          onChange={onChange}
          onMount={handleMount}
          options={{
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
            fontLigatures: true,
            fontSize: 14,
            lineHeight: 22,
            minimap: { enabled: false },
            overviewRulerBorder: false,
            padding: { top: 16, bottom: 16 },
            renderLineHighlight: 'gutter',
            scrollBeyondLastLine: false,
            smoothScrolling: true,
          }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   RIGHT PANEL — Result / Output
   ───────────────────────────────────────────────────────────────── */
function ResultPanel({ output, isFullscreen, onToggleFs }) {
  const [tab, setTab] = React.useState('preview');  // preview | console

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d0d14' }}>

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 12px', height: 42, borderBottom: '1px solid rgba(255,255,255,.06)',
        background: 'rgba(255,255,255,.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <button className={`ls-tab${tab === 'preview' ? ' active' : ''}`} onClick={() => setTab('preview')}>Preview</button>
          <button className={`ls-tab${tab === 'console' ? ' active' : ''}`} onClick={() => setTab('console')}>Console</button>
        </div>
        <button className="ls-btn-ghost" onClick={onToggleFs} title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
          {isFullscreen ? IcoShrink : IcoExpand}
        </button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {tab === 'preview' ? (
          /* 16:9 video / render preview area */
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#08080f',
          }}>
            <div style={{
              width: '100%',
              maxWidth: isFullscreen ? '85vw' : '100%',
              aspectRatio: '16 / 9',
              background: 'linear-gradient(135deg, rgba(255,255,255,.02) 0%, rgba(255,255,255,.01) 100%)',
              border: '1px solid rgba(255,255,255,.06)',
              borderRadius: isFullscreen ? 12 : 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Grid pattern */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
              {/* Placeholder content */}
              <div style={{ position: 'relative', textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, margin: '0 auto 12px',
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'rgba(255,255,255,.15)' }}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>Render Preview</p>
                <p style={{ fontSize: 11, color: '#1e293b', marginTop: 4 }}>
                  Run your code to see the output here
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Console output */
          <div className="ls-scroll" style={{
            height: '100%', overflowY: 'auto', padding: '12px 16px',
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            fontSize: 12, lineHeight: 1.8,
          }}>
            {output.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#334155' }}>
                {IcoTerminal}
                <span>Run your code to see output here</span>
              </div>
            ) : (
              output.map((line, i) => (
                <div key={i} style={{
                  color:
                    line.type === 'cmd'     ? '#7dd3fc' :
                    line.type === 'success'  ? '#4ade80' :
                    line.type === 'error'    ? '#f87171' :
                    line.type === 'output'   ? '#e2e8f0' :
                    '#475569',
                  fontWeight: line.type === 'cmd' ? 600 : 400,
                }}>
                  {line.text || '\u00A0'}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="ls-fs-overlay" onClick={(e) => { if (e.target === e.currentTarget) onToggleFs(); }}>
        <div style={{
          width: '90vw', maxWidth: 1200, height: '80vh',
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.08)',
          boxShadow: '0 32px 64px rgba(0,0,0,.5)',
        }}>
          {content}
        </div>
      </div>
    );
  }

  return content;
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────────── */
export default function LessonPage() {
  const navigate = useNavigate();
  const { moduleId } = useParams();

  /* Resolve module + first chapter */
  const mod = CATALOG.find(m => m.id === moduleId) ?? CATALOG[0];
  const chapter = { ...mod.chapters[0], idx: 0 };

  /* Editor state */
  const [code, setCode]             = React.useState(STARTER_CODE);
  const [output, setOutput]         = React.useState([]);
  const [isFullscreen, setFullscreen] = React.useState(false);

  /* Panel layout */
  const { containerRef, leftPct, rightPct, startDragLeft, startDragRight } = usePanelLayout(25, 25);
  const centrePct = 100 - leftPct - rightPct;

  /* Fake "Run" action */
  function handleRun() {
    setOutput([]);
    // Simulate line-by-line output
    FAKE_OUTPUT.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
      }, 200 + i * 300);
    });
  }

  /* ESC to exit fullscreen */
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && isFullscreen) setFullscreen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen]);

  return (
    <div
      className="relative min-h-screen bg-[#0a0a10] text-slate-100 antialiased"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}
    >

      {/* ── Top bar ── */}
      <header style={{
        height: 48, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', gap: 12,
        background: 'rgba(6,6,10,.95)', borderBottom: '1px solid rgba(255,255,255,.06)',
        zIndex: 30,
      }}>
        {/* Left: nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoCompact size={24} href="/" />
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.08)' }} />
          <button className="ls-btn-ghost" onClick={() => navigate(`/module/${mod.id}`)}>
            {IcoBack} Back
          </button>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,.06)' }} />
          <span style={{ fontSize: 12, color: '#475569', fontWeight: 600 }}>
            {mod.title}
          </span>
          <span style={{ fontSize: 11, color: '#334155' }}>›</span>
          <span style={{ fontSize: 12, color: '#94a3b8', fontWeight: 600 }}>
            {chapter.title}
          </span>
        </div>

        {/* Right: status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: '#334155' }}>
            Chapter {chapter.idx + 1} of {mod.chapters.length}
          </span>
          <div style={{
            width: 80, height: 4, borderRadius: 2,
            background: 'rgba(255,255,255,.06)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${((chapter.idx + 1) / mod.chapters.length) * 100}%`,
              height: '100%', borderRadius: 2,
              background: `linear-gradient(90deg, ${mod.color}, #7c3aed)`,
            }} />
          </div>
        </div>
      </header>

      {/* ── Three-panel body ── */}
      <div ref={containerRef} style={{ flex: 1, display: 'flex', minHeight: 0 }}>

        {/* Left panel — Lesson */}
        <div style={{ width: `${leftPct}%`, minWidth: 0, overflow: 'hidden' }}>
          <LessonPanel mod={mod} chapter={chapter} />
        </div>

        {/* Divider 1 */}
        <div className="ls-divider" onMouseDown={startDragLeft} />

        {/* Centre panel — Code editor */}
        <div style={{ width: `${centrePct}%`, minWidth: 0, overflow: 'hidden' }}>
          <CodePanel code={code} onChange={(v) => setCode(v ?? '')} onRun={handleRun} />
        </div>

        {/* Divider 2 */}
        <div className="ls-divider" onMouseDown={startDragRight} />

        {/* Right panel — Result */}
        <div style={{ width: `${rightPct}%`, minWidth: 0, overflow: 'hidden' }}>
          <ResultPanel output={output} isFullscreen={isFullscreen} onToggleFs={() => setFullscreen(f => !f)} />
        </div>

      </div>

      {/* Fullscreen overlay (portal-like, rendered at root level) */}
      {isFullscreen && (
        <ResultPanel output={output} isFullscreen={true} onToggleFs={() => setFullscreen(false)} />
      )}

    </div>
  );
}
