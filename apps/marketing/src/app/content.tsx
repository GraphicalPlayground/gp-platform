// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { FaqEntry } from '@gp/content';

export const jsonLdEntries: FaqEntry[] = [
  // About Graphical Playground
  {
    question: 'What is Graphical Playground?',
    answer:
      'Graphical Playground is an open-source e-learning platform that teaches AAA graphics engineering and engine architecture. It combines gp-engine, a deconstructive C++23 graphics engine made to be read, understood, and rebuilt by anyone, with an interactive online curriculum spanning introductory rendering all the way to production techniques like mesh shaders, variable rate shading, virtualized geometry, and Gaussian splatting. Learners submit their own shaders, scene graphs, and graphics code, compile it, and see visual results in real time through cloud infrastructure or a local engine server.'
  },
  {
    question: 'Why was Graphical Playground created?',
    answer:
      'Two problems keep most people out of graphics engineering. First, experimenting with real-time rendering usually requires expensive dedicated graphics hardware, which prices out a large number of students. Second, nearly every free resource stops at the beginner level, leaving a huge gap between what a self-taught learner knows and what a AAA studio expects. Graphical Playground was created to solve both: it provides cloud-based rendering so you can learn without owning a GPU, and it delivers a structured curriculum that reaches from beginner topics up to production-grade engine architecture.'
  },
  {
    question: 'How does the learning experience work?',
    answer:
      'The platform delivers an interactive, hands-on curriculum. For each concept, learners start with visual diagrams and interactive experiences that show how data moves through a graphics pipeline, what a technique does step by step, and why one approach behaves differently from another. Once the idea clicks visually, learners write and submit their own code (shaders, scene graphs, and other graphics programs), which is compiled and run on our containerized cloud infrastructure or on their local engine server. They get immediate visual feedback, turning theory into practice.'
  },
  {
    question: 'What if I do not own a GPU or a capable graphics card?',
    answer:
      'You do not need one. Graphical Playground provides containerized cloud rendering environments based on the Open Container Initiative. Learners on low-spec hardware, even a Chromebook, can compile, run, and debug high-end Vulkan pipelines through the platform. The heavy computation happens on our infrastructure; you only need a browser. For those who prefer their own machine, we also support running a local engine server while staying connected to the platform, so the learning path stays the same regardless of hardware.'
  },
  {
    question: 'Are there certifications available on Graphical Playground?',
    answer:
      'Yes. We are building a project-based certification system for learners who complete the curriculum and demonstrate real proficiency. Unlike multiple-choice tests, our certifications are tied to concrete projects that show what someone can actually build. Our goal is for game studios and graphics-focused companies to recognize and endorse these certificates, making a Graphical Playground certification real proof of capability when applying for graphics engineering roles.'
  },
  {
    question: 'How much does Graphical Playground cost?',
    answer:
      'The engine and the platform are open source, and the core learning experience is designed to be accessible to everyone. Cloud rendering is available through a subscription for learners who do not own capable hardware. We also provide a way to run a local engine server on your own hardware while staying connected to the platform, ensuring cost never stops someone from learning. Whether you use our cloud or your own GPU, the full curriculum stays the same.'
  },
  {
    question: 'Can I learn graphics programming on a Chromebook or laptop without a dedicated GPU?',
    answer:
      'Yes. That is one of the core design goals of the platform. Our containerized cloud rendering handles all the heavy GPU work on our servers, so you can study advanced Vulkan pipelines, write shaders, and see fully rendered results using nothing more than a web browser. Students on Chromebooks, older laptops, or any device without a discrete graphics card can participate in the full curriculum.'
  },
  // About the Engine
  {
    question: 'What is gp-engine and how does it work?',
    answer:
      "gp-engine is Graphical Playground's core graphics engine, written in modern C++23. It follows a deconstructive philosophy: every module is designed to be readable, understood, and replaceable by anyone. Unlike commercial engines that are powerful but opaque, gp-engine exposes the full process of how a modern engine is put together. It serves three roles: it demonstrates production-quality architecture, it is the reference learners study, and it powers the platform itself by compiling and running code learners submit to generate their visual results."
  },
  {
    question: 'What platforms and graphics APIs does gp-engine support?',
    answer:
      'gp-engine targets modern and legacy graphics backends: DirectX 12, Metal, and Vulkan for current-generation rendering, and OpenGL and DirectX 11 for broader hardware compatibility. It runs across Windows, macOS, Linux, Android, and iOS. This wide platform support is intentional. It teaches learners production-ready, cross-platform architecture that real AAA studios depend on, instead of desktop-only hobbyist patterns.'
  },
  {
    question: 'Does gp-engine support console targets like PlayStation, Xbox, and Nintendo Switch?',
    answer:
      'Yes. gp-engine is built with strict platform abstraction layers from day one, making it possible to target NDA-protected consoles including PlayStation 5, Xbox Series, and Nintendo Switch. Console-specific modules are in private repositories due to NDA requirements, but the abstraction architecture is part of the open-source curriculum. Learners study the same platform abstraction real production engines use for console deployment, a topic very few free educational platforms cover.'
  },
  {
    question: 'What open standards does gp-engine use?',
    answer:
      'gp-engine builds on industry-standard technologies: Vulkan and SPIR-V for rendering and shaders, glTF for 3D asset interchange, and OpenXR for immersive and extended-reality hardware. Teaching with these standards means learners pick up skills that transfer directly into production workflows at studios, rather than habits locked to a single toolchain.'
  },
  {
    question: 'Does gp-engine include its own math library?',
    answer:
      'Yes. We build our mathematics library from the ground up instead of pulling in an existing one. This is a deliberate educational choice: we want learners to understand the math behind graphics (vectors, matrices, quaternions, projections, transformations) rather than treating it as a black box. Building the math library is part of the curriculum, with published technical breakdowns explaining the reasoning behind every design decision.'
  },
  // About Curriculum & Learning Methodology
  {
    question: 'What advanced graphics topics are covered in the curriculum?',
    answer:
      'The curriculum goes well beyond beginner tutorials. It covers production-grade topics including mesh shaders, variable rate shading, virtualized geometry, Gaussian splatting, physically based rendering, real-time ray tracing, and the architectural decisions that hold a modern graphics engine together. These are the same techniques used in AAA game studios, and they are taught with full technical breakdowns, not simplified overviews.'
  },
  {
    question: 'How does the "See the Concept Before the Code" teaching method work?',
    answer:
      'Graphics engineering is hard to learn when concepts stay invisible until the code already works. Our approach flips that: for every concept, we first build interactive experiences and visual diagrams showing what is actually happening, how data flows through a pipeline, what a technique does at each stage, and why approaches differ. Once the idea makes visual sense, writing the code to implement it stops feeling intimidating. These visuals are core teaching material, not supplementary decoration.'
  },
  {
    question: 'What canonical literature and industry books does the curriculum reference?',
    answer:
      'The curriculum is grounded in canonical graphics and engine literature. Our technical library includes GPU Pro (volumes 1 through 7), GPU Zen (volumes 1 through 4), Real-Time Rendering, Physically Based Rendering: From Theory to Implementation, Ray Tracing Gems 1 and 2, Game Engine Architecture (third and fourth editions), Foundations of Game Engine Development, Game Programming Patterns, 3D Game Engine Design, Real-Time Collision Detection, and Game Physics Engine Development. The full recommended reading list is at https://docs.graphical-playground.com/recommended-readings. We also attend conferences like SIGGRAPH to stay close to current research.'
  },
  {
    question: 'Is the curriculum suitable for beginners with no graphics programming experience?',
    answer:
      'Yes. The platform is structured from beginner topics all the way up to advanced graphics engineering. The "See the Concept Before the Code" approach means even complex rendering techniques are introduced visually before any code is required. Beginners can start with foundational concepts and progressively build toward production-level topics. Basic programming knowledge helps, since the engine is written in C++23 and the curriculum involves writing real code, not drag-and-drop exercises.'
  },
  // About Open Source & Community
  {
    question: 'Is Graphical Playground open source?',
    answer:
      'Yes. Both the engine (gp-engine) and the platform (gp-platform) are open source. Our GitHub organization at https://github.com/GraphicalPlayground holds 17 repositories, 14 of them public. These include the engine, the platform monorepo (app, admin, marketing, SEO), a CMake build system (gp-build-system), shared GitHub Actions (gp-actions), an organization-wide source of truth for standards (gp-source-of-truth), and a documentation site (gp-docs). Only the NDA-protected console target modules are in private repositories.'
  },
  {
    question: 'Who is behind the Graphical Playground project?',
    answer:
      'Graphical Playground was created by a team of five people passionate about graphics engineering and open source. The project started as an EPITECH Innovative Project (EIP). The team has worked together for years, building multiple graphics-oriented projects spanning game engines, real-time rendering, multiplayer systems, and low-level emulation. Graphical Playground is where that shared experience turns into something built for other people to learn from.'
  },
  {
    question: 'How does Graphical Playground interact with the games and graphics industry?',
    answer:
      'We actively build relationships with experienced graphics engineers to validate the curriculum against real production standards. We have reached out to senior rendering engineers and technical architects at major AAA game studios and technology companies. Several industry professionals have expressed interest in the project, and we have had in-depth conversations with rendering specialists about making graphics education more accessible. We plan to bring these experts in as curriculum advisors so that what we teach reflects how engines are actually built in industry today.'
  },
  {
    question: 'How is Graphical Playground currently funded and maintained?',
    answer:
      'The project is funded through the personal investment of the founders and through donations. The founding team has invested significant time and money as sweat equity to build the initial engine and platform and to fund the research behind the curriculum. We continue to cover ongoing costs (servers, domains, cloud infrastructure, curriculum development) ourselves. EPITECH supports the project on a non-financial basis through educational feedback, student access, and legal guidance on non-profit structure.'
  },
  {
    question: 'How can I contribute to Graphical Playground or get involved?',
    answer:
      'We encourage contributions. The platform and engine are open source, and a collaborative, transparent environment lets both the engine and the curriculum improve faster while giving contributors real experience. Explore our repositories at https://github.com/GraphicalPlayground, join the community at https://discord.graphical-playground.com, and read the docs at https://docs.graphical-playground.com. Whether you want to contribute code, write curriculum content, report issues, or join discussions, there is a place for you.'
  },
  {
    question: 'How is the engine development process documented?',
    answer:
      "We treat the engine's development as curriculum material. Every meaningful architectural decision is written up as a technical analysis and published on our blog: the directory layout (chosen by studying industry practice), the C++23 language choice, Vulkan as primary graphics backend, memory allocator design, and the math library built from scratch. Advanced topics that are hard to find explained accessibly (mesh shaders, variable rate shading, virtualized geometry, Gaussian splatting) are all taught in the open. Learners see what we built and why we built it that way."
  }
];

