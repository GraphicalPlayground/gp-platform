// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Text, Token } from '@gp/ui/components';
import { WebGLDitherSurface } from './use-dither-background';
import styles from './pipeline-visuals.module.css';

type TokenKind = 'comment' | 'fn' | 'keyword' | 'number' | 'operator' | 'plain' | 'string' | 'type';

interface CodeToken {
  readonly kind?: TokenKind;
  readonly text: string;
}

interface HighlightedLine {
  readonly highlight?: boolean;
  readonly tokens: readonly CodeToken[];
}

const TOKEN_CLASS: Record<TokenKind, string | undefined> = {
  comment: styles.tokComment,
  fn: styles.tokFn,
  keyword: styles.tokKeyword,
  number: styles.tokNumber,
  operator: styles.tokOperator,
  plain: undefined,
  string: styles.tokString,
  type: styles.tokType
};

const HighlightedCode: React.FC<{ readonly lines: readonly HighlightedLine[] }> = ({ lines }) => (
  <pre className={styles.codeBlock}>
    <code>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className={clsx(styles.codeLine, line.highlight && styles.codeLineHighlight)}>
          <span aria-hidden='true' className={styles.codeLineNum}>
            {String(lineIdx + 1).padStart(2, '0')}
          </span>
          <span className={styles.codeLineText}>
            {line.tokens.map((token, tokIdx) => (
              <span key={tokIdx} className={token.kind ? TOKEN_CLASS[token.kind] : undefined}>
                {token.text}
              </span>
            ))}
          </span>
        </span>
      ))}
    </code>
  </pre>
);

type CoordinateSpaceId = 'model' | 'world' | 'view' | 'clip';

interface CoordinateSpaceSpec {
  readonly id: CoordinateSpaceId;
  readonly label: string;
  readonly matrixLabel: string;
  readonly lines: readonly HighlightedLine[];
  readonly svgTransform: string;
  readonly transform: string;
}

const COORDINATE_SPACES: readonly CoordinateSpaceSpec[] = [
  {
    id: 'model',
    label: 'Model',
    matrixLabel: 'localPos = vec4(pos, 1.0)',
    svgTransform: 'translate(0, 0) scale(1)',
    transform: 'Local mesh origin (0, 0, 0)',
    lines: [
      { tokens: [{ kind: 'comment', text: '// 01. Object space' }] },
      {
        highlight: true,
        tokens: [
          { kind: 'type', text: 'vec4 ' },
          { text: 'localPos ' },
          { kind: 'operator', text: '= ' },
          { kind: 'fn', text: 'vec4' },
          { text: '(inPosition, ' },
          { kind: 'number', text: '1.0' },
          { text: ');' }
        ]
      },
      { tokens: [{ kind: 'comment', text: '// Coordinates stay centered on the mesh pivot' }] }
    ]
  },
  {
    id: 'world',
    label: 'World',
    matrixLabel: 'worldPos = modelMatrix * localPos',
    svgTransform: 'translate(14, -6) rotate(12 120 82) scale(0.95)',
    transform: 'Placed in shared 3D scene',
    lines: [
      { tokens: [{ kind: 'comment', text: '// 02. World space transform' }] },
      {
        tokens: [
          { kind: 'type', text: 'mat4 ' },
          { text: 'modelMatrix ' },
          { kind: 'operator', text: '= ' },
          { kind: 'fn', text: 'translate' },
          { text: '(pos) ' },
          { kind: 'operator', text: '* ' },
          { kind: 'fn', text: 'rotateY' },
          { text: '(angle);' }
        ]
      },
      {
        highlight: true,
        tokens: [
          { kind: 'type', text: 'vec4 ' },
          { text: 'worldPos ' },
          { kind: 'operator', text: '= ' },
          { text: 'modelMatrix ' },
          { kind: 'operator', text: '* ' },
          { text: 'localPos;' }
        ]
      }
    ]
  },
  {
    id: 'view',
    label: 'View',
    matrixLabel: 'viewPos = viewMatrix * worldPos',
    svgTransform: 'translate(-12, 4) skewX(-10) scale(0.88)',
    transform: 'Moved relative to camera frustum',
    lines: [
      { tokens: [{ kind: 'comment', text: '// 03. Camera view space' }] },
      {
        highlight: true,
        tokens: [
          { kind: 'type', text: 'vec4 ' },
          { text: 'viewPos ' },
          { kind: 'operator', text: '= ' },
          { kind: 'fn', text: 'lookAt' },
          { text: '(eye, target, up) ' },
          { kind: 'operator', text: '* ' },
          { text: 'worldPos;' }
        ]
      },
      { tokens: [{ kind: 'comment', text: '// Camera sits at origin looking down -Z' }] }
    ]
  },
  {
    id: 'clip',
    label: 'Clip / NDC',
    matrixLabel: 'clipPos = projMatrix * viewPos',
    svgTransform: 'translate(0, 0) skewY(8) scale(0.82, 0.72)',
    transform: 'Projected into [-1, 1] unit cube',
    lines: [
      { tokens: [{ kind: 'comment', text: '// 04. Projection & perspective divide' }] },
      {
        highlight: true,
        tokens: [
          { kind: 'type', text: 'vec4 ' },
          { text: 'clipPos ' },
          { kind: 'operator', text: '= ' },
          { kind: 'fn', text: 'perspective' },
          { text: '(fov, aspect) ' },
          { kind: 'operator', text: '* ' },
          { text: 'viewPos;' }
        ]
      },
      {
        tokens: [
          { kind: 'type', text: 'vec3 ' },
          { text: 'ndcPos ' },
          { kind: 'operator', text: '= ' },
          { text: 'clipPos.xyz ' },
          { kind: 'operator', text: '/ ' },
          { text: 'clipPos.w;' }
        ]
      }
    ]
  }
];

