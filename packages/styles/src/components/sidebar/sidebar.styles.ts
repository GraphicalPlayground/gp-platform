import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

const sidebarVariants = tv({
  slots: {
    base: 'sidebar',
    header: 'sidebar__header',
    content: 'sidebar__content',
    group: 'sidebar__group',
    footer: 'sidebar__footer'
  },
  variants: {
    variant: {
      default: {
        base: 'sidebar--default'
      },
      compact: {
        base: 'sidebar--compact'
      },
      transparent: {
        base: 'sidebar--transparent'
      }
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export { sidebarVariants };
export type SidebarVariants = VariantProps<typeof sidebarVariants>;
