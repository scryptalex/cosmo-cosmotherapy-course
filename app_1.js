// Данные курса
const courseData = {
    modules: [
        {
            title: "Модуль 1: Основы Космотерапии",
            lessons: 5,
            duration: "300 минут",
            description: "Введение в космоэнергетику, мегафизические принципы исцеления, энергокосмический оккультизм",
            detailedContent: [
                "Урок 1: Введение в космоэнергетику и её история",
                "Урок 2: Мегафизические принципы исцеления",
                "Урок 3: Энергокосмический оккультизм и его применение",
                "Урок 4: Астральные потоки и их использование",
                "Урок 5: Практика базовых космоэнергетических техник"
            ]
        },
        {
            title: "Модуль 2: Ионетика и продление жизни", 
            lessons: 5,
            duration: "300 минут",
            description: "Биохронокинез, работа с ДНК на клеточном уровне, регенерационная генетика",
            detailedContent: [
                "Урок 1: Основы ионетики для продления жизни",
                "Урок 2: Биохронокинез: управление биологическим временем",
                "Урок 3: Клеточная работа с ДНК для омоложения",
                "Урок 4: Регенерационная генетика в практике",
                "Урок 5: Активация жизненных программ и долголетие"
            ]
        },
        {
            title: "Модуль 3: Самосовершенствование",
            lessons: 5, 
            duration: "300 минут",
            description: "Развитие сверхвозможностей, интуиция, телепатия, повышение потенциала мозга",
            detailedContent: [
                "Урок 1: Активация сверхвозможностей человека",
                "Урок 2: Развитие интуиции и ясновидения",
                "Урок 3: Телепатические способности и их применение",
                "Урок 4: Техники повышения потенциала мозга",
                "Урок 5: Практика работы с информационным полем Вселенной"
            ]
        },
        {
            title: "Модуль 4: Привлечение изобилия",
            lessons: 5,
            duration: "300 минут", 
            description: "Банк космического изобилия, золотой портал 999, кармическая амнистия",
            detailedContent: [
                "Урок 1: Принципы космического изобилия",
                "Урок 2: Работа с Банком космического изобилия",
                "Урок 3: Активация золотого портала 999",
                "Урок 4: Кармическая амнистия для финансового процветания",
                "Урок 5: Создание поля постоянного благосостояния"
            ]
        },
        {
            title: "Модуль 5: Избавление от психосоматики",
            lessons: 5,
            duration: "300 минут",
            description: "Связь психика-тело, энергоинформационные причины болезней, самоисцеление",
            detailedContent: [
                "Урок 1: Психосоматика: связь психики и тела",
                "Урок 2: Энергоинформационные причины заболеваний",
                "Урок 3: Диагностика и устранение психосоматических блоков",
                "Урок 4: Техники самоисцеления через космоэнергетику",
                "Урок 5: Создание здорового энергетического поля"
            ]
        },
        {
            title: "Модуль 6: Трансформация Хомосапиенс → Хомокосмикус", 
            lessons: 5,
            duration: "300 минут",
            description: "Эволюция сознания, активация космического ДНК, интеграция с космическим разумом",
            detailedContent: [
                "Урок 1: Эволюция сознания человека",
                "Урок 2: Активация космических участков ДНК",
                "Урок 3: Интеграция с космическим разумом",
                "Урок 4: Переход к новому типу восприятия реальности",
                "Урок 5: Практики полной трансформации в Хомокосмикус"
            ]
        }
    ],
    avatars: [
        {
            name: "Мастер Космотерапии",
            specialization: "Космоэнергетика и исцеление",
            description: "Мудрый наставник в белых одеждах, обладающий глубокими знаниями космических энергий и методов исцеления",
            expertise: ["Космоэнергетика", "Мегафизическое исцеление", "Энергокосмический оккультизм"],
            responses: [
                "Космические энергии доступны каждому, кто открыт для их принятия. Ваша трансформация уже началась.",
                "Мегафизическое исцеление происходит на уровне причин, а не следствий. Работайте с энергоинформационным полем.",
                "Ваша аура имеет потенциал к расширению. Практикуйте ежедневные медитации для укрепления энергетики.",
                "Космические каналы открываются постепенно. Терпение и регулярность практик — ключ к успеху.",
                "В нашем курсе вы научитесь видеть тонкоматериальные структуры и работать с ними для самоисцеления."
            ]
        },
        {
            name: "Практик Ионетики", 
            specialization: "Продление жизни и омоложение",
            description: "Энергичный специалист, излучающий молодость и силу, эксперт по биохронокинезу и регенерации",
            expertise: ["Ионетика", "Биохронокинез", "Регенерационная генетика"],
            responses: [
                "Биохронокинез позволяет замедлять биологическое время вашего тела. Начните с дыхательных практик.",
                "Ваши клетки хранят информацию о молодости. Мы активируем эту память через специальные техники ионетики.",
                "Регенерационная генетика — наука будущего, доступная вам уже сегодня через наши практики.",
                "Процесс омоложения начинается с ментального настроя. Визуализируйте себя молодым и полным энергии каждый день.",
                "На нашем курсе вы получите доступ к древним и новейшим техникам продления жизни, недоступным обычным людям."
            ]
        },
        {
            name: "Гид по Трансформации",
            specialization: "Эволюция сознания",
            description: "Космический проводник с элементами будущего, ведущий к трансформации в хомокосмикус",
            expertise: ["Эволюция сознания", "Космическое ДНК", "Трансформация"],
            responses: [
                "Трансформация в хомокосмикус — естественный этап эволюции человечества. Вы — пионеры этого процесса.",
                "Ваше космическое ДНК содержит спящие участки, которые мы активируем в ходе курса.",
                "Сознание не ограничено физическим телом. Мы научим вас расширять границы восприятия.",
                "В каждом из вас заложен потенциал космического существа. Наша задача — пробудить его.",
                "Интеграция с космическим разумом происходит через квантовые резонансы сознания. Это безопасно и естественно."
            ]
        }
    ]
};

