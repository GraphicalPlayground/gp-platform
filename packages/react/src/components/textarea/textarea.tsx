'use client';

import type { TextAreaVariants } from '@gp/styles';
import type { ComponentPropsWithRef } from 'react';

import { textAreaVariants } from '@gp/styles';
import React, { useContext } from 'react';
import { TextArea as TextAreaPrimitive } from 'react-aria-components';

import { composeTwRenderProps } from '../../utils';
import { TextFieldContext } from '../text-field';

/* -------------------------------------------------------------------------------------------------
 * TextArea Root
 * -----------------------------------------------------------------------------------------------*/
interface TextAreaRootProps extends ComponentPropsWithRef<typeof TextAreaPrimitive>, TextAreaVariants {}

const TextAreaRoot = ({ className, fullWidth, variant, ...rest }: TextAreaRootProps) => {
  const textFieldContext = useContext(TextFieldContext);
  const resolvedVariant = variant ?? textFieldContext?.variant;

  return (
    <TextAreaPrimitive
      className={composeTwRenderProps(className, textAreaVariants({ fullWidth, variant: resolvedVariant }))}
      data-slot='textarea'
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export { TextAreaRoot };

export type { TextAreaRootProps };
