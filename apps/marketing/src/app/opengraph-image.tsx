// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import { renderOgImage, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from '@gp/seo/metadata/opengraph-image';
import { Constants } from '@gp/seo/utils';

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;
export const alt = Constants.name;

/**
 * @brief Default Open Graph image for any marketing page that doesn't provide a more specific one.
 */
export default function Image() {
  return renderOgImage({ title: Constants.name, subtitle: Constants.description });
}
