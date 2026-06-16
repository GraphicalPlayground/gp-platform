// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { HeroSection } from './components/sections/hero';
import { CertificationsSection } from './components/sections/certifications';
import { UsageSection } from './components/sections/usage';
import { EditorSection } from './components/sections/editor';

export default function Home() {
  return (
    <>
      <HeroSection />
      <UsageSection />
      <EditorSection />
      <CertificationsSection />
    </>
  );
}
