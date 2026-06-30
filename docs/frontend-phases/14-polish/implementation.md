# Phase 14: Polish & UX Refinement - Implementation Guide

## Pages

No new pages in this phase. All refinements apply to existing pages from previous phases.

## Layouts

No new layouts. Refinements apply to existing layouts.

## Routes

No new routes. All existing routes receive polish improvements.

## APIs

No new API endpoints required.

### Client-Side API Enhancements

```typescript
// apps/web/src/lib/api-client.ts enhancements

interface ApiClientConfig {
  retryAttempts: number;
  retryDelay: number;
  timeout: number;
}

// Add optimistic update helper
function optimisticUpdate<T>(
  queryKey: string[],
  updateFn: (data: T) => T,
  apiCall: () => Promise<T>
): Promise<void>;

// Add background refetch indicator
function setBackgroundRefetch(isRefetching: boolean): void;
```

## Components

### 1. MicroInteractionProvider

**File:** `apps/web/src/components/polish/MicroInteractionProvider.tsx`

```typescript
import React, { createContext, useContext, useMemo } from 'react';
import { MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MicroInteractionContextType {
  isReducedMotion: boolean;
  isTouchDevice: boolean;
  hapticEnabled: boolean;
}

const MicroInteractionContext = createContext<MicroInteractionContextType | null>(null);

export function MicroInteractionProvider({ children }: { children: React.ReactNode }) {
  const isReducedMotion = useReducedMotion();
  const isTouchDevice = useHoverDisabled();
  const hapticEnabled = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  const contextValue = useMemo(() => ({
    isReducedMotion,
    isTouchDevice,
    hapticEnabled,
  }), [isReducedMotion, isTouchDevice, hapticEnabled]);

  return (
    <MicroInteractionContext.Provider value={contextValue}>
      <MotionConfig
        reducedMotion={isReducedMotion ? 'always' : 'user'}
        transition={{
          duration: isReducedMotion ? 0 : 0.2,
          ease: isReducedMotion ? 'linear' : 'easeOut',
        }}
      >
        {children}
      </MotionConfig>
    </MicroInteractionContext.Provider>
  );
}

export function useMicroInteractions() {
  const context = useContext(MicroInteractionContext);
  if (!context) {
    throw new Error('useMicroInteractions must be used within MicroInteractionProvider');
  }
  return context;
}
```

### 2. SkeletonCard

**File:** `apps/web/src/components/polish/SkeletonCard.tsx`

```typescript
import { ShimmerEffect } from './ShimmerEffect';

interface SkeletonCardProps {
  variant?: 'topic' | 'document' | 'assessment' | 'user';
  className?: string;
}

export function SkeletonCard({ variant = 'topic', className = '' }: SkeletonCardProps) {
  const variants = {
    topic: {
      image: { width: '100%', height: '160px', borderRadius: '8px 8px 0 0' },
      title: { width: '85%', height: '24px' },
      description: { width: '100%', height: '16px', lines: 2 },
      meta: { width: '60%', height: '14px' },
    },
    document: {
      image: { width: '48px', height: '48px', borderRadius: '6px' },
      title: { width: '75%', height: '20px' },
      description: { width: '100%', height: '14px', lines: 2 },
      meta: { width: '50%', height: '12px' },
    },
    assessment: {
      image: { width: '100%', height: '120px', borderRadius: '8px 8px 0 0' },
      title: { width: '90%', height: '22px' },
      description: { width: '100%', height: '15px', lines: 2 },
      meta: { width: '70%', height: '14px' },
    },
    user: {
      image: { width: '64px', height: '64px', borderRadius: '50%' },
      title: { width: '70%', height: '20px' },
      description: { width: '80%', height: '14px', lines: 1 },
      meta: { width: '50%', height: '12px' },
    },
  };

  const variantConfig = variants[variant];

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`} role="status" aria-label="Loading">
      <div style={variantConfig.image} className="bg-gray-200">
        <ShimmerEffect />
      </div>
      <div className="p-4 space-y-3">
        <div style={variantConfig.title} className="bg-gray-200">
          <ShimmerEffect />
        </div>
        {[...Array(variantConfig.description.lines)].map((_, i) => (
          <div key={i} style={variantConfig.description} className="bg-gray-200">
            <ShimmerEffect />
          </div>
        ))}
        <div style={variantConfig.meta} className="bg-gray-200">
          <ShimmerEffect />
        </div>
      </div>
    </div>
  );
}
```

### 3. SkeletonText

**File:** `apps/web/src/components/polish/SkeletonText.tsx`

```typescript
import { ShimmerEffect } from './ShimmerEffect';

