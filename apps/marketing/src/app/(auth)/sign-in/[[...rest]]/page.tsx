// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn waitlistUrl='/waitlist' />;
}
