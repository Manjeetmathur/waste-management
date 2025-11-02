'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  amplitude?: number;
}

export default function FloatingElement({ 
  children, 
  className = '',
  duration: _duration = 3, // Prefix with _ to indicate intentionally unused
  delay: _delay = 0, // Prefix with _ to indicate intentionally unused
  amplitude: _amplitude = 10 // Prefix with _ to indicate intentionally unused
}: FloatingElementProps) {
  // Removed floating animation to make elements stable
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}