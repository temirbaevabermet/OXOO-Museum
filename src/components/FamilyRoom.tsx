import { motion } from 'motion/react';
import { ArrowLeft, Heart, Home, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QuizRobot } from './QuizRobot';

interface FamilyRoomProps {
  onBack: () => void;
}

export function FamilyRoom({ onBack }: FamilyRoomProps) {
  // Family-themed quiz questions
  const quizQuestions = [
    {
      question: 'Что считается основой крепких семейных отношений?',
      options: [
        'Деньги и богатство',
        'Общение и доверие',
        'Совместное проживание в одном доме',
        'Наличие общих хобби',
      ],
      correctAnswer: 1,
      explanation: 'Общение и доверие являются краеугольными камнями здоровых семейных отношений, позволяя членам семьи делиться чувствами, разрешать конфликты и поддерживать друг друга.',
    },
    {
      question: 'Какая деятельность доказано укрепляет семейные связи больше всего?',
      options: [
        'Совместный просмотр телевизора',
        'Регулярные совместные приемы пищи',
        'Совместные походы за покупками',
        'Использование социальных сетей',
      ],
      correctAnswer: 1,
      explanation: 'Исследования показывают, что семьи, которые регулярно едят вместе, имеют более крепкие отношения, лучше общаются и демонстрируют улучшенное психическое здоровье.',
    },
    {
      question: 'Какой процент коммуникации в семейных взаимодействиях является невербальным?',
      options: [
        'Около 25%',
        'Около 50%',
        'Около 70%',
        'Около 90%',
      ],
      correctAnswer: 2,
      explanation: 'Исследования показывают, что примерно 70% общения является невербальным, включая язык тела, интонацию и мимику.',
    },
    {
      question: 'Что важно для поддержания баланса между работой и личной жизнью в семье?',
      options: [
        'Работать дольше часов',
        'Установление границ и качественное время вместе',
        'Избегать семейных мероприятий',
        'Всегда ставить работу на первое место',
      ],
      correctAnswer: 1,
      explanation: 'Установление четких границ между работой и личным временем, а также посвящение качественного времени семье, важно для поддержания здоровых отношений и общего благополучия.',
    },
    {
      question: 'Какой стиль воспитания детей считается наиболее эффективным?',
      options: [
        'Авторитарный (строгие правила)',
        'Потворствующий (мало правил)',
        'Авторитетный (сбалансированный)',
        'Безразличный (отстраненный)',
      ],
      correctAnswer: 2,
      explanation: 'Авторитетный стиль воспитания, который сочетает ясные ожидания с теплотой и поддержкой, обычно связан с наилучшими результатами развития детей.',
    },
  ];


  const exhibits = [
    {
      icon: Heart,
      title: 'Создание прочных связей',
      description: 'Изучите стратегии создания и поддержания значимых семейных связей.',
      color: 'from-rose-500 to-pink-500',
    },
    {
      icon: Home,
      title: 'Создание домашней гармонии',
      description: 'Найдите способы создания мирной и благоприятной домашней обстановки.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Мудрость поколений',
      description: 'Узнайте, как разные поколения способствуют прочности и устойчивости семьи.',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-rose-950 via-gray-900 to-black relative overflow-hidden"
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
              linear-gradient(to right, rgba(244, 63, 94, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(244, 63, 94, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating hearts particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${12 + Math.random() * 12}px`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ♥
          </motion.div>
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
            className="mb-6 border-rose-500 text-rose-400 hover:bg-rose-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться в главный зал
          </Button>

          <h1 className="text-6xl text-rose-400 tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
            СЕМЬЯ
          </h1>
          <p className="text-gray-400 tracking-wide">
            Откройте для себя суть человеческих связей и принадлежности
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
              <Card className="group relative bg-black/50 border-2 border-rose-500/30 hover:border-rose-500 transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-sm h-full">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                  <h3 className="text-rose-300 mb-4 tracking-wide uppercase">
                    {exhibit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-1">
                    {exhibit.description}
                  </p>

                  {/* Explore button */}
                  <Button
                    className="mt-6 bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Исследовать
                  </Button>
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-rose-500/10 rounded-full blur-3xl" />

      {/* Quiz Robot */}
      <QuizRobot
        questions={quizQuestions}
        color="cyan"
        intervalMin={3}
        intervalMax={5}
      />
    </motion.div>
  );
}
