#!/bin/bash
# Copyright (c) - Graphical Playground. All rights reserved.
# For more information, see https://graphical-playground/legal
# mailto:support AT graphical-playground DOT com

# Install pnpm if not installed
if ! command -v pnpm &> /dev/null
then
  echo "pnpm could not be found, installing..."
  npm install -g pnpm
fi

# Install dependencies
pnpm install

# Build
pnpm run build

# Playwright
pnpx playwright install --with-deps
