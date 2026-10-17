// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

'use client';

import React, {
  Children,
  isValidElement,
  cloneElement,
  useRef,
  useCallback,
  useState,
  useEffect,
  forwardRef,
  memo,
  useMemo
} from 'react';
import type { ReactElement, PropsWithChildren } from 'react';
import { Button } from '../button';
import type { ButtonProps } from '../button';
import { IconButton } from '../icon-button';
import type { IconButtonProps } from '../icon-button';
import { Text } from '../text';
import { useOnClickOutside, useKeyboardEscape, useAnchoredPosition, useId } from '../../hooks';
import { ActionMenuProvider, useActionMenuContext } from './action-menu-context';
import type {
  ActionMenuButtonModes as ActionMenuButtonMode,
  ActionMenuSizes as ActionMenuSize
} from './action-menu-context';

import { clsx } from 'clsx';
import { CheckIcon, ChevronDownIcon } from '@primer/octicons-react';
import type { Icon } from '@primer/octicons-react';

import { FocusKeys, focusZone } from '@primer/behaviors';
import type { PositionSettings } from '@primer/behaviors';
import type { BaseProps } from '../helper';

import styles from './action-menu.module.css';

const testIds = {
  root: 'ActionMenu',
  get button() {
    return `${this.root}-button`;
  },
  get overlay() {
    return `${this.root}-overlay`;
  },
  get list() {
    return `${this.root}-list`;
  },
  get item() {
    return `${this.root}-list-item`;
  }
};

export const actionMenuOverlaySides = [
  'inside-top',
  'inside-bottom',
  'inside-left',
  'inside-right',
  'inside-center',
  'outside-top',
  'outside-bottom',
  'outside-left',
  'outside-right'
] as PositionSettings['side'][];

export {
  ActionMenuButtonModes,
  ActionMenuProvider,
  ActionMenuSizes,
  useActionMenuContext
} from './action-menu-context';

export type ActionMenuProps = {
  /**
   * The content of the ActionMenu. Must include an ActionMenu.Button or ActionMenu.IconButton and an ActionMenu.Overlay
   */
  'children':
    | ReactElement<ActionMenuButtonProps>
    | ReactElement<ActionMenuIconButtonProps>
    | ReactElement<ActionMenuOverlayProps>
    | Array<
        | ReactElement<ActionMenuButtonProps>
        | ReactElement<ActionMenuIconButtonProps>
        | ReactElement<ActionMenuOverlayProps>
      >;
  /**
   * Determines whether the ActionMenu is disabled
   */
  'disabled'?: boolean;
  /**
   * Determines whether the ActionMenu is open by default
   */
  'open'?: boolean;
  /**
   * Callback that is called when an item is selected.
   * The value of the selected item is passed as an argument.
   */
  'onSelect'?: (newValue: string) => void;
  /**
   * The selection variant of the ActionMenu.
   * - `single`: Only one item can be selected at a time. Menu items as a menuitemradio.
   * - `none`: No items can be selected. Menu items as a menuitem.
   */
  'selectionVariant'?: 'single' | 'none';
  /**
   * Test id for the ActionMenu
   */
  'data-testid'?: string;
  /**
   * Horizontal alignment of the menu relative to the bottom of the button
   */
  'menuAlignment'?: 'start' | 'end';
  /**
   * Size configuratin of the ActionMenu
   */
  'size'?: ActionMenuSize;
  /*
   * Side the menu overlay appears
   */
  'menuSide'?: PositionSettings['side'];
  /**
   * Alternative behavior for the button and menu items
   * - `default`: The button and menu items behave as a standard button and menu item.
   * - `split-button`: The button behaves as a split button, and the menu items behave as links.
   */
  'mode'?: ActionMenuButtonMode;
} & BaseProps<HTMLDivElement>;

