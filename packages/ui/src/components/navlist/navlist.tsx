// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React from 'react';
import clsx from 'clsx';
import styles from './navlist.module.css';

import { TriangleDownIcon } from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';
import type { BaseProps } from '../helper';

/**
 * @brief Navlist component props interface.
 * @see Navlist
 */
export type NavListRootProps = {
  /**
   * Accessible label for the navigation landmark.
   */
  'aria-label': string;
  /**
   * ID of an element that labels the navigation landmark.
   */
  'aria-labelledby'?: string;
  'children': React.ReactNode;
} & BaseProps<HTMLElement> &
  Omit<React.HTMLAttributes<HTMLElement>, 'aria-label' | 'aria-labelledby'>;

type NavListLevel = 1 | 2 | 3 | 4 | 5;

const MaxNavListLevel = 5;
const NavListLevelContext = React.createContext<NavListLevel>(1);
const NavListSubNavContext = React.createContext<{
  expanded: boolean;
  labelledBy?: string;
  level: NavListLevel;
}>({
  expanded: true,
  level: 2
});

export const NavListRoot = React.forwardRef<HTMLElement, NavListRootProps>(
  ({ 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, children, className, ...rest }, ref) => {
    const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);
    const hasTopLevelSubNav = React.useMemo(() => childrenArray.some(childHasDirectSubNav), [childrenArray]);
    const hasTopLevelGroup = React.useMemo(() => childrenArray.some(childIsNavListGroupElement), [childrenArray]);
    const rootLevel = hasTopLevelSubNav ? 1 : 2;
    const hasFlatRootList = !hasTopLevelSubNav && !hasTopLevelGroup;

    return (
      <nav
        ref={ref}
        className={clsx(styles.navlist, className)}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        {...rest}
      >
        <NavListLevelContext.Provider value={rootLevel}>
          <ul className={clsx(styles.navlist__list, hasFlatRootList && styles['navlist__list--flat'])}>{children}</ul>
        </NavListLevelContext.Provider>
      </nav>
    );
  }
);

type Visual = React.ReactElement | React.ElementType | Icon;
type NavListItemAs = 'a' | 'button';

type NavListItemBaseProps = {
  /**
   * @brief Leading visual rendered before the item label.
   */
  leadingVisual?: Visual;

  /**
   * @brief Trailing visual rendered after the item label.
   */
  trailingVisual?: Visual;

  /**
   * @brief Whether nested items should be expanded by default.
   */
  defaultExpanded?: boolean;

  /**
   * @brief Controls the nested item expanded state.
   */
  expanded?: boolean;

  /**
   * @brief Called when a nested item is expanded or collapsed.
   */
  onExpandedChange?: (expanded: boolean) => void;

  /**
   * @brief Marks the item as disabled. Disabled link items receive `aria-disabled`.
   */
  disabled?: boolean;
};

export type NavListItemProps<C extends NavListItemAs = 'a'> = {
  as?: C;
} & NavListItemBaseProps &
  React.PropsWithChildren<BaseProps<HTMLElement>> &
  Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof NavListItemBaseProps | keyof BaseProps<HTMLElement> | 'as' | 'children'
  >;

type NavListSubNavElement = React.ReactElement<NavListSubNavProps>;

