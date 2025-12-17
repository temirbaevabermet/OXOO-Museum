import { useState } from 'react';
import { motion } from 'motion/react';

interface DoorEntranceProps {
  onEnter: () => void;
}

export function DoorEntrance({ onEnter }: DoorEntranceProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleDoorClick = () => {
    if (!isOpening) {
      setIsOpening(true);
      // Transition to main room after door animation
      setTimeout(() => {
        onEnter();
      }, 2000);
    }
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-900 via-slate-900 to-black">
      {/* Background stars/particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Door container */}
      <div className="relative z-10">
        <motion.div
          className="relative w-[800px] h-[600px] cursor-pointer"
          whileHover={!isOpening ? { scale: 1.02 } : {}}
          onClick={handleDoorClick}
        >
          {/* Door frame */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-4">
            {/* Decorative elements on frame */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
            <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-cyan-500 rounded-full shadow-lg shadow-cyan-500/50" />
          </div>

          {/* Left door */}
          <motion.div
            className="absolute left-4 top-4 bottom-4 w-[calc(50%-24px)] bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-l-lg border-4 border-gray-500 shadow-2xl"
            animate={isOpening ? { x: -400, rotateY: -15 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Left door details */}
            <div className="h-full flex flex-col items-center justify-center p-8 relative">
              {/* Rivets */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"
                  style={{
                    left: i < 6 ? '10%' : '90%',
                    top: `${15 + (i % 6) * 14}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              ))}
              
              {/* Panel lines */}
              <div className="absolute inset-8 border-2 border-gray-600 rounded" />
              <div className="absolute inset-12 border border-gray-600 rounded" />
              
              {/* Central emblem */}
              <div className="w-20 h-20 border-4 border-cyan-500 rounded-full flex items-center justify-center bg-gray-700 shadow-lg shadow-cyan-500/30">
                <div className="w-12 h-12 border-2 border-cyan-400 rounded-full bg-cyan-500/20" />
              </div>
            </div>
          </motion.div>

          {/* Right door */}
          <motion.div
            className="absolute right-4 top-4 bottom-4 w-[calc(50%-24px)] bg-gradient-to-bl from-gray-600 via-gray-700 to-gray-800 rounded-r-lg border-4 border-gray-500 shadow-2xl"
            animate={isOpening ? { x: 400, rotateY: 15 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            {/* Right door details */}
            <div className="h-full flex flex-col items-center justify-center p-8 relative">
              {/* Rivets */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-4 h-4 bg-gray-800 rounded-full border-2 border-gray-600"
                  style={{
                    left: i < 6 ? '10%' : '90%',
                    top: `${15 + (i % 6) * 14}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              ))}
              
              {/* Panel lines */}
              <div className="absolute inset-8 border-2 border-gray-600 rounded" />
              <div className="absolute inset-12 border border-gray-600 rounded" />
              
              {/* Central emblem */}
              <div className="w-20 h-20 border-4 border-cyan-500 rounded-full flex items-center justify-center bg-gray-700 shadow-lg shadow-cyan-500/30">
                <div className="w-12 h-12 border-2 border-cyan-400 rounded-full bg-cyan-500/20" />
              </div>
            </div>
          </motion.div>

          {/* Center line */}
          {!isOpening && (
            <div className="absolute left-1/2 top-4 bottom-4 w-1 bg-gray-900 transform -translate-x-1/2 z-20" />
          )}
        </motion.div>

        {/* Instruction text */}
        {!isOpening && (
          <motion.div
            className="text-center mt-12"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-cyan-400 tracking-widest uppercase">Click to Enter</p>
          </motion.div>
        )}
      </div>

      {/* Light effect when opening */}
      {isOpening && (
        <motion.div
          className="absolute inset-0 bg-cyan-500/20 z-30 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.5, 1] }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
}
