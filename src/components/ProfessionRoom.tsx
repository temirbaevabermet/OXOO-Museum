import { motion } from 'motion/react';
import { ArrowLeft, Award, Lightbulb, GraduationCap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QuizRobot } from './QuizRobot';

interface ProfessionRoomProps {
  onBack: () => void;
}

export function ProfessionRoom({ onBack }: ProfessionRoomProps) {
  // Profession-themed quiz questions
  const quizQuestions = [
  {
    question: 'Какой навык является самым ценным для профессионалов в XXI веке?',
    options: [
      'Техническая экспертиза',
      'Адаптивность и обучение',
      'Нетворкинг',
      'Знание отрасли',
    ],
    correctAnswer: 1,
    explanation: 'В быстро меняющихся отраслях способность адаптироваться и постоянно осваивать новые навыки считается самым ценным профессиональным качеством.',
  },
  {
    question: 'Как часто профессионалы должны обновлять свои навыки, чтобы оставаться востребованными?',
    options: [
      'Раз в год',
      'Каждые 2–3 года',
      'Постоянно',
      'Только при смене работы',
    ],
    correctAnswer: 2,
    explanation: 'С учетом быстрого развития технологий и отраслей, непрерывное обучение и развитие навыков необходимо для сохранения профессиональной актуальности.',
  },
  {
    question: 'Какой процент рабочих мест находят через профессиональные связи?',
    options: [
      'Около 20%',
      'Около 40%',
      'Около 60%',
      'Около 80%',
    ],
    correctAnswer: 3,
    explanation: 'Исследования показывают, что примерно 80% рабочих мест заполняются через нетворкинг, что подчеркивает важность профессиональных связей.',
  },
  {
    question: 'Какая тенденция профессиональных сертификаций развивается быстрее всего?',
    options: [
      'Традиционные степени',
      'Микрокреденциалы и цифровые бейджи',
      'Лицензии по отрасли',
      'Академические дипломы',
    ],
    correctAnswer: 1,
    explanation: 'Микрокреденциалы и цифровые бейджи быстро развиваются, так как они предлагают концентрированное, проверяемое подтверждение конкретных навыков, которые можно получить быстро.',
  },
  {
    question: 'Какой подход к профессиональному развитию рекомендуется?',
    options: [
      'Сосредоточиться только на текущей роли',
      'Изучать всё возможное',
      'T-образные навыки (глубокие + широкие)',
      'Узкая специализация',
    ],
    correctAnswer: 2,
    explanation: 'T-образные профессионалы имеют глубокую экспертизу в одной области (вертикальная) в сочетании с широкими знаниями в нескольких областях (горизонтальная), что делает их очень ценными.',
  },
];


  const exhibits = [
  {
    icon: GraduationCap,
    title: 'Непрерывное обучение',
    description: 'Осваивайте новые знания и навыки на протяжении всей жизни для профессионального роста.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Совершенство и мастерство',
    description: 'Добивайтесь экспертизы и признания в выбранной профессиональной области.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Lightbulb,
    title: 'Инновации и лидерство',
    description: 'Возглавляйте изменения и внедряйте инновации в своей профессиональной сфере.',
    color: 'from-green-500 to-emerald-500',
  },
];


  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-teal-950 via-gray-900 to-black relative overflow-hidden"
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
              linear-gradient(to right, rgba(20, 184, 166, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
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
            className="absolute w-1 h-1 bg-teal-400 rounded-full"
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
            className="mb-6 border-teal-500 text-teal-400 hover:bg-teal-500/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться в главный зал
          </Button>

          <h1 className="text-6xl text-teal-400 tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]">
            PROFESSION
          </h1>
          <p className="text-gray-400 tracking-wide">
            Mastery, expertise, and professional excellence
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
              <Card className="group relative bg-black/50 border-2 border-teal-500/30 hover:border-teal-500 transition-all duration-300 overflow-hidden cursor-pointer backdrop-blur-sm h-full">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                  <h3 className="text-teal-300 mb-4 tracking-wide uppercase">
                    {exhibit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-1">
                    {exhibit.description}
                  </p>

                  {/* Explore button */}
                  <Button
                    className="mt-6 bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Исследовать
                  </Button>
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />

      {/* Quiz Robot */}
      <QuizRobot 
        questions={quizQuestions} 
        color="emerald"
        intervalMin={3}
        intervalMax={5}
      />
    </motion.div>
  );
}