interface SkeletonTextProps {
  lines?: number;
  width?: string | string[];
  height?: string;
  className?: string;
}

export function SkeletonText({
  lines = 1,
  width = '100%',
  height = '16px',
  className = '',
}: SkeletonTextProps) {
  const widths = Array.isArray(width) ? width : Array(lines).fill(width);

  return (
    <div className={`space-y-2 ${className}`} role="status" aria-label="Loading text">
      {widths.map((w, i) => (
        <div
          key={i}
          style={{ width: w, height }}
          className="bg-gray-200 rounded relative overflow-hidden"
        >
          <ShimmerEffect />
        </div>
      ))}
    </div>
  );
}
```

### 4. LoadingSpinner

**File:** `apps/web/src/components/polish/LoadingSpinner.tsx`

```typescript
import { motion } from 'framer-motion';
import { useMicroInteractions } from './MicroInteractionProvider';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
  label?: string;
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const colors = {
  primary: 'border-primary-600 border-t-transparent',
  white: 'border-white border-t-transparent',
  gray: 'border-gray-600 border-t-transparent',
};

export function LoadingSpinner({
  size = 'md',
  color = 'primary',
  label = 'Loading',
  className = '',
}: LoadingSpinnerProps) {
  const { isReducedMotion } = useMicroInteractions();

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`} role="status">
      <motion.div
        className={`rounded-full border-2 border-t-transparent ${sizes[size]} ${colors[color]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: isReducedMotion ? 0 : 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        aria-label={label}
      />
      {label && !isReducedMotion && (
        <span className="mt-2 text-sm text-gray-600 sr-only">{label}</span>
      )}
    </div>
  );
}
```

### 5. ProgressBar

**File:** `apps/web/src/components/polish/ProgressBar.tsx`

```typescript
import { motion } from 'framer-motion';
import { useMicroInteractions } from './MicroInteractionProvider';

interface ProgressBarProps {
  progress: number;
  variant?: 'determinate' | 'indeterminate' | 'step';
  steps?: number;
  currentStep?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  variant = 'determinate',
  steps = 5,
  currentStep = 0,
  label,
  showValue = false,
  className = '',
}: ProgressBarProps) {
  const { isReducedMotion } = useMicroInteractions();

  if (variant === 'step') {
    return (
      <div className={`space-y-2 ${className}`} role="progressbar" aria-valuenow={currentStep} aria-valuemin={0} aria-valuemax={steps} aria-label={label}>
        <div className="flex justify-between">
          {[...Array(steps)].map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 mx-0.5 rounded-full transition-colors ${
                i <= currentStep ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        {label && <p className="text-sm text-gray-600">{label}</p>}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        {variant === 'indeterminate' ? (
          <motion.div
            className="h-full bg-primary-600"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: isReducedMotion ? 0 : 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ width: '50%' }}
          />
        ) : (
          <motion.div
            className="h-full bg-primary-600"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            transition={{ duration: isReducedMotion ? 0 : 0.3 }}
          />
        )}
      </div>
      {showValue && (
        <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
      )}
      {label && <p className="text-sm text-gray-600">{label}</p>}
    </div>
  );
}
```

### 6. ToastNotification

**File:** `apps/web/src/components/polish/ToastNotification.tsx`

```typescript
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useMicroInteractions } from './MicroInteractionProvider';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  onDismiss: () => void;
}

