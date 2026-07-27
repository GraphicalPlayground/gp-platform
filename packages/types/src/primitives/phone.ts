// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import type { Brand } from '../utils/brand';

/* Matches E.164 phone numbers, e.g. "+33612345678" */
const PHONE_NUMBER_PATTERN = /^\+[1-9]\d{6,14}$/;

/**
 * @brief Represents a phone number in E.164 format (e.g. "+33612345678").
 */
export type PhoneNumber = Brand<string, 'PhoneNumber'>;

/**
 * @brief Checks whether the given value is a valid E.164 phone number.
 * @param value - The value to check.
 * @returns Whether the value is a valid PhoneNumber.
 */
export const isPhoneNumber = (value: string): value is PhoneNumber => PHONE_NUMBER_PATTERN.test(value);
