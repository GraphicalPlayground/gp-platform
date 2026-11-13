// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

declare module '*.png' {
  import type { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}