const variants: Record<ToastVariant, { icon: string; color: string }> = {
  success: { icon: '✓', color: 'bg-green-50 border-green-200 text-green-800' },
  error: { icon: '✕', color: 'bg-red-50 border-red-200 text-red-800' },
  warning: { icon: '⚠', color: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
  info: { icon: 'ℹ', color: 'bg-blue-50 border-blue-200 text-blue-800' },
};

export function ToastNotification({
  id,
  message,
  variant = 'info',
  action,
  duration = 5000,
  onDismiss,
}: ToastNotificationProps) {
  const { isReducedMotion } = useMicroInteractions();
  const { trigger } = useHapticFeedback();
  const config = variants[variant];

  useEffect(() => {
    trigger('light');
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss, trigger]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: isReducedMotion ? 0 : 0.3 }}
      className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg ${config.color} max-w-md`}
      role="alert"
      aria-live="polite"
    >
      <span className="text-xl font-bold" aria-hidden="true">{config.icon}</span>
      <p className="flex-1 text-sm">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={onDismiss}
        className="ml-2 text-lg hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </motion.div>
  );
}
```

### 7. ErrorBoundary

**File:** `apps/web/src/components/polish/ErrorBoundary.tsx`

```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { EmptyState } from './EmptyState';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <EmptyState
          icon="error"
          title="Something went wrong"
          description={
            this.state.error?.message || 'An unexpected error occurred'
          }
          action={{
            label: 'Try again',
            onClick: this.handleRetry,
          }}
        />
      );
    }

    return this.props.children;
  }
}
```

### 8. EmptyState

**File:** `apps/web/src/components/polish/EmptyState.tsx`

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { useMicroInteractions } from './MicroInteractionProvider';

interface EmptyStateProps {
  icon: 'search' | 'folder' | 'document' | 'assessment' | 'user' | 'error' | 'custom';
  customIcon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const icons: Record<string, string> = {
  search: '🔍',
  folder: '📁',
  document: '📄',
  assessment: '📝',
  user: '👤',
  error: '❌',
};

export function EmptyState({
  icon,
  customIcon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  const { isReducedMotion } = useMicroInteractions();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isReducedMotion ? 0 : 0.4 }}
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`}
    >
      <div className="text-6xl mb-4" aria-hidden="true">
        {customIcon || icons[icon] || icons.search}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      )}
      <div className="flex gap-3">
        {action && (
          <button
            onClick={action.onClick}
            className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              action.variant === 'secondary'
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
                : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
            }`}
          >
            {action.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-4 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </motion.div>
  );
}
```

### 9. SuccessAnimation

**File:** `apps/web/src/components/polish/SuccessAnimation.tsx`

```typescript
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useMicroInteractions } from './MicroInteractionProvider';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface SuccessAnimationProps {
  onComplete?: () => void;
  duration?: number;
  message?: string;
}

