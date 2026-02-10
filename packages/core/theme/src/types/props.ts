/** Dependencies */
import { As, DOMAttributes } from './dom';
import React from 'react';

/**
 * @brief Represents the props of a component.
 * @description This type is used to extract the props of a component, including the "as" prop.
 */
export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

/**
 * @brief Represents the merge of two types.
 * @description This type is used to merge two types, preserving the properties of the first type.
 */
export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N;

/**
 * @brief Represents the props that can be omitted from a component.
 * @description This type is used to define the props that can be omitted from a component.
 */
export type HTMLNextUIProps<T extends As = 'div', OmitKeys extends keyof any = never> = Omit<
  PropsOf<T>,
  'ref' | 'color' | 'slot' | 'size' | 'defaultChecked' | 'defaultValue' | OmitKeys
> & {
  as?: As;
};

/**
 * @brief Represents the prop getter function.
 * @description This type is used to define the prop getter function for a component.
 */
export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
  props?: Merge<DOMAttributes, P>,
  ref?: React.Ref<any>
) => R & React.RefAttributes<any>;
