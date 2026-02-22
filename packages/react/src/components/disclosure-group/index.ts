import type { ComponentProps } from 'react';

import { DisclosureGroupRoot } from './disclosure-group';

/* -------------------------------------------------------------------------------------------------
 * Compound Component
 * -----------------------------------------------------------------------------------------------*/
export const DisclosureGroup = Object.assign(DisclosureGroupRoot, {
  Root: DisclosureGroupRoot
});

export type DisclosureGroup = {
  Props: ComponentProps<typeof DisclosureGroupRoot>;
  RootProps: ComponentProps<typeof DisclosureGroupRoot>;
};

/* -------------------------------------------------------------------------------------------------
 * Named Component
 * -----------------------------------------------------------------------------------------------*/
export { DisclosureGroupRoot };

export type { DisclosureGroupRootProps, DisclosureGroupRootProps as DisclosureGroupProps } from './disclosure-group';

/* -------------------------------------------------------------------------------------------------
 * Variants
 * -----------------------------------------------------------------------------------------------*/
export { disclosureGroupVariants } from '@gp/styles';

export type { DisclosureGroupVariants } from '@gp/styles';

/* -------------------------------------------------------------------------------------------------
 * Hooks
 * -----------------------------------------------------------------------------------------------*/
export { useDisclosureGroupNavigation } from './use-disclosure-group-navigation';

export type {
  UseDisclosureGroupNavigationProps,
  UseDisclosureGroupNavigationReturn
} from './use-disclosure-group-navigation';
