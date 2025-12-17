import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/stories.css';

interface Story {
    id: number;
    name: string;
    region: string;
    category: string;
    period: string;
    photo: string;
    quote: string;
    fullText: string;
    photos: string[];
    tags: string[];
}

const initialStories: Story[] = [
    {
        id: 1,
        name: "Миргуль Омурзакова",
        region: "Бишкек",
        category: "Труд",
        period: "2000-е",
        photo: "/OXOO-Museum/images/mirgul.jpg",
        quote: "Я начала с офис-менеджмента, потом училась вечерами и запустила бизнес…",
        fullText: "Мой путь начинался с должности офис-менеджера в небольшой компании. Каждый вечер после работы я занималась самообразованием, изучала маркетинг и управление бизнесом. Через два года я накопила достаточно знаний и смелости, чтобы открыть собственное дело — кондитерскую. Сегодня у меня три филиала в Бишкеке и команда из 15 человек. Самое важное — никогда не переставать учиться и верить в себя.",
        photos: ["/OXOO-Museum/images/stories/mirgul-1.jpg", "/OXOO-Museum/images/stories/mirgul-2.jpg", "/OXOO-Museum/images/stories/mirgul-3.jpg"],
        tags: ["бизнес", "образование", "женское лидерство"]
    },
    {
        id: 2,
        name: "Айпери Абдылдаева",
        region: "Ош",
        category: "Труд",
        period: "2010-е",
        photo: "/OXOO-Museum/images/aiperi.jpg",
        quote: "Я рискнула начать агробизнес с нуля и смогла создать успешное предприятие…",
        fullText: "В 2012 году я оставила работу в городе и вернулась в родное село, чтобы заняться сельским хозяйством. Начала с небольшого участка земли и минимальными средствами. Сегодня наша ферма выращивает экологически чистые овощи и фрукты, которые поставляются в несколько регионов страны. Мы создали 25 рабочих мест для местных жителей и продолжаем развиваться.",
        photos: ["/OXOO-Museum/images/stories/aiperi-1.jpg", "/OXOO-Museum/images/stories/aiperi-2.jpg"],
        tags: ["агробизнес", "сельское хозяйство", "развитие регионов"]
    },
    {
        id: 3,
        name: "Кайрат Кайпов",
        region: "Бишкек",
        category: "Труд",
        period: "2010-е",
        photo: "/OXOO-Museum/images/kairat.jpg",
        quote: "Фронтенд-инженер из Бишкека, который работает удалённо для международных компаний…",
        fullText: "Начал изучать программирование в университете, но настоящие знания получил через онлайн-курсы и практику. Сейчас работаю удалённо для компаний из Европы и США. Это даёт мне возможность жить в Кыргызстане, но получать международный опыт и доход. Организую митапы для местных разработчиков, чтобы делиться знаниями.",
        photos: ["/OXOO-Museum/images/stories/kairat-1.jpg", "/OXOO-Museum/images/stories/kairat-2.jpg", "/OXOO-Museum/images/stories/kairat-3.jpg"],
        tags: ["IT", "удаленная работа", "образование"]
    },
    {
        id: 4,
        name: "Алия Суюнова",
        region: "Нарын",
        category: "Семья",
        period: "1990-е",
        photo: "/OXOO-Museum/images/aliya.jpeg",
        quote: "Вырастила пятерых детей в трудные 90-е, сохранив семейные традиции…",
        fullText: "В сложные годы после распада СССР мне пришлось одной растить пятерых детей. Работала учителем в школе, вечерами шила одежду на заказ. Несмотря на трудности, все дети получили образование и нашли свой путь. Сегодня у меня 12 внуков, и мы сохраняем наши семейные традиции и обычаи.",
        photos: ["/OXOO-Museum/images/stories/aliya-1.jpg", "/OXOO-Museum/images/stories/aliya-2.jpg"],
        tags: ["семья", "образование", "традиции"]
    },
    {
        id: 5,
        name: "Эркин Базарбаев",
        region: "Джалал-Абад",
        category: "Власть",
        period: "1980-е",
        photo: "/OXOO-Museum/images/erkin.jpg",
        quote: "Работал в местной администрации в советское время, видел переход к независимости…",
        fullText: "Проработал в системе местного самоуправления более 30 лет. Был свидетелем кардинальных изменений в стране — от советской системы к независимости. Участвовал в создании первых местных органов власти независимого Кыргызстана. Считаю, что главное в работе с людьми — это честность и уважение.",
        photos: ["/OXOO-Museum/images/erkin.jpg", "/OXOO-Museum/images/stories/erkin-2.jpg", "/OXOO-Museum/images/stories/erkin-3.jpg"],
        tags: ["госуправление", "история", "общество"]
    },
    {
        id: 6,
        name: "Гульнара Исаева",
        region: "Иссык-Куль",
        category: "Труд",
        period: "2000-е",
        photo: "/OXOO-Museum/images/gulnara.jpg",
        quote: "Развивала туризм на Иссык-Куле, создала сеть гостевых домов…",
        fullText: "Начала с маленького гостевого дома на 5 номеров. Постепенно развивала бизнес, изучала международные стандарты гостеприимства. Сегодня наша сеть включает 12 гостевых домов вокруг озера Иссык-Куль. Мы активно работаем с местными сообществами, продвигаем экотуризм и сохраняем природное наследие региона.",
        photos: ["/OXOO-Museum/images/stories/gulnara-1.jpg", "/OXOO-Museum/images/stories/gulnara-2.jpg"],
        tags: ["туризм", "бизнес", "экология"]
    }
];