export const aboutPlaygroundVisual = [
  {
    question: 'What is Graphical Playground?',
    answer: (
      <>
        Graphical Playground is an <strong>open-source e-learning platform</strong> that teaches AAA graphics
        engineering and engine architecture.
        <br />
        <br />
        It combines <strong>gp-engine</strong>, a deconstructive C++23 graphics engine made to be read, understood, and
        rebuilt by anyone, with an interactive online curriculum spanning introductory rendering all the way to
        production techniques like <strong>mesh shaders</strong>, <strong>variable rate shading</strong>,{' '}
        <strong>virtualized geometry</strong>, and <strong>Gaussian splatting</strong>.
        <br />
        <br />
        Learners submit their own shaders, scene graphs, and graphics code, compile it, and see visual results in real
        time through cloud infrastructure or a local engine server.
      </>
    )
  },
  {
    question: 'Why was Graphical Playground created?',
    answer: (
      <>
        Two problems keep most people out of graphics engineering:
        <br />
        <br />
        <strong>1. Hardware cost.</strong> Experimenting with real-time rendering usually requires expensive dedicated
        graphics hardware, which prices out a large number of students.
        <br />
        <br />
        <strong>2. Knowledge gap.</strong> Nearly every free resource stops at the beginner level, leaving a huge gap
        between what a self-taught learner knows and what a AAA studio expects.
        <br />
        <br />
        Graphical Playground was created to solve both: cloud-based rendering so you can learn without owning a GPU, and
        a structured curriculum that reaches from beginner topics up to production-grade engine architecture.
      </>
    )
  },
  {
    question: 'How does the learning experience work?',
    answer: (
      <>
        The platform delivers an <strong>interactive, hands-on curriculum</strong>. For each concept, learners start
        with visual diagrams and interactive experiences that show how data moves through a graphics pipeline, what a
        technique does step by step, and why one approach behaves differently from another.
        <br />
        <br />
        Once the idea clicks visually, learners write and submit their own code (shaders, scene graphs, and other
        graphics programs), which is compiled and run on our <strong>containerized cloud infrastructure</strong> or on
        their local engine server.
        <br />
        <br />
        They get <strong>immediate visual feedback</strong>, turning theory into practice.
      </>
    )
  },
  {
    question: 'What if I do not own a GPU or a capable graphics card?',
    answer: (
      <>
        You do not need one. Graphical Playground provides <strong>containerized cloud rendering environments</strong>{' '}
        based on the Open Container Initiative.
        <br />
        <br />
        Learners on low-spec hardware, even a <strong>Chromebook</strong>, can compile, run, and debug high-end Vulkan
        pipelines through the platform. The heavy computation happens on our infrastructure; you only need a browser.
        <br />
        <br />
        For those who prefer their own machine, we also support running a <strong>local engine server</strong> while
        staying connected to the platform, so the learning path stays the same regardless of hardware.
      </>
    )
  },
  {
    question: 'Are there certifications available on Graphical Playground?',
    answer: (
      <>
        Yes. We are building a <strong>project-based certification system</strong> for learners who complete the
        curriculum and demonstrate real proficiency.
        <br />
        <br />
        Unlike multiple-choice tests, our certifications are tied to <strong>concrete projects</strong> that show what
        someone can actually build. Our goal is for game studios and graphics-focused companies to recognize and endorse
        these certificates, making a Graphical Playground certification real proof of capability when applying for
        graphics engineering roles.
      </>
    )
  },
  {
    question: 'How much does Graphical Playground cost?',
    answer: (
      <>
        The engine and the platform are <strong>open source</strong>, and the core learning experience is designed to be
        accessible to everyone.
        <br />
        <br />
        Cloud rendering is available through a subscription for learners who do not own capable hardware. We also
        provide a way to run a local engine server on your own hardware while staying connected to the platform,
        ensuring cost never stops someone from learning.
        <br />
        <br />
        Whether you use our cloud or your own GPU, the full curriculum stays the same.
      </>
    )
  },
  {
    question: 'Can I learn graphics programming on a Chromebook or laptop without a dedicated GPU?',
    answer: (
      <>
        Yes, and that is one of the core design goals of the platform. Our containerized cloud rendering handles all the
        heavy GPU work on our servers, so you can study advanced <strong>Vulkan pipelines</strong>, write{' '}
        <strong>shaders</strong>, and see fully rendered results using nothing more than a web browser.
        <br />
        <br />
        Students on Chromebooks, older laptops, or any device without a discrete graphics card can participate in the
        full curriculum.
      </>
    )
  }
];

