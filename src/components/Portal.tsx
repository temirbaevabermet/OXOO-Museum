import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Briefcase, Award } from 'lucide-react';

interface PortalProps {
  id: 'family' | 'work' | 'profession';
  title: string;
  color: 'cyan' | 'purple' | 'emerald';
  delay: number;
  onClick?: () => void;
}

const colorMap = {
  cyan: {
    gradient: 'from-cyan-500 to-blue-500',
    shadow: 'shadow-cyan-500/50',
    glow: 'bg-cyan-500/20',
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    innerGlow: 'shadow-[0_0_30px_rgba(6,182,212,0.6)]',
  },
  purple: {
    gradient: 'from-purple-500 to-pink-500',
    shadow: 'shadow-purple-500/50',
    glow: 'bg-purple-500/20',
    border: 'border-purple-500',
    text: 'text-purple-400',
    innerGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]',
  },
  emerald: {
    gradient: 'from-emerald-500 to-green-500',
    shadow: 'shadow-emerald-500/50',
    glow: 'bg-emerald-500/20',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    innerGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.6)]',
  },
};

const iconMap = {
  family: Heart,
  work: Briefcase,
  profession: Award,
};

export function Portal({ id, title, color, delay, onClick }: PortalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colors = colorMap[color];
  const Icon = iconMap[id];

  return (
    <motion.div
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ delay, duration: 0.8, type: 'spring' }}
      className="relative"
    >
      <motion.div
        className="relative group cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {/* Outer glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full ${colors.glow} blur-xl`}
          animate={isHovered ? { scale: 1.2, opacity: 0.6 } : { scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />

        {/* Portal frame */}
        <div className={`relative w-64 h-64 rounded-full border-4 ${colors.border} ${colors.shadow} bg-black/50 backdrop-blur-sm overflow-hidden`}>
          {/* Animated portal interior */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Swirling effect */}
            <motion.div
              className={`absolute inset-4 rounded-full bg-gradient-to-br ${colors.gradient} opacity-20`}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className={`absolute inset-8 rounded-full bg-gradient-to-tl ${colors.gradient} opacity-20`}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {/* Energy rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full border-2 ${colors.border} opacity-30`}
                style={{
                  width: `${60 + i * 30}%`,
                  height: `${60 + i * 30}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Center icon */}
            <motion.div
              className={`relative z-10 ${colors.text}`}
              animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
            >
              <Icon className="w-16 h-16" />
            </motion.div>
          </div>

          {/* Portal particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${colors.gradient}`}
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * Math.PI / 4) * 100],
                y: [0, Math.sin(i * Math.PI / 4) * 100],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Title label */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-max"
          animate={isHovered ? { y: -5 } : { y: 0 }}
        >
          <div className={`${colors.text} tracking-wider uppercase px-4 py-2 rounded-full border ${colors.border} bg-black/70 backdrop-blur-sm ${colors.shadow}`}>
            {title}
          </div>
        </motion.div>

        {/* Hover indicators */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${colors.gradient}`}
                style={{
                  left: i % 2 === 0 ? '0' : 'auto',
                  right: i % 2 === 1 ? '0' : 'auto',
                  top: i < 2 ? '0' : 'auto',
                  bottom: i >= 2 ? '0' : 'auto',
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}