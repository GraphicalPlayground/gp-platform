// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './subdomain-navbar.module.css';
import { NavigationVisbilityObserver } from './navigation-visibility-observer';
import { ChevronLeftIcon, LinkExternalIcon, SearchIcon, XIcon } from '@primer/octicons-react';
import { Button } from '../button';
import { Text } from '../text';
import { useWindowSize, useFocusTrap, useKeyboardEscape, useOnClickOutside } from '../../hooks';
import { BrandIcon } from '../icons';
import { FormControl, TextInput } from '@primer/react-brand';

/**
 * @brief SubdomainNavBar component props interface.
 * @see SubdomainNavBarRoot
 */
export interface SubdomainNavBarProps {
  /**
   * @brief Valid child elements are `SubdomainNavBar.Link`, `SubdomainNavBar.PrimaryAction`,
   * `SubdomainNavBar.SecondaryAction` and `SubdomainNavBar.Search`
   */
  children?:
    | React.ReactNode
    | React.ReactElement<SubdomainNavBarLinkProps>
    | React.ReactElement<SearchProps>
    | React.ReactElement<CTAActionProps>;

  /**
   * @brief Forward a custom HTML class attribute
   */
  className?: string;

  /**
   * @brief Fixes the navigation bar to the top of the viewport. Defaults to `true`.
   */
  fixed?: boolean;

  /**
   * @brief Fill the maximum width of the parent container. Defaults to `false`.
   */
  fullWidth?: boolean;

  /**
   * @brief The title or name of the subdomain. Appears adjacent to the logo and is required for communicating content to assisitive technologies.
   */
  title: string;

  /**
   * @brief The URL for the site. Typically used to link the titleText prop value to the site root.
   */
  titleHref?: string;

  /**
   * @brief Optionally change the URL of the logo
   */
  logoHref?: string;

  /**
   * @brief When the menu is opened or closed on narrow viewports, this callback is called with the new open state.
   */
  onNarrowMenuToggle?: (isOpen: boolean) => void;
}

/**
 * @brief SubdomainNavBarRoot component.
 * @details
 */