const ENGINE_CODE_LINES: readonly HighlightedLine[] = [
  { tokens: [{ kind: 'comment', text: '// Swappable engine render graph interface' }] },
  {
    tokens: [{ kind: 'keyword', text: 'namespace ' }, { text: 'gp::render {' }]
  },
  {
    tokens: [{ text: '  ' }, { kind: 'keyword', text: 'class ' }, { kind: 'type', text: 'RenderGraph ' }, { text: '{' }]
  },
  {
    highlight: true,
    tokens: [
      { text: '    ' },
      { kind: 'keyword', text: 'auto ' },
      { kind: 'fn', text: 'addPass' },
      { text: '(' },
      { kind: 'type', text: 'PassDesc' },
      { text: '&& passDesc) ' },
      { kind: 'operator', text: '-> ' },
      { kind: 'type', text: 'PassHandle' },
      { text: ';' }
    ]
  },
  {
    tokens: [
      { text: '    ' },
      { kind: 'keyword', text: 'auto ' },
      { kind: 'fn', text: 'compileGraph' },
      { text: '(' },
      { kind: 'type', text: 'RenderDevice' },
      { text: '& device) ' },
      { kind: 'operator', text: '-> ' },
      { kind: 'keyword', text: 'void' },
      { text: ';' }
    ]
  },
  { tokens: [{ text: '  };' }] },
  { tokens: [{ text: '}' }] }
];

const CLOUD_RUNNER_LINES: readonly HighlightedLine[] = [
  {
    tokens: [{ kind: 'operator', text: '$ ' }, { text: 'gp-cli connect ' }, { kind: 'string', text: '--runtime=cloud' }]
  },
  {
    tokens: [{ kind: 'comment', text: '> compiling sceneShader.fx -> mainPass.bin' }]
  },
  {
    highlight: true,
    tokens: [
      { kind: 'operator', text: '> ' },
      { text: 'running ' },
      { kind: 'fn', text: 'renderDevice.drawIndexed' },
      { text: '(' },
      { kind: 'number', text: '1280' },
      { text: ')' }
    ]
  },
  {
    tokens: [
      { kind: 'comment', text: '> streaming rendered frame (' },
      { kind: 'number', text: '8.4ms' },
      { kind: 'comment', text: ')' }
    ]
  }
];

/**
 * @brief WebGL Bayer wave backdrop for RiverBreakoutTabs.
 */
export const DitherBackdrop: React.FC = () => <WebGLDitherSurface dotOpacity={0.5} type='wave' />;

/**
 * @brief Interactive Coordinate Space & Pipeline Visualizer for Tab 1 of the workbench.
 */