// Медитационные тексты
const meditationTexts = [
    "Закройте глаза и сделайте глубокий вдох...",
    "Представьте, как космическая энергия наполняет ваше тело сверху вниз...",
    "Почувствуйте, как каждая клетка вашего тела пробуждается и начинает светиться...",
    "Ощутите связь с космосом, с его бескрайними просторами и мудростью...",
    "Визуализируйте активацию вашего космического ДНК...",
    "Почувствуйте, как ваше сознание расширяется за пределы физического тела...",
    "Вы становитесь единым целым с космической энергией...",
    "Вы — больше не просто человек. Вы — космическое существо, Хомокосмикус...",
    "Сохраните это ощущение и медленно возвращайтесь в свое тело...",
    "Сделайте глубокий вдох и медленно откройте глаза, сохраняя связь с космосом..."
];

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация навигации
    initNavigation();
    
    // Инициализация модулей курса
    initModules();
    
    // Инициализация аватаров
    initAvatars();
    
    // Инициализация медитации
    initMeditation();
    
    // Инициализация кнопок
    initButtons();
    
    // Инициализация модальных окон
    initModals();
});

// Функция инициализации навигации
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Получаем ID страницы из атрибута data-page
            const pageId = this.getAttribute('data-page');
            
            // Отмечаем активную ссылку
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем соответствующую страницу
            showPage(pageId);
        });
    });
}

// Функция показа страницы
function showPage(pageId) {
    // Скрываем все страницы
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Показываем выбранную страницу
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        // Прокрутка страницы вверх
        window.scrollTo(0, 0);
    }
}

// Функция инициализации модулей курса
function initModules() {
    const moduleButtons = document.querySelectorAll('.module-btn');
    
    moduleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleCard = this.closest('.module-card');
            const moduleIndex = moduleCard.getAttribute('data-module');
            showModuleDetails(moduleIndex);
        });
    });
}