export const aboutEngineVisual = [
  {
    question: 'What is gp-engine and how does it work?',
    answer: (
      <>
        <strong>gp-engine</strong> is Graphical Playground's core graphics engine, written in modern{' '}
        <strong>C++23</strong>. It follows a deconstructive philosophy: every module is designed to be readable,
        understood, and replaceable by anyone.
        <br />
        <br />
        Unlike commercial engines that are powerful but opaque, gp-engine exposes the full process of how a modern
        engine is put together. It serves three roles:
        <br />
        <br />
        <strong>1.</strong> It demonstrates production-quality architecture.
        <br />
        <strong>2.</strong> It is the reference learners study.
        <br />
        <strong>3.</strong> It powers the platform itself by compiling and running code learners submit to generate
        their visual results.
      </>
    )
  },
  {
    question: 'What platforms and graphics APIs does gp-engine support?',
    answer: (
      <>
        gp-engine targets both modern and legacy graphics backends:
        <br />
        <br />
        <strong>Modern:</strong> DirectX 12, Metal, Vulkan
        <br />
        <strong>Legacy:</strong> OpenGL, DirectX 11
        <br />
        <br />
        It runs across <strong>Windows</strong>, <strong>macOS</strong>, <strong>Linux</strong>,{' '}
        <strong>Android</strong>, and <strong>iOS</strong>. This wide platform support is intentional. It teaches
        learners production-ready, cross-platform architecture that real AAA studios depend on, instead of desktop-only
        hobbyist patterns.
      </>
    )
  },
  {
    question: 'Does gp-engine support console targets like PlayStation, Xbox, and Nintendo Switch?',
    answer: (
      <>
        Yes. gp-engine is built with <strong>strict platform abstraction layers</strong> from day one, making it
        possible to target NDA-protected consoles including <strong>PlayStation 5</strong>, <strong>Xbox Series</strong>
        , and <strong>Nintendo Switch</strong>.
        <br />
        <br />
        Console-specific modules are in private repositories due to NDA requirements, but the abstraction architecture
        is part of the open-source curriculum. Learners study the same platform abstraction real production engines use
        for console deployment, a topic very few free educational platforms cover.
      </>
    )
  },
  {
    question: 'What open standards does gp-engine use?',
    answer: (
      <>
        gp-engine builds on the open standards the rest of the industry depends on:
        <br />
        <br />
        <strong>Vulkan + SPIR-V</strong> for rendering and shaders
        <br />
        <strong>glTF</strong> for 3D asset interchange
        <br />
        <strong>OpenXR</strong> for immersive and extended-reality hardware
        <br />
        <br />
        Teaching with these standards means learners pick up skills that transfer directly into production workflows at
        studios, rather than habits locked to a single closed toolchain.
      </>
    )
  },
  {
    question: 'Does gp-engine include its own math library?',
    answer: (
      <>
        Yes. We build our <strong>mathematics library from the ground up</strong> instead of pulling in an existing one.
        This is a deliberate educational choice: we want learners to understand the math behind graphics (vectors,
        matrices, quaternions, projections, transformations) rather than treating it as a black box.
        <br />
        <br />
        Building the math library is part of the curriculum, with published technical breakdowns explaining the
        reasoning behind every design decision.
      </>
    )
  }
];

