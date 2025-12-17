import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from "react-router-dom";
import { Portal } from './Portal';
import { LoadingScreen } from './LoadingScreen';
import { RobotInteraction } from './RobotInteraction';
import { FamilyRoom } from './FamilyRoom';
import { WorkRoom } from './WorkRoom';
import { ProfessionRoom } from './ProfessionRoom';
import '../styles/home.css';

type PortalState = 'main' | 'loading' | 'robot' | 'family' | 'work' | 'profession';

export function MainRoom() {
  const [portalState, setPortalState] = useState<PortalState>('main');
  const [selectedColor, setSelectedColor] = useState<'cyan' | 'purple' | 'emerald'>('cyan');
  const [targetExhibition, setTargetExhibition] = useState<'family' | 'work' | 'profession'>('family');

  const handleFamilyClick = () => {
    setSelectedColor('cyan');
    setTargetExhibition('family');
    setPortalState('loading');
  };

  const handleWorkClick = () => {
    setSelectedColor('purple');
    setTargetExhibition('work');
    setPortalState('loading');
  };

  const handleProfessionClick = () => {
    setSelectedColor('emerald');
    setTargetExhibition('profession');
    setPortalState('loading');
  };

  useEffect(() => {
    if (portalState === 'loading') {
      const timer = setTimeout(() => {
        setPortalState('robot');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [portalState]);

  const handleRobotComplete = () => {
    setPortalState(targetExhibition);
  };

  const handleBackToMain = () => {
    setPortalState('main');
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">🏛️ OXOO museum!</div>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/simulator">Симулятор</Link>
          <Link to="/map">Карта</Link>
          <Link to="/stories">Истории</Link>
          <Link to="/artifacts">Артефакты</Link>
          <Link to="/about">О проекте</Link>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        {portalState === 'main' && (
          <motion.div
            key="main-room"
            className="relative h-screen w-full bg-gradient-to-b from-slate-900 via-gray-900 to-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Grid floor effect */}
            <div className="absolute bottom-0 w-full h-1/2 perspective-1000">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
                transform: 'rotateX(60deg) translateY(50%)',
                transformOrigin: 'bottom',
              }} />
            </div>

            {/* Ambient particles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.1, 0.6, 0.1],
                    y: [0, -30, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Title */}
            <motion.div
              className="absolute top-20 text-center z-10"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <h1 className="text-6xl text-cyan-400 tracking-wider mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                Музей общества OXOO!
              </h1>
              <p className="text-gray-400 tracking-widest uppercase">Выберите портал, чтобы начать свое путешествие</p>
            </motion.div>

            {/* Portals */}
            <div className="relative z-20 flex gap-16 items-center justify-center">
              <Portal
                id="family"
                title="Семья"
                color="cyan"
                delay={0.8}
                onClick={handleFamilyClick}
              />

              <Portal
                id="work"
                title="Труд"
                color="purple"
                delay={1.1}
                onClick={handleWorkClick}
              />

              <Portal
                id="profession"
                title="Профессии"
                color="emerald"
                delay={1.4}
                onClick={handleProfessionClick}
              />
            </div>

            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </motion.div>
        )}

        {portalState === 'loading' && (
          <LoadingScreen key="loading" color={selectedColor} />
        )}

        {portalState === 'robot' && (
          <RobotInteraction key="robot" onComplete={handleRobotComplete} />
        )}

        {portalState === 'family' && (
          <FamilyRoom key="family" onBack={handleBackToMain} />
        )}

        {portalState === 'work' && (
          <WorkRoom key="work" onBack={handleBackToMain} />
        )}

        {portalState === 'profession' && (
          <ProfessionRoom key="profession" onBack={handleBackToMain} />
        )}
      </AnimatePresence>

      <footer className="footer">
        <div className="footer-content">
          <div className="partners">
            <h4>Партнёры проекта</h4>
            <div className="partner-logos">
              <img src="/images/eulogo.png" alt="EU" />
              <img src="/images/UNDP.png" alt="UNDP" />
              <img src="/images/aucalogo.png" alt="AUCA" />
            </div>
          </div>

          <div className="social">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src="/images/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <img src="/images/facebook.svg" alt="Facebook" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer">
                <img src="/images/telegram.svg" alt="Telegram" />
              </a>
              <a href="mailto:oxoo.museum@gmail.com">
                <img src="/images/mail.svg" alt="Email" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Навигация</h4>
            <a href="about.html">Политика конфиденциальности</a>
            <a href="about.html">Контакты</a>
            <a href="about.html">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 OXOO Museum — Все права защищены
        </div>
      </footer>
    </div>
  );
}
