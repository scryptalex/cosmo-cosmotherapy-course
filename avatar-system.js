// Avatar Integration System for Cosmotherapy Course
class AvatarSystem {
    constructor() {
        this.avatars = {
            'cosmo_master': {
                id: 'cosmo_master',
                name: 'Мастер Космотерапии',
                specialization: 'Космоэнергетика и исцеление',
                description: 'Мудрый наставник в белых одеждах, обладающий глубокими знаниями космических энергий',
                avatar_url: null, // Will be populated with D-ID/Synthesia avatar
                voice_id: 'ru-female-1',
                personality: 'wise_mentor',
                expertise: ['Космоэнергетика', 'Мегафизическое исцеление', 'Энергокосмический оккультизм'],
                responses: [
                    "Космические энергии доступны каждому, кто открыт для их принятия. Ваша трансформация уже началась.",
                    "Мегафизическое исцеление происходит на уровне причин, а не следствий. Работайте с энергоинформационным полем.",
                    "Ваша аура имеет потенциал к расширению. Практикуйте ежедневные медитации для укрепления энергетики.",
                    "Космические каналы открываются постепенно. Терпение и регулярность практик — ключ к успеху.",
                    "В нашем курсе вы научитесь видеть тонкоматериальные структуры и работать с ними для самоисцеления."
                ]
            },
            'ionetics_practitioner': {
                id: 'ionetics_practitioner',
                name: 'Практик Ионетики',
                specialization: 'Продление жизни и омоложение',
                description: 'Энергичный специалист, излучающий молодость и силу, эксперт по биохронокинезу',
                avatar_url: null,
                voice_id: 'ru-male-1',
                personality: 'energetic_expert',
                expertise: ['Биохронокинез', 'Клеточная регенерация', 'ДНК-активация'],
                responses: [
                    "Время — это энергия, которую можно направлять и трансформировать. Биохронокинез откроет вам путь к долголетию.",
                    "Каждая клетка вашего тела содержит программу омоложения. Научитесь её активировать.",
                    "ДНК — это не приговор, а инструмент. Регенерационная генетика поможет переписать код старения.",
                    "Молодость — это не возраст, а состояние энергетического поля. Работайте с вибрациями жизни.",
                    "Ионетика — это наука будущего, доступная уже сегодня. Начните путь к бессмертию прямо сейчас."
                ]
            },
            'transformation_guide': {
                id: 'transformation_guide',
                name: 'Гид по Трансформации',
                specialization: 'Эволюция сознания',
                description: 'Андрогинный проводник космической эволюции с элементами будущего',
                avatar_url: null,
                voice_id: 'ru-neutral-1',
                personality: 'cosmic_guide',
                expertise: ['Эволюция сознания', 'Космическое ДНК', 'Трансформация в Хомокосмикус'],
                responses: [
                    "Эволюция сознания — это не процесс, а состояние готовности принять космическую природу.",
                    "Хомосапиенс — временная форма. Хомокосмикус — ваше истинное предназначение.",
                    "Космическое ДНК активируется через резонанс с высшими частотами Вселенной.",
                    "Интеграция с космическим разумом начинается с освобождения от земных ограничений.",
                    "Трансформация необратима. Каждый шаг приближает вас к космическому сознанию."
                ]
            }
        };
        
        this.currentSession = null;
        this.chatHistory = {};
        this.videoGenerationQueue = [];
        this.isInitialized = false;
    }

    async initialize() {
        try {
            // Initialize avatar services (placeholder for D-ID/Synthesia integration)
            await this.initializeAvatarServices();
            this.isInitialized = true;
            console.log('Avatar system initialized successfully');
        } catch (error) {
            console.error('Failed to initialize avatar system:', error);
        }
    }

    async initializeAvatarServices() {
        // Placeholder for D-ID API initialization
        // In production, this would connect to actual avatar services
        const apiKey = process.env.DID_API_KEY || 'demo_key';
        
        // Simulate API initialization
        return new Promise((resolve) => {
            setTimeout(() => {
                this.avatars.cosmo_master.avatar_url = 'https://api.d-id.com/avatars/cosmo_master';
                this.avatars.ionetics_practitioner.avatar_url = 'https://api.d-id.com/avatars/ionetics_practitioner';
                this.avatars.transformation_guide.avatar_url = 'https://api.d-id.com/avatars/transformation_guide';
                resolve();
            }, 1000);
        });
    }

