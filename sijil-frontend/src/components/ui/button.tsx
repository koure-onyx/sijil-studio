import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          clsx(
            'inline-flex items-center justify-center font-medium rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
            {
              'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
              'bg-muted text-foreground hover:bg-muted/80': variant === 'secondary',
              'border border-border bg-background hover:bg-muted text-foreground': variant === 'outline',
              'hover:bg-muted text-foreground': variant === 'ghost',
              'px-3 py-1.5 text-xs': size === 'sm',
              'px-4 py-2 text-sm': size === 'md',
              'px-5 py-2.5 text-base': size === 'lg',
            }
          ),
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
