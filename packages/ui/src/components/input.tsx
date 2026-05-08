import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '../lib/utils.ts';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, type = 'text', ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className='flex flex-col gap-1.5'>
        {label && (
          <label htmlFor={inputId} className='text-sm font-medium text-slate-700 dark:text-slate-300'>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={cn(
            'flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 shadow-sm transition-colors',
            'placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
            error && 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className='text-xs text-red-600 dark:text-red-400'>{error}</p>}
        {hint && !error && <p className='text-xs text-slate-500 dark:text-slate-400'>{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
