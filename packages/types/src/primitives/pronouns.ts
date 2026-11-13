// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

/**
 * @brief Represents the standard pronouns that can be used to refer to a person.
 */
export type StandardPronouns = 'he/him' | 'she/her' | 'they/them' | 'it/its' | 'ze/zir' | 'any' | 'prefer-not-to-say';

/**
 * @brief Represents the pronouns that can be used to refer to a person, including standard pronouns and custom pronouns.
 */
export type Pronouns = StandardPronouns | (string & {});
