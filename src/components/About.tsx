import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/about.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Могу ли я добавить историю или артефакт?",
    answer: "Да! Напишите нам на <b>contribute@oxoo.kg</b> с кратким описанием вашего материала. Мы свяжемся с вами и поможем с оцифровкой."
  },
  {
    question: "Кто модерирует контент и проверяет факты?",
    answer: "Все материалы проверяются командой проекта и экспертами-историками, чтобы сохранить точность и уважение к личным воспоминаниям."
  },
  {
    question: "Планируется ли мобильное приложение?",
    answer: "Да! В будущем появится приложение с удобной навигацией и возможностями дополненной реальности."
  },
  {
    question: "Как вы обеспечиваете конфиденциальность данных?",
    answer: "Мы следуем требованиям GDPR и местного законодательства. Личные данные публикуются только с согласия человека."
  },
];

interface FormData {
  name: string;
  email: string;
  message: string;
  agree: boolean;
}

interface TicketData {
  name: string;
  email: string;
  type: string;
  quantity: number;
  agree: boolean;
}

export const About: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    agree: false
  });
  const [ticketForm, setTicketForm] = useState<TicketData>({
    name: '',
    email: '',
    type: '',
    quantity: 1,
    agree: false
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Здесь будет логика отправки формы
    alert('Сообщение отправлено!');
    setContactForm({ name: '', email: '', message: '', agree: false });
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Ticket form submitted:', ticketForm);
    // Здесь будет логика покупки билета
    alert('Билет приобретен! Проверьте вашу почту.');
    setTicketForm({ name: '', email: '', type: '', quantity: 1, agree: false });
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setTicketForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
               type === 'number' ? parseInt(value) : value
    }));
  };

  return (
    <div className="about-container">
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

      <main className="content">
        <section className="mission">
          <h1>Оживляя историю, связывая поколения</h1>
          <p>
            ОХОО! — это народный цифровой архив, который хранит не парадную историю,
            а живые голоса и судьбы людей Кыргызстана. Мы верим, что история страны
            складывается из миллионов личных историй. Наша цель — собрать эти рассыпанные
            «жемчужины» памяти, связать их в единую ткань. Это мост между прошлым и будущим,
            который мы строим вместе с вами.
          </p>
        </section>

        <section className="partners-section">
          <h2>Команда и партнёры</h2>
          <div className="partners-grid">
            <div className="partner-item">
              <img src="/images/eulogo.png" alt="European Union" />
              <p>European Union</p>
            </div>
            <div className="partner-item">
              <img src="/images/UNDP.png" alt="UNDP" />
              <p>United Nations Development Programme</p>
            </div>
            <div className="partner-item">
              <img src="/images/aucalogo.png" alt="AUCA" />
              <p>American University of Central Asia</p>
            </div>
          </div>
        </section>

        <section className="faq">
          <h2>Часто задаваемые вопросы</h2>
          {faqData.map((item, index) => (
            <div key={index} className={`faq-item ${openFAQ === index ? 'active' : ''}`}>
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={openFAQ === index}
              >
                {item.question}
                <span className="faq-icon">{openFAQ === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <div dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          ))}
        </section>

        <section className="contact">
          <h2>Связаться с нами</h2>
          <p>Есть вопрос или предложение? Напишите нам!</p>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label htmlFor="name">Имя*</label>
            <input
              id="name"
              name="name"
              type="text"
              value={contactForm.name}
              onChange={handleContactChange}
              required
            />

            <label htmlFor="email">Email*</label>
            <input
              id="email"
              name="email"
              type="email"
              value={contactForm.email}
              onChange={handleContactChange}
              required
            />

            <label htmlFor="message">Сообщение*</label>
            <textarea
              id="message"
              name="message"
              value={contactForm.message}
              onChange={handleContactChange}
              required
            />

            <label className="checkbox">
              <input
                name="agree"
                type="checkbox"
                checked={contactForm.agree}
                onChange={handleContactChange}
                required
              />
              Я согласен(на) на обработку моих персональных данных
            </label>

            <button type="submit">Отправить</button>
          </form>
        </section>

        <section className="tickets">
          <h2>Купить билет</h2>
          <form className="ticket-form" onSubmit={handleTicketSubmit}>
            <label htmlFor="ticket-name">Имя и фамилия*</label>
            <input
              id="ticket-name"
              name="name"
              type="text"
              value={ticketForm.name}
              onChange={handleTicketChange}
              required
            />

            <label htmlFor="ticket-email">Email для получения билета*</label>
            <input
              id="ticket-email"
              name="email"
              type="email"
              value={ticketForm.email}
              onChange={handleTicketChange}
              required
            />

            <label htmlFor="ticket-type">Тип билета*</label>
            <select
              id="ticket-type"
              name="type"
              value={ticketForm.type}
              onChange={handleTicketChange}
              required
            >
              <option value="">Выберите</option>
              <option value="adult">Взрослый — 300 сом</option>
              <option value="student">Студенческий — 150 сом</option>
              <option value="child">Детский — 100 сом</option>
            </select>

            <label htmlFor="ticket-quantity">Количество*</label>
            <input
              id="ticket-quantity"
              name="quantity"
              type="number"
              min="1"
              value={ticketForm.quantity}
              onChange={handleTicketChange}
              required
            />

            <label className="checkbox">
              <input
                name="agree"
                type="checkbox"
                checked={ticketForm.agree}
                onChange={handleTicketChange}
                required
              />
              Я согласен(на) с условиями покупки и политикой данных
            </label>

            <button type="submit">Купить билет</button>
          </form>
          <p className="ticket-note">
            После оплаты вы получите электронный билет на указанный email.
          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="partners">
            <h4>Партнёры проекта</h4>
            <div className="partner-logos">
              <img src="/images/eulogo.png" alt="European Union" />
              <img src="/images/UNDP.png" alt="UNDP" />
              <img src="/images/aucalogo.png" alt="AUCA" />
            </div>
          </div>

          <div className="social">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook.svg" alt="Facebook" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                <img src="/images/telegram.svg" alt="Telegram" />
              </a>
              <a href="mailto:oxoo.museum@gmail.com">
                <img src="/images/mail.svg" alt="Email" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Навигация</h4>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 OXOO Museum — Лицензия CC BY-SA | Соответствие GDPR
        </div>
      </footer>
    </div>
  );
};