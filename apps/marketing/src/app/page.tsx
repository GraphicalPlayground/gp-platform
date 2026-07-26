// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Text } from '@gp/ui/components';

/**
 * @brief Principal home page of the marketing application.
 * @returns A JSX page displaying the home page content.
 */
export default function HomePage() {
  return (
    <div>
      <div>
        <h2>Aligned Text</h2>
        <div className='flex w-100 flex-col border'>
          <Text align='start'>Start aligned text</Text>
          <Text align='center'>Center aligned text</Text>
          <Text align='end'>End aligned text</Text>
        </div>
      </div>
      <div>
        <h2>Font Familly</h2>
        <div className='flex w-100 flex-col border'>
          <Text font='mona-sans'>Mona Sans</Text>
          <Text font='hubot-sans'>Hubot Sans</Text>
          <Text font='monospace'>Monospace</Text>
        </div>
      </div>
    </div>
  );
}
