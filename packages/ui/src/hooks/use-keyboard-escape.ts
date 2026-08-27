// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';

/**
 * @brief A custom React hook that listens for the Escape key press event and calls the provided handler function.
 * @param handler A callback function that will be called when the Escape key is pressed.
 */
export function useKeyboardEscape(handler: (event: KeyboardEvent) => void) {
  const handleKeyboardEscape = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler(event);
      }
    },
    [handler]
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyboardEscape, false);

    return () => {
      document.removeEventListener('keydown', handleKeyboardEscape, false);
    };
  }, [handleKeyboardEscape]);
}
