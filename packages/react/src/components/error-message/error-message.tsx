'use client';

import type { ErrorMessageVariants } from '@gp/styles';
import type { ComponentPropsWithRef } from 'react';
import type { TextProps } from 'react-aria-components/Text';

import { errorMessageVariants } from '@gp/styles';
import { Text } from 'react-aria-components/Text';

/* -------------------------------------------------------------------------------------------------
 * Error Message Root
 * -----------------------------------------------------------------------------------------------*/
interface ErrorMessageRootProps extends ComponentPropsWithRef<typeof Text>, TextProps, ErrorMessageVariants {}

const ErrorMessageRoot = ({ children, className, ...rest }: ErrorMessageRootProps) => {
  return (
    <Text className={errorMessageVariants({ className })} data-slot='error-message' slot='errorMessage' {...rest}>
      {children}
    </Text>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export { ErrorMessageRoot };

export type { ErrorMessageRootProps };