const regions = ["Все регионы", "Бишкек", "Ош", "Нарын", "Джалал-Абад", "Иссык-Куль", "Талас", "Баткен", "Чуйская область"];
const categories = ["Все категории", "Семья", "Труд", "Власть"];
const periods = ["Все периоды", "1980-е", "1990-е", "2000-е", "2010-е", "2020-е"];

interface AddStoryForm {
    name: string;
    region: string;
    category: string;
    period: string;
    text: string;
    photos: File[];
    agree: boolean;
}

export const Stories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>(initialStories);
    const [filteredStories, setFilteredStories] = useState<Story[]>(initialStories);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        region: 'Все регионы',
        category: 'Все категории',
        period: 'Все периоды'
    });

    const [newStory, setNewStory] = useState<AddStoryForm>({
        name: '',
        region: '',
        category: '',
        period: '',
        text: '',
        photos: [],
        agree: false
    });

    // Фильтрация историй
    useEffect(() => {
        let result = stories;

        if (filters.region !== 'Все регионы') {
            result = result.filter(story => story.region === filters.region);
        }

        if (filters.category !== 'Все категории') {
            result = result.filter(story => story.category === filters.category);
        }

        if (filters.period !== 'Все периоды') {
            result = result.filter(story => story.period === filters.period);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(story =>
                story.name.toLowerCase().includes(term) ||
                story.quote.toLowerCase().includes(term) ||
                story.tags.some(tag => tag.toLowerCase().includes(term))
            );
        }

        setFilteredStories(result);
    }, [filters, searchTerm, stories]);

    const handleFilterChange = (filterType: string, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const openStoryDetail = (story: Story) => {
        setSelectedStory(story);
    };

    const closeStoryDetail = () => {
        setSelectedStory(null);
    };

    const handleAddStorySubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // В реальном приложении здесь будет отправка на сервер
        const newStoryData: Story = {
            id: stories.length + 1,
            name: newStory.name,
            region: newStory.region,
            category: newStory.category,
            period: newStory.period,
            photo: "/OXOO-Museum/images/stories/default.jpg", // Заглушка
            quote: newStory.text.substring(0, 140) + (newStory.text.length > 140 ? "…" : ""),
            fullText: newStory.text,
            photos: [], // В реальном приложении нужно загружать фото
            tags: []
        };

        setStories(prev => [...prev, newStoryData]);
        setShowAddForm(false);
        setNewStory({
            name: '',
            region: '',
            category: '',
            period: '',
            text: '',
            photos: [],
            agree: false
        });

        alert('Спасибо, ваша история на модерации!');
    };

    const handleNewStoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setNewStory(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewStory(prev => ({
                ...prev,
                photos: [...prev.photos, ...files]
            }));
        }
    };

    // Похожие истории (по категории и региону)
    const getSimilarStories = (currentStory: Story) => {
        return stories.filter(story =>
            story.id !== currentStory.id &&
            (story.category === currentStory.category || story.region === currentStory.region)
        ).slice(0, 3);
    };

    if (selectedStory) {
        const similarStories = getSimilarStories(selectedStory);

        return (
            <div className="stories-container">
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

                <div className="story-detail-container">
                    <button className="back-button" onClick={closeStoryDetail}>
                        ← Назад к историям
                    </button>

                    <div className="story-detail">
                        <div className="story-header">
                            <img src={selectedStory.photo} alt={selectedStory.name} className="story-detail-photo" />
                            <div className="story-info">
                                <h1>{selectedStory.name}</h1>
                                <div className="story-meta">
                                    <span className="region">{selectedStory.region}</span>
                                    <span className="category">{selectedStory.category}</span>
                                    <span className="period">{selectedStory.period}</span>
                                </div>
                                <p className="story-quote">"{selectedStory.quote}"</p>
                            </div>
                        </div>

                        <div className="story-content">
                            <h2>История</h2>
                            <p>{selectedStory.fullText}</p>
                        </div>

                        {selectedStory.photos.length > 0 && (
                            <div className="story-gallery">
                                <h2>Фотогалерея</h2>
                                <div className="gallery-grid">
                                    {selectedStory.photos.map((photo, index) => (
                                        <img key={index} src={photo} alt={`${selectedStory.name} ${index + 1}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="story-tags">
                            <h3>Теги:</h3>
                            <div className="tags-list">
                                {selectedStory.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="related-content">
                            <div className="similar-stories">
                                <h3>Похожие истории</h3>
                                <div className="similar-stories-grid">
                                    {similarStories.map(story => (
                                        <div key={story.id} className="similar-story-card" onClick={() => setSelectedStory(story)}>
                                            <img src={story.photo} alt={story.name} />
                                            <h4>{story.name}</h4>
                                            <p>{story.quote}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="related-artifacts">
                                <h3>Связанные артефакты</h3>
                                <p>Здесь будут отображаться артефакты, связанные с этой историей.</p>
                                <button className="view-artifacts-btn">
                                    <Link to="/artifacts">Посмотреть все артефакты</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stories-container">
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

            <main className="stories-content">
                <section className="stories-header">
                    <h1>Истории тех, кто создавал, работал, решал</h1>
                    <p>Личные опыты и воспоминания, которые создают коллективную память нашего народа</p>
                </section>

                <section className="filters-section">
                    <div className="filters-row">
                        <div className="filter-group">
                            <label>Регион</label>
                            <select
                                value={filters.region}
                                onChange={(e) => handleFilterChange('region', e.target.value)}
                            >
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>

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

                        <div className="search-group">
                            <label>Поиск по ключевым словам</label>
                            <input
                                type="text"
                                placeholder="Введите ключевые слова..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </section>

                <section className="stories-grid-section">
                    <div className="stories-header-row">
                        <h2>Найдено {filteredStories.length} историй</h2>
                        <button
                            className="add-story-btn"
                            onClick={() => setShowAddForm(true)}
                        >
                            + Добавить историю
                        </button>
                    </div>

                    <div className="stories-grid">
                        {filteredStories.map(story => (
                            <div key={story.id} className="story-card">
                                <div className="story-card-image">
                                    <img src={story.photo} alt={story.name} />
                                    <div className="story-card-overlay">
                                        <button
                                            className="read-story-btn"
                                            onClick={() => openStoryDetail(story)}
                                        >
                                            Читать историю
                                        </button>
                                    </div>
                                </div>
                                <div className="story-card-content">
                                    <h3>{story.name}</h3>
                                    <p className="story-region">{story.region}</p>
                                    <p className="story-quote">"{story.quote}"</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredStories.length === 0 && (
                        <div className="no-stories">
                            <p>По вашему запросу ничего не найдено.</p>
                            <button onClick={() => {
                                setFilters({ region: 'Все регионы', category: 'Все категории', period: 'Все периоды' });
                                setSearchTerm('');
                            }}>
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </section>
            </main>

            {/* Модальное окно добавления истории */}
            {showAddForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2> Добавить историю</h2>
                            <button
                                className="close-modal"
                                onClick={() => setShowAddForm(false)}
                                aria-label="Закрыть окно"
                            >
                                ×
                            </button>
                        </div>

                        <form className="add-story-form" onSubmit={handleAddStorySubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Имя и фамилия</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newStory.name}
                                        onChange={handleNewStoryChange}
                                        placeholder="Введите ваше имя и фамилию"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Регион</label>
                                    <select
                                        name="region"
                                        value={newStory.region}
                                        onChange={handleNewStoryChange}
                                        required
                                    >
                                        <option value="">Выберите ваш регион</option>
                                        {regions.slice(1).map(region => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Категория истории</label>
                                    <select
                                        name="category"
                                        value={newStory.category}
                                        onChange={handleNewStoryChange}
                                        required
                                    >
                                        <option value="">Выберите категорию</option>
                                        {categories.slice(1).map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Исторический период</label>
                                    <select
                                        name="period"
                                        value={newStory.period}
                                        onChange={handleNewStoryChange}
                                        required
                                    >
                                        <option value="">Выберите временной период</option>
                                        {periods.slice(1).map(period => (
                                            <option key={period} value={period}>{period}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Расскажите вашу историю</label>
                                <textarea
                                    name="text"
                                    value={newStory.text}
                                    onChange={handleNewStoryChange}
                                    maxLength={2000}
                                    placeholder="Поделитесь вашей уникальной историей (максимум 2000 символов)..."
                                    required
                                />
                                <div className="char-count">{newStory.text.length}/2000 символов</div>
                            </div>

                            <div className="form-group">
                                <label>Фотографии к истории</label>
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        id="photo-upload"
                                    />
                                    <label htmlFor="photo-upload" className="file-input-label">
                                        Выберите фотографии (до 3 файлов)
                                    </label>
                                </div>
                                {newStory.photos.length > 0 && (
                                    <div className="uploaded-photos">
                                        {newStory.photos.map((photo, index) => (
                                            <div key={index} className="uploaded-photo">
                                                {photo.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="checkbox-group">
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        checked={newStory.agree}
                                        onChange={handleNewStoryChange}
                                        required
                                    />
                                    Я согласен(на) на публикацию моей истории в цифровом архиве OXOO Museum
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" onClick={() => setShowAddForm(false)}>
                                    Отмена
                                </button>
                                <button type="submit">
                                    Опубликовать историю
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};