const _ActionMenuRoot = memo(
  ({
    id,
    children,
    'data-testid': testId,
    disabled,
    open = false,
    selectionVariant = 'none',
    menuAlignment = 'end',
    size = 'medium',
    menuSide,
    onSelect,
    mode = 'default'
  }: ActionMenuProps) => {
    const [showMenu, setShowMenu] = useState(open);
    const floatingElementRef = useRef<HTMLUListElement>(null);
    const anchorElementRef = useRef<HTMLButtonElement>(null);
    const instanceId = useId(id);

    useOnClickOutside(floatingElementRef, () => setShowMenu(false), anchorElementRef);

    const closeMenuCallback = useCallback(() => {
      setShowMenu(false);
    }, []);

    useKeyboardEscape(closeMenuCallback);

    const toggleMenu = useCallback(() => {
      setShowMenu(!showMenu);
    }, [showMenu]);

    const handleOnSelect = useCallback(
      (newValue: string) => {
        if (onSelect) onSelect(newValue);
        toggleMenu();
      },
      [onSelect, toggleMenu]
    );

    const handleItemSelection = useCallback(
      (newValue: string) => {
        handleOnSelect(newValue);
        toggleMenu();
        anchorElementRef.current?.focus();
      },
      [handleOnSelect, toggleMenu, anchorElementRef]
    );

    useEffect(() => {
      if (showMenu && floatingElementRef.current) {
        const floatingElement = floatingElementRef.current;
        const isSplitLayout = mode === 'split-button';
        const splitLayoutFilter = isSplitLayout ? (element: Element) => element.tagName === 'A' : undefined;

        focusZone(floatingElementRef.current, {
          bindKeys: FocusKeys.ArrowVertical,
          focusableElementFilter: splitLayoutFilter,
          focusInStrategy: isSplitLayout ? 'first' : undefined
        });

        // enter selects item
        floatingElement.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            const target = event.target as HTMLElement;

            // Get the proper element containing the data-value
            const targetElement = target.tagName === 'A' ? target.closest('li') : target;

            if (!targetElement || targetElement.getAttribute('aria-disabled') === 'true') return;

            const value = targetElement.getAttribute('data-value');

            if (value) {
              handleOnSelect(value);
              setShowMenu(false);
              setTimeout(() => {
                anchorElementRef.current?.focus();
              }, 10);
            }
          }
        });

        const targetSelector = isSplitLayout ? 'a' : 'li';

        // focusses first item
        const firstItem = floatingElementRef.current.querySelector(targetSelector);

        if (firstItem) {
          setTimeout(() => {
            firstItem.focus();
          }, 10);
        }

        const lastItem =
          floatingElement.querySelectorAll(targetSelector)[floatingElement.querySelectorAll(targetSelector).length - 1];

        lastItem?.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent;

          if (keyboardEvent.key === 'ArrowDown') {
            keyboardEvent.preventDefault();
            firstItem?.focus();
          }
        });

        firstItem?.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent;

          if (keyboardEvent.key === 'ArrowUp') {
            keyboardEvent.preventDefault();
            lastItem?.focus();
          }
        });

        //on escape refocus
        floatingElement.addEventListener('keydown', (event: Event) => {
          const keyboardEvent = event as KeyboardEvent;

          if (keyboardEvent.key === 'Escape') {
            anchorElementRef.current?.focus();
          }
        });
      }
    }, [showMenu, floatingElementRef, mode, handleItemSelection, toggleMenu, handleOnSelect]);

    // Calculate the position of the menu
    const { position } = useAnchoredPosition(
      {
        floatingElementRef,
        anchorElementRef,
        align: menuAlignment,
        allowOutOfBounds: true,
        side: menuSide
      },
      [showMenu]
    );

    const childrenArray = Children.toArray(children);
    const menuLabel = childrenArray.find(
      (child): child is ReactElement<ActionMenuOverlayProps> =>
        isValidElement<ActionMenuOverlayProps>(child) && child.type === ActionMenuOverlay
    )?.props['aria-label'];

    const { Button: SelectButton, Overlay: SelectOverlay } = childrenArray.reduce<{
      Button?: ReactElement<ActionMenuButtonProps | ActionMenuIconButtonProps>;
      Overlay?: ReactElement<ActionMenuOverlayProps>;
    }>((acc, child) => {
      if (isValidElement<ActionMenuButtonProps>(child) && child.type === ActionMenuButton) {
        acc.Button = cloneElement(child, {
          ref: anchorElementRef as React.RefObject<HTMLButtonElement>,
          className: clsx(child.props.className, styles[`action-menu__button--${mode}`], showMenu),
          menuOpen: showMenu,
          disabled,
          id: `${instanceId}-button`,
          size
        });
      } else if (isValidElement<ActionMenuIconButtonInternalProps>(child) && child.type === ActionMenuIconButton) {
        acc.Button = cloneElement(child, {
          ref: anchorElementRef as React.RefObject<HTMLButtonElement>,
          className: clsx(
            child.props['className'],
            mode === 'split-button' && styles['action-menu__button--split-button']
          ),
          menuOpen: showMenu,
          disabled,
          id: `${instanceId}-button`,
          size
        });
      } else if (isValidElement<ActionMenuOverlayProps>(child) && child.type === ActionMenuOverlay) {
        acc.Overlay = cloneElement(child, {
          ref: floatingElementRef as React.RefObject<HTMLUListElement>,
          className: clsx(
            styles['action-menu__menu'],
            position && styles['action-menu__menu--visible'],
            position && styles[`action-menu__menu--pos-${position.anchorSide}` as keyof typeof styles],
            styles[`action-menu__menu--${size}`],
            mode === 'split-button' && 'action-menu__menu--split'
          ),
          style: {
            top: `${position?.top ?? 0}px`,
            left: `${position?.left ?? 0}px`
          },
          id: `${instanceId}-menu`,
          children: Children.map(child.props.children, (item) => {
            if (isValidElement<ActionMenuItemBaseProps>(item)) {
              return cloneElement(item, {
                handler: handleItemSelection,
                type: mode === 'split-button' ? 'link' : selectionVariant
              });
            }

            return item;
          })
        });
      }

      return acc;
    }, {});

    return (
      <ActionMenuProvider size={size} mode={mode} menuLabel={menuLabel} onMenuToggle={toggleMenu}>
        <div
          id={instanceId}
          className={clsx(styles['action-menu'], disabled && styles['action-menu--disabled'])}
          data-testid={testId || testIds.root}
        >
          {SelectButton}
          {showMenu ? SelectOverlay : null}
        </div>
      </ActionMenuProvider>
    );
  }
);

