// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import { Avatar, Stack, Text } from '@gp/ui/components';
import type { Author } from '@gp/content';
import { Persons } from '@gp/constants';
import type { Url } from '@gp/types';

export interface ProfileCardProps {
  author: Exclude<Author, string[]>;
}

/**
 * @brief A component that displays a profile card for an author.
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({ author }) => {
  const personInfo = React.useMemo(() => {
    if (typeof author !== 'string') {
      return author;
    }

    const person = Object.values(Persons).find((p) => p.slug() === author);

    if (!person) {
      return undefined;
    }

    return {
      name: person.fullName,
      slug: author,
      url: person.url,
      socialLinks: Object.entries(person.socials)
        .filter((entry): entry is [string, Url] => entry[1] !== undefined)
        .map(([platform, url]) => ({ platform, url })),
      avatarUrl: person.avatarUrl,
      bio: person.position
    };
  }, [author]);

  if (!personInfo) {
    return null;
  }

  return (
    <Stack direction='horizontal' padding='none'>
      <Stack gap={4} padding='none'>
        {personInfo.avatarUrl ? <Avatar alt={personInfo.name} size={48} src={personInfo.avatarUrl} /> : null}
        <Text size='100'>{personInfo.name}</Text>
        {personInfo.bio ? (
          <Text size='100' variant='muted'>
            {personInfo.bio}
          </Text>
        ) : null}
      </Stack>
    </Stack>
  );
};
