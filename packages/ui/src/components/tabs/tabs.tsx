// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React, { memo, forwardRef, Children, isValidElement, cloneElement, useRef, useEffect } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { useTabs, useProvidedRefOrCreate } from '../../hooks';
import type { BaseProps } from '../helper';
import { CarouselPagination } from '../carousel-pagination';

import styles from './tabs.module.css';

/**
 * Accessible label for the entire tabs component, used by screen readers to describe the tab group.
 * Note: Only use one of `aria-label` or `aria-labelled` by. Not both or neither.
 */
type LabelOrLabelledBy =
  { 'aria-label': string; 'aria-labelledby'?: never } | { 'aria-labelledby': string; 'aria-label'?: never };

export type TabsProps = {
  /**
   * @brief Visual style variant of the tabs. Affects the appearance and styling theme.
   */
  variant?: 'default' | 'accent' | 'underline';
  /**
   * @brief Horizontal alignment of the tab navigation. Defaults to 'start'.
   */
  align?: 'start' | 'center';
  /**
   * @brief Named children to be rendered as tab items and panels.
   */
  children: ReactNode;
  /**
   * @brief Sets the default active tab. "0" (first tab) by default.
   */
  defaultActiveTab?: string;
  /**
   * @brief Callback function triggered when the active tab changes. Receives the new active tab identifier.
   */
  onChange?: (activeTab: string) => void;

  /**
   * @brief Additional CSS class names to apply to the tabs container for custom styling.
   */
  className?: string;
  /**
   * @param internalAccessibleLabels - Customizable labels for screen readers to improve accessibility. These are applied internally using the aria-label attribute.
   * @param internalAccessibleLabels.controlsNext - Label for the "next tab" control button, used by screen readers. Default is "Next tab".
   * @param internalAccessibleLabels.controlsPrev - Label for the "previous tab" control button, used by screen readers. Default is "Previous tab".
   * @param internalAccessibleLabels.controlsIndicator - Complete selector label using {current}. Default is "Go to tab {current}".
   * @param internalAccessibleLabels.controlsNavigation - Label for the complete mobile control group. Default is "Tab navigation".
   */
  internalAccessibleLabels?: {
    controlsNext: string;
    controlsPrev: string;
    controlsIndicator?: string;
    controlsNavigation?: string;
  };
} & LabelOrLabelledBy &
  BaseProps<HTMLDivElement> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'aria-label' | 'aria-labelledby'>;

const defaultInternalAccessibleLabels = {
  controlsNext: 'Next tab',
  controlsPrev: 'Previous tab',
  controlsIndicator: 'Go to tab {current}',
  controlsNavigation: 'Tab navigation'
};