type ActionMenuButtonProps = PropsWithChildren<
  BaseProps<HTMLButtonElement> & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'disabled' | 'onClick'>
> & {
  'as'?: ButtonProps<'a'>['as'];
  'href'?: ButtonProps<'a'>['href'];
  'menuOpen'?: boolean;
  'data-testid'?: string;
  'size'?: ActionMenuSize;
  'variant'?: ButtonProps<'a'>['variant'];
  'leadingVisual'?: ButtonProps<'a'>['leadingVisual'];
};

const ActionMenuButton = forwardRef<HTMLButtonElement, ActionMenuButtonProps>(
  (
    {
      as,
      href,
      id,
      children,
      className,
      'data-testid': testId,
      disabled,
      menuOpen,
      size,
      onClick,
      leadingVisual,
      variant,
      ...props
    },
    ref
  ) => {
    const { menuLabel, mode, onMenuToggle } = useActionMenuContext();
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        onClick?.(event);

        if (!event.defaultPrevented) {
          onMenuToggle?.();
        }
      },
      [disabled, onClick, onMenuToggle]
    );
    const handlePrimaryActionClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        onClick?.(event);
      },
      [disabled, onClick]
    );

    if (mode === 'split-button') {
      const splitButtonVariant = variant ?? 'primary';

      return (
        <div
          className={clsx(
            styles['action-menu__button'],
            styles[`action-menu__button--${size}` as keyof typeof styles],
            className
          )}
        >
          <Button
            as={as}
            href={href}
            className={clsx(
              styles['action-menu__innerButton--split-button'],
              styles['action-menu__innerButton--split-button-primary'],
              styles[`action-menu__innerButton--${splitButtonVariant}` as keyof typeof styles],
              styles[`action-menu__innerButton--${size}` as keyof typeof styles],
              disabled && styles['action-menu__innerButton--disabled']
            )}
            variant={splitButtonVariant}
            aria-disabled={disabled}
            data-testid={testId || testIds.button}
            size={size}
            leadingVisual={leadingVisual}
            onClick={handlePrimaryActionClick}
            {...props}
          >
            <span className={styles['action-menu__button-text' as keyof typeof styles]}>{children}</span>
          </Button>
          <Button
            ref={ref}
            id={id}
            as='button'
            className={clsx(
              styles['action-menu__innerButton--split-button'],
              styles['action-menu__innerButton--split-button-menu']
            )}
            variant={splitButtonVariant}
            aria-haspopup='true'
            aria-label={menuLabel}
            size={size}
            aria-expanded={menuOpen ? 'true' : 'false'}
            onClick={onMenuToggle}
            disabled={disabled}
          >
            <ChevronDownIcon className={styles['action-menu__inner-button-dropdown-icon']} />
          </Button>
        </div>
      );
    }

    return (
      <Button
        ref={ref}
        id={id}
        className={clsx(
          styles['action-menu__button'],
          styles[`action-menu__button--${size}` as keyof typeof styles],
          className
        )}
        aria-haspopup='true'
        aria-expanded={menuOpen ? 'true' : 'false'}
        disabled={disabled}
        data-testid={testId || testIds.button}
        size={size}
        variant={variant}
        leadingVisual={leadingVisual}
        trailingVisual={<ChevronDownIcon />}
        onClick={handleClick}
        {...props}
      >
        <span className={styles['action-menu__button-text' as keyof typeof styles]}>{children}</span>
      </Button>
    );
  }
);

