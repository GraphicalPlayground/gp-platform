/** Dependencies */
import React, { JSX } from 'react';

/**
 * @brief Represents a React element type.
 * @description This type is used to define the "as" prop for components, allowing for polymorphic behavior.
 */
export type As<Props = any> = React.ElementType<Props>;

/**
 * @brief Represents the intrinsic elements of the DOM.
 * @description This type is used to extract the keys of the intrinsic elements from JSX.
 */
export type DOMElements = keyof JSX.IntrinsicElements;

/**
 * @brief Represents the capitalized intrinsic elements of the DOM.
 * @description This type is used to extract the keys of the capitalized intrinsic elements from JSX.
 */
export type CapitalizedDOMElements = Capitalize<DOMElements>;

/**
 * @brief Represents a DOM element.
 * @description This interface extends the basic Element and HTMLOrSVGElement interfaces to represent any DOM element.
 */
export interface DOMElement extends Element, HTMLOrSVGElement {}

/**
 * @brief Represents the data attributes of a DOM element.
 * @description This type is used to define the data attributes that can be applied to a DOM element.
 */
type DataAttributes = {
  [dataAttr: string]: any;
};

/**
 * @brief Represents the attributes of a DOM element.
 * @description This type is used to define the attributes that can be applied to a DOM element.
 */
export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

/**
 * @brief Represents the common props that can be omitted from a component.
 * @description This type is used to define the props that can be omitted from a component.
 */
export type OmitCommonProps<Target, OmitAdditionalProps extends keyof any = never> = Omit<
  Target,
  'transition' | 'as' | 'color' | OmitAdditionalProps
>;

/**
 * @brief Represents the props that can be overridden in a component.
 * @description This type is used to define the props that can be overridden in a component.
 */
export type RightJoinProps<SourceProps extends object = {}, OverrideProps extends object = {}> = OmitCommonProps<
  SourceProps,
  keyof OverrideProps
> &
  OverrideProps;

/**
 * @brief Represents the props that can be merged with the "as" prop in a component.
 * @description This type is used to define the props that can be merged with the "as" prop in a component.
 */
export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = (RightJoinProps<ComponentProps, AdditionalProps> | RightJoinProps<AsProps, AdditionalProps>) & {
  as?: AsComponent;
};

/**
 * @brief Represents the internal forward ref render function.
 * @description This type is used to define the internal forward ref render function for a component.
 */
export type InternalForwardRefRenderFunction<
  Component extends As,
  Props extends object = {},
  OmitKeys extends keyof any = never
> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentPropsWithoutRef<Component>,
      Omit<React.ComponentPropsWithoutRef<AsComponent>, OmitKeys>,
      Props,
      AsComponent
    >
  ): React.ReactElement | null;
  readonly $$typeof: symbol;
  defaultProps?: Partial<Props> | undefined;
  propTypes?: Partial<Props> | undefined;
  displayName?: string | undefined;
};
