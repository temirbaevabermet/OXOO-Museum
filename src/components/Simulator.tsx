import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/simulator.css';

export const Simulator: React.FC = () => {
  return (
    <div className="page-container">
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

      <main className="sim-container">
        <Link to="/game" className="start-button">
          Get started
        </Link>
      </main>
    </div>
  );
};