export const SubdomainNavBarRoot: React.FC<SubdomainNavBarProps> = ({
  children,
  className,
  fixed = true,
  fullWidth = false,
  logoHref = '/',
  onNarrowMenuToggle,
  title,
  titleHref = '/',
  ...rest
}) => {
  const [menuHidden, setMenuHidden] = React.useState(true);
  const [searchVisible, setSearchVisible] = React.useState(false);
  const { isMedium, isSmall } = useWindowSize();
  const [startOfContentButtonFocused, setStartOfContentButtonFocused] = React.useState(false);
  const mainElRef = React.useRef<HTMLElement | null>(null);
  const startOfContentID = React.useId();

  const handleMobileMenuClick = () => {
    const nextMenuHidden = !menuHidden;

    setMenuHidden(nextMenuHidden);
    onNarrowMenuToggle?.(!nextMenuHidden);
  };

  const handleSearchVisibility = () => setSearchVisible(!searchVisible);
  const focusTrapRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const mainEl = document.querySelector('main');

    if (mainEl) {
      mainEl.id = mainEl.id || startOfContentID;
      mainElRef.current = mainEl;
    }
  }, [startOfContentID]);

  useFocusTrap({ containerRef: focusTrapRef, restoreFocusOnCleanUp: true, disabled: menuHidden });
  useKeyboardEscape(() => {
    setMenuHidden(true);
    onNarrowMenuToggle?.(false);
  });

  React.useEffect(() => {
    if (isMedium) {
      setMenuHidden(true);
      onNarrowMenuToggle?.(false);
    }
  }, [isMedium, menuHidden, onNarrowMenuToggle]);

  React.useEffect(() => {
    const newOverflowState = menuHidden ? 'auto' : 'hidden';

    document.body.style.overflow = newOverflowState;
  }, [menuHidden]);

  const setStartOfContentButtonFocusedTrue = React.useCallback(() => setStartOfContentButtonFocused(true), []);
  const setStartOfContentButtonFocusedFalse = React.useCallback(() => setStartOfContentButtonFocused(false), []);

  const hasLinks =
    React.useMemo(
      () =>
        React.Children.toArray(children).filter(
          (child) => React.isValidElement(child) && typeof child.type !== 'string' && child.type === SubdomainNavBarLink
        ),
      []
    ).length > 0;

  const menuItems = React.useMemo(
    () =>
      React.Children.toArray(children)
        .map((child, index) => {
          if (React.isValidElement<SubdomainNavBarLinkProps>(child) && child.type === SubdomainNavBarLink) {
            const navItemId = typeof child.props.children === 'string' ? child.props.children : `${index}`;

            return React.cloneElement(child, {
              'data-navitemid': navItemId,
              'href': child.props.href,
              'children': child.props.children,
              'style': {
                '--animation-order': index
              } as React.CSSProperties
            });
          }

          return null;
        })
        .filter(Boolean),
    [children]
  );

  const hasAllActions: boolean = React.useMemo(() => {
    const primaryAction = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === SubdomainNavBarPrimaryAction
    );
    const secondaryAction = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === SubdomainNavBarSecondaryAction
    );

    return !!primaryAction && !!secondaryAction;
  }, [children]);

  return (
    <>
      <div
        className={clsx(
          styles['subdomain-navbar-outer-container'],
          fixed && styles['subdomain-navbar-outer-container--fixed'],
          hasAllActions && styles['subdomain-navbar-outer-container--has-actions']
        )}
      >
        <Button
          as='a'
          href={`#${mainElRef.current?.id || startOfContentID}`}
          variant='primary'
          className={clsx(
            styles['subdomain-navbar-skip-to-content'],
            !startOfContentButtonFocused && 'visually-hidden'
          )}
          onFocus={setStartOfContentButtonFocusedTrue}
          onBlur={setStartOfContentButtonFocusedFalse}
        >
          Skip to content
        </Button>
        <header className={clsx(styles['subdomain-navbar'], className)} {...rest}>
          <div
            ref={focusTrapRef}
            className={clsx(
              styles['subdomain-navbar-inner-container'],
              searchVisible && styles['subdomain-navbar-inner-container--search-open'],
              !fullWidth && styles['subdomain-navbar-inner-container--centered']
            )}
          >
            <nav aria-label='Header logo and title'>
              <ol className={styles['subdomain-navbar-title-area']}>
                <li>
                  <a
                    href={logoHref}
                    aria-label='Graphical Playground Home'
                    className={styles['subdomain-navbar-logo-mark']}
                  >
                    <span className={clsx(styles['subdomain-navbar-back-arrow'])}>
                      <ChevronLeftIcon fill='currentColor' size={24} />
                    </span>
                    <BrandIcon variant='icon' fill='currentColor' height={24} />
                  </a>
                </li>
                {title && isSmall && (
                  <>
                    <li role='separator' className={styles['subdomain-navbar-title-separator']} aria-hidden>
                      /
                    </li>
                    <li>
                      <a
                        href={titleHref}
                        aria-label={`${title} home`}
                        className={clsx(styles['subdomain-navbar-title'])}
                      >
                        <Text size='400' weight='medium'>
                          {title}
                        </Text>
                      </a>
                    </li>
                  </>
                )}
              </ol>
            </nav>
            {hasLinks && (
              <nav id='menu-navigation' aria-label={title} className={styles['subdomain-navbar-primary-nav']}>
                <NavigationVisbilityObserver className={clsx(styles['subdomain-navbar-primary-nav-list--invisible'])}>
                  {menuItems}
                </NavigationVisbilityObserver>
              </nav>
            )}

            <div className={clsx(styles['subdomain-navbar-secondary-nav'])}>
              {React.Children.toArray(children)
                .map((child) => {
                  if (React.isValidElement<SearchProps>(child) && child.type === SubdomainNavBarSearch) {
                    return React.cloneElement(child, {
                      active: searchVisible,
                      handlerFn: handleSearchVisibility,
                      title
                    });
                  }

                  return null;
                })
                .filter(Boolean)}

              {hasLinks && (
                <button
                  aria-expanded={!menuHidden}
                  aria-label='Menu'
                  aria-controls='menu-navigation'
                  aria-haspopup='true'
                  className={clsx(
                    styles['subdomain-navbar-menu-button'],
                    styles['subdomain-navbar-mobile-menu-button'],
                    !menuHidden && styles['subdomain-navbar-menu-button--close']
                  )}
                  onClick={handleMobileMenuClick}
                >
                  <div className={clsx(styles['subdomain-navbar-menu-button-bar'])}></div>
                  <div className={clsx(styles['subdomain-navbar-menu-button-bar'])}></div>
                  <div className={clsx(styles['subdomain-navbar-menu-button-bar'])}></div>
                </button>
              )}

              {isMedium && (
                <div
                  className={clsx(
                    styles['subdomain-navbar-button-area'],
                    styles['subdomain-navbar-button-area--visible']
                  )}
                >
                  <div className={styles['subdomain-navbar-button-area-inner']}>
                    {React.Children.toArray(children)
                      .map((child) => {
                        if (
                          React.isValidElement<CTAActionProps>(child) &&
                          (child.type === SubdomainNavBarPrimaryAction || child.type === SubdomainNavBarSecondaryAction)
                        ) {
                          return child;
                        }

                        return null;
                      })
                      .filter(Boolean)}
                  </div>
                </div>
              )}

              {!isMedium && (
                <div
                  className={clsx(
                    styles['subdomain-navbar-menu-wrapper'],
                    menuHidden && styles['subdomain-navbar-menu-wrapper--close']
                  )}
                >
                  <div>
                    {title && titleHref && (
                      <Text as='p'>
                        <a
                          href={titleHref}
                          aria-label={`${title} home`}
                          className={clsx(styles['subdomain-navbar-link'], styles['subdomain-navbar-link--title'])}
                        >
                          {title}
                        </a>
                      </Text>
                    )}
                    {hasLinks && !menuHidden && (
                      <NavigationVisbilityObserver
                        className={clsx(styles['subdomain-navbar-primary-nav-list--visible'])}
                      >
                        {menuItems}
                      </NavigationVisbilityObserver>
                    )}
                  </div>
                  <div
                    className={clsx(
                      styles['subdomain-navbar-button-area'],
                      styles['subdomain-navbar-button-area--visible']
                    )}
                  >
                    <div className={styles['subdomain-navbar-button-area-inner']}>
                      {React.Children.toArray(children)
                        .map((child) => {
                          if (
                            React.isValidElement<CTAActionProps>(child) &&
                            (child.type === SubdomainNavBarPrimaryAction ||
                              child.type === SubdomainNavBarSecondaryAction)
                          ) {
                            return child;
                          }

                          return null;
                        })
                        .filter(Boolean)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
      {!mainElRef.current && <div id={`${startOfContentID}`} tabIndex={-1} />}
    </>
  );
};

/** Set the display name for the SubdomainNavBar component. */
SubdomainNavBarRoot.displayName = 'gp.SubdomainNavBar.Root';

export type SubdomainNavBarLinkProps = {
  'href': string;
  'isExternal'?: boolean;
  'data-navitemid'?: string;
} & React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;

function SubdomainNavBarLink({
  children,
  className,
  href,
  isExternal,
  ...rest
}: React.PropsWithChildren<SubdomainNavBarLinkProps>) {
  return (
    <li className={clsx(styles['subdomain-navbar-primary-nav-list-item'], className)} {...rest}>
      <a href={href} className={styles['subdomain-navbar-link']}>
        <span className={styles['subdomain-navbar-link-text']}>{children}</span>
        {isExternal && <LinkExternalIcon size={16} aria-label='External link' />}
      </a>
    </li>
  );
}

export type SubdomainNavBarSearchResultProps = {
  title: string;
  description: string;
  url: string;
  date: string;
  category?: string;
};

type HandlerEvent = MouseEvent | TouchEvent | FocusEvent;

type SearchProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement>;
  active?: boolean;
  title?: string;
  handlerFn?: (event: HandlerEvent) => void;
  autoComplete?: boolean;
  searchResults?: SubdomainNavBarSearchResultProps[];
  searchTerm?: string;
};

const SubdomainNavBarSearch = React.forwardRef<HTMLDivElement, SearchProps>(
  ({ active, handlerFn, onChange, onSubmit, searchResults, searchTerm, title }, ref) => {
    const dialogRef = React.useRef<HTMLDivElement | null>(null);

    useFocusTrap({ containerRef: dialogRef, restoreFocusOnCleanUp: true, disabled: !active });
    useOnClickOutside(dialogRef, handlerFn);

    const [activeDescendant, setActiveDescendant] = React.useState<number>(-1);
    const [listboxActive, setListboxActive] = React.useState<boolean>();
    const [liveRegion, setLiveRegion] = React.useState<boolean>(false);

    const handleClose = React.useCallback(
      (event?: React.MouseEvent<HTMLButtonElement, MouseEvent> | HandlerEvent | null) => {
        if (handlerFn) handlerFn(event as HandlerEvent);
        setActiveDescendant(-1);
      },
      [handlerFn]
    );

    useOnClickOutside(dialogRef, handleClose as (event: HandlerEvent) => void);
    useKeyboardEscape(() => {
      // Close the dialog if combobox is already collapsed
      if (!listboxActive && active) {
        handleClose();

        return false;
      }

      setListboxActive(false);
      setActiveDescendant(-1);
    });

    const handleAriaFocus = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const supportedKeys = ['ArrowDown', 'ArrowUp', 'Escape', 'Enter'];
        const currentCount = activeDescendant;
        const searchResultsLength = searchResults ? searchResults.length : 0;
        const dialog = dialogRef.current;
        let count;

        // Prevent any other keys outside of supported from being prevented.
        // Only prevent "Enter" if activeDescendant is greater than -1.
        if (!supportedKeys.includes(event.key) || (event.key === 'Enter' && activeDescendant === -1) || !dialog) {
          return false;
        }

        event.preventDefault();

        if (event.key === 'ArrowDown') {
          // If count reaches last search result item, reset to -1
          count = currentCount < searchResultsLength - 1 ? currentCount + 1 : -1;
          setActiveDescendant(count);
        } else if (event.key === 'ArrowUp') {
          // Reset to last search result item if
          count = currentCount === -1 ? searchResultsLength - 1 : currentCount - 1;
          setActiveDescendant(count);
        }

        if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
          dialog.querySelector(`#subdomainnavbar-search-result-${count}`)?.scrollIntoView();
        }

        if (event.key === 'Enter') {
          const link = dialog.querySelector(
            `#subdomainnavbar-search-result-${activeDescendant} a`
          ) as HTMLAnchorElement;

          link.click();
        }
      },
      [searchResults, activeDescendant]
    );

    const searchLiveRegion = React.useCallback(() => {
      // Adding a non-breaking space and then removing it will force screen readers to announce the text,
      // as it thinks that there was a change within the live region.
      setLiveRegion(true);

      setTimeout(() => {
        if (active) setLiveRegion(false);
      }, 200);
    }, [active]);

    React.useEffect(() => {
      // We want to set "listboxActive" when search results are present,
      // or the user pressed "Escape". We watch for "searchTerm", as we -
      // want the listbox to become active if they pressed "Escape", and -
      // adjusted their existing value.
      const search = searchResults && searchResults.length ? true : false;

      setListboxActive(search);
      searchLiveRegion();
    }, [searchResults, searchTerm, searchLiveRegion]);

    return (
      <>
        <div className={clsx(styles['subdomain-navbar-search-trigger'])}>
          <button
            aria-label='Toggle search bar'
            className={styles['subdomain-navbar-search-button']}
            onClick={handlerFn as any}
          >
            <SearchIcon aria-label='Search icon' />
          </button>
        </div>
        {active && (
          <div
            ref={dialogRef}
            role='dialog'
            aria-label={`Search ${title}`}
            aria-modal='true'
            tabIndex={-1}
            className={clsx(styles['subdomain-navbar-search-dialog'])}
          >
            <div className={clsx(styles['subdomain-navbar-search-dialog-control-area'])}>
              <form className={clsx(styles['subdomain-navbar-search-form'])} onSubmit={onSubmit} role='search'>
                <FormControl fullWidth size='medium'>
                  <FormControl.Label visuallyHidden>Search</FormControl.Label>
                  <TextInput
                    ref={ref}
                    className={clsx(styles['subdomain-navbar-search-text-input'])}
                    name='search'
                    role='combobox'
                    aria-expanded={listboxActive}
                    aria-controls='listbox-search-results'
                    placeholder={`Search ${title}`}
                    onChange={onChange}
                    defaultValue={searchTerm}
                    invisible
                    leadingVisual={<SearchIcon size={16} />}
                    aria-activedescendant={
                      activeDescendant === -1 ? undefined : `subdomainnavbar-search-result-${activeDescendant}`
                    }
                    onKeyDown={handleAriaFocus}
                  />
                </FormControl>
              </form>
              <button
                aria-label='Close'
                className={clsx(styles['subdomain-navbar-menu-button'], styles['subdomain-navbar-menu-button--close'])}
                onClick={handleClose}
              >
                <XIcon size={24} />
              </button>
            </div>

            <div id='listbox-search-results'>
              {listboxActive && (
                <div className={clsx(styles['subdomain-navbar-search-results-container'])}>
                  <Text
                    id='subdomainnavbar-search-results-heading'
                    className={styles['subdomain-navbar-search-results-heading']}
                  >
                    Results for &ldquo;{searchTerm}&rdquo;
                  </Text>
                  <ul
                    role='listbox'
                    tabIndex={0}
                    aria-labelledby='subdomainnavbar-search-results-heading'
                    className={clsx(styles['subdomain-navbar-search-results'])}
                  >
                    {searchResults?.map((result, index) => (
                      <li
                        key={`${result.title}-${index}`}
                        id={`subdomainnavbar-search-result-${index}`}
                        className={styles['subdomain-navbar-search-result-item']}
                        role='option'
                        aria-selected={index === activeDescendant}
                      >
                        <div className={styles['subdomain-navbar-search-result-item-container']}>
                          <a href={result.url}>{result.title}</a>
                        </div>

                        <Text
                          as='p'
                          size='200'
                          id={`subdomainnavbar-search-result-item-desc${index}`}
                          className={styles['subdomain-navbar-search-result-item-desc']}
                        >
                          {result.description}
                        </Text>
                        <div>
                          <Text size='100' className={styles['subdomain-navbar-search-result-item-desc']}>
                            {result.date}
                          </Text>
                          {result.category && (
                            <>
                              <Text size='100' className={styles['subdomain-navbar-search-result-item-desc']}>
                                {' '}
                                •{' '}
                              </Text>
                              <Text size='100' className={styles['subdomain-navbar-search-result-item-desc']}>
                                {result.category}
                              </Text>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div aria-live='polite' aria-atomic='true' className='visually-hidden'>
                {`${searchResults?.length} suggestions.`}
                {liveRegion && <span>&nbsp;</span>}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

type CTAActionProps = {
  href: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

function SubdomainNavBarPrimaryAction({ children, href, ...rest }: React.PropsWithChildren<CTAActionProps>) {
  return (
    <Button
      as='a'
      href={href}
      className={clsx(styles['subdomain-navbar-cta-button'])}
      variant='primary'
      size='small'
      {...rest}
    >
      {children}
    </Button>
  );
}

function SubdomainNavBarSecondaryAction({ children, href, ...rest }: React.PropsWithChildren<CTAActionProps>) {
  return (
    <Button
      as='a'
      href={href}
      className={clsx(styles['subdomain-navbar-cta-button'], styles['subdomain-navbar-cta-button--secondary'])}
      size='small'
      {...rest}
    >
      {children}
    </Button>
  );
}

/**
 * @brief SubDomainNavBar component created by combining the root and subcomponents.
 */
export const SubdomainNavBar = Object.assign(SubdomainNavBarRoot, {
  Root: SubdomainNavBarRoot,
  Link: SubdomainNavBarLink,
  Search: SubdomainNavBarSearch,
  PrimaryAction: SubdomainNavBarPrimaryAction,
  SecondaryAction: SubdomainNavBarSecondaryAction
});