// Функция показа деталей модуля
function showModuleDetails(moduleIndex) {
    const module = courseData.modules[moduleIndex];
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    
    // Создаем содержимое модального окна с улучшенной контрастностью
    let content = `
        <h2 style="color: white; margin-bottom: 16px;">${module.title}</h2>
        <div class="module-meta" style="margin-bottom: 16px;">
            <span class="module-lessons" style="color: #d1c6ff; margin-right: 16px;">📚 ${module.lessons} уроков</span>
            <span class="module-duration" style="color: #d1c6ff;">⏱️ ${module.duration}</span>
        </div>
        <p style="color: white; margin-bottom: 24px; font-size: 16px;">${module.description}</p>
        <div class="module-lessons-list" style="margin-bottom: 24px;">
            <h3 style="color: white; margin-bottom: 12px;">Содержание модуля:</h3>
            <ul style="list-style-type: none; padding: 0;">
    `;
    
    // Добавляем список уроков с улучшенной контрастностью
    module.detailedContent.forEach(lesson => {
        content += `<li style="color: #d1c6ff; padding: 8px 0; border-bottom: 1px solid rgba(140, 116, 255, 0.2);">${lesson}</li>`;
    });
    
    content += `
            </ul>
        </div>
        <button class="btn btn--primary module-enroll-btn" style="background: linear-gradient(45deg, #8c74ff, #5eaceb); color: white; padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer;">Записаться на модуль</button>
    `;
    
    modalBody.innerHTML = content;
    
    // Обработчик для кнопки записи
    const enrollBtn = modalBody.querySelector('.module-enroll-btn');
    enrollBtn.addEventListener('click', function() {
        showPage('pricing');
        closeModal();
    });
    
    // Показываем модальное окно
    modal.style.display = 'block';
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
}

// Функция инициализации аватаров
function initAvatars() {
    const avatarChatButtons = document.querySelectorAll('.avatar-chat-btn');
    
    avatarChatButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            openAvatarChat(index);
        });
    });
}