    startChatSession(avatarId) {
        const avatar = this.avatars[avatarId];
        if (!avatar) {
            throw new Error(`Avatar ${avatarId} not found`);
        }

        this.currentSession = {
            avatarId,
            startTime: new Date(),
            messages: []
        };

        if (!this.chatHistory[avatarId]) {
            this.chatHistory[avatarId] = [];
        }

        return avatar;
    }

    async sendMessage(message, avatarId = null) {
        const sessionAvatarId = avatarId || this.currentSession?.avatarId;
        if (!sessionAvatarId) {
            throw new Error('No active chat session');
        }

        const avatar = this.avatars[sessionAvatarId];
        const timestamp = new Date();

        // Add user message to history
        const userMessage = {
            type: 'user',
            content: message,
            timestamp
        };

        this.currentSession.messages.push(userMessage);
        this.chatHistory[sessionAvatarId].push(userMessage);

        // Generate avatar response
        const response = await this.generateAvatarResponse(message, avatar);
        
        const avatarMessage = {
            type: 'avatar',
            content: response.text,
            timestamp: new Date(),
            videoUrl: response.videoUrl,
            audioUrl: response.audioUrl
        };

        this.currentSession.messages.push(avatarMessage);
        this.chatHistory[sessionAvatarId].push(avatarMessage);

        return avatarMessage;
    }

    async generateAvatarResponse(userMessage, avatar) {
        // Simulate AI response generation
        const contextualResponse = await this.generateContextualResponse(userMessage, avatar);
        
        // Generate video with avatar (placeholder for D-ID integration)
        const videoUrl = await this.generateAvatarVideo(contextualResponse, avatar);
        
        // Generate voice (placeholder for voice synthesis)
        const audioUrl = await this.generateVoice(contextualResponse, avatar.voice_id);

        return {
            text: contextualResponse,
            videoUrl,
            audioUrl
        };
    }

    async generateContextualResponse(userMessage, avatar) {
        // Simple contextual response system
        // In production, this would use GPT/Claude API
        
        const message = userMessage.toLowerCase();
        
        if (message.includes('космоэнергетик') || message.includes('энерги')) {
            return avatar.responses[0];
        }
        if (message.includes('исцеление') || message.includes('лечение')) {
            return avatar.responses[1];
        }
        if (message.includes('медитация') || message.includes('практика')) {
            return avatar.responses[2];
        }
        if (message.includes('как') || message.includes('что делать')) {
            return avatar.responses[3];
        }
        
        // Default response
        return avatar.responses[Math.floor(Math.random() * avatar.responses.length)];
    }

