import { motion } from 'motion/react';

interface LoadingScreenProps {
  color: 'cyan' | 'purple' | 'emerald';
}

const colorMap = {
  cyan: {
    primary: 'text-cyan-400',
    secondary: 'text-cyan-600',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.6)]',
  },
  purple: {
    primary: 'text-purple-400',
    secondary: 'text-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]',
  },
  emerald: {
    primary: 'text-emerald-400',
    secondary: 'text-emerald-600',
    gradient: 'from-emerald-500 to-green-500',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.6)]',
  },
};

export function LoadingScreen({ color }: LoadingScreenProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scanning lines effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} opacity-5`}
        animate={{
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Center loading content */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Rotating hexagon loader */}
        <div className="relative w-32 h-32">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute inset-0 border-4 ${colors.primary} opacity-50`}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.3,
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                },
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center">
          <motion.h2
            className={`${colors.primary} tracking-widest uppercase mb-2`}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            Initializing Portal
          </motion.h2>
          
          {/* Loading dots */}
          <div className="flex gap-2 justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.gradient}`}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${colors.gradient} ${colors.glow}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Corner decorations */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-20 h-20 border-4 ${colors.primary}`}
          style={{
            left: i % 2 === 0 ? '2rem' : 'auto',
            right: i % 2 === 1 ? '2rem' : 'auto',
            top: i < 2 ? '2rem' : 'auto',
            bottom: i >= 2 ? '2rem' : 'auto',
            borderTop: i < 2 ? undefined : 'none',
            borderBottom: i >= 2 ? undefined : 'none',
            borderLeft: i % 2 === 0 ? undefined : 'none',
            borderRight: i % 2 === 1 ? undefined : 'none',
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
}
