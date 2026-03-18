import { motion, type Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  if (!text) return null;
  
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 15,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="mr-[0.3em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypingText({ text, className = '', delay = 0, speed = 50 }: TypingTextProps) {
  if (!text) return null;
  
  return (
    <motion.span
      className={`${className} typing-cursor`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * speed / 1000 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  if (!text) return null;
  
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.span
        className="relative z-10 inline-block"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.span>
      
      {/* Glitch layer 1 - cyan */}
      <motion.span
        className="absolute inset-0 text-cyan-400 opacity-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.6, 0, 0.4, 0],
          x: [-2, 3, -1, 0],
        }}
        transition={{ 
          duration: 0.4,
          delay: 0.2,
          times: [0, 0.2, 0.4, 0.7, 1]
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      
      {/* Glitch layer 2 - purple */}
      <motion.span
        className="absolute inset-0 text-purple-500 opacity-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.5, 0, 0.3, 0],
          x: [2, -3, 1, 0],
        }}
        transition={{ 
          duration: 0.4,
          delay: 0.25,
          times: [0, 0.2, 0.4, 0.7, 1]
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </div>
  );
}