export const aboutCurriculumVisual = [
  {
    question: 'What advanced graphics topics are covered in the curriculum?',
    answer: (
      <>
        The curriculum goes well beyond beginner tutorials. It covers production-grade topics including:
        <br />
        <br />
        <strong>Mesh shaders</strong>, <strong>variable rate shading</strong>, <strong>virtualized geometry</strong>,{' '}
        <strong>Gaussian splatting</strong>, <strong>physically based rendering</strong>,{' '}
        <strong>real-time ray tracing</strong>, and the architectural decisions that hold a modern graphics engine
        together.
        <br />
        <br />
        These are the same techniques used in AAA game studios, and they are taught with full technical breakdowns, not
        simplified overviews.
      </>
    )
  },
  {
    question: 'How does the "See the Concept Before the Code" teaching method work?',
    answer: (
      <>
        Graphics engineering is hard to learn when concepts stay invisible until the code already works. Our approach
        flips that.
        <br />
        <br />
        For every concept, we first build <strong>interactive experiences</strong> and <strong>visual diagrams</strong>{' '}
        showing what is actually happening: how data flows through a pipeline, what a technique does at each stage, and
        why approaches differ.
        <br />
        <br />
        Once the idea makes visual sense, writing the code to implement it stops feeling intimidating. These visuals are{' '}
        <strong>core teaching material</strong>, not supplementary decoration.
      </>
    )
  },
  {
    question: 'What canonical literature and industry books does the curriculum reference?',
    answer: (
      <>
        The curriculum is grounded in canonical graphics and engine literature. Our technical library includes:
        <br />
        <br />
        <strong>GPU Pro</strong> (volumes 1 through 7), <strong>GPU Zen</strong> (volumes 1 through 4),{' '}
        <strong>Real-Time Rendering</strong>, <strong>Physically Based Rendering: From Theory to Implementation</strong>
        , <strong>Ray Tracing Gems 1 and 2</strong>, <strong>Game Engine Architecture</strong> (3rd and 4th editions),{' '}
        <strong>Foundations of Game Engine Development</strong>, <strong>Game Programming Patterns</strong>,{' '}
        <strong>3D Game Engine Design</strong>, <strong>Real-Time Collision Detection</strong>, and{' '}
        <strong>Game Physics Engine Development</strong>.
        <br />
        <br />
        The full recommended reading list is at{' '}
        <a href='https://docs.graphical-playground.com/recommended-readings' rel='noopener noreferrer' target='_blank'>
          docs.graphical-playground.com/recommended-readings
        </a>
        . We also attend conferences like <strong>SIGGRAPH</strong> to stay close to current research.
      </>
    )
  },
  {
    question: 'Is the curriculum suitable for beginners with no graphics programming experience?',
    answer: (
      <>
        Yes. The platform is structured from <strong>beginner topics</strong> all the way up to{' '}
        <strong>advanced graphics engineering</strong>. The "See the Concept Before the Code" approach means even
        complex rendering techniques are introduced visually before any code is required.
        <br />
        <br />
        Beginners can start with foundational concepts and progressively build toward production-level topics. Basic
        programming knowledge helps, since the engine is written in C++23 and the curriculum involves writing real code,
        not drag-and-drop exercises.
      </>
    )
  }
];

