import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils.ts';

const headingSizeMap = {
  'xs': 'text-lg font-semibold tracking-tight',
  'sm': 'text-xl font-semibold tracking-tight',
  'md': 'text-2xl font-bold tracking-tight',
  'lg': 'text-3xl font-bold tracking-tight',
  'xl': 'text-4xl font-bold tracking-tight',
  '2xl': 'text-5xl font-extrabold tracking-tighter',
  '3xl': 'text-6xl font-extrabold tracking-tighter lg:text-7xl'
} as const;

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  size?: keyof typeof headingSizeMap;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = 'h2', className, size = 'lg', ...props }, ref) => (
    <Tag ref={ref} className={cn('text-slate-900 dark:text-slate-100', headingSizeMap[size], className)} {...props} />
  )
);

Heading.displayName = 'Heading';

const textVariantMap = {
  default: 'text-base text-slate-700 dark:text-slate-300',
  muted: 'text-sm text-slate-500 dark:text-slate-400',
  lead: 'text-lg text-slate-600 dark:text-slate-300 leading-relaxed',
  small: 'text-sm text-slate-600 dark:text-slate-400',
  code: 'font-mono text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-800 dark:text-slate-200'
} as const;

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: keyof typeof textVariantMap;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(({ className, variant = 'default', ...props }, ref) => (
  <p ref={ref} className={cn(textVariantMap[variant], className)} {...props} />
));

Text.displayName = 'Text';

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant: HeadingTag | 'p' | 'lead' | 'muted' | 'small' | 'code';
}

const Typography = forwardRef<HTMLElement, TypographyProps>(({ variant, ...props }, ref) => {
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
    const sizeMap: Record<string, keyof typeof headingSizeMap> = {
      h1: '2xl',
      h2: 'xl',
      h3: 'lg',
      h4: 'md',
      h5: 'sm',
      h6: 'xs'
    };
    const tag = variant as HeadingTag;
    return <Heading ref={ref as any} as={tag} size={sizeMap[tag]} {...props} />;
  }

  const variantToTextMap: Record<string, keyof typeof textVariantMap> = {
    p: 'default',
    lead: 'lead',
    muted: 'muted',
    small: 'small',
    code: 'code'
  };

  const textVariant = (variantToTextMap[variant] || 'default') as keyof typeof textVariantMap;

  return <Text ref={ref as any} variant={textVariant} {...props} />;
});

Typography.displayName = 'Typography';

export { Heading, Text, Typography };