export const NavListItem = React.forwardRef<HTMLElement, NavListItemProps<NavListItemAs>>(
  (
    {
      'aria-current': ariaCurrent,
      as,
      children,
      className,
      defaultExpanded = false,
      disabled = false,
      expanded,
      leadingVisual,
      onClick,
      onExpandedChange,
      trailingVisual,
      ...rest
    },
    ref
  ) => {
    const Component = (as || 'a') as React.ElementType;
    const level = React.useContext(NavListLevelContext);
    const subNavId = React.useId();
    const accordionButtonId = React.useId();
    const childrenArray = React.useMemo(() => React.Children.toArray(children), [children]);
    const subNavChildren = React.useMemo(() => childrenArray.filter(isNavListSubNavElement), [childrenArray]);
    const subNav = React.useMemo(() => childrenArray.find(isNavListSubNavElement), [childrenArray]);
    const navListGroupChildren = React.useMemo(
      () => childrenArray.filter(childHasNavListGroupElement),
      [childrenArray]
    );
    const labelChildren = React.useMemo(
      () => (subNav ? childrenArray.filter((child) => child !== subNav) : childrenArray),
      [childrenArray, subNav]
    );
    const hasLabelContent = labelChildren.length > 0;
    const hasSubNav = Boolean(subNav);
    const canExpand = level < MaxNavListLevel;
    const isLeafItem = !hasSubNav;
    const controlledSubNavId = subNav?.props.id ?? subNavId;
    const hasCurrentSubNavItem = React.useMemo(
      () => hasCurrentDescendant(subNav?.props.children),
      [subNav?.props.children]
    );
    const isControlled = expanded !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState(defaultExpanded || hasCurrentSubNavItem);
    const isExpanded = Boolean(isControlled ? expanded : uncontrolledExpanded);
    const {
      href,
      id: accordionButtonIdProp,
      ...accordionButtonProps
    } = rest as React.ButtonHTMLAttributes<HTMLButtonElement> & {
      href?: string;
    };
    const controlledAccordionButtonId = accordionButtonIdProp ?? accordionButtonId;
    const itemOnClick = onClick as React.MouseEventHandler<HTMLElement> | undefined;
    const invalidMessage = React.useMemo(() => {
      if (navListGroupChildren.length > 0) {
        return 'NavList.Item: NavList.Group is not supported as a child. Use NavList.SubNav for nested disclosure. NavList.Item will not be rendered.';
      }

      if (hasSubNav && !canExpand) {
        return 'NavList.Item: NavList supports up to 5 levels. Level 5 items cannot contain NavList.SubNav. NavList.Item will not be rendered.';
      }

      if (subNavChildren.length > 1) {
        return 'NavList.Item: Only one NavList.SubNav child is supported. NavList.Item will not be rendered.';
      }

      if (hasSubNav && !hasLabelContent) {
        return 'NavList.Item: A label is required when using NavList.SubNav. NavList.Item will not be rendered.';
      }

      if (hasSubNav && (href !== undefined || as !== undefined)) {
        return 'NavList.Item: `href` and `as` are not supported when using NavList.SubNav because expandable items render as buttons. NavList.Item will not be rendered.';
      }
    }, [as, canExpand, hasLabelContent, hasSubNav, href, navListGroupChildren.length, subNavChildren.length]);

    React.useEffect(() => {
      if (hasCurrentSubNavItem && !isControlled) {
        setUncontrolledExpanded(true);
      }
    }, [hasCurrentSubNavItem, isControlled]);

    const setExpanded = React.useCallback(
      (value: boolean) => {
        if (!isControlled) {
          setUncontrolledExpanded(value);
        }
        onExpandedChange?.(value);
      },
      [isControlled, onExpandedChange]
    );

    const toggleExpanded = React.useCallback(() => {
      setExpanded(!isExpanded);
    }, [isExpanded, setExpanded]);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        itemOnClick?.(event);
      },
      [disabled, itemOnClick]
    );

    const setAccordionButtonRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        assignRef(ref, node);
      },
      [ref]
    );

    const handleAccordionClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        itemOnClick?.(event);

        if (!event.defaultPrevented) {
          toggleExpanded();
        }
      },
      [disabled, itemOnClick, toggleExpanded]
    );

    if (invalidMessage) {
      warnNavListValidation(invalidMessage);

      return null;
    }

    const labelArea = (
      <span className={styles['navlist__label-area']}>
        {renderVisual(leadingVisual, styles['navlist__leading-visual'])}
        <span className={styles.navlist__label}>{labelChildren}</span>
        {renderVisual(trailingVisual, styles['navlist__trailing-visual'])}
      </span>
    );

    return (
      <li
        className={clsx(
          styles.navlist__item,
          styles[`navlist__item--level-${level}` as keyof typeof styles],
          isLeafItem && styles['navlist__item--leaf'],
          hasSubNav && isExpanded && styles['navlist__item--expanded'],
          hasCurrentSubNavItem && styles['navlist__item--has-current-descendant']
        )}
      >
        <div className={styles['navlist__item-content']}>
          {hasSubNav && canExpand ? (
            <button
              ref={setAccordionButtonRef}
              id={controlledAccordionButtonId}
              type='button'
              className={clsx(
                styles.navlist__link,
                styles['navlist__accordion-button'],
                disabled && styles['navlist__link--disabled'],
                className
              )}
              aria-expanded={isExpanded ? 'true' : 'false'}
              aria-controls={controlledSubNavId}
              {...accordionButtonProps}
              disabled={disabled}
              onClick={handleAccordionClick}
            >
              <TriangleDownIcon className={styles['navlist__toggle-icon']} aria-hidden='true' />
              {labelArea}
            </button>
          ) : (
            <Component
              ref={ref}
              className={clsx(styles.navlist__link, disabled && styles['navlist__link--disabled'], className)}
              aria-current={ariaCurrent}
              aria-disabled={disabled || undefined}
              onClick={handleClick}
              {...rest}
            >
              {labelArea}
            </Component>
          )}
        </div>

        {subNav ? (
          <NavListSubNavContext.Provider
            value={{
              expanded: isExpanded,
              labelledBy: controlledAccordionButtonId,
              level: (level + 1) as NavListLevel
            }}
          >
            {React.cloneElement(subNav, {
              id: controlledSubNavId
            })}
          </NavListSubNavContext.Provider>
        ) : null}
      </li>
    );
  }
) as <C extends NavListItemAs = 'a'>(
  props: NavListItemProps<C> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;

export type NavListSubNavProps = {
  children: React.ReactNode;
} & BaseProps<HTMLUListElement> &
  React.HTMLAttributes<HTMLUListElement>;

export const NavListSubNav = React.forwardRef<HTMLUListElement, NavListSubNavProps>(
  ({ 'aria-labelledby': ariaLabelledBy, children, className, ...rest }, ref) => {
    const { expanded, labelledBy, level } = React.useContext(NavListSubNavContext);
    const subNavRef = React.useRef<HTMLUListElement | null>(null);

    const setSubNavHeight = React.useCallback((subNav: HTMLUListElement) => {
      subNav.style.setProperty('--gp-navlist-sub-nav-height', `${subNav.scrollHeight}px`);
    }, []);

    const setSubNavAndAncestorHeights = React.useCallback(() => {
      let subNav = subNavRef.current;

      while (subNav) {
        setSubNavHeight(subNav);
        subNav = subNav.parentElement?.closest<HTMLUListElement>(`.${styles['navlist__sub-nav']}`) ?? null;
      }
    }, [setSubNavHeight]);

    const setSubNavRef = React.useCallback(
      (node: HTMLUListElement | null) => {
        subNavRef.current = node;
        assignRef(ref, node);
      },
      [ref]
    );

    React.useEffect(() => {
      setSubNavAndAncestorHeights();
    }, [children, expanded, setSubNavAndAncestorHeights]);

    React.useEffect(() => {
      subNavRef.current?.toggleAttribute('inert', !expanded);
    }, [expanded]);

    React.useEffect(() => {
      const subNav = subNavRef.current;

      if (!subNav || typeof ResizeObserver === 'undefined') {
        return;
      }

      const resizeObserver = new ResizeObserver(setSubNavAndAncestorHeights);

      resizeObserver.observe(subNav);

      return () => {
        resizeObserver.disconnect();
      };
    }, [setSubNavAndAncestorHeights]);

    return (
      <ul
        ref={setSubNavRef}
        className={clsx(styles['navlist__sub-nav'], expanded && styles['navlist__sub-nav--expanded'], className)}
        aria-labelledby={ariaLabelledBy ?? labelledBy}
        {...rest}
        aria-hidden={expanded ? undefined : 'true'}
      >
        <NavListLevelContext.Provider value={level}>{children}</NavListLevelContext.Provider>
      </ul>
    );
  }
);

export type NavListGroupProps = {
  /**
   * @brief Heading text for the group.
   */
  title?: React.ReactNode;
  children: React.ReactNode;
} & BaseProps<HTMLLIElement> &
  Omit<React.LiHTMLAttributes<HTMLLIElement>, 'title'>;

export const NavListGroup = React.forwardRef<HTMLLIElement, NavListGroupProps>(
  ({ children, className, title, ...rest }, ref) => {
    const titleId = React.useId();
    const validChildren = React.useMemo(() => {
      const getValidChildren = (childrenToValidate: React.ReactNode): React.ReactNode[] =>
        React.Children.toArray(childrenToValidate).flatMap((child) => {
          if (isNavListItemElement(child)) {
            return [child];
          }

          if (React.isValidElement(child) && child.type === React.Fragment) {
            return getValidChildren((child as ElementWithChildren).props.children);
          }

          return [];
        });

      return getValidChildren(children);
    }, [children]);
    const hasInvalidChild = React.useMemo(() => {
      const containsInvalidChild = (childrenToValidate: React.ReactNode): boolean =>
        React.Children.toArray(childrenToValidate).some((child) => {
          if (isNavListItemElement(child)) {
            return false;
          }

          if (React.isValidElement(child) && child.type === React.Fragment) {
            return containsInvalidChild((child as ElementWithChildren).props.children);
          }

          return true;
        });

      return containsInvalidChild(children);
    }, [children]);

    if (hasInvalidChild) {
      warnNavListValidation(
        'NavList.Group: Only NavList.Item children are supported. Invalid children will not be rendered. Use NavList.SubNav as a child of NavList.Item for nested disclosure.'
      );
    }

    return (
      <li ref={ref} className={clsx(styles.navlist__group, className)} {...rest}>
        {title ? (
          <h3 id={titleId} className={styles['navlist__group-title']}>
            {title}
          </h3>
        ) : null}
        <ul className={styles['navlist__group-list']} aria-labelledby={title ? titleId : undefined}>
          <NavListLevelContext.Provider value={2}>{validChildren}</NavListLevelContext.Provider>
        </ul>
      </li>
    );
  }
);

/**
 * @brief Use NavList to render vertical navigation links with groups and expandable nested lists.
 */
export const NavList = Object.assign(NavListRoot, {
  Root: NavListRoot,
  Item: NavListItem,
  SubNav: NavListSubNav,
  Group: NavListGroup
});

type ElementWithChildren = React.ReactElement<{ children?: React.ReactNode }>;
type ElementWithCurrent = React.ReactElement<{
  'children'?: React.ReactNode;
  'aria-current'?: React.AriaAttributes['aria-current'];
}>;

function isNavListSubNavElement(node: React.ReactNode): node is NavListSubNavElement {
  return React.isValidElement<NavListSubNavProps>(node) && node.type === NavListSubNav;
}

function isNavListItemElement(node: React.ReactNode): node is React.ReactElement<NavListItemProps> {
  return React.isValidElement<NavListItemProps>(node) && node.type === NavListItem;
}

function isNavListGroupElement(node: React.ReactNode): node is React.ReactElement<NavListGroupProps> {
  return React.isValidElement<NavListGroupProps>(node) && node.type === NavListGroup;
}

function isCurrentValue(value: React.AriaAttributes['aria-current']) {
  return Boolean(value) && value !== 'false';
}

function hasCurrentDescendant(node: React.ReactNode): boolean {
  return React.Children.toArray(node).some((child) => {
    if (!React.isValidElement(child)) return false;

    const currentChild = child as ElementWithCurrent;

    if (isCurrentValue(currentChild.props['aria-current'])) return true;

    return hasCurrentDescendant((child as ElementWithChildren).props.children);
  });
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(value);

    return;
  }

  (ref as React.RefObject<T | null>).current = value;
}

