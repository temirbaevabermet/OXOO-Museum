import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import '../styles/map.css';

// Фикс для иконок Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapPoint {
  type: string;
  coords: [number, number];
  title: string;
  desc: string;
  img: string;
  details?: string; // Добавляем поле для подробной информации
}

export const MapPage: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Данные точек с подробной информацией
  const points: MapPoint[] = [
    {
      type: "legend",
      coords: [42.45, 77.15],
      title: "Иссык-Куль — «Слёзы принцессы»",
      desc: "По легенде, озеро появилось из слёз девушки Айсулуу.",
      img: "/OXOO-Museum/images/lake.jpg",
      details: `Озеро Иссык-Куль - одно из крупнейших горных озёр в мире, расположенное на высоте 1607 метров над уровнем моря. 
      
По древней легенде, в этих местах жила прекрасная принцесса Айсулуу, которая полюбила простого пастуха. Когда её отец узнал об этом, он запретил им встречаться. 
      
Не в силах вынести разлуку, Айсулуу плакала так сильно, что её слёзы образовали целое озеро. Говорят, что в ясную погоду на дне озера можно увидеть руины древнего города, где когда-то жила принцесса.`
    },
    {
      type: "food",
      coords: [40.53, 72.8],
      title: "Ош — «Семейный плов»",
      desc: "Первый плов варили караванщикам. Каждый род хранит свой рецепт.",
      img: "/OXOO-Museum/images/plov.jpeg",
      details: `Плов - не просто блюдо, это целая философия для жителей Оша. Традиция приготовления плова передаётся из поколения в поколение.

В древности, когда через Ош проходили караваны Великого Шёлкового пути, местные жители готовили для уставших путешественников особый плов, который восстанавливал силы и согревал душу.

Каждая семья хранит свой уникальный рецепт, который может включать до 15 различных специй и особую технику приготовления. Секреты передаются только по наследству.`
    },
    {
      type: "craft",
      coords: [41.17, 75.8],
      title: "Нарын — «Кузнецы ветра»",
      desc: "Мастера 1960-х ковали украшения из дамасской стали.",
      img: "/OXOO-Museum/images/person.png",
      details: `В горных районах Нарына с 1960-х годов существует уникальное ремесло - ковка украшений из дамасской стали. 

Мастера используют особую технику, которую называют "ковкой ветра" - они работают только в определённое время суток, когда ветер с гор достигает нужной силы для поддержания оптимальной температуры в горне.

Эти украшения не только красивы, но и считаются оберегами. Каждый узор имеет своё значение и может рассказывать целые истории о жизни кочевых народов.`
    },
  ];

  // Функция для открытия модального окна
  const openDetails = (point: MapPoint) => {
    setSelectedPoint(point);
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPoint(null);
  };

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Инициализация карты
    const map = L.map(mapRef.current).setView([41.2044, 74.7661], 7);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Используем стандартные иконки Leaflet
    const useStandardIcons = true;

    // Создание маркеров и сразу добавление их на карту
    markersRef.current = points.map(point => {
      let marker: L.Marker;

      if (useStandardIcons) {
        // Используем стандартные иконки Leaflet
        marker = L.marker(point.coords).addTo(map);
      } else {
        // Создание кастомных иконок для разных типов
        const createCustomIcon = (type: string) => {
          const colors: { [key: string]: string } = {
            legend: "#ff6b6b",
            food: "#4ecdc4", 
            craft: "#45b7d1",
          };
          
          const color = colors[type] || "#ffb300";
          
          return L.divIcon({
            className: `custom-marker marker-${type}`,
            html: `
              <div style="
                background-color: ${color};
                width: 30px;
                height: 30px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <div style="
                  transform: rotate(45deg);
                  color: white;
                  font-size: 14px;
                  font-weight: bold;
                ">
                  ${type === 'legend' ? '🏔️' : type === 'food' ? '🍲' : '⚒️'}
                </div>
              </div>
            `,
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
          });
        };

        marker = L.marker(point.coords, {
          icon: createCustomIcon(point.type)
        }).addTo(map);
      }

      // Создание попапа с кнопкой, которая вызывает открытие модального окна
      const popupContent = document.createElement('div');
      popupContent.className = 'custom-popup';
      popupContent.innerHTML = `
        <img 
          src="${point.img}" 
          alt="${point.title}"
          onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZiMzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QmNC30LLQtdC60LAg0L3QtSDQt9Cw0LrQsNC30L7QstC+0LU8L3RleHQ+PC9zdmc+'"
        />
        <div class="popup-content">
          <h3>${point.title}</h3>
          <p>${point.desc}</p>
          <button class="popup-btn">
            Подробнее
          </button>
        </div>
      `;

      // Добавляем обработчик события для кнопки
      const button = popupContent.querySelector('.popup-btn') as HTMLButtonElement;
      if (button) {
        button.addEventListener('click', () => {
          openDetails(point);
          map.closePopup(); // Закрываем попап после нажатия
        });
      }

      marker.bindPopup(popupContent);
      
      return marker;
    });

  }, []);

  // Фильтрация маркеров
  useEffect(() => {
    if (!mapInstance.current) return;

    // Сначала удаляем все маркеры с карты
    markersRef.current.forEach(marker => {
      mapInstance.current!.removeLayer(marker);
    });

    // Затем добавляем только те, которые соответствуют фильтру
    markersRef.current.forEach((marker, index) => {
      const point = points[index];
      if (activeFilter === "all" || point.type === activeFilter) {
        marker.addTo(mapInstance.current!);
      }
    });

  }, [activeFilter]);

  const handleFilterClick = (filterType: string) => {
    setActiveFilter(filterType);
  };

  return (
    <div className="map-container">
      <header className="navbar">
        <div className="logo">🏛️ OXOO museum!</div>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/simulator">Симулятор</Link>
          <Link to="/map" className="active">Карта</Link>
          <Link to="/stories">Истории</Link>
          <Link to="/artifacts">Артефакты</Link>
          <Link to="/about">О проекте</Link>
        </nav>
      </header>

      {/* Карта */}
      <div 
        id="map" 
        ref={mapRef} 
        style={{ 
          height: 'calc(100vh - 80px)', 
          width: '100%',
          position: 'relative'
        }} 
      />

      {/* Фильтры */}
      <div className="map-filters">
        {[
          { type: "all", label: "Все", icon: "🗺️" },
          { type: "legend", label: "Легенды", icon: "🏔️" },
          { type: "food", label: "Кухня", icon: "🍲" },
          { type: "craft", label: "Профессии", icon: "⚒️" }
        ].map((filter) => (
          <button
            key={filter.type}
            className={`filter-btn ${activeFilter === filter.type ? "active" : ""}`}
            onClick={() => handleFilterClick(filter.type)}
          >
            <span className="filter-icon">{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>

      {/* Модальное окно с подробной информацией */}
      {isModalOpen && selectedPoint && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img 
                src={selectedPoint.img} 
                alt={selectedPoint.title}
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZiMzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7QmNC30LLQtdC60LAg0L3QtSDQt9Cw0LrQsNC30L7QstC+0LU8L3RleHQ+PC9zdmc+';
                }}
              />
            </div>
            <div className="modal-details">
              <h2>{selectedPoint.title}</h2>
              <p className="modal-desc">{selectedPoint.desc}</p>
              <div className="modal-full-desc">
                {selectedPoint.details?.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-content">
          {/* Логотипы партнёров */}
          <div className="partners">
            <h4>Партнёры проекта</h4>
            <div className="partner-logos">
              <img src="/OXOO-Museum/images/eulogo.png" alt="EU" />
              <img src="/OXOO-Museum/images/UNDP.png" alt="UNDP" />
              <img src="/OXOO-Museum/images/aucalogo.png" alt="AUCA" />
            </div>
          </div>

          {/* Соцсети */}
          <div className="social">
            <h4>Мы в соцсетях</h4>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img src="/OXOO-Museum/images/instagram.svg" alt="Instagram" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <img src="/OXOO-Museum/images/facebook.svg" alt="Facebook" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer">
                <img src="/OXOO-Museum/images/telegram.svg" alt="Telegram" />
              </a>
              <a href="mailto:oxoo.museum@gmail.com">
                <img src="/OXOO-Museum/images/mail.svg" alt="Email" />
              </a>
            </div>
          </div>

          {/* Ссылки */}
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
};