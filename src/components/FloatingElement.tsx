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
  duration = 3,
  delay = 0,
  amplitude = 10
}: FloatingElementProps) {
  // Removed floating animation to make elements stable
  return (
    <div className={cn(className)}>
      {children}
    </div>
  );
}