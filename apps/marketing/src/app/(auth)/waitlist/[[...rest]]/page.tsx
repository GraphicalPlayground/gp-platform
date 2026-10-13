// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Waitlist } from '@clerk/nextjs';
import { Section } from '@gp/ui/components';

export default function WaitlistPage() {
  return (
    <Section fullWidth>
      <Waitlist />
    </Section>
  );
}
