import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/artifacts.css';

interface Artifact {
  id: number;
  name: string;
  category: string;
  period: string;
  type: string;
  region: string;
  description: string;
  fullDescription: string;
  image: string;
  relatedHall: string;
  mapLocation?: string;
  details: string;
}

const initialArtifacts: Artifact[] = [
  {
    id: 1,
    name: "Невестино приданое (сегиз коро)",
    category: "Семья",
    period: "XX век",
    type: "вещь",
    region: "Чуйская область",
    description: "Традиционное приданое невесты, включающее восемь предметов",
    fullDescription: "Сегиз коро — традиционное приданое кыргызской невесты, состоящее из восьми основных предметов: одежда, украшения, предметы быта и постельные принадлежности. Каждый предмет имеет символическое значение и передаётся из поколения в поколение. Этот комплект демонстрирует богатые традиции кыргызской свадьбы и важность семейных ценностей.",
    image: "/OXOO-Museum/images/segiz-koro.jpg",
    relatedHall: "Семейные традиции",
    mapLocation: "chuyskaya",
    details: "Включает: чапан, шокюло, тебетей, белдемчи, жуук, шырдак, туш кийиз, постельные принадлежности"
  },
  {
    id: 2,
    name: "Серп ('Орок')",
    category: "Труд",
    period: "XX век",
    type: "вещь",
    region: "Иссык-Куль",
    description: "Традиционный сельскохозяйственный инструмент для жатвы",
    fullDescription: "Серп (Орок) — основной инструмент для сбора урожая в традиционном кыргызском сельском хозяйстве. Использовался для жатвы пшеницы, ячменя и других зерновых культур. Каждый серп изготавливался индивидуально кузнецом с учётом особенностей руки хозяина. Этот инструмент символизирует тяжёлый труд земледельцев и их связь с землёй.",
    image: "/OXOO-Museum/images/orok.jpg",
    relatedHall: "Сельское хозяйство",
    mapLocation: "issyk-kul",
    details: "Материал: сталь, дерево. Длина: 35-40 см. Использовался до механизации сельского хозяйства в 1960-х годах."
  },
  {
    id: 3,
    name: "Первые IT-специалисты Кыргызстана",
    category: "Профессии",
    period: "XX век",
    type: "фото",
    region: "Бишкек",
    description: "Фотография первых программистов республики",
    fullDescription: "Эта историческая фотография запечатлела первую группу IT-специалистов Кыргызстана, обученных в московских и ленинградских вузах в 1970-х годах. Они стали пионерами компьютерных технологий в республике, работая с первыми ЭВМ серии ЕС и создавая программное обеспечение для народного хозяйства. Их работа заложила основу для развития IT-индустрии в независимом Кыргызстане.",
    image: "/OXOO-Museum/images/first-it.jpg",
    relatedHall: "Технологии и инновации",
    mapLocation: "bishkek",
    details: "1978 год, группа из 15 специалистов. Работали с ЭВМ ЕС-1020, ЕС-1033. Разрабатывали системы для Госплана и статистики."
  },
  {
    id: 4,
    name: "Советский патефон",
    category: "Семья",
    period: "1950-е",
    type: "вещь",
    region: "Ош",
    description: "Патефон для проигрывания виниловых пластинок",
    fullDescription: "Патефон был центром семейного досуга в 1950-60-е годы. По вечерам семьи собирались вокруг него, чтобы послушать музыку, радиоспектакли и новости. Этот конкретный экземпляр принадлежал семье учителей из Оша и сохранился в отличном состоянии. На нём звучали как советские хиты, так и традиционная кыргызская музыка.",
    image: "/OXOO-Museum/images/pathephone.jpg",
    relatedHall: "Культура и досуг",
    mapLocation: "osh",
    details: "Модель: ПЭ-19. Производитель: Ленинградский завод. Сохранены оригинальные иглы и пружина."
  },
  {
    id: 5,
    name: "Партийный билет",
    category: "Профессии",
    period: "1980-е",
    type: "документ",
    region: "Нарын",
    description: "Членский билет Коммунистической партии",
    fullDescription: "Партийный билет был не просто документом — он определял социальный статус и карьерные возможности человека в советское время. Этот билет принадлежал секретарю райкома партии в Нарынской области. Содержит отметки о уплате членских взносов и участии в партийных собраниях. Является свидетельством политической системы того времени.",
    image: "/OXOO-Museum/images/party-card.jpg",
    relatedHall: "Политическая история",
    mapLocation: "naryn",
    details: "Серия МН № 458632. Выдан в 1985 году. Состояние: хорошее, имеются все страницы."
  },
  {
    id: 6,
    name: "Запись народной песни",
    category: "Семья",
    period: "1970-е",
    type: "запись",
    region: "Талас",
    description: "Аудиозапись народного сказителя-манасчи",
    fullDescription: "Уникальная аудиозапись исполнения эпоса 'Манас' народным сказителем (манасчи) из Таласской области. Запись была сделана сотрудниками Академии наук в 1978 году во время фольклорной экспедиции. Манасчи исполняет отрывок из главы 'Великий поход', демонстрируя традиционную манеру исполнения и богатство кыргызского языка.",
    image: "/OXOO-Museum/images/manas-recording.jpg",
    relatedHall: "Устное творчество",
    mapLocation: "talas",
    details: "Формат: магнитная лента. Длительность: 45 минут. Сказитель: Жумабек, 68 лет. Сохранность: хорошая."
  },
  {
    id: 7,
    name: "Школьная форма",
    category: "Профессии",
    period: "1960-е",
    type: "вещь",
    region: "Джалал-Абад",
    description: "Советская школьная форма для девочек",
    fullDescription: "Классическая советская школьная форма для девочек: коричвое платье с черным фартуком и белыми воротничками. Эта форма принадлежала ученице школы №1 в Джалал-Абаде. Форма символизирует единство образовательной системы и дисциплину того времени. Белый фартук надевался по праздникам, черный — в будние дни.",
    image: "/OXOO-Museum/images/school-uniform.jpg",
    relatedHall: "Образовательная система",
    mapLocation: "jalal-abad",
    details: "Размер: 146 см. Состояние: хорошее, небольшие потертости. Комплект: платье, 2 фартука, пионерский галстук."
  },
  {
    id: 8,
    name: "Медицинские инструменты",
    category: "Профессии",
    period: "1970-е",
    type: "вещь",
    region: "Баткен",
    description: "Набор врача сельской амбулатории",
    fullDescription: "Комплект медицинских инструментов, использовавшийся врачом в сельской амбулатории Баткенской области. Включает стетоскоп, шприцы, хирургические инструменты и аптечку первой помощи. Демонстрирует условия работы медиков в отдалённых регионах и развитие здравоохранения в советский период.",
    image: "/OXOO-Museum/images/medical-tools.jpg",
    relatedHall: "Здравоохранение",
    mapLocation: "batken",
    details: "В комплекте: стетоскоп, 5 шприцев, скальпели, зажимы, пинцеты. Производитель: СССР. Состояние: рабочее."
  },
  {
    id: 9,
    name: "Ткацкий станок",
    category: "Труд",
    period: "XIX век",
    type: "вещь",
    region: "Нарын",
    description: "Традиционный деревянный ткацкий станок",
    fullDescription: "Деревянный ткацкий станок, использовавшийся для создания традиционных кыргызских ковров и тканей. Каждая семья имела такой станок, и искусство ткачества передавалось от матери к дочери. На этом станке создавались знаменитые шырдаки и ала-кийизы, которые были не только предметами быта, но и формой художественного выражения.",
    image: "/OXOO-Museum/images/weaving-loom.avif",
    relatedHall: "Ремесла и рукоделие",
    mapLocation: "naryn",
    details: "Материал: дерево. Размеры: 120x80 см. Использовался для создания шырдаков и ала-кийизов."
  },
  {
    id: 10,
    name: "Фотография первой женщины-врача",
    category: "Профессии",
    period: "1930-е",
    type: "фото",
    region: "Бишкек",
    description: "Первая кыргызская женщина-врач",
    fullDescription: "Историческая фотография первой кыргызской женщины, получившей медицинское образование. Она окончила медицинский институт в Москве и вернулась в Кыргызстан, где работала в сельской местности, оказывая медицинскую помощь местному населению. Её деятельность способствовала улучшению здравоохранения и打破 гендерных стереотипов в профессии.",
    image: "/OXOO-Museum/images/first-doctor.jpg",
    relatedHall: "Здравоохранение",
    mapLocation: "bishkek",
    details: "1935 год. Имя: Айша. Образование: Московский медицинский институт. Специальность: терапевт."
  }
];

