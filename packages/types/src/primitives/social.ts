// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief The social media platforms supported out of the box by the Graphical Playground platform.
 */
export type StandardSocialPlatform =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'pinterest'
  | 'snapchat'
  | 'reddit'
  | 'tumblr'
  | 'github'
  | 'dribbble'
  | 'behance'
  | 'medium'
  | 'vimeo'
  | 'flickr'
  | 'soundcloud'
  | 'discord'
  | 'telegram'
  | 'whatsapp'
  | 'threads'
  | 'mastodon'
  | 'bluesky';

/**
 * @brief Represents a social media platform, including standard platforms and any custom platform.
 */
export type SocialPlatform = StandardSocialPlatform | (string & {});
