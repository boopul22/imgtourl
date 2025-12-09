'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScrollButtonProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: () => void;
}

export default function ScrollButton({
  targetId,
  children,
  className,
  size = 'lg',
  variant = 'default',
  onClick
}: ScrollButtonProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Focus the target element for screen readers
      target.focus({ preventScroll: true });
    }
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-describedby={`scroll-to-${targetId}`}
    >
      {children}
      <span id={`scroll-to-${targetId}`} className="sr-only">
        Scroll to {targetId.replace('-', ' ')} section
      </span>
    </Button>
  );
}