const categories = ["Все категории", "Семья", "Труд", "Профессии"];
const periods = ["Все периоды", "XIX век", "1900-1910", "1920-1930", "1940-1950", "1960-1970", "1980-1990", "2000-е", "2010-е", "2020-е"];
const types = ["Все типы", "фото", "вещь", "документ", "запись"];

export const Artifacts: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [filteredArtifacts, setFilteredArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showAIHint, setShowAIHint] = useState(false);
  const [filters, setFilters] = useState({
    category: 'Все категории',
    period: 'Все периоды',
    type: 'Все типы'
  });

  // Фильтрация артефактов
  useEffect(() => {
    let result = artifacts;

    if (filters.category !== 'Все категории') {
      result = result.filter(artifact => artifact.category === filters.category);
    }

    if (filters.period !== 'Все периоды') {
      result = result.filter(artifact => artifact.period === filters.period);
    }

    if (filters.type !== 'Все типы') {
      result = result.filter(artifact => artifact.type === filters.type);
    }

    setFilteredArtifacts(result);
  }, [filters, artifacts]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const openArtifactDetail = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
  };

  const closeArtifactDetail = () => {
    setSelectedArtifact(null);
    setShowAIHint(false);
  };

  const handleAIHint = () => {
    setShowAIHint(true);
  };

  // Похожие артефакты (того же периода)
  const getRelatedArtifacts = (currentArtifact: Artifact) => {
    return artifacts.filter(artifact => 
      artifact.id !== currentArtifact.id && 
      artifact.period === currentArtifact.period
    ).slice(0, 4);
  };

  if (selectedArtifact) {
    const relatedArtifacts = getRelatedArtifacts(selectedArtifact);

    return (
      <div className="artifacts-container">
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

        <div className="artifact-detail-container">
          <button className="back-button" onClick={closeArtifactDetail}>
            ← Назад к артефактам
          </button>

          <div className="artifact-detail">
            <div className="artifact-header">
              <div className="artifact-image-container">
                <img 
                  src={selectedArtifact.image} 
                  alt={selectedArtifact.name} 
                  className="artifact-detail-image"
                />
                {selectedArtifact.type === 'запись' && (
                  <div className="audio-player">
                    <button className="play-button">▶️ Воспроизвести запись</button>
                  </div>
                )}
              </div>
              
              <div className="artifact-info">
                <h1>{selectedArtifact.name}</h1>
                <div className="artifact-meta">
                  <span className="region">{selectedArtifact.region}</span>
                  <span className="category">{selectedArtifact.category}</span>
                  <span className="period">{selectedArtifact.period}</span>
                  <span className="type">{selectedArtifact.type}</span>
                </div>
                <p className="artifact-description">{selectedArtifact.description}</p>
                
                <div className="artifact-actions">
                  <button className="map-button">
                    <Link to={`/map?location=${selectedArtifact.mapLocation}`}>
                      🗺️ На карте
                    </Link>
                  </button>
                  <button className="ai-hint-button" onClick={handleAIHint}>
                    🤖 AI-подсказка
                  </button>
                </div>
              </div>
            </div>

            <div className="artifact-content">
              <div className="main-content">
                <h2>Описание</h2>
                <p>{selectedArtifact.fullDescription}</p>
                
                <h3>Детали</h3>
                <p>{selectedArtifact.details}</p>
                
                <div className="related-hall">
                  <h3>Связанный зал</h3>
                  <div className="hall-badge">{selectedArtifact.relatedHall}</div>
                </div>
              </div>

              <div className="sidebar">
                <div className="period-artifacts">
                  <h3>Что ещё было в этот период</h3>
                  <div className="related-artifacts-grid">
                    {relatedArtifacts.map(artifact => (
                      <div 
                        key={artifact.id} 
                        className="related-artifact-card"
                        onClick={() => setSelectedArtifact(artifact)}
                      >
                        <img src={artifact.image} alt={artifact.name} />
                        <h4>{artifact.name}</h4>
                        <p>{artifact.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI-подсказка */}
        {showAIHint && (
          <div className="ai-hint-modal">
            <div className="ai-hint-content">
              <div className="ai-header">
                <h3>🤖 AI-подсказка</h3>
                <button 
                  className="close-ai" 
                  onClick={() => setShowAIHint(false)}
                >
                  ×
                </button>
              </div>
              <div className="ai-question">
                <p>Как этот объект связан с <strong>{selectedArtifact?.category.toLowerCase()}</strong>?</p>
              </div>
              <div className="ai-answer">
                <p>
                  {selectedArtifact?.category === 'Труд' && 
                    "Этот объект демонстрирует традиционные орудия труда и методы работы, характерные для того периода. Он показывает, как люди взаимодействовали с окружающей средой и создавали ценности через физический труд."}
                  
                  {selectedArtifact?.category === 'Семья' && 
                    "Данный артефакт отражает семейные традиции, ритуалы и ценности того времени. Он показывает, как строились семейные отношения и передавались культурные нормы из поколения в поколение."}
                  
                  {selectedArtifact?.category === 'Профессии' && 
                    "Этот объект представляет развитие профессиональной деятельности в тот период. Он демонстрирует навыки, инструменты и социальный статус, связанные с данной профессией."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="artifacts-container">
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

      <main className="artifacts-content">
        <section className="artifacts-header">
          <h1>Витрина артефактов</h1>
          <p>Исследуйте объекты через контекст и связи с другими залами</p>
        </section>

        <section className="filters-section">
          <div className="filters-row">
            <div className="filter-group">
              <label>Категория</label>
              <select 
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Период</label>
              <select 
                value={filters.period} 
                onChange={(e) => handleFilterChange('period', e.target.value)}
              >
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Тип</label>
              <select 
                value={filters.type} 
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="artifacts-grid-section">
          <div className="artifacts-header-row">
            <h2>Найдено {filteredArtifacts.length} артефактов</h2>
          </div>

          <div className="artifacts-grid">
            {filteredArtifacts.map(artifact => (
              <div key={artifact.id} className="artifact-card">
                <div className="artifact-card-image">
                  <img src={artifact.image} alt={artifact.name} />
                  <div className="artifact-card-overlay">
                    <button 
                      className="view-artifact-btn"
                      onClick={() => openArtifactDetail(artifact)}
                    >
                      Смотреть
                    </button>
                  </div>
                </div>
                <div className="artifact-card-content">
                  <h3>{artifact.name}</h3>
                  <div className="artifact-card-meta">
                    <span className="artifact-region">{artifact.region}</span>
                    <span className="artifact-category">{artifact.category}</span>
                    <span className="artifact-period">{artifact.period}</span>
                  </div>
                  <p className="artifact-card-description">{artifact.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredArtifacts.length === 0 && (
            <div className="no-artifacts">
              <p>По вашему запросу ничего не найдено.</p>
              <button onClick={() => setFilters({
                category: 'Все категории',
                period: 'Все периоды', 
                type: 'Все типы'
              })}>
                Сбросить фильтры
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};