export function SuccessAnimation({
  onComplete,
  duration = 2000,
  message = 'Success!',
}: SuccessAnimationProps) {
  const { isReducedMotion } = useMicroInteractions();
  const { trigger } = useHapticFeedback();

  useEffect(() => {
    if (!isReducedMotion) {
      trigger('success');
      const timer = setTimeout(() => onComplete?.(), duration);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [duration, onComplete, isReducedMotion, trigger]);

  if (isReducedMotion) {
    return (
      <div className="text-center p-4">
        <span className="text-4xl">✓</span>
        <p className="mt-2 text-lg font-medium text-green-600">{message}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="text-center p-4"
    >
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <svg
          className="w-20 h-20 mx-auto text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </svg>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-lg font-medium text-green-600"
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
```

### 10. ShimmerEffect

**File:** `apps/web/src/components/polish/ShimmerEffect.tsx`

```typescript
import { motion } from 'framer-motion';
import { useMicroInteractions } from './MicroInteractionProvider';

interface ShimmerEffectProps {
  className?: string;
}

export function ShimmerEffect({ className = '' }: ShimmerEffectProps) {
  const { isReducedMotion } = useMicroInteractions();

  if (isReducedMotion) {
    return <div className={`bg-gray-200 ${className}`} />;
  }

  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 ${className}`}
      animate={{ x: ['-100%', '100%'] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ backgroundSize: '200% 100%' }}
    />
  );
}
```

### 11. FocusRing

**File:** `apps/web/src/components/polish/FocusRing.tsx`

```typescript
import { useEffect, useState } from 'react';
import { useFocusVisible } from '@/hooks/useFocusVisible';

interface FocusRingProps {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'white' | 'danger';
}

const colors = {
  primary: 'focus:ring-primary-500',
  white: 'focus:ring-white',
  danger: 'focus:ring-red-500',
};

export function FocusRing({
  children,
  className = '',
  color = 'primary',
}: FocusRingProps) {
  const isFocusVisible = useFocusVisible();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocused(true);
      }
    };

    const handleMouseDown = () => {
      setIsFocused(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div
      className={`${className} ${
        isFocusVisible && isFocused
          ? `focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors[color]}`
          : ''
      }`}
    >
      {children}
    </div>
  );
}
```

### 12. TouchFeedback

**File:** `apps/web/src/components/polish/TouchFeedback.tsx`

```typescript
import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';
import { useHoverDisabled } from '@/hooks/useHoverDisabled';

interface TouchFeedbackProps {
  children: React.ReactNode;
  onTap?: () => void;
  onLongPress?: () => void;
  longPressDuration?: number;
  hapticPattern?: 'light' | 'medium' | 'heavy' | 'success';
  className?: string;
}

export function TouchFeedback({
  children,
  onTap,
  onLongPress,
  longPressDuration = 500,
  hapticPattern = 'light',
  className = '',
}: TouchFeedbackProps) {
  const [isPressed, setIsPressed] = useState(false);
  const { trigger } = useHapticFeedback();
  const isTouchDevice = useHoverDisabled();

  const handlePressStart = useCallback(() => {
    setIsPressed(true);
    if (isTouchDevice) {
      trigger(hapticPattern);
    }
  }, [hapticPattern, isTouchDevice, trigger]);

  const handlePressEnd = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleTap = useCallback(() => {
    onTap?.();
  }, [onTap]);

  const handleLongPress = useCallback(() => {
    onLongPress?.();
  }, [onLongPress]);

  if (!isTouchDevice) {
    return (
      <div className={className} onClick={handleTap}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      animate={{ scale: isPressed ? 0.95 : 1 }}
      transition={{ duration: 0.1 }}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onClick={handleTap}
      onContextMenu={(e) => {
        e.preventDefault();
        handleLongPress();
      }}
    >
      {children}
    </motion.div>
  );
}
```

## Hooks

### 1. useReducedMotion

**File:** `apps/web/src/hooks/useReducedMotion.ts`

```typescript
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
```

### 2. useHoverDisabled

**File:** `apps/web/src/hooks/useHoverDisabled.ts`

```typescript
import { useEffect, useState } from 'react';

export function useHoverDisabled(): boolean {
  const [hoverDisabled, setHoverDisabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none)');
    setHoverDisabled(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setHoverDisabled(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return hoverDisabled;
}
```

### 3. useFocusVisible

**File:** `apps/web/src/hooks/useFocusVisible.ts`

```typescript
import { useEffect, useState } from 'react';

export function useFocusVisible(): boolean {
  const [focusVisible, setFocusVisible] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        setFocusVisible(true);
      }
    }

    function handleMouseDown() {
      setFocusVisible(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return focusVisible;
}
```

### 4. usePressHold

**File:** `apps/web/src/hooks/usePressHold.ts`

```typescript
import { useCallback, useRef, useState } from 'react';

interface UsePressHoldOptions {
  duration?: number;
  onHold?: () => void;
  onCancel?: () => void;
}

export function usePressHold({
  duration = 500,
  onHold,
  onCancel,
}: UsePressHoldOptions = {}) {
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = useCallback(() => {
    setIsHolding(true);
    timerRef.current = setTimeout(() => {
      onHold?.();
      setIsHolding(false);
    }, duration);
  }, [duration, onHold]);

  const handlePressEnd = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (isHolding) {
      onCancel?.();
    }
    setIsHolding(false);
  }, [isHolding, onCancel]);

  return {
    isHolding,
    handlers: {
      onMouseDown: handlePressStart,
      onMouseUp: handlePressEnd,
      onMouseLeave: handlePressEnd,
      onTouchStart: handlePressStart,
      onTouchEnd: handlePressEnd,
    },
  };
}
```

### 5. useSwipeGesture

**File:** `apps/web/src/hooks/useSwipeGesture.ts`

```typescript
import { useCallback, useState } from 'react';

interface SwipeData {
  direction: 'left' | 'right' | 'up' | 'down';
  distance: number;
}

interface UseSwipeGestureOptions {
  threshold?: number;
  onSwipe?: (data: SwipeData) => void;
}

export function useSwipeGesture({
  threshold = 50,
  onSwipe,
}: UseSwipeGestureOptions = {}) {
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!startPos) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startPos.x;
      const deltaY = touch.clientY - startPos.y;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (Math.max(absX, absY) < threshold) return;

      let direction: SwipeData['direction'];
      if (absX > absY) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else {
        direction = deltaY > 0 ? 'down' : 'up';
      }

      onSwipe?.({ direction, distance: Math.max(absX, absY) });
      setStartPos(null);
    },
    [startPos, threshold, onSwipe]
  );

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  };
}
```

### 6. useHapticFeedback

**File:** `apps/web/src/hooks/useHapticFeedback.ts`

```typescript
import { useCallback } from 'react';

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export function useHapticFeedback() {
  const trigger = useCallback((pattern: HapticPattern = 'light') => {
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) {
      return;
    }

    const patterns: Record<HapticPattern, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 40,
      success: [50, 50, 50],
      warning: [100, 50, 100],
      error: [200, 50, 200],
    };

    navigator.vibrate(patterns[pattern]);
  }, []);

  return { trigger };
}
```

## State

### Animation Preferences Store

**File:** `apps/web/src/stores/animation-preferences.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AnimationPreferences {
  reducedMotion: boolean;
  hapticEnabled: boolean;
  animationsEnabled: boolean;
  setReducedMotion: (value: boolean) => void;
  setHapticEnabled: (value: boolean) => void;
  setAnimationsEnabled: (value: boolean) => void;
}

export const useAnimationPreferences = create<AnimationPreferences>()(
  persist(
    (set) => ({
      reducedMotion: false,
      hapticEnabled: true,
      animationsEnabled: true,
      setReducedMotion: (value) => set({ reducedMotion: value }),
      setHapticEnabled: (value) => set({ hapticEnabled: value }),
      setAnimationsEnabled: (value) => set({ animationsEnabled: value }),
    }),
    {
      name: 'animation-preferences',
    }
  )
);
```

## Models

### TypeScript Types

**File:** `apps/web/src/types/polish.ts`

```typescript
export interface AnimationConfig {
  duration: number;
  easing: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
  delay?: number;
}

export type MicroInteractionType =
  | 'hover'
  | 'press'
  | 'tap'
  | 'swipe'
  | 'scroll'
  | 'focus'
  | 'blur';

export interface MicroInteractionEvent {
  type: MicroInteractionType;
  target: HTMLElement;
  timestamp: number;
}

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}
```

## Folders

```
apps/web/src/
├── components/
│   └── polish/
│       ├── MicroInteractionProvider.tsx
│       ├── SkeletonCard.tsx
│       ├── SkeletonText.tsx
│       ├── LoadingSpinner.tsx
│       ├── ProgressBar.tsx
│       ├── ToastNotification.tsx
│       ├── ErrorBoundary.tsx
│       ├── EmptyState.tsx
│       ├── SuccessAnimation.tsx
│       ├── ShimmerEffect.tsx
│       ├── FocusRing.tsx
│       └── TouchFeedback.tsx
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useHoverDisabled.ts
│   ├── useFocusVisible.ts
│   ├── usePressHold.ts
│   ├── useSwipeGesture.ts
│   └── useHapticFeedback.ts
├── styles/
│   ├── animations.css
│   └── micro-interactions.css
├── utils/
│   ├── haptic.ts
│   └── motion.ts
├── stores/
│   └── animation-preferences.ts
└── types/
    └── polish.ts
```

## Files

### animation-variants.ts

**File:** `apps/web/src/utils/motion/animation-variants.ts`

```typescript
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const listItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};
```

### easing-curves.ts

**File:** `apps/web/src/utils/motion/easing-curves.ts`

```typescript
export const easings = {
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elastic: [0.68, -0.6, 0.32, 1.6],
  snap: [0.4, 0, 0.6, 1],
  gentle: [0.25, 0.1, 0.25, 1],
};
```

### timing-presets.ts

**File:** `apps/web/src/utils/motion/timing-presets.ts`

```typescript
export const timings = {
  instant: 0,
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.5,
  loading: 1.5,
};
```

### accessibility-enhancements.ts

**File:** `apps/web/src/utils/accessibility-enhancements.ts`

```typescript
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  
  element.addEventListener('keydown', handleKeyDown);
  
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
  };
}

export function manageFocusOnRouteChange(newContainer: HTMLElement) {
  const mainHeading = newContainer.querySelector('h1');
  if (mainHeading) {
    mainHeading.setAttribute('tabindex', '-1');
    mainHeading.focus();
  } else {
    const mainContent = newContainer.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
    }
  }
}
```

## SEO

No SEO changes in this phase.

## Loading

### Implementation Examples

```typescript
// Optimistic update pattern
async function handleLike(topicId: string) {
  const queryClient = useQueryClient();
  
  // Optimistically update UI
  queryClient.setQueryData(['topic', topicId], (old: Topic) => ({
    ...old,
    likes: old.likes + 1,
    isLiked: true,
  }));
  
  try {
    await api.likeTopic(topicId);
  } catch (error) {
    // Rollback on error
    queryClient.setQueryData(['topic', topicId], (old: Topic) => ({
      ...old,
      likes: old.likes - 1,
      isLiked: false,
    }));
    throw error;
  }
}

// Background refetch indicator
function useBackgroundRefetch(queryKey: string[]) {
  const { isRefetching } = useQuery(queryKey);
  
  useEffect(() => {
    if (isRefetching) {
      // Show subtle indicator
      document.documentElement.classList.add('refetching');
    } else {
      document.documentElement.classList.remove('refetching');
    }
  }, [isRefetching]);
}
```

## Errors

### Error Handling Pattern

```typescript
// Global error handler
export function handleError(error: Error, context: string) {
  console.error(`[${context}]`, error);
  
  // Log to monitoring service
  logError(error, { context });
  
  // Show user-friendly message
  const userMessage = getUserFriendlyMessage(error);
  showToast({
    message: userMessage,
    variant: 'error',
    action: {
      label: 'Retry',
      onClick: () => retryOperation(context),
    },
  });
}

function getUserFriendlyMessage(error: Error): string {
  if (error.name === 'NetworkError') {
    return 'Connection lost. Please check your internet and try again.';
  }
  if (error.message.includes('timeout')) {
    return 'Request took too long. Please try again.';
  }
  return 'Something went wrong. Please try again.';
}
```

## Accessibility

### WCAG 2.1 AA Compliance Checklist

- [ ] All interactive elements have visible focus indicators
- [ ] Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] All images have alt text or are marked decorative
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Dynamic content changes are announced
- [ ] Keyboard navigation works for all interactions
- [ ] No content relies solely on color
- [ ] Touch targets ≥ 44x44px
- [ ] Reduced motion preference respected
- [ ] No auto-playing media with sound
- [ ] Skip links provided for main content

## Responsive Behavior

### Breakpoint-Specific Behaviors

```css
/* Mobile (< 640px) */
- Bottom sheet modals instead of centered dialogs
- Full-width buttons
- Larger tap targets (48x48px minimum)
- Swipe gestures enabled
- Hover states disabled

/* Tablet (640px - 1024px) */
- Centered modals
- Two-column layouts where appropriate
- Standard tap targets (44x44px)
- Hover states enabled

/* Desktop (> 1024px) */
- Standard modals
- Multi-column layouts
- Hover states with tooltips
- Keyboard shortcuts available
```

## Backend Integration

No new backend integration required. This phase enhances existing functionality with better UX patterns.

## Acceptance Checklist

- [ ] MicroInteractionProvider wraps entire app
- [ ] All loading states use skeleton screens
- [ ] All async operations show loading indicators
- [ ] Error boundaries catch and display errors gracefully
- [ ] Empty states present for all list views
- [ ] Animations respect reduced-motion preference
- [ ] Touch targets meet 44x44px minimum on mobile
- [ ] Focus indicators visible on all interactive elements
- [ ] Haptic feedback implemented on supported devices
- [ ] Success animations trigger on completions
- [ ] All transitions use consistent timing (150-300ms)
- [ ] Toast notifications accessible and non-intrusive
- [ ] Swipe gestures work smoothly on mobile
- [ ] Long-press actions implemented where appropriate
- [ ] All form validations show inline feedback
- [ ] Progress indicators accurate and visible
- [ ] Visual hierarchy enhanced with shadows
- [ ] Color contrast passes WCAG AA everywhere
- [ ] Typography refined for readability
- [ ] Iconography consistent throughout
- [ ] Spacing system applied uniformly
- [ ] Dark mode refinements complete
- [ ] Print styles optimized
- [ ] Screen reader announcements working
- [ ] Keyboard navigation complete
- [ ] No console errors during normal usage
- [ ] Animation frame rate sustained at 60fps
- [ ] Zero layout shifts during interactions
