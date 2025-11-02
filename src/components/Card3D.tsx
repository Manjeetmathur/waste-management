'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  glowEffect?: boolean;
}

export default function Card3D({ 
  children, 
  className = '', 
  intensity: _intensity = 'medium', // Prefix with _ to indicate intentionally unused
  glowEffect = false 
}: Card3DProps) {
  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        glowEffect && 'hover:shadow-2xl hover:shadow-green-500/20',
        className
      )}
    >
      {children}
    </div>
  );
}