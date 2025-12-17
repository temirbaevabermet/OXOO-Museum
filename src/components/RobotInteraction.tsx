import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface RobotInteractionProps {
  onComplete: () => void;
}

export function RobotInteraction({ onComplete }: RobotInteractionProps) {
  const [isRefused, setIsRefused] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleRefuse = () => {
    setIsRefused(true);
    setIsLeaving(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const handleAccept = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {!isLeaving ? (
          <motion.div
            key="robot"
            className="relative max-w-2xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
          >
            {/* Robot Container */}
            <div className="relative bg-gradient-to-b from-gray-900 to-black border-4 border-cyan-500 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.5)]">
              {/* Robot "Head" with eye */}
              <div className="flex items-start gap-6 mb-6">
                <motion.div
                  className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg border-4 border-cyan-400 flex items-center justify-center relative overflow-hidden shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(6,182,212,0.5)',
                      '0 0 40px rgba(6,182,212,0.8)',
                      '0 0 20px rgba(6,182,212,0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Robot face details */}
                  <div className="relative">
                    {/* Eyes */}
                    <div className="flex gap-4 mb-4">
                      <motion.div
                        className="w-6 h-6 bg-cyan-300 rounded-full"
                        animate={{
                          scaleY: [1, 0.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                      <motion.div
                        className="w-6 h-6 bg-cyan-300 rounded-full"
                        animate={{
                          scaleY: [1, 0.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </div>
                    
                    {/* Mouth */}
                    <motion.div
                      className="w-12 h-2 bg-cyan-300 rounded-full"
                      animate={{
                        scaleX: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </div>

                  {/* Antenna */}
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full h-8 w-1 bg-cyan-400"
                    animate={{
                      height: ['2rem', '2.5rem', '2rem'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-300 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </motion.div>
                </motion.div>

                {/* Message bubble */}
                <div className="flex-1">
                  <motion.div
                    className="bg-gray-800 border-2 border-cyan-500 rounded-lg p-6 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {/* Speech bubble pointer */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-cyan-500" />
                    
                    <motion.p
                      className="text-cyan-300 mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      Приветствую, посетитель! Я — Гид-Бот 3000, куратор выставки «Три Зала».
                    </motion.p>
                    <motion.p
                      className="text-cyan-200 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Прежде чем мы продолжим, хотели бы вы поделиться своей информацией для организации персонализированного тура?
                    </motion.p>
                  </motion.div>
                </div>
              </div>

              {/* Form or Buttons */}
              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="buttons"
                    className="flex gap-4 justify-end"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: 1.5 }}
                  >
                    <Button
                      onClick={handleRefuse}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Нет Спасибо
                    </Button>
                    <Button
                      onClick={handleAccept}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/50"
                    >
                      Конечно, я поделюсь
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-cyan-400 mb-2 block">Name</label>
                        <Input
                          className="bg-gray-900 border-cyan-500/50 text-white focus:border-cyan-500"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="text-cyan-400 mb-2 block">Email</label>
                        <Input
                          type="email"
                          className="bg-gray-900 border-cyan-500/50 text-white focus:border-cyan-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                      <Button
                        type="button"
                        onClick={handleRefuse}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Skip
                      </Button>
                      <Button
                        type="submit"
                        className="bg-cyan-600 hover:bg-cyan-700 text-white shadow-lg shadow-cyan-500/50"
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
            </div>

            {/* Animated particles around robot */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 4) * 150],
                  y: [0, Math.sin(i * Math.PI / 4) * 150],
                  opacity: [0.8, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