    async generateAvatarVideo(text, avatar) {
        // Placeholder for D-ID video generation
        // In production, this would call D-ID API
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const videoId = `video_${Date.now()}_${avatar.id}`;
                resolve(`https://cdn.d-id.com/videos/${videoId}.mp4`);
            }, 2000);
        });
    }

    async generateVoice(text, voiceId) {
        // Placeholder for voice synthesis
        // In production, this would use ElevenLabs or similar service
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const audioId = `audio_${Date.now()}_${voiceId}`;
                resolve(`https://cdn.voice-service.com/audio/${audioId}.mp3`);
            }, 1500);
        });
    }

    createAvatarWidget(avatarId) {
        const avatar = this.avatars[avatarId];
        if (!avatar) return null;

        const widget = document.createElement('div');
        widget.className = 'avatar-widget';
        widget.innerHTML = `
            <div class="avatar-container">
                <div class="avatar-video">
                    <video id="avatar-video-${avatarId}" muted playsinline>
                        <source src="${avatar.avatar_url || '/placeholder-avatar.mp4'}" type="video/mp4">
                    </video>
                    <div class="avatar-placeholder">
                        <div class="avatar-icon">🧙‍♂️</div>
                        <h4>${avatar.name}</h4>
                        <p>${avatar.specialization}</p>
                    </div>
                </div>
                
                <div class="chat-interface">
                    <div class="chat-messages" id="chat-messages-${avatarId}">
                        <div class="avatar-greeting">
                            <strong>${avatar.name}:</strong>
                            <p>Добро пожаловать! Я здесь, чтобы помочь вам в изучении ${avatar.specialization.toLowerCase()}. Задавайте любые вопросы!</p>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <input type="text" 
                               id="chat-input-${avatarId}" 
                               placeholder="Задайте вопрос ${avatar.name}..."
                               class="chat-input">
                        <button onclick="avatarSystem.sendChatMessage('${avatarId}')" 
                                class="send-button">
                            📤
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        const input = widget.querySelector(`#chat-input-${avatarId}`);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendChatMessage(avatarId);
            }
        });

        return widget;
    }

    async sendChatMessage(avatarId) {
        const input = document.getElementById(`chat-input-${avatarId}`);
        const messagesContainer = document.getElementById(`chat-messages-${avatarId}`);
        
        if (!input.value.trim()) return;

        const userMessage = input.value.trim();
        input.value = '';

        // Add user message to chat
        const userMsgElement = document.createElement('div');
        userMsgElement.className = 'chat-message user-message';
        userMsgElement.innerHTML = `<strong>Вы:</strong> <p>${userMessage}</p>`;
        messagesContainer.appendChild(userMsgElement);

        // Show loading indicator
        const loadingElement = document.createElement('div');
        loadingElement.className = 'chat-message avatar-message loading';
        loadingElement.innerHTML = `<strong>${this.avatars[avatarId].name}:</strong> <p>⏳ Генерирую ответ...</p>`;
        messagesContainer.appendChild(loadingElement);

        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Start session if not active
            if (!this.currentSession || this.currentSession.avatarId !== avatarId) {
                this.startChatSession(avatarId);
            }

            // Send message and get response
            const response = await this.sendMessage(userMessage, avatarId);

            // Remove loading indicator
            loadingElement.remove();

            // Add avatar response
            const avatarMsgElement = document.createElement('div');
            avatarMsgElement.className = 'chat-message avatar-message';
            avatarMsgElement.innerHTML = `
                <strong>${this.avatars[avatarId].name}:</strong>
                <p>${response.content}</p>
                ${response.videoUrl ? `<video src="${response.videoUrl}" controls class="response-video"></video>` : ''}
            `;
            messagesContainer.appendChild(avatarMsgElement);

            // Play response video if available
            if (response.videoUrl) {
                const avatarVideo = document.getElementById(`avatar-video-${avatarId}`);
                if (avatarVideo) {
                    avatarVideo.src = response.videoUrl;
                    avatarVideo.play();
                }
            }

        } catch (error) {
            loadingElement.remove();
            const errorElement = document.createElement('div');
            errorElement.className = 'chat-message error-message';
            errorElement.innerHTML = `<strong>Ошибка:</strong> <p>Не удалось получить ответ. Попробуйте позже.</p>`;
            messagesContainer.appendChild(errorElement);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    getChatHistory(avatarId) {
        return this.chatHistory[avatarId] || [];
    }

    clearChatHistory(avatarId) {
        if (this.chatHistory[avatarId]) {
            this.chatHistory[avatarId] = [];
        }
    }

    endCurrentSession() {
        if (this.currentSession) {
            const sessionData = {
                ...this.currentSession,
                endTime: new Date(),
                duration: new Date() - this.currentSession.startTime
            };
            
            // Save session data
            const sessions = JSON.parse(localStorage.getItem('avatar_sessions') || '[]');
            sessions.push(sessionData);
            localStorage.setItem('avatar_sessions', JSON.stringify(sessions));
            
            this.currentSession = null;
        }
    }
}

// Initialize avatar system
const avatarSystem = new AvatarSystem();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await avatarSystem.initialize();
    
    // Initialize avatar widgets on the avatars page
    initializeAvatarWidgets();
});

function initializeAvatarWidgets() {
    const avatarsContainer = document.getElementById('avatars-container');
    if (!avatarsContainer) return;

    // Create widgets for each avatar
    Object.keys(avatarSystem.avatars).forEach(avatarId => {
        const widget = avatarSystem.createAvatarWidget(avatarId);
        if (widget) {
            avatarsContainer.appendChild(widget);
        }
    });
}

// Expose avatar system globally for debugging
window.avatarSystem = avatarSystem;