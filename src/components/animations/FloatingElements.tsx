import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  distance?: number;
}

export function FloatingElement({ 
  children, 
  className = '',
  duration = 6,
  delay = 0,
  distance = 20
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface OrbitElementProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  duration?: number;
  reverse?: boolean;
}

export function OrbitElement({ 
  children, 
  className = '',
  radius = 100,
  duration = 20,
  reverse = false
}: OrbitElementProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        rotate: reverse ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <div 
        className="absolute"
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

interface PulsingDotProps {
  className?: string;
  size?: number;
  color?: string;
}

export function PulsingDot({ 
  className = '',
  size = 8,
  color = '#8b5cf6'
}: PulsingDotProps) {
  return (
    <div className={`relative ${className}`}>
      <div 
        className="rounded-full"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color,
          boxShadow: `0 0 ${size * 2}px ${color}`
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </div>
  );
}

interface AnimatedBackgroundShapeProps {
  className?: string;
  type?: 'circle' | 'square' | 'triangle';
  size?: number;
  color?: string;
}

export function AnimatedBackgroundShape({ 
  className = '',
  type = 'circle',
  size = 200,
  color = 'rgba(139, 92, 246, 0.1)'
}: AnimatedBackgroundShapeProps) {
  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    triangle: 'clip-path-triangle',
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${shapes[type]} ${className}`}
      style={{ 
        width: size, 
        height: size, 
        background: `linear-gradient(135deg, ${color}, transparent)` 
      }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function GridPattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function GradientOrbs({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          top: '-200px',
          left: '-200px',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          bottom: '-150px',
          right: '-150px',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