const _TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      align = 'center',
      children,
      defaultActiveTab,
      onChange,
      variant = 'default',
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      internalAccessibleLabels = defaultInternalAccessibleLabels,
      ...props
    },
    ref
  ) => {
    const { activeTab, activateTab, getTabListProps, getTabProps, getTabPanelProps } = useTabs({
      defaultTab: defaultActiveTab,
      onTabActivate: onChange
    });
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const tabsWrapperRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const childrenArray = Children.toArray(children);

    type TabsItemElement = React.ReactElement<TabsItemProps> & { ref?: React.Ref<HTMLButtonElement> };

    const tabs = childrenArray
      .filter((child): child is TabsItemElement => isValidElement<TabsItemProps>(child) && child.type === TabsItem)
      .map((tab, index) => {
        const tabId = String(index);
        const originalRef = tab.ref;
        const tabProps = getTabProps<HTMLButtonElement>(tabId, originalRef);

        return cloneElement(tab, {
          ...tabProps,
          'id': tab.props.id ?? tabProps.id,
          'aria-controls': tab.props['aria-controls'] ?? tabProps['aria-controls'],
          'value': tabId,
          'key': tabProps.id,
          'isActive': activeTab === tabId,
          variant
        });
      });

    const panels = childrenArray
      .filter(
        (child): child is React.ReactElement<TabsPanelProps> =>
          isValidElement<TabsPanelProps>(child) && child.type === TabsPanel
      )
      .map((child, index) => {
        const panelId = String(index);
        const tabPanelProps = getTabPanelProps(panelId);

        return cloneElement(child, {
          ...tabPanelProps,
          id: child.props.id ?? tabPanelProps.id,
          key: String(index)
        });
      });

    useEffect(() => {
      /* istanbul ignore next */
      if (!tabsContainerRef.current || !sliderRef.current) return;

      const activeTabButton = tabsContainerRef.current.querySelector(`[aria-selected="true"]`) as HTMLButtonElement;

      if (!activeTab) return;

      const updateSliderPosition = () => {
        const sliderElement = sliderRef.current;
        const tabsContainer = tabsContainerRef.current;

        if (!sliderElement || !tabsContainer) return;

        const containerPaddingRem = window
          .getComputedStyle(tabsContainer)
          .getPropertyValue('--gp-tabs-container-padding');

        const containerPadding = parseFloat(containerPaddingRem) * 16; // base size

        const offsetX = activeTabButton.offsetLeft - containerPadding;
        const width = activeTabButton.offsetWidth;

        sliderElement.style.setProperty('--gp-tabs-slider-x', `${offsetX}px`);
        sliderElement.style.setProperty('--gp-tabs-slider-width', `${width}px`);
      };

      updateSliderPosition();

      const resizeObserver = new ResizeObserver(updateSliderPosition);

      resizeObserver.observe(tabsContainerRef.current);

      // On narrow viewports this will scroll the active tab into the center.
      // Important because we show a gradient in dark mode.
      const tabsContainer = tabsContainerRef.current;
      const containerWidth = tabsContainer.clientWidth;
      const containerPaddingRem = window
        .getComputedStyle(tabsContainer)
        .getPropertyValue('--gp-tabs-container-padding');
      const containerPadding = parseFloat(containerPaddingRem) * 16;
      const tabLeft = activeTabButton.offsetLeft - containerPadding;
      const tabWidth = activeTabButton.offsetWidth;
      const tabCenter = tabLeft + tabWidth / 2;

      const targetScrollLeft = tabCenter - containerWidth / 2;

      const maxScrollLeft = tabsContainer.scrollWidth - containerWidth; // defines boudnary
      const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));

      tabsContainer.scrollTo({
        left: finalScrollLeft,
        behavior: 'smooth'
      });

      return () => {
        resizeObserver.disconnect();
      };
    }, [activeTab]);

    // Tracks the overflow state for mobile gradient visibility
    // Should only appear when enough items trigger an overflow
    // Related to gradient functionality
    useEffect(() => {
      const tabsContainer = tabsContainerRef.current;
      const wrapperElement = tabsWrapperRef.current;

      if (!tabsContainer || !wrapperElement) return;

      // This relies heavily on layout and measurement and, as such, isn't practical to test
      const updateScrollState = () => {
        const { scrollLeft, scrollWidth, clientWidth } = tabsContainer;
        const hasOverflow = scrollWidth > clientWidth;

        const canScrollRight = hasOverflow && scrollLeft < scrollWidth - clientWidth - 1;

        // Set CSS variables on the wrapper element for the gradient
        wrapperElement.style.setProperty('--scroll-offset', `${scrollLeft}px`);
        wrapperElement.style.setProperty('--has-overflow', hasOverflow ? '1' : '0');
        wrapperElement.style.setProperty('--can-scroll-right', canScrollRight ? '1' : '0');
      };

      updateScrollState();
      const resizeObserver = new ResizeObserver(updateScrollState);

      resizeObserver.observe(tabsContainer);

      tabsContainer.addEventListener('scroll', updateScrollState);

      return () => {
        tabsContainer.removeEventListener('scroll', updateScrollState);
        resizeObserver.disconnect();
      };
    }, [tabs]);

    /**
     * The LabelOrLabelledBy type guarantees that, if ariaLabel isn't a string,
     * then ariaLabelledBy is guaranteed to be a string, and vice versa.
     */
    const accessibleLabel = typeof ariaLabel === 'string' ? { label: ariaLabel } : { labelledBy: ariaLabelledBy };
    const tabListProps = getTabListProps(accessibleLabel);

    const hasMoreThanTwoTabs = tabs.length >= 3;
    const isLastTabActive = String(tabs.length - 1) === activeTab;

    return (
      <div
        className={clsx(
          styles['Tabs-container'],
          styles[`Tabs-container--align-${align}`],
          isLastTabActive && styles['Tabs-container--lastTabIsActive' as keyof typeof styles],
          className
        )}
        ref={ref}
        {...props}
      >
        {tabs.length >= 3 && (
          <div className={styles.Tabs__controls}>
            <CarouselPagination
              itemCount={tabs.length}
              activeIndex={Number(activeTab ?? 0)}
              aria-label={
                internalAccessibleLabels.controlsNavigation ?? defaultInternalAccessibleLabels.controlsNavigation
              }
              labels={{
                previous: internalAccessibleLabels.controlsPrev,
                next: internalAccessibleLabels.controlsNext,
                item: internalAccessibleLabels.controlsIndicator ?? defaultInternalAccessibleLabels.controlsIndicator
              }}
              itemAttributesBuilder={(index) => ({ 'aria-controls': tabs[index]!.props['aria-controls'] })}
              onChange={(index) => activateTab(String(index))}
            />
          </div>
        )}

        <div
          ref={tabsWrapperRef}
          className={clsx(
            styles['Tablist__wrapper'],
            styles[`Tablist__wrapper--${variant}`],
            isLastTabActive && styles['Tablist__wrapper--lastTabIsActive']
          )}
        >
          <div
            ref={tabsContainerRef}
            {...tabListProps}
            className={clsx(
              styles.Tabs,
              styles[`Tabs--${variant}`],
              hasMoreThanTwoTabs && styles['Tabs--hasMoreThanTwoTabs' as keyof typeof styles]
            )}
          >
            <div ref={sliderRef} className={styles.Tabs__slider} aria-hidden />
            {tabs}
          </div>
        </div>

        {panels.length > 0 && <div className={styles['Tabs__panelContainer']}>{panels}</div>}
      </div>
    );
  }
);

export type TabsItemProps = {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  variant?: 'default' | 'accent' | 'underline';
  id?: string;
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'id'>;

const TabsItem = forwardRef<HTMLButtonElement, TabsItemProps>(
  ({ children, className, isActive, variant, ...props }, ref) => {
    const tabRef = useProvidedRefOrCreate(ref);

    return (
      <button
        ref={tabRef}
        className={clsx(
          styles.Tabs__item,
          isActive && styles['Tabs__item--active'],
          variant && styles[`Tabs__item--${variant}` as keyof typeof styles],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export type TabsPanelProps = {
  children: ReactNode;
  className?: string;
  hidden?: boolean;
  id?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>;

const TabsPanel = memo(function TabsPanelComponent({
  children,
  className,

  hidden,
  ...rest
}: TabsPanelProps) {
  const conditionalRender = children;

  return (
    <div className={clsx(styles['Tabs__panel'], className)} hidden={hidden} {...rest}>
      {conditionalRender}
    </div>
  );
});

/**
 * Use Tabs to display a list of tabs with associated content panels.
 */
export const Tabs = Object.assign(_TabsRoot, {
  Item: TabsItem,
  Panel: TabsPanel
});