// Функция показа чата с аватаром - исправленная
function openAvatarChat(avatarIndex) {
    const avatar = courseData.avatars[avatarIndex];
    const modal = document.getElementById('avatar-modal');
    const chatTitle = document.getElementById('avatar-chat-title');
    const chatMessages = document.getElementById('avatar-chat-messages');
    const avatarInput = document.getElementById('avatar-input');
    const avatarSend = document.getElementById('avatar-send');
    
    // Устанавливаем заголовок чата
    chatTitle.textContent = `Чат с аватаром: ${avatar.name}`;
    
    // Очищаем предыдущие сообщения
    chatMessages.innerHTML = `
        <div class="avatar-message">
            <p>Добро пожаловать! Я ${avatar.name}, специалист по ${avatar.specialization}. Что вас интересует?</p>
        </div>
    `;
    
    // Показываем модальное окно
    modal.style.display = 'block';
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
    
    // Фокус на поле ввода
    setTimeout(() => {
        avatarInput.focus();
    }, 300);
    
    // Обработчик отправки сообщения
    const sendMessage = function() {
        const message = avatarInput.value.trim();
        if (message) {
            // Добавляем сообщение пользователя
            chatMessages.innerHTML += `
                <div class="user-message">
                    <p>${message}</p>
                </div>
            `;
            
            // Очищаем поле ввода
            avatarInput.value = '';
            
            // Прокручиваем чат вниз
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Добавляем сообщение аватара с небольшой задержкой
            setTimeout(() => {
                // Выбираем случайный ответ из доступных для этого аватара
                const randomIndex = Math.floor(Math.random() * avatar.responses.length);
                const response = avatar.responses[randomIndex];
                
                chatMessages.innerHTML += `
                    <div class="avatar-message">
                        <p>${response}</p>
                    </div>
                `;
                
                // Прокручиваем чат вниз
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    };
    
    // Удаляем предыдущие обработчики если они есть
    avatarSend.onclick = null;
    avatarInput.onkeypress = null;
    
    // Добавляем новые обработчики
    avatarSend.onclick = sendMessage;
    
    avatarInput.onkeypress = function(e) {
        if (e.key === 'Enter') {
            sendMessage();
            e.preventDefault();
        }
    };
}

// Функция инициализации медитации - исправленная
function initMeditation() {
    const meditationStart = document.querySelector('.meditation-start');
    const meditationVisual = document.querySelector('.meditation-visual');
    const cosmicOrb = document.querySelector('.cosmic-orb');
    const rings = document.querySelectorAll('.ring');
    const meditationText = document.getElementById('meditation-text');
    
    let meditationActive = false;
    let currentTextIndex = 0;
    let meditationInterval;
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .orb-active {
            animation: pulseOrb 4s infinite;
            box-shadow: 0 0 50px rgba(140, 116, 255, 0.9) !important;
            transform: scale(1.2);
        }
        
        .ring-active-1 {
            animation: pulse 3s infinite, rotate 10s linear infinite !important;
            border: 2px solid rgba(140, 116, 255, 0.8) !important;
        }
        
        .ring-active-2 {
            animation: pulse 4s infinite 0.5s, rotate 15s linear infinite reverse !important;
            border: 2px solid rgba(140, 116, 255, 0.8) !important;
        }
        
        .ring-active-3 {
            animation: pulse 5s infinite 1s, rotate 20s linear infinite !important;
            border: 2px solid rgba(140, 116, 255, 0.8) !important;
        }
        
        #meditation-text {
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    meditationStart.addEventListener('click', function() {
        if (!meditationActive) {
            // Запускаем медитацию
            meditationActive = true;
            
            // Активируем анимации
            cosmicOrb.classList.add('orb-active');
            rings[0].classList.add('ring-active-1');
            rings[1].classList.add('ring-active-2');
            rings[2].classList.add('ring-active-3');
            
            // Меняем текст кнопки
            this.textContent = 'Завершить космосеанс';
            
            // Показываем первый текст медитации
            meditationText.textContent = meditationTexts[currentTextIndex];
            
            // Запускаем интервал для смены текстов
            meditationInterval = setInterval(() => {
                currentTextIndex = (currentTextIndex + 1) % meditationTexts.length;
                
                // Плавная смена текста
                meditationText.style.opacity = '0';
                setTimeout(() => {
                    meditationText.textContent = meditationTexts[currentTextIndex];
                    meditationText.style.opacity = '1';
                }, 500);
                
            }, 8000); // Меняем текст каждые 8 секунд
        } else {
            // Останавливаем медитацию
            meditationActive = false;
            
            // Убираем анимации
            cosmicOrb.classList.remove('orb-active');
            rings[0].classList.remove('ring-active-1');
            rings[1].classList.remove('ring-active-2');
            rings[2].classList.remove('ring-active-3');
            
            // Возвращаем текст кнопки
            this.textContent = 'Начать космосеанс';
            
            // Возвращаем начальный текст
            currentTextIndex = 0;
            meditationText.style.opacity = '1';
            meditationText.textContent = 'Нажмите кнопку выше, чтобы начать ваш путь к космическому сознанию...';
            
            // Останавливаем интервал
            clearInterval(meditationInterval);
        }
    });
}

// Функция инициализации кнопок
function initButtons() {
    // Кнопка CTA на главной странице
    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function() {
            showPage('course');
        });
    }
    
    // Кнопки выбора тарифа
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Спасибо за интерес к нашему курсу! В демонстрационной версии функция оплаты не активна.');
        });
    });
}

// Функция инициализации модальных окон
function initModals() {
    // Закрытие модальных окон
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Закрытие по клику вне модального окна
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        const avatarModal = document.getElementById('avatar-modal');
        
        if (event.target === modal) {
            closeModal(modal);
        }
        
        if (event.target === avatarModal) {
            closeModal(avatarModal);
        }
    });
}

// Функция закрытия модального окна
function closeModal(specificModal = null) {
    if (specificModal) {
        specificModal.style.display = 'none';
    } else {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    // Разблокируем прокрутку страницы
    document.body.style.overflow = 'auto';
}