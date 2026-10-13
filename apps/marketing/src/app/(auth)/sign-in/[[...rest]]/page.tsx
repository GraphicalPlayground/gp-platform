// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { Section } from '@gp/ui/components';

export default function SignInPage() {
  return (
    <Section fullWidth>
      <SignIn waitlistUrl='/waitlist' />
    </Section>
  );
}
