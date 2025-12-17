import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizRobotProps {
  questions: Question[];
  color?: 'cyan' | 'purple' | 'emerald';
  intervalMin?: number; // minutes
  intervalMax?: number; // minutes
}

const colorMap = {
  cyan: {
    primary: 'bg-cyan-600',
    secondary: 'bg-cyan-800',
    border: 'border-cyan-400',
    text: 'text-cyan-300',
    button: 'bg-cyan-600 hover:bg-cyan-700',
    shadow: 'shadow-cyan-500/50',
  },
  purple: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-800',
    border: 'border-purple-400',
    text: 'text-purple-300',
    button: 'bg-purple-600 hover:bg-purple-700',
    shadow: 'shadow-purple-500/50',
  },
  emerald: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-800',
    border: 'border-emerald-400',
    text: 'text-emerald-300',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    shadow: 'shadow-emerald-500/50',
  },
};

export function QuizRobot({ 
  questions, 
  color = 'cyan',
  intervalMin = 3,
  intervalMax = 5,
}: QuizRobotProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const colors = colorMap[color];
  const currentQuestion = questions[currentQuestionIndex];

  // Timer to show robot periodically
  useEffect(() => {
    const scheduleNextAppearance = () => {
      const randomInterval = (intervalMin + Math.random() * (intervalMax - intervalMin)) * 60 * 1000;
      return setTimeout(() => {
        setIsVisible(true);
        setShowResult(false);
        setSelectedAnswer(null);
        // Pick a random question
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
      }, randomInterval);
    };

    const timer = scheduleNextAppearance();
    return () => clearTimeout(timer);
  }, [isVisible, questions.length, intervalMin, intervalMax]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setTotalAnswered(prev => prev + 1);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-2xl w-full"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <Card className={`relative bg-gradient-to-b from-gray-900 to-black border-4 ${colors.border} p-8 shadow-[0_0_50px] ${colors.shadow}`}>
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Robot Header */}
              <div className="flex items-start gap-6 mb-6">
                {/* Robot Avatar */}
                <motion.div
                  className={`flex-shrink-0 w-24 h-24 bg-gradient-to-br ${colors.primary} ${colors.secondary} rounded-lg border-4 ${colors.border} flex items-center justify-center relative overflow-hidden shadow-lg`}
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(6,182,212,0.5)`,
                      `0 0 40px rgba(6,182,212,0.8)`,
                      `0 0 20px rgba(6,182,212,0.5)`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Robot face */}
                  <div className="relative">
                    {/* Eyes */}
                    <div className="flex gap-3 mb-3">
                      <motion.div
                        className={`w-4 h-4 ${colors.text} bg-white rounded-full`}
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                      <motion.div
                        className={`w-4 h-4 ${colors.text} bg-white rounded-full`}
                        animate={{ scaleY: [1, 0.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                    </div>
                    {/* Smile */}
                    <div className="w-8 h-1 bg-white rounded-full mx-auto" />
                  </div>

                  {/* Antenna */}
                  <motion.div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full h-6 w-1 ${colors.primary}`}
                    animate={{ height: ['1.5rem', '2rem', '1.5rem'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>

                {/* Greeting */}
                <div className="flex-1">
                  <h3 className={`${colors.text} tracking-wide uppercase mb-2`}>
                    Время викторины! 🤖
                  </h3>
                  <p className="text-gray-400">
                    Проверьте свои знания! {totalAnswered > 0 && `Score: ${score}/${totalAnswered}`}
                  </p>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h4 className="text-white mb-4 leading-relaxed">
                  {currentQuestion.question}
                </h4>

                {/* Answer options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showCorrectness = showResult && isSelected;

                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`
                          w-full p-4 rounded-lg border-2 text-left transition-all
                          ${isSelected ? `${colors.border} bg-gray-800` : 'border-gray-700 bg-gray-900/50'}
                          ${!showResult && 'hover:border-gray-500 hover:bg-gray-800'}
                          ${showResult && isCorrect && 'border-green-500 bg-green-500/20'}
                          ${showResult && isSelected && !isCorrect && 'border-red-500 bg-red-500/20'}
                          disabled:cursor-not-allowed
                          relative
                        `}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-200">{option}</span>
                          {showCorrectness && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', damping: 15 }}
                            >
                              {isCorrect ? (
                                <CheckCircle className="w-6 h-6 text-green-400" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-400" />
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation (shown after answering) */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    className={`mb-6 p-4 rounded-lg border-2 ${colors.border} bg-gray-800/50`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className={`${colors.text} mb-2`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Not quite!'}
                    </p>
                    <p className="text-gray-300">{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  onClick={handleDismiss}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  Отклонить
                </Button>
                {!showResult ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className={`${colors.button} text-white shadow-lg ${colors.shadow} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Отправить ответ
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className={`${colors.button} text-white shadow-lg ${colors.shadow}`}
                  >
                    Continue Exploring
                  </Button>
                )}
              </div>

              {/* Corner decorations */}
              <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 ${colors.border}`} />
              <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 ${colors.border}`} />
              <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 ${colors.border}`} />
              <div className={`absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 ${colors.border}`} />
            </Card>

            {/* Floating particles around robot */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 ${colors.primary} rounded-full`}
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * Math.PI / 3) * 100],
                  y: [0, Math.sin(i * Math.PI / 3) * 100],
                  opacity: [0.8, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
