// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import { Accordion } from '@gp/react';
import type React from 'react';
import { Link } from '@/components/link';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export const FAQSection = () => {
  const faqItems: FAQItem[] = [
    {
      question: 'What is Graphical Playground?',
      answer: (
        <>
          <p>
            Graphical Playground (GP) is an open-source, cross-platform game engine and educational platform built in
            C++23. Born as an{' '}
            <Link
              className='text-inherit font-thin underline'
              style={{ fontSize: 'inherit' }}
              href='https://www.epitech.eu/innovative-projects/'
              target='_blank'
              rel='noopener noreferrer'
            >
              EPITECH Innovative Project (EIP)
            </Link>{' '}
            in Lyon, France, GP combines a high-performance native engine with a cloud-native e-learning platform, so
            you can learn modern game engine architecture while reading the actual source code that powers it.
          </p>
          <p>
            Whether you are a student stepping into systems programming for the first time or an experienced engineer
            who wants to study real-world engine design, GP gives you both the tooling and the curriculum in one place.
          </p>
        </>
      )
    },
    {
      question: 'Which platforms does the engine target?',
      answer: (
        <>
          <p>The GP engine is designed from the ground up to be truly cross-platform. Current targets include:</p>
          <ul>
            <li>
              <strong>Desktop:</strong> Windows, Linux, macOS
            </li>
            <li>
              <strong>Mobile:</strong> iOS, Android
            </li>
          </ul>
          <p>
            A single codebase compiles to all of these without platform-specific forks. The build system is driven by{' '}
            <strong>GPBT</strong> (Graphical Playground Build Tool), our CMake wrapper that manages compiler flags,
            configurations, and third-party dependencies consistently across every target.
          </p>
        </>
      )
    },
    {
      question: 'What makes GP different from other game engines?',
      answer: (
        <>
          <p>
            Most game engines are black boxes, you use them, but you do not learn from them. GP is designed with full
            transparency as a first principle:
          </p>
          <ul>
            <li>
              <strong>No RTTI, no exceptions:</strong> The engine follows a strict low-level philosophy with custom
              allocators, typed error codes, and a rich error-reporting system, the same constraints you would find in
              AAA studios.
            </li>
            <li>
              <strong>Modern C++23 throughout:</strong> Every system, smart pointers, containers, hashing, memory
              management, is handcrafted in idiomatic C++23, serving as living reference implementations you can read,
              fork, and learn from.
            </li>
            <li>
              <strong>Education-first:</strong> Architecture decisions are documented in detail on the e-learning
              platform, so you understand not just <em>what</em> the code does, but <em>why</em> it was designed that
              way.
            </li>
          </ul>
        </>
      )
    },
    {
      question: 'What will I learn on the platform?',
      answer: (
        <>
          <p>
            The GP learning platform covers game engine architecture from first principles to production-grade systems.
            Topics include:
          </p>
          <ul>
            <li>
              <strong>Memory management</strong>: aligned allocation, custom allocators, smart pointer internals
            </li>
            <li>
              <strong>Error handling systems</strong>: severity tiers, typed domains, RAII breadcrumb scopes, crash
              reporting
            </li>
            <li>
              <strong>Rendering pipelines</strong>: GPU-driven culling, virtualized geometry (Nanite-style meshlet
              DAGs), visibility buffers
            </li>
            <li>
              <strong>Build systems</strong>: CMake, cross-compilation, CI/CD for multi-platform C++ projects
            </li>
            <li>
              <strong>Data structures</strong>: SSO strings, vectors, hash maps, all implemented without the STL
            </li>
          </ul>
          <p>
            Courses are tightly coupled to the engine's actual source code, so theory and practice always stay in sync
            as the engine evolves.
          </p>
        </>
      )
    },
    {
      question: 'Is Graphical Playground really open source?',
      answer: (
        <>
          <p>
            Yes. The engine and its associated tooling are fully open source. You can browse the source, file issues,
            submit pull requests, and fork the project freely. We believe that transparency is the only credible
            foundation for an educational platform, you cannot teach engine architecture from a closed codebase.
          </p>
          <p>
            The project follows a <strong>contributor-friendly</strong> workflow with documented coding conventions,
            automated CI across all platforms, and thorough code-review guidelines so that first-time contributors can
            get up to speed quickly.
          </p>
        </>
      )
    },
    {
      question: 'What prior knowledge do I need to get started?',
      answer: (
        <p>
          Comfort with at least one compiled language (C, C++, Rust, or similar) is recommended, as the curriculum dives
          into low-level systems topics early. That said, the platform is structured so that complete beginners in game
          engine programming can follow along, we start from memory layout and work our way up to rendering pipelines,
          with each concept building on the last. If you are brand-new to C++, we suggest completing a basic C++ course
          first, then returning to GP for the engine-specific material.
        </p>
      )
    },
    {
      question: 'How much does Graphical Playground cost?',
      answer: (
        <>
          <p>
            Graphical Playground is built on an open, sustainable model, most of what we offer is free by design, and we
            rely on the community to keep it that way.
          </p>
          <ul>
            <li>
              <strong>Engine:</strong> Free forever. The GP engine is open source under our{' '}
              <Link
                className='text-inherit font-thin underline'
                style={{ fontSize: 'inherit' }}
                href='/licensing'
                rel='noopener noreferrer'
              >
                license & EULA
              </Link>
              . Use it for personal projects, commercial games, research, no hidden fees.
            </li>
            <li>
              <strong>Curriculum:</strong> Free. Every learning module, course, and piece of documentation on the
              platform is openly accessible. Knowledge should not have a paywall.
            </li>
            <li>
              <strong>Cloud computing:</strong> Paid. Running workloads on GP's cloud infrastructure (builds,
              simulations, hosted projects) is billed based on usage. You only pay for what you consume.
            </li>
            <li>
              <strong>Certifications:</strong> Paid. If you want an official GP certification to validate your skills,
              for a portfolio, a job application, or a studio requirement, a one-time fee covers the examination and the
              credential.
            </li>
          </ul>
          <p>
            We are an independent, community-driven project. If GP has helped you, consider{' '}
            <Link
              className='text-inherit font-thin underline'
              style={{ fontSize: 'inherit' }}
              href='/donate'
              rel='noopener noreferrer'
            >
              making a donation
            </Link>{' '}
            , it directly funds development, infrastructure, and the people who keep the lights on. Every contribution,
            large or small, makes a real difference.
          </p>
        </>
      )
    },
    {
      question: 'How can I contribute or get involved?',
      answer: (
        <>
          <p>There are several ways to become part of the GP community:</p>
          <ul>
            <li>
              <strong>Code contributions:</strong> Check the open issues on GitHub and pick something that matches your
              skill level. All contributions go through code review and must meet the project's coding standards.
            </li>
            <li>
              <strong>Documentation & curriculum:</strong> Writing is engineering. If you have strong technical
              communication skills, help us expand the learning modules or improve the API docs.
            </li>
            <li>
              <strong>Community:</strong> Join our{' '}
              <a href='/discord' target='_blank' rel='noopener noreferrer'>
                Discord server
              </a>{' '}
              to ask questions, share projects built with GP, or discuss engine architecture with the core team.
            </li>
            <li>
              <strong>Bug reports & feedback:</strong> Even filing a well-described bug report is a meaningful
              contribution. Use the GitHub issue tracker and follow the template.
            </li>
          </ul>
        </>
      )
    }
  ];

  return (
    <section className='bg-white w-full py-[6vh] px-[4vw] flex flex-col gap-6 md:gap-y-[4vh]'>
      <h2 className='text-[min(72px,max(0.5px,0.0375*var(--scaling-factor)))]'>GPlayd FAQ</h2>
      <Accordion className='w-full border-b border-black rounded-none' variant='surface'>
        {faqItems.map((item, index) => (
          <Accordion.Item key={index}>
            <Accordion.Heading>
              <Accordion.Trigger className='border-t border-black py-8 rounded-none'>
                <span className='text-[max(18px,max(0.5px,0.0166667*var(--scaling-factor)))] font-normal'>
                  {item.question}
                </span>
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body className='text-[max(14px,max(0.5px,0.009375*var(--scaling-factor)))] text-black font-light flex flex-col gap-4 xl:gap-6'>
                {item.answer}
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};
