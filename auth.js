// Authentication and User Management System
class AuthManager {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('cosmo_users') || '{}');
        this.currentUser = JSON.parse(localStorage.getItem('cosmo_current_user') || 'null');
        this.initializeAuth();
    }

    initializeAuth() {
        // Check if user is already logged in
        if (this.currentUser) {
            this.updateUIForLoggedInUser();
        } else {
            this.updateUIForLoggedOutUser();
        }
    }

    async register(userData) {
        const { email, password, name, phone } = userData;
        
        // Check if user already exists
        if (this.users[email]) {
            throw new Error('Пользователь с таким email уже существует');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email,
            password: await this.hashPassword(password),
            name,
            phone,
            registrationDate: new Date().toISOString(),
            subscription: null,
            progress: {},
            completedLessons: [],
            certificates: []
        };

        this.users[email] = newUser;
        this.saveUsers();
        
        return { success: true, message: 'Регистрация успешна' };
    }

    async login(email, password) {
        const user = this.users[email];
        
        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const isPasswordValid = await this.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Неверный пароль');
        }

        this.currentUser = user;
        localStorage.setItem('cosmo_current_user', JSON.stringify(user));
        this.updateUIForLoggedInUser();
        
        return { success: true, message: 'Вход выполнен успешно' };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('cosmo_current_user');
        this.updateUIForLoggedOutUser();
    }

    async hashPassword(password) {
        // Simple hash for demo - in production use proper crypto
        return btoa(password + 'cosmo_salt');
    }

    async verifyPassword(password, hashedPassword) {
        const hashed = await this.hashPassword(password);
        return hashed === hashedPassword;
    }

    saveUsers() {
        localStorage.setItem('cosmo_users', JSON.stringify(this.users));
    }

    updateUserProgress(lessonId, moduleId) {
        if (!this.currentUser) return;

        if (!this.currentUser.progress[moduleId]) {
            this.currentUser.progress[moduleId] = [];
        }

        if (!this.currentUser.progress[moduleId].includes(lessonId)) {
            this.currentUser.progress[moduleId].push(lessonId);
            this.currentUser.completedLessons.push({
                lessonId,
                moduleId,
                completedAt: new Date().toISOString()
            });
        }

        this.users[this.currentUser.email] = this.currentUser;
        this.saveUsers();
        localStorage.setItem('cosmo_current_user', JSON.stringify(this.currentUser));
    }

    updateUIForLoggedInUser() {
        // Update navigation and UI elements
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <span class="user-name">👤 ${this.currentUser.name}</span>
                    <button class="btn btn--secondary" onclick="authManager.logout()">Выйти</button>
                </div>
            `;
        }

        // Show course content
        document.querySelectorAll('.locked-content').forEach(el => {
            if (this.hasAccess(el.dataset.module)) {
                el.classList.remove('locked-content');
            }
        });
    }

    updateUIForLoggedOutUser() {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="btn btn--primary" onclick="showLoginModal()">Войти</button>
                <button class="btn btn--secondary" onclick="showRegisterModal()">Регистрация</button>
            `;
        }

        // Hide course content
        document.querySelectorAll('.course-content').forEach(el => {
            el.classList.add('locked-content');
        });
    }

    hasAccess(moduleId) {
        if (!this.currentUser || !this.currentUser.subscription) return false;
        
        const subscription = this.currentUser.subscription;
        if (subscription.tier === 'VIP') return true;
        if (subscription.tier === 'Премиум' && parseInt(moduleId) <= 4) return true;
        if (subscription.tier === 'Базовый курс' && parseInt(moduleId) <= 2) return true;
        
        return false;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getUserProgress() {
        return this.currentUser ? this.currentUser.progress : {};
    }
}

// Initialize auth manager
const authManager = new AuthManager();

// Modal functions
function showLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal auth-modal">
            <div class="modal-header">
                <h3>Вход в систему</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <form class="auth-form" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" name="password" required>
                </div>
                <button type="submit" class="btn btn--primary btn--full">Войти</button>
            </form>
            <p class="auth-switch">
                Нет аккаунта? <button onclick="showRegisterModal()">Зарегистрироваться</button>
            </p>
        </div>
    `;
    document.body.appendChild(modal);
}

function showRegisterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal auth-modal">
            <div class="modal-header">
                <h3>Регистрация</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <form class="auth-form" onsubmit="handleRegister(event)">
                <div class="form-group">
                    <label>Имя</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Телефон</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" name="password" required minlength="6">
                </div>
                <button type="submit" class="btn btn--primary btn--full">Зарегистрироваться</button>
            </form>
            <p class="auth-switch">
                Уже есть аккаунт? <button onclick="showLoginModal()">Войти</button>
            </p>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        await authManager.login(formData.get('email'), formData.get('password'));
        closeModal();
        showNotification('Вход выполнен успешно!', 'success');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        await authManager.register({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            password: formData.get('password')
        });
        closeModal();
        showNotification('Регистрация успешна! Теперь войдите в систему.', 'success');
        showLoginModal();
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('notification--show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('notification--show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}