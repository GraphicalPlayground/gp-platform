// Copyright (c) - Graphical Playground. All rights reserved.
// For more information, see https://graphical-playground/legal
// mailto:support AT graphical-playground DOT com

import React from 'react';
import styles from './table-of-contents.module.css';

import { Text } from '../text';

/**
 * @brief HeadingItem type.
 */
export type HeadingItem = {
  id: string;
  text: string;
};

/**
 * @brief TableOfContentsListItemsProps interface.
 * @details This interface defines the props for the TableOfContentsListItems component.
 * It includes the content to extract headings from, the currently active heading ID,
 * and a click handler for when a list item is clicked.
 */
type TableOfContentsListItemsProps = {
  items: HeadingItem[];
  active: string | undefined;
  handleOnClick: () => void;
};

/**
 * @brief ListItemProps interface.
 * @details This interface defines the props for a single list item in the Table of Contents.
 * It extends the TableOfContentsListItemsProps interface, omitting the 'content' property,
 * and adds 'id' and 'text' properties for the list item.
 */
type ListItemProps = Omit<TableOfContentsListItemsProps, 'items'> & HeadingItem;

/**
 * @brief TableOfContentsListItems component.
 * @details This component renders a list of items for the Table of Contents.
 * It extracts headings from the provided content and generates a list of links.
 */
export const TableOfContentsListItems = ({ items, ...rest }: TableOfContentsListItemsProps) => {
  return (
    <>
      {items.map(({ id, text }) => (
        <ListItem key={id} id={id} text={text} {...rest} />
      ))}
    </>
  );
};

/**
 * @brief ListItem component.
 * @details This component renders a single list item for the Table of Contents.
 * It includes a link that navigates to the corresponding section in the document.
 */
function ListItem({ active, handleOnClick, id, text }: ListItemProps) {
  return (
    <li key={id}>
      <a
        data-ref={`table-of-contents-list-item-link-${id}`}
        href={`#${id}`}
        className={`${styles.linkButton} ${styles.tableOfContentsListItem}`}
        onClick={handleOnClick}
        aria-current={active === id ? 'location' : undefined}
      >
        <Text
          className={styles.listItemText}
          variant={active === id ? 'default' : 'muted'}
          size='100'
          weight={active === id ? 'bold' : 'normal'}
        >
          {text}
        </Text>
      </a>
    </li>
  );
}
