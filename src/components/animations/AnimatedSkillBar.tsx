import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSkillBarProps {
  name: string;
  level: number;
  delay?: number;
  color?: string;
}

export function AnimatedSkillBar({ 
  name, 
  level, 
  delay = 0,
  color = 'from-purple-500 to-cyan-500'
}: AnimatedSkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <motion.span 
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.3 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ 
            duration: 1,
            delay,
            ease: [0.23, 1, 0.32, 1]
          }}
          style={{
            boxShadow: `0 0 20px hsl(var(--primary) / 0.5)`
          }}
        />
      </div>
    </div>
  );
}

interface SkillOrbProps {
  name: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export function SkillOrb({ name, icon, size = 'md', delay = 0 }: SkillOrbProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const sizes = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-24 h-24 text-sm',
    lg: 'w-32 h-32 text-base',
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${sizes[size]} flex flex-col items-center justify-center`}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ 
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
        }}
      />
      <div className="absolute inset-1 rounded-full glass flex flex-col items-center justify-center">
        {icon && <div className="mb-1">{icon}</div>}
        <span className="text-center px-1 leading-tight">{name}</span>
      </div>
    </motion.div>
  );
}

interface CircularProgressProps {
  value: number;
  label: string;
  size?: number;
  delay?: number;
}

export function CircularProgress({ value, label, size = 120, delay = 0 }: CircularProgressProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - (value / 100) * circumference } : {}}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.5 }}
          >
            {value}%
          </motion.span>
        </div>
      </div>
      <span className="mt-2 text-sm text-muted-foreground text-center">{label}</span>
    </motion.div>
  );
}
