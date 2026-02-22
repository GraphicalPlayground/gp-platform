'use client';

import type { SwitchGroupVariants } from '@gp/styles';
import type { ComponentPropsWithRef } from 'react';

import { switchGroupVariants } from '@gp/styles';
import React from 'react';

/* -------------------------------------------------------------------------------------------------
 * Switch Group Root
 * -----------------------------------------------------------------------------------------------*/
interface SwitchGroupRootProps extends ComponentPropsWithRef<'div'>, SwitchGroupVariants {}

const SwitchGroupRoot = ({ children, className, orientation, ...props }: SwitchGroupRootProps) => {
  const slots = React.useMemo(() => switchGroupVariants({ orientation }), [orientation]);

  return (
    <div data-slot='switch-group' {...props} className={slots.base({ className })}>
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export { SwitchGroupRoot };

export type { SwitchGroupRootProps };