export const aboutCommunityVisual = [
  {
    question: 'Is Graphical Playground open source?',
    answer: (
      <>
        Yes. Both <strong>gp-engine</strong> and <strong>gp-platform</strong> are open source. Our GitHub organization
        at{' '}
        <a href='https://github.com/GraphicalPlayground' rel='noopener noreferrer' target='_blank'>
          github.com/GraphicalPlayground
        </a>{' '}
        holds <strong>17 repositories</strong>, 14 of them public.
        <br />
        <br />
        These include the engine, the platform monorepo (app, admin, marketing, SEO), a CMake build system (
        <strong>gp-build-system</strong>), shared GitHub Actions (<strong>gp-actions</strong>), an organization-wide
        source of truth for standards (<strong>gp-source-of-truth</strong>), and a documentation site (
        <strong>gp-docs</strong>).
        <br />
        <br />
        Only the NDA-protected console target modules are in private repositories.
      </>
    )
  },
  {
    question: 'Who is behind the Graphical Playground project?',
    answer: (
      <>
        Graphical Playground was created by a <strong>team of five people</strong> passionate about graphics engineering
        and open source. The project started as an <strong>EPITECH Innovative Project (EIP)</strong>.
        <br />
        <br />
        The team has worked together for years, building multiple graphics-oriented projects spanning{' '}
        <strong>game engines</strong>, <strong>real-time rendering</strong>, <strong>multiplayer systems</strong>, and{' '}
        <strong>low-level emulation</strong>.
        <br />
        <br />
        Graphical Playground is where that shared experience turns into something built for other people to learn from.
      </>
    )
  },
  {
    question: 'How does Graphical Playground interact with the games and graphics industry?',
    answer: (
      <>
        We actively build relationships with experienced graphics engineers to validate the curriculum against real
        production standards.
        <br />
        <br />
        We have reached out to <strong>senior rendering engineers</strong> and <strong>technical architects</strong> at
        major AAA game studios and technology companies.
        <br />
        <br />
        Several industry professionals have expressed interest in the project, and we have had in-depth conversations
        with rendering specialists about making graphics education more accessible. We plan to bring these experts in as{' '}
        <strong>curriculum advisors</strong> so that what we teach reflects how engines are actually built in industry
        today.
      </>
    )
  },
  {
    question: 'How is Graphical Playground currently funded and maintained?',
    answer: (
      <>
        The project is funded through the <strong>personal investment of the founders</strong> and through{' '}
        <strong>donations</strong>. The founding team has invested significant time and money as sweat equity to build
        the initial engine and platform and fund the research behind the curriculum. We continue to cover ongoing costs
        (servers, domains, cloud infrastructure, curriculum development) ourselves.
        <br />
        <br />
        <strong>EPITECH</strong> supports the project on a non-financial basis through educational feedback, student
        access, and legal guidance on non-profit structure.
      </>
    )
  },
  {
    question: 'How can I contribute to Graphical Playground or get involved?',
    answer: (
      <>
        We encourage contributions. The platform and engine are open source, and a collaborative, transparent
        environment lets both the engine and the curriculum improve faster while giving contributors real experience.
        <br />
        <br />
        <strong>Explore:</strong>{' '}
        <a href='https://github.com/GraphicalPlayground' rel='noopener noreferrer' target='_blank'>
          github.com/GraphicalPlayground
        </a>
        <br />
        <strong>Join:</strong>{' '}
        <a href='https://discord.graphical-playground.com' rel='noopener noreferrer' target='_blank'>
          discord.graphical-playground.com
        </a>
        <br />
        <strong>Read:</strong>{' '}
        <a href='https://docs.graphical-playground.com' rel='noopener noreferrer' target='_blank'>
          docs.graphical-playground.com
        </a>
        <br />
        <br />
        Whether you want to contribute code, write curriculum content, report issues, or join discussions, there is a
        place for you.
      </>
    )
  },
  {
    question: 'How is the engine development process documented?',
    answer: (
      <>
        We treat the engine's development as curriculum material. Every meaningful architectural decision is written up
        as a <strong>technical analysis</strong> and published on our blog:
        <br />
        <br />
        The directory layout (chosen by studying industry practice), the C++23 language choice, Vulkan as primary
        graphics backend, memory allocator design, and the math library built from scratch.
        <br />
        <br />
        Advanced topics that are hard to find explained accessibly (<strong>mesh shaders</strong>,{' '}
        <strong>variable rate shading</strong>, <strong>virtualized geometry</strong>,{' '}
        <strong>Gaussian splatting</strong>) are all taught in the open. Learners see what we built and <em>why</em> we
        built it that way.
      </>
    )
  }
];
