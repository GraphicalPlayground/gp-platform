// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp waitlistUrl='/waitlist' />;
}