export type ActionMenuIconButtonProps<C extends React.ElementType = 'button'> = Omit<IconButtonProps<C>, 'size'> & {
  'data-testid'?: string;
};

type ActionMenuIconButtonInternalProps = React.PropsWithoutRef<ActionMenuIconButtonProps<React.ElementType>> & {
  ref?: React.Ref<HTMLButtonElement>;
  menuOpen?: boolean;
  size?: ActionMenuSize;
};

type ActionMenuIconButtonComponent = <C extends React.ElementType = 'button'>(
  props: ActionMenuIconButtonProps<C> & React.RefAttributes<HTMLButtonElement>
) => React.ReactElement | null;

const ActionMenuIconButton = forwardRef<HTMLButtonElement, ActionMenuIconButtonInternalProps>(
  (
    {
      as,
      id,
      icon,
      className,
      'aria-label': ariaLabel,
      'data-testid': testId,
      disabled,
      menuOpen,
      size,
      variant,
      onClick,
      ...props
    },
    ref
  ) => {
    const { menuLabel, mode, onMenuToggle } = useActionMenuContext();
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        onClick?.(event);

        if (!event.defaultPrevented) {
          onMenuToggle?.();
        }
      },
      [disabled, onClick, onMenuToggle]
    );
    const handlePrimaryActionClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault();

          return;
        }

        onClick?.(event);
      },
      [disabled, onClick]
    );

    if (mode === 'split-button') {
      const splitButtonVariant = variant ?? 'primary';

      return (
        <div
          className={clsx(
            styles['action-menu__button'],
            styles[`action-menu__button--${size}` as keyof typeof styles],
            className
          )}
        >
          <IconButton
            {...props}
            as={as}
            icon={icon}
            aria-label={ariaLabel}
            className={clsx(
              styles['action-menu__innerButton--split-button'],
              styles['action-menu__innerButton--split-button-primary'],
              styles[`action-menu__innerButton--${splitButtonVariant}` as keyof typeof styles],
              styles[`action-menu__innerButton--${size}` as keyof typeof styles],
              disabled && styles['action-menu__innerButton--disabled']
            )}
            variant={splitButtonVariant}
            aria-disabled={disabled}
            data-testid={testId || testIds.button}
            size={size}
            onClick={handlePrimaryActionClick}
          />
          <IconButton
            ref={ref}
            id={id}
            icon={ChevronDownIcon}
            aria-label={menuLabel}
            className={clsx(
              styles['action-menu__innerButton--split-button'],
              styles['action-menu__innerButton--split-button-menu']
            )}
            variant={splitButtonVariant}
            aria-haspopup='menu'
            size={size}
            aria-expanded={menuOpen ? 'true' : 'false'}
            onClick={onMenuToggle}
            disabled={disabled}
          />
        </div>
      );
    }

    return (
      <IconButton
        {...props}
        ref={ref}
        as={as}
        id={id}
        icon={icon}
        aria-label={ariaLabel}
        className={className}
        aria-haspopup='menu'
        aria-expanded={menuOpen ? 'true' : 'false'}
        disabled={disabled}
        data-testid={testId || testIds.button}
        size={size}
        variant={variant}
        onClick={handleClick}
      />
    );
  }
) as ActionMenuIconButtonComponent;

type ActionMenuItemBaseProps = {
  handler?: (newValue: string) => void;
  type?: 'none' | 'single' | 'link';
  disabled?: boolean;
  size?: ActionMenuSize;
  leadingVisual?: React.ReactElement | React.ReactNode | Icon;
} & PropsWithChildren<React.HTMLProps<HTMLLIElement>>;

type ActionMenuItemAnchorProps = ActionMenuItemBaseProps & {
  as: 'a';
} & Omit<React.HTMLProps<HTMLAnchorElement>, keyof ActionMenuItemBaseProps | 'as'>;