function childHasDirectSubNav(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;

  if (node.type === React.Fragment) {
    return React.Children.toArray((node as ElementWithChildren).props.children).some(childHasDirectSubNav);
  }

  return React.Children.toArray((node as ElementWithChildren).props.children).some(isNavListSubNavElement);
}

function childIsNavListGroupElement(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;

  if (node.type === React.Fragment) {
    return React.Children.toArray((node as ElementWithChildren).props.children).some(childIsNavListGroupElement);
  }

  return isNavListGroupElement(node);
}

function childHasNavListGroupElement(node: React.ReactNode): boolean {
  if (!React.isValidElement(node)) return false;

  if (node.type === React.Fragment) {
    return React.Children.toArray((node as ElementWithChildren).props.children).some(childHasNavListGroupElement);
  }

  return isNavListGroupElement(node);
}

function renderVisual(visual: Visual | undefined, className: string) {
  if (!visual) return null;

  const visualElement = React.isValidElement(visual) ? visual : React.createElement(visual);

  if (!React.isValidElement<{ className?: string; ['aria-hidden']?: string; focusable?: string }>(visualElement))
    return null;

  return (
    <span className={className}>
      {React.cloneElement(visualElement, {
        'className': visualElement.props.className,
        'aria-hidden': 'true',
        'focusable': 'false'
      })}
    </span>
  );
}

function warnNavListValidation(message: string) {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
}