export const ShaderLabVisual: React.FC = () => {
  const [spaceId, setSpaceId] = useState<CoordinateSpaceId>('world');
  const activeSpace = COORDINATE_SPACES.find((space) => space.id === spaceId) ?? COORDINATE_SPACES[0]!;

  return (
    <div className={styles.studioFrame}>
      <div className={styles.studioChrome}>
        <span className={styles.studioTitle}>
          <span className={styles.studioAccent}>studio://</span>coordinate-spaces
        </span>
        <span className={styles.studioTitle}>
          <span className={styles.studioLime}>{activeSpace.matrixLabel}</span>
        </span>
      </div>

      <div className={clsx(styles.studioBody, styles.studioBodySplit)}>
        <div className={styles.wireframeBox}>
          <div aria-label='Inspect coordinate space stage' className={styles.spaceButtons} role='group'>
            {COORDINATE_SPACES.map((space) => (
              <button
                key={space.id}
                aria-pressed={space.id === spaceId}
                className={styles.spaceButton}
                type='button'
                onClick={() => setSpaceId(space.id)}
              >
                {space.label}
              </button>
            ))}
          </div>

          <svg
            aria-label={`Wireframe frustum diagram in ${activeSpace.label} space`}
            fill='none'
            role='img'
            viewBox='0 0 240 156'
            width='100%'
          >
            <g transform={activeSpace.svgTransform}>
              <polygon points='72,42 146,42 146,116 72,116' stroke='#0fbf3e' strokeDasharray='3 3' strokeWidth='1.2' />
              <polygon points='94,26 168,26 168,100 94,100' stroke='#5fed83' strokeWidth='1.5' />
              <line stroke='#5fed83' strokeOpacity='0.7' x1='72' x2='94' y1='42' y2='26' />
              <line stroke='#5fed83' strokeOpacity='0.7' x1='146' x2='168' y1='42' y2='26' />
              <line stroke='#5fed83' strokeOpacity='0.7' x1='146' x2='168' y1='116' y2='100' />
              <line stroke='#5fed83' strokeOpacity='0.7' x1='72' x2='94' y1='116' y2='100' />
              <circle cx='120' cy='71' fill='#ecff77' r='3' />
            </g>
            <line stroke='#262c28' x1='16' x2='224' y1='136' y2='136' />
            <text fill='#96a199' fontFamily='monospace' fontSize='9' x='16' y='150'>
              {activeSpace.transform}
            </text>
          </svg>
        </div>

        <div className={styles.codePanel}>
          <HighlightedCode lines={activeSpace.lines} />
          <div className={styles.pillRow}>
            <span className={styles.pill}>4-Stage Pipeline</span>
            <span className={styles.pill}>Live Matrix</span>
            <span className={styles.pill}>Visual First</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @brief Modular C++23 gp-engine hierarchy blueprint for Tab 2.
 */
export const EngineModulesVisual: React.FC = () => (
  <div className={styles.studioFrame}>
    <div className={styles.studioChrome}>
      <span className={styles.studioTitle}>
        <span className={styles.studioAccent}>gp-engine://</span>src/rhi/renderDevice.cpp
      </span>
      <span className={styles.studioTitle}>C++23 · Apache-2.0</span>
    </div>

    <div className={clsx(styles.studioBody, styles.studioBodySplit)}>
      <div className={styles.layerStack}>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>04 · Frame Graph</span>
          <span className={styles.layerMeta}>Pass Scheduling &amp; Sync</span>
        </div>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>03 · Render Abstraction</span>
          <span className={styles.layerMeta}>Desktop Backends</span>
        </div>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>02 · gp::math &amp; Alloc</span>
          <span className={styles.layerMeta}>Vectors · Matrices · Arenas</span>
        </div>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>01 · Platform Layer</span>
          <span className={styles.layerMeta}>Desktop Now · Future Targets Planned</span>
        </div>
      </div>

      <div className={styles.codePanel}>
        <HighlightedCode lines={ENGINE_CODE_LINES} />
        <div className={styles.pillRow}>
          <span className={styles.pill}>Inspectable Modules</span>
          <span className={styles.pill}>Custom Math</span>
          <span className={styles.pill}>Apache-2.0</span>
        </div>
      </div>
    </div>
  </div>
);

/**
 * @brief Cloud GPU & Local Engine Server execution flow visual for Tab 3.
 */
export const CloudSandboxVisual: React.FC = () => (
  <div className={styles.studioFrame}>
    <div className={styles.studioChrome}>
      <span className={styles.studioTitle}>
        <span className={styles.studioAccent}>cloud://</span>gp-sandbox/worker
      </span>
      <span className={styles.studioTitle}>
        <span className={styles.studioLime}>READY · BROWSER SESSION</span>
      </span>
    </div>

    <div className={clsx(styles.studioBody, styles.studioBodySplit)}>
      <div className={styles.layerStack}>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>Browser Workspace</span>
          <span className={styles.layerMeta}>Chromebook · Laptop · Any OS</span>
        </div>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>Cloud Container</span>
          <span className={styles.layerMeta}>Isolated Remote Execution</span>
        </div>
        <div className={clsx(styles.layerRow, styles.layerRowAccent)}>
          <span className={styles.layerName}>Local Engine Server</span>
          <span className={styles.layerMeta}>Run on Your Own Hardware</span>
        </div>
      </div>

      <div className={styles.codePanel}>
        <HighlightedCode lines={CLOUD_RUNNER_LINES} />
        <div className={styles.pillRow}>
          <span className={styles.pill}>Runs in Browser</span>
          <span className={styles.pill}>Identical Curriculum</span>
        </div>
      </div>
    </div>
  </div>
);

/* ---- Distinct Visual Schemas for Band 6 (RiverAccordion) ---- */

const MultiRepoTopologyVisual: React.FC = () => (
  <div className={styles.schemaCard}>
    <div className={styles.schemaHeader}>
      <Text as='span' font='monospace' size='200' weight='medium'>
        Multi-Repo Studio Topology
      </Text>
      <Token variant='outline'>GITHUB ORG · APACHE-2.0</Token>
    </div>

    <div className={styles.repoHubBanner}>
      <div>
        <div className={styles.repoHubTag}>SHARED STANDARDS HUB</div>
        <div className={styles.repoHubTitle}>gp-source-of-truth · Shared conventions</div>
      </div>
      <svg aria-hidden='true' fill='none' height='36' viewBox='0 0 64 36' width='64'>
        <rect height='12' rx='2' stroke='#ecff77' strokeWidth='1.2' width='16' x='24' y='2' />
        <rect height='12' rx='2' stroke='#5fed83' strokeWidth='1.2' width='16' x='2' y='22' />
        <rect height='12' rx='2' stroke='#5fed83' strokeWidth='1.2' width='16' x='46' y='22' />
        <line stroke='#5fed83' strokeOpacity='0.7' x1='24' x2='10' y1='14' y2='22' />
        <line stroke='#5fed83' strokeOpacity='0.7' x1='40' x2='54' y1='14' y2='22' />
      </svg>
    </div>

    <div className={styles.repoGrid}>
      <div className={styles.repoNode}>
        <span className={styles.repoNodeName}>gp-engine</span>
        <span className={styles.repoNodeDesc}>Core C++23 graphics engine and modular renderer subsystems.</span>
      </div>
      <div className={styles.repoNode}>
        <span className={styles.repoNodeName}>gp-platform</span>
        <span className={styles.repoNodeDesc}>Browser learning app, interactive lessons, and documentation.</span>
      </div>
      <div className={styles.repoNode}>
        <span className={styles.repoNodeName}>gp-build-tool</span>
        <span className={styles.repoNodeDesc}>Shared build configuration modules across engine libraries.</span>
      </div>
      <div className={styles.repoNode}>
        <span className={styles.repoNodeName}>gp-actions</span>
        <span className={styles.repoNodeDesc}>Automated CI checks keeping every repository aligned.</span>
      </div>
    </div>
  </div>
);

const CurriculumSignalsVisual: React.FC = () => (
  <div className={styles.schemaCard}>
    <div className={styles.schemaHeader}>
      <Text as='span' font='monospace' size='200' weight='medium'>
        How Lessons Stay Grounded
      </Text>
      <Token variant='outline'>REVIEW &amp; RESEARCH</Token>
    </div>

    <div className={styles.signalGrid}>
      <div className={styles.signalTile}>
        <span className={styles.signalBadge}>INDUSTRY FEEDBACK</span>
        <span className={styles.signalHeading}>Studio reviews sought</span>
        <p className={styles.signalBody}>
          We invite working graphics engineers to review lesson scope so topics reflect real team workflows.
        </p>
      </div>
      <div className={styles.signalTile}>
        <span className={styles.signalBadge}>ACADEMIC GUIDANCE</span>
        <span className={styles.signalHeading}>EPITECH support</span>
        <p className={styles.signalBody}>
          Educational mentors at EPITECH review structure, clarity, and student testing across cohorts.
        </p>
      </div>
      <div className={styles.signalTile}>
        <span className={styles.signalBadge}>FIELD NOTES</span>
        <span className={styles.signalHeading}>Graphics conferences</span>
        <p className={styles.signalBody}>
          Attending talks and industry roundtables keeps newer GPU pipeline topics on our curriculum roadmap.
        </p>
      </div>
      <div className={styles.signalTile}>
        <span className={styles.signalBadge}>CORE READING</span>
        <span className={styles.signalHeading}>Reference books to code</span>
        <p className={styles.signalBody}>
          Chapters from foundational rendering books are translated into small visual demos you can edit.
        </p>
      </div>
    </div>
  </div>
);

const PlatformLayersVisual: React.FC = () => (
  <div className={styles.schemaCard}>
    <div className={styles.schemaHeader}>
      <Text as='span' font='monospace' size='200' weight='medium'>
        Planned Platform Abstraction Layer
      </Text>
      <Token variant='outline'>ARCHITECTURE BOUNDARY</Token>
    </div>

    <div className={styles.palStack}>
      <div className={styles.palBoundary}>
        <span className={styles.palBoundaryLabel}>GP::PLATFORM BOUNDARY</span>
        <span className={styles.palBoundaryDesc}>
          Core math, frame graph, and asset systems talk to explicit interfaces with OS and window hooks kept outside.
        </span>
      </div>

      <div className={styles.palGroup}>
        <span className={styles.palGroupLabel}>RUNNING TODAY</span>
        <div className={styles.palTray}>
          <div className={styles.palSlotLive}>
            <span className={styles.palSlotTitle}>Desktop OS</span>
            <span className={styles.palSlotMeta}>Active target</span>
          </div>
          <div className={styles.palSlotLive}>
            <span className={styles.palSlotTitle}>Cloud Runners</span>
            <span className={styles.palSlotMeta}>Browser streaming</span>
          </div>
        </div>
      </div>

      <div className={styles.palGroup}>
        <span className={styles.palGroupLabel}>PLANNED FOR FUTURE PORTS</span>
        <div className={styles.palTray}>
          <div className={styles.palSlotPlanned}>
            <span className={styles.palSlotTitle}>Mobile</span>
            <span className={styles.palSlotMetaPlanned}>Planned</span>
          </div>
          <div className={styles.palSlotPlanned}>
            <span className={styles.palSlotTitle}>Smart TV</span>
            <span className={styles.palSlotMetaPlanned}>Planned</span>
          </div>
          <div className={styles.palSlotPlanned}>
            <span className={styles.palSlotTitle}>Console Layers</span>
            <span className={styles.palSlotMetaPlanned}>Planned</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectCredentialVisual: React.FC = () => (
  <div className={styles.schemaCard}>
    <div className={styles.schemaHeader}>
      <Text as='span' font='monospace' size='200' weight='medium'>
        Project Credential Flow
      </Text>
      <Token variant='outline'>ARTIFACT VERIFIED</Token>
    </div>

    <div className={styles.certPipeline}>
      <div className={styles.certStep}>
        <span className={styles.certStepNum}>01 · COMPILE</span>
        <span className={styles.certStepName}>Build engine project</span>
      </div>
      <div className={styles.certStep}>
        <span className={styles.certStepNum}>02 · INSPECT</span>
        <span className={styles.certStepName}>Pass rubric review</span>
      </div>
      <div className={styles.certStep}>
        <span className={styles.certStepNum}>03 · PUBLISH</span>
        <span className={styles.certStepName}>Share live demo &amp; code</span>
      </div>
    </div>

    <div className={styles.certSpecimen}>
      <div className={styles.certSpecimenMeta}>
        <span className={styles.certSpecimenTag}>SAMPLE CREDENTIAL // GP-RHI-01</span>
        <span className={styles.certSpecimenTitle}>PBR Deferred Pipeline &amp; Math Library</span>
        <span className={styles.certSpecimenSub}>Verified build · Readable source · Public frame showcase</span>
      </div>
      <span className={styles.certSpecimenBadge}>VERIFIED ARTIFACT</span>
    </div>
  </div>
);

interface BlueprintVisualProps {
  readonly id: 'architecture' | 'curriculum' | 'standards' | 'certification';
}

/**
 * @brief Renders a bespoke visual schema tailored to each RiverAccordion item.
 */
export const StudioBlueprintVisual: React.FC<BlueprintVisualProps> = ({ id }) => {
  switch (id) {
    case 'architecture':
      return <MultiRepoTopologyVisual />;
    case 'curriculum':
      return <CurriculumSignalsVisual />;
    case 'standards':
      return <PlatformLayersVisual />;
    case 'certification':
      return <ProjectCredentialVisual />;
  }
};