// Type for when 'as' is not set or is anything other than 'a'
type ActionMenuItemDefaultProps = ActionMenuItemBaseProps & {
  as?: string;
  value?: string;
  selected?: boolean;
} & Omit<React.HTMLProps<HTMLLIElement>, keyof ActionMenuItemBaseProps | 'as'>;

const roleTypeMap = {
  none: 'menuitem',
  single: 'menuitemradio',
  link: 'menuitem'
};

const ActionMenuItem = ({
  as,
  children,
  className,
  disabled,
  handler,
  selected,
  type,
  value,
  onClick,
  onKeyDown,
  leadingVisual: LeadingVisual,
  ...props
}: ActionMenuItemAnchorProps | ActionMenuItemDefaultProps) => {
  const { size } = useActionMenuContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      onClick?.(e);

      if (!disabled) {
        handler?.(String(value));
      }
    },
    [handler, value, disabled, onClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>) => {
      onKeyDown?.(e);

      if (!disabled && e.key === 'Enter') {
        handler?.(String(value));
      }
    },
    [handler, value, disabled, onKeyDown]
  );

  const liProps = useMemo<React.HTMLProps<HTMLLIElement> & { 'data-value': unknown }>(
    () => ({
      'className': clsx(
        styles['action-menu__item'],
        type === 'single' && styles[`action-menu__item--selection-type-${type}`],
        size && styles[`action-menu__item--${size}`],
        className
      ),
      'role': roleTypeMap[type || 'single'],
      'aria-disabled': disabled,
      'tabIndex': -1,
      'data-value': value,
      ...props
    }),
    [props, type, size, className, disabled, value]
  );

  const contents = useMemo(
    () => (
      <>
        {React.isValidElement<{ width?: number; height?: number }>(LeadingVisual)
          ? React.cloneElement(LeadingVisual, {
              width: LeadingVisual.props.width || 20,
              height: LeadingVisual.props.width || 20
            })
          : null}
        {type === 'single' && (
          <span className={styles['action-menu__item-leadingVisual']}>
            {selected && (
              <CheckIcon
                className={clsx(
                  styles['action-menu__item-icon'],
                  disabled && styles['action-menu__item-icon--disabled']
                )}
                size={16}
              />
            )}
          </span>
        )}

        <span className={styles['action-menu__item-text']}>
          <Text
            variant={disabled ? 'muted' : 'default'}
            size={size === 'medium' ? '200' : '100'}
            className={clsx(disabled && styles['action-menu__item-content--disabled'])}
          >
            {children}
          </Text>
        </span>
      </>
    ),
    [LeadingVisual, children, selected, disabled, size, type]
  );

  if (as === 'a') {
    return (
      <li
        // This role will be overridden by the role prop in `liProps`. It's just here to keep the linter happy
        role='menuitem'
        {...liProps}
        // Intentionally not calling handle[Click/KeyDown] here so as to not call the handler
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <a
          className={clsx(
            styles['action-menu__item-anchor'],
            disabled && styles['action-menu__item--disabled' as keyof typeof styles]
          )}
          href={props.href}
        >
          {contents}
        </a>
      </li>
    );
  }

  return (
    <li
      // This role will be overridden by the role prop in `liProps`. It's just here to keep the linter happy
      role='menuitem'
      {...liProps}
      aria-checked={type === 'none' ? undefined : selected ? 'true' : 'false'}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {contents}
    </li>
  );
};

type ActionMenuOverlayProps = PropsWithChildren<
  BaseProps<HTMLUListElement> & React.HTMLAttributes<HTMLUListElement>
> & {
  'aria-label': string;
  'id'?: string;
  'data-testid'?: string;
  'menuOpen'?: boolean;
  'style'?: React.CSSProperties;
};

const ActionMenuOverlay = forwardRef<HTMLUListElement, ActionMenuOverlayProps>(
  ({ children, className, 'data-testid': testId, ...rest }, ref) => {
    return (
      <ul ref={ref} className={clsx(className)} role='menu' data-testid={testId || testIds.list} {...rest}>
        {children}
      </ul>
    );
  }
);

export const ActionMenu = Object.assign(_ActionMenuRoot, {
  Button: ActionMenuButton,
  IconButton: ActionMenuIconButton,
  Item: ActionMenuItem,
  Overlay: ActionMenuOverlay,
  testIds
});
