import { motion } from 'motion/react';
import { ArrowLeft, Briefcase, Target, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QuizRobot } from './QuizRobot';

interface WorkRoomProps {
  onBack: () => void;
}

export function WorkRoom({ onBack }: WorkRoomProps) {
  // Work-themed quiz questions
  const quizQuestions = [
  {
    question: 'Какой фактор является самым важным для удовлетворенности сотрудников работой?',
    options: [
      'Высокая зарплата',
      'Баланс между работой и личной жизнью',
      'Репутация компании',
      'Расположение офиса',
    ],
    correctAnswer: 1,
    explanation: 'Исследования последовательно показывают, что баланс между работой и личной жизнью является главным фактором удовлетворенности работой, даже важнее зарплаты, так как он влияет на качество жизни и психическое здоровье.',
  },
  {
    question: 'Согласно исследованиям продуктивности, каков идеальный рабочий интервал перед перерывом?',
    options: [
      '25 минут (метод Помодоро)',
      '60 минут',
      '90 минут',
      '120 минут',
    ],
    correctAnswer: 2,
    explanation: 'Исследования ультрадианных ритмов показывают, что мозг работает оптимально в 90-минутных циклах, после которых перерыв полезен для поддержания продуктивности.',
  },
  {
    question: 'Какой процент успеха на рабочем месте приписывается эмоциональному интеллекту (EQ)?',
    options: [
      'Около 25%',
      'Около 50%',
      'Около 75%',
      'Около 90%',
    ],
    correctAnswer: 3,
    explanation: 'Исследования показывают, что эмоциональный интеллект составляет примерно 90% того, что отличает высокоэффективных сотрудников от коллег с похожими техническими навыками.',
  },
  {
    question: 'Какой стиль рабочей среды доказано наиболее эффективен для сотрудничества?',
    options: [
      'Полностью открытый офис',
      'Только отдельные кабинеты',
      'Гибридные пространства с обоими вариантами',
      'Только удаленная работа',
    ],
    correctAnswer: 2,
    explanation: 'Гибридные пространства, которые предлагают как зоны для совместной работы, так и отдельные кабинеты для сосредоточенной работы, наиболее эффективно учитывают различные рабочие стили и задачи.',
  },
  {
    question: 'Каково рекомендуемое соотношение положительной и отрицательной обратной связи для оптимальной производительности?',
    options: [
      '1:1 (равное)',
      '2:1 (две положительные)',
      '5:1 (пять положительных)',
      '10:1 (десять положительных)',
    ],
    correctAnswer: 2,
    explanation: 'Исследования организационных психологов показывают, что соотношение примерно 5:1 положительной и отрицательной обратной связи создает наилучшую среду для роста и производительности.',
  },
];


  const exhibits = [
    {
      icon: Target,
      title: 'Достижение цели',
      description: 'Овладейте искусством постановки и достижения значимых профессиональных целей.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: TrendingUp,
      title: 'Мастерство продуктивности',
      description: 'Откройте для себя стратегии, позволяющие максимально повысить эффективность и результативность вашей работы.',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Briefcase,
      title: 'Карьерный рост',
      description: 'Прокладывайте свой профессиональный путь уверенно и целенаправленно.',
      color: 'from-sky-500 to-blue-500',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-indigo-950 via-gray-900 to-black relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 py-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 border-indigo-500 text-indigo-400 hover:bg-indigo-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться в главный зал
          </Button>

          <h1 className="text-6xl text-indigo-400 tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            ПРОФЕССИИ
          </h1>
          <p className="text-gray-400 tracking-wide">
            Превосходство в производительности и профессиональной самореализации
          </p>
        </motion.div>

        {/* Exhibits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exhibits.map((exhibit, index) => (
            <motion.div
              key={exhibit.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.2 }}
            >
              <Card className="group relative bg-black/50 border-2 border-indigo-500/30 hover:border-indigo-500 transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-sm h-full">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <motion.div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${exhibit.color} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <exhibit.icon className="w-12 h-12 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-indigo-300 mb-4 tracking-wide uppercase">
                    {exhibit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-1">
                    {exhibit.description}
                  </p>

                  {/* Explore button */}
                  <Button
                    className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Исследовать
                  </Button>
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Quiz Robot */}
      <QuizRobot 
        questions={quizQuestions} 
        color="purple"
        intervalMin={3}
        intervalMax={5}
      />
    </motion.div>
  );
}
