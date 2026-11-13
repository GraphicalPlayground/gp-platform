// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

export const colors = [
  'default',
  'blue',
  'coral',
  'green',
  'gray',
  'indigo',
  'lemon',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow'
] as const;

export const biColorGradients = ['blue-purple', 'green-blue', 'pink-blue', 'purple-red', 'red-orange'] as const;
export const triColorGradients = ['green-blue-purple'] as const;

export const baseSizeScale = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 60, 64, 80, 88, 96, 112, 128] as const;
export type BaseSizeScale = (typeof baseSizeScale)[number];
