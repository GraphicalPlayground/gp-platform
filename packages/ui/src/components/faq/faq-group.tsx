// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import clsx from 'clsx';
import styles from './faq-group.module.css';

import { FAQ } from '.';
import type { FAQSubheadingProps, FAQRootProps } from '.';
import { Accordion, Grid, Heading, Stack, Box } from '..';

const HeadingBase: React.FC<FAQSubheadingProps> = ({ as = 'h3', children, className, ...rest }) => {
  return (
    <Heading as={as} className={clsx(styles['faq-group__heading'], className)} {...rest}>
      {children}
    </Heading>
  );
};

export type FAQGroupProps = React.PropsWithChildren<{
  id?: string;
  variant?: 'default' | 'gridline';
  defaultSelectedIndex?: number;
  tabAttributes?: (children: React.ReactNode, index: number) => Record<string, unknown>;
}>;

function FAQGroupBase({
  children,
  defaultSelectedIndex = 0,
  id,
  tabAttributes,
  variant = 'default',
  ...rest
}: FAQGroupProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(defaultSelectedIndex);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const instanceId = id ?? React.useId();
  const selectedTabRef = React.useRef<HTMLButtonElement>(null);

  const handleTabClick = (index: number) => (_event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedIndex(index);
    if (!hasInteracted) setHasInteracted(true);
  };

  const handleKeyDown = (index: number) => (_event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (_event.key === 'ArrowUp') {
      _event.preventDefault();
      const prevIndex = (index - 1 + faqChildren.length) % faqChildren.length;

      setSelectedIndex(prevIndex);
      if (!hasInteracted) setHasInteracted(true);

      return;
    }

    if (_event.key === 'ArrowDown') {
      _event.preventDefault();
      const nextIndex = (index + 1) % faqChildren.length;

      setSelectedIndex(nextIndex);
      if (!hasInteracted) setHasInteracted(true);

      return;
    }
  };

  React.useEffect(() => {
    if (hasInteracted) selectedTabRef.current?.focus();
  }, [hasInteracted, selectedIndex]);

  const faqChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<FAQRootProps> =>
      React.isValidElement<FAQRootProps>(child) && child.type === FAQ
  );

  const Tabs = React.Children.map(faqChildren, (faqChild, index) => {
    if (faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        (child): child is React.ReactElement<React.ComponentProps<typeof FAQ.Heading>> =>
          React.isValidElement(child) && child.type === FAQ.Heading
      );

      const tabContents = GroupHeadingChild?.props.children;

      const providedTabAttributes =
        GroupHeadingChild && tabAttributes ? tabAttributes(tabContents ?? null, index) : undefined;
      const tabAttributeProps = providedTabAttributes ?? {};
      const { ref: providedTabRef, ...tabAttributeRest } = tabAttributeProps as {
        ref?: React.Ref<HTMLButtonElement>;
      };

      const handleTabRef = (node: HTMLButtonElement | null) => {
        if (selectedIndex === index) {
          selectedTabRef.current = node;
        } else if (selectedTabRef.current === node) {
          selectedTabRef.current = null;
        }

        assignRef(providedTabRef, node);
      };

      return (
        <button
          type='button'
          role='tab'
          className={styles['faq-group__tablist-button']}
          id={`${instanceId}-tab-${index}`}
          aria-controls={`${instanceId}-panel-${index}`}
          aria-selected={selectedIndex === index}
          onClick={handleTabClick(index)}
          onKeyDown={handleKeyDown(index)}
          key={index}
          data-testid={`FAQGroup-tab-${index + 1}`}
          tabIndex={selectedIndex !== index ? -1 : undefined}
          ref={handleTabRef}
          {...tabAttributeRest}
        >
          {tabContents}
        </button>
      );
    }

    return null;
  });

  const TabPanels = React.Children.map(faqChildren, (faqChild, index) => {
    if (faqChild.props.children) {
      const FAQItemChild = React.Children.map(faqChild.props.children, (child) =>
        React.isValidElement(child) && child.type !== FAQ.Heading ? child : null
      );

      const FAQItemHeadingText = React.Children.map(faqChild.props.children, (child) =>
        React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === FAQ.Heading
          ? child.props.children
          : null
      );

      return (
        <div
          role='tabpanel'
          id={`${instanceId}-panel-${index}`}
          aria-labelledby={`${instanceId}-tab-${index}`}
          hidden={selectedIndex !== index}
          key={index}
          data-testid={`FAQGroup-tab-panel-${index + 1}`}
        >
          {FAQItemHeadingText && (
            <FAQ.Subheading
              data-testid={`FAQGroup-tab-panel-heading-${index + 1}`}
              className={clsx(styles['faq-group__panel-sub-heading'])}
            >
              {FAQItemHeadingText}
            </FAQ.Subheading>
          )}
          {FAQItemChild}
        </div>
      );
    }
  });

  const SectionedAccordions = React.Children.map(faqChildren, (faqChild, index) => {
    if (faqChild.props.children) {
      const GroupHeadingChild = React.Children.toArray(faqChild.props.children).find(
        (child): child is React.ReactElement<React.ComponentProps<typeof FAQ.Heading>> =>
          React.isValidElement(child) && child.type === FAQ.Heading
      );
      const FAQItemChild = React.Children.map(faqChild.props.children, (child) =>
        React.isValidElement<{ className?: string }>(child) && child.type !== FAQ.Heading
          ? React.cloneElement(child, {
              className: clsx(styles['faq-group__nested-accordion-item'], child.props.className)
            })
          : null
      );

      if (!GroupHeadingChild || !FAQItemChild) return null;

      return (
        <Accordion
          key={index}
          variant='emphasis'
          className={clsx(variant === 'gridline' && styles['faq-group__accordion--gridline'])}
        >
          <Accordion.Heading {...GroupHeadingChild.props} />
          <Accordion.Content>{FAQItemChild}</Accordion.Content>
        </Accordion>
      );
    }
  });

  const GroupHeading = React.Children.toArray(children).find(
    (child): child is React.ReactElement<FAQSubheadingProps> =>
      React.isValidElement(child) && child.type === HeadingBase
  );

  const Tag = variant === 'gridline' ? Box : React.Fragment;
  const tagProps = variant === 'gridline' ? { className: clsx(styles['faq-group__gridline-wrapper']) } : {};

  return (
    <Tag {...tagProps}>
      <div
        className={clsx(
          styles[`faq-group__heading-wrapper`],
          styles[`faq-group__heading-wrapper--${variant}` as keyof typeof styles]
        )}
      >
        <Grid enableGutters={false} {...rest}>
          <Grid.Column>
            {GroupHeading && (
              <Grid>
                <Grid.Column>{GroupHeading}</Grid.Column>
              </Grid>
            )}
          </Grid.Column>
        </Grid>
      </div>
      <Grid enableGutters={false} {...rest}>
        <Grid.Column span={12}>
          <div className={clsx(styles['faq-group__accordion'])}>{SectionedAccordions}</div>
          <Grid className={clsx(styles['faq-group'])}>
            <Grid.Column
              span={{ medium: 5, large: 4 }}
              className={clsx(
                styles['faq-group__tablist'],
                variant === 'gridline' && styles['faq-group__tablist--gridline']
              )}
            >
              <Stack
                direction='vertical'
                aria-orientation='vertical'
                padding='none'
                role='tablist'
                gap='none'
                alignItems='flex-start'
              >
                {Tabs}
              </Stack>
            </Grid.Column>
            <Grid.Column
              start={6}
              span={7}
              className={clsx(variant === 'gridline' && styles['faq-group__content--gridline'])}
            >
              {TabPanels}
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Tag>
  );
}

/**
 * @brief FAQGroup component:
 */
export const FAQGroup = Object.assign(FAQGroupBase, {
  Heading: HeadingBase
});

/**
 * @brief Assigns a value to a React ref, handling both function and object refs.
 */
function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (!ref) return;
  if (typeof ref === 'function') {
    ref(value);

    return;
  }

  (ref as React.MutableRefObject<T | null>).current = value;
}
