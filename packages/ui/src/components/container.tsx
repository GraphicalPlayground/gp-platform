import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils.ts';

const sizeMap = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
} as const;

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof sizeMap;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ className, size = 'xl', ...props }, ref) => (
  <div ref={ref} className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)} {...props} />
));

Container.displayName = 'Container';

export { Container };
