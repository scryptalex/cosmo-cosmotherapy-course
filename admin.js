// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        this.users = JSON.parse(localStorage.getItem('cosmo_users') || '{}');
        this.payments = JSON.parse(localStorage.getItem('cosmo_payments') || '[]');
        this.avatarSessions = JSON.parse(localStorage.getItem('avatar_sessions') || '[]');
        this.activities = JSON.parse(localStorage.getItem('admin_activities') || '[]');
        
        this.initializeAdmin();
    }

    initializeAdmin() {
        this.setupNavigation();
        this.loadDashboard();
        this.updateStats();
        this.loadRecentActivity();
        
        // Auto-refresh every 30 seconds
        setInterval(() => {
            this.updateStats();
            this.loadRecentActivity();
        }, 30000);
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const section = link.dataset.section;
                this.showSection(section);
                
                // Update active nav
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const section = document.getElementById(sectionName);
        if (section) {
            section.classList.add('active');
            this.currentSection = sectionName;
            
            // Load section-specific data
            switch (sectionName) {
                case 'users':
                    this.loadUsers();
                    break;
                case 'payments':
                    this.loadPayments();
                    break;
                case 'avatars':
                    this.loadAvatars();
                    break;
                case 'content':
                    this.loadContent();
                    break;
                case 'analytics':
                    this.loadAnalytics();
                    break;
            }
        }
    }

    updateStats() {
        const users = Object.values(this.users);
        const totalUsers = users.length;
        const activeSubscriptions = users.filter(u => u.subscription && u.subscription.status === 'active').length;
        const totalRevenue = this.payments
            .filter(p => p.status === 'completed')
            .reduce((sum, p) => sum + p.amount, 0);
        const avatarSessionsCount = this.avatarSessions.length;

        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('total-revenue').textContent = `₽${totalRevenue.toLocaleString('ru')}`;
        document.getElementById('active-subscriptions').textContent = activeSubscriptions;
        document.getElementById('avatar-sessions').textContent = avatarSessionsCount;
    }

    loadDashboard() {
        this.updateStats();
    }

    loadUsers() {
        const tbody = document.getElementById('users-table-body');
        const users = Object.values(this.users);
        
        tbody.innerHTML = users.map(user => {
            const progressPercent = this.calculateUserProgress(user);
            const subscriptionText = user.subscription ? user.subscription.tier : 'Нет подписки';
            
            return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone || 'Не указан'}</td>
                    <td><span class="status-badge ${user.subscription ? 'status-active' : 'status-pending'}">${subscriptionText}</span></td>
                    <td>${progressPercent}%</td>
                    <td>${new Date(user.registrationDate).toLocaleDateString('ru')}</td>
                    <td>
                        <button class="btn btn--sm" onclick="adminPanel.editUser('${user.email}')">Редактировать</button>
                        <button class="btn btn--sm btn--outline" onclick="adminPanel.viewUserDetails('${user.email}')">Детали</button>
                    </td>
                </tr>
            `;
        }).join('');

        // Setup search and filters
        this.setupUserFilters();
    }

    calculateUserProgress(user) {
        if (!user.completedLessons || user.completedLessons.length === 0) return 0;
        const totalLessons = 30; // 6 modules × 5 lessons each
        return Math.round((user.completedLessons.length / totalLessons) * 100);
    }

    setupUserFilters() {
        const searchInput = document.getElementById('user-search');
        const subscriptionFilter = document.getElementById('subscription-filter');
        
        const filterUsers = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const subscriptionType = subscriptionFilter.value;
            
            const rows = document.querySelectorAll('#users-table-body tr');
            
            rows.forEach(row => {
                const name = row.cells[1].textContent.toLowerCase();
                const email = row.cells[2].textContent.toLowerCase();
                const subscription = row.cells[4].textContent;
                
                const matchesSearch = name.includes(searchTerm) || email.includes(searchTerm);
                const matchesSubscription = !subscriptionType || subscription.includes(subscriptionType);
                
                row.style.display = matchesSearch && matchesSubscription ? '' : 'none';
            });
        };
        
        searchInput.addEventListener('input', filterUsers);
        subscriptionFilter.addEventListener('change', filterUsers);
    }

    loadPayments() {
        const tbody = document.getElementById('payments-table-body');
        
        tbody.innerHTML = this.payments.map(payment => {
            const user = this.users[payment.userEmail];
            const userName = user ? user.name : 'Неизвестный пользователь';
            
            return `
                <tr>
                    <td>${payment.id}</td>
                    <td>${userName}</td>
                    <td>${payment.tier}</td>
                    <td>₽${payment.amount.toLocaleString('ru')}</td>
                    <td>${payment.method}</td>
                    <td><span class="status-badge status-${payment.status}">${this.getPaymentStatusText(payment.status)}</span></td>
                    <td>${new Date(payment.createdAt).toLocaleDateString('ru')}</td>
                    <td>
                        <button class="btn btn--sm" onclick="adminPanel.viewPaymentDetails('${payment.id}')">Детали</button>
                        ${payment.status === 'pending' ? `<button class="btn btn--sm" onclick="adminPanel.processPayment('${payment.id}')">Обработать</button>` : ''}
                    </td>
                </tr>
            `;
        }).join('');

        this.updatePaymentStats();
    }

    getPaymentStatusText(status) {
        const statusMap = {
            'pending': 'Ожидает',
            'completed': 'Завершен',
            'failed': 'Ошибка'
        };
        return statusMap[status] || status;
    }

    updatePaymentStats() {
        const today = new Date().toDateString();
        const todayPayments = this.payments.filter(p => 
            new Date(p.createdAt).toDateString() === today && p.status === 'completed'
        );
        
        const paymentsToday = todayPayments.length;
        const revenueToday = todayPayments.reduce((sum, p) => sum + p.amount, 0);
        const totalUsers = Object.keys(this.users).length;
        const paidUsers = this.payments.filter(p => p.status === 'completed').length;
        const conversionRate = totalUsers > 0 ? ((paidUsers / totalUsers) * 100).toFixed(1) : 0;

        document.getElementById('payments-today').textContent = paymentsToday;
        document.getElementById('revenue-today').textContent = `₽${revenueToday.toLocaleString('ru')}`;
        document.getElementById('conversion-rate').textContent = `${conversionRate}%`;
    }

    loadAvatars() {
        // Update avatar statistics
        const avatarStats = this.calculateAvatarStats();
        
        Object.keys(avatarStats).forEach(avatarId => {
            const stats = avatarStats[avatarId];
            const sessionsElement = document.getElementById(`${avatarId.replace('_', '-')}-sessions`);
            const messagesElement = document.getElementById(`${avatarId.replace('_', '-')}-messages`);
            
            if (sessionsElement) sessionsElement.textContent = stats.sessions;
            if (messagesElement) messagesElement.textContent = stats.messages;
        });

        this.loadChatLogs();
    }

    calculateAvatarStats() {
        const stats = {
            cosmo_master: { sessions: 0, messages: 0 },
            ionetics_practitioner: { sessions: 0, messages: 0 },
            transformation_guide: { sessions: 0, messages: 0 }
        };

        this.avatarSessions.forEach(session => {
            if (stats[session.avatarId]) {
                stats[session.avatarId].sessions++;
                stats[session.avatarId].messages += session.messages.length;
            }
        });

        return stats;
    }

    loadChatLogs() {
        const logsContainer = document.getElementById('chat-logs');
        const recentSessions = this.avatarSessions.slice(-10).reverse();
        
        logsContainer.innerHTML = recentSessions.map(session => {
            const avatar = session.avatarId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
            return `
                <div class="log-entry">
                    <strong>[${new Date(session.startTime).toLocaleString('ru')}]</strong> 
                    ${avatar} - ${session.messages.length} сообщений
                    ${session.endTime ? `(Длительность: ${Math.round((new Date(session.endTime) - new Date(session.startTime)) / 60000)} мин)` : '(Активная сессия)'}
                </div>
            `;
        }).join('');
    }

    loadContent() {
        // Content management is already shown in HTML
        // Here we can add dynamic loading of actual content statistics
    }

    loadAnalytics() {
        // Initialize charts (placeholder for Chart.js integration)
        this.initializeCharts();
    }

    initializeCharts() {
        // Placeholder for Chart.js charts
        // In a real implementation, you would use Chart.js library
        console.log('Charts would be initialized here with Chart.js');
    }

    loadRecentActivity() {
        const activityList = document.getElementById('activity-list');
        
        // Generate recent activities from various sources
        const activities = this.generateRecentActivities();
        
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div>${activity.description}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }

    generateRecentActivities() {
        const activities = [];
        
        // Recent payments
        const recentPayments = this.payments.slice(-5);
        recentPayments.forEach(payment => {
            activities.push({
                icon: '💰',
                description: `Новый платеж на сумму ₽${payment.amount.toLocaleString('ru')}`,
                time: this.timeAgo(payment.createdAt)
            });
        });
        
        // Recent registrations
        const recentUsers = Object.values(this.users).slice(-3);
        recentUsers.forEach(user => {
            activities.push({
                icon: '👤',
                description: `Новый пользователь: ${user.name}`,
                time: this.timeAgo(user.registrationDate)
            });
        });
        
        // Recent avatar sessions
        const recentSessions = this.avatarSessions.slice(-3);
        recentSessions.forEach(session => {
            const avatarName = session.avatarId.replace('_', ' ');
            activities.push({
                icon: '🤖',
                description: `Сессия с аватаром: ${avatarName}`,
                time: this.timeAgo(session.startTime)
            });
        });
        
        return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);
    }

    timeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Только что';
        if (diffInMinutes < 60) return `${diffInMinutes} мин назад`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} ч назад`;
        return `${Math.floor(diffInMinutes / 1440)} дн назад`;
    }

    // Admin Actions
    editUser(email) {
        const user = this.users[email];
        if (user) {
            // Create edit modal (simplified)
            alert(`Редактирование пользователя: ${user.name}\nEmail: ${user.email}`);
        }
    }

    viewUserDetails(email) {
        const user = this.users[email];
        if (user) {
            const details = `
Детали пользователя:
Имя: ${user.name}
Email: ${user.email}
Телефон: ${user.phone || 'Не указан'}
Дата регистрации: ${new Date(user.registrationDate).toLocaleDateString('ru')}
Подписка: ${user.subscription ? user.subscription.tier : 'Нет'}
Завершено уроков: ${user.completedLessons ? user.completedLessons.length : 0}
            `;
            alert(details);
        }
    }

    viewPaymentDetails(paymentId) {
        const payment = this.payments.find(p => p.id === paymentId);
        if (payment) {
            const details = `
Детали платежа:
ID: ${payment.id}
Пользователь: ${payment.userEmail}
Тариф: ${payment.tier}
Сумма: ₽${payment.amount.toLocaleString('ru')}
Метод: ${payment.method}
Статус: ${this.getPaymentStatusText(payment.status)}
Дата: ${new Date(payment.createdAt).toLocaleDateString('ru')}
            `;
            alert(details);
        }
    }

    manageAvatar(avatarId) {
        alert(`Управление аватаром: ${avatarId}\n\nЗдесь можно настроить параметры аватара, обновить ответы, просмотреть статистику.`);
    }
}

// Quick Actions
function createTestUser() {
    const testUser = {
        id: Date.now().toString(),
        email: `test${Date.now()}@example.com`,
        name: `Тестовый пользователь ${Math.floor(Math.random() * 1000)}`,
        phone: `+7${Math.floor(Math.random() * 10000000000)}`,
        password: 'hashed_password',
        registrationDate: new Date().toISOString(),
        subscription: null,
        progress: {},
        completedLessons: [],
        certificates: []
    };

    const users = JSON.parse(localStorage.getItem('cosmo_users') || '{}');
    users[testUser.email] = testUser;
    localStorage.setItem('cosmo_users', JSON.stringify(users));
    
    adminPanel.users = users;
    adminPanel.updateStats();
    adminPanel.loadUsers();
    
    showNotification('Тестовый пользователь создан!', 'success');
}

function generateTestPayments() {
    const users = Object.values(JSON.parse(localStorage.getItem('cosmo_users') || '{}'));
    const payments = JSON.parse(localStorage.getItem('cosmo_payments') || '[]');
    
    if (users.length === 0) {
        showNotification('Сначала создайте пользователей!', 'error');
        return;
    }

    const tiers = ['basic', 'premium', 'vip'];
    const prices = { basic: 49900, premium: 89900, vip: 149900 };
    
    for (let i = 0; i < 5; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const tier = tiers[Math.floor(Math.random() * tiers.length)];
        
        const payment = {
            id: 'pay_' + Date.now() + '_' + i,
            userId: user.id,
            userEmail: user.email,
            tier: tier,
            amount: prices[tier],
            currency: 'RUB',
            method: 'yukassa',
            status: Math.random() > 0.1 ? 'completed' : 'failed',
            createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
        };
        
        payments.push(payment);
    }
    
    localStorage.setItem('cosmo_payments', JSON.stringify(payments));
    adminPanel.payments = payments;
    adminPanel.updateStats();
    adminPanel.loadPayments();
    
    showNotification('Тестовые платежи сгенерированы!', 'success');
}

function resetAvatarSessions() {
    localStorage.removeItem('avatar_sessions');
    adminPanel.avatarSessions = [];
    adminPanel.updateStats();
    adminPanel.loadAvatars();
    
    showNotification('Сессии аватаров сброшены!', 'success');
}

function exportData() {
    const data = {
        users: JSON.parse(localStorage.getItem('cosmo_users') || '{}'),
        payments: JSON.parse(localStorage.getItem('cosmo_payments') || '[]'),
        avatarSessions: JSON.parse(localStorage.getItem('avatar_sessions') || '[]'),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `cosmo_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Данные экспортированы!', 'success');
}

function testAvatarAPI() {
    showNotification('Тестирование API аватаров...', 'info');
    
    setTimeout(() => {
        showNotification('API аватаров работает корректно!', 'success');
    }, 2000);
}

function uploadContent() {
    alert('Здесь будет интерфейс для загрузки видеоуроков, материалов курса и других файлов.');
}

function downloadPaymentReport() {
    const payments = JSON.parse(localStorage.getItem('cosmo_payments') || '[]');
    
    let csv = 'ID,Пользователь,Тариф,Сумма,Метод,Статус,Дата\n';
    payments.forEach(payment => {
        csv += `${payment.id},${payment.userEmail},${payment.tier},${payment.amount},${payment.method},${payment.status},${payment.createdAt}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payments_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    showNotification('Отчет скачан!', 'success');
}

// Initialize admin panel
const adminPanel = new AdminPanel();

// Add some sample data for demonstration
document.addEventListener('DOMContentLoaded', () => {
    // Create sample data if none exists
    if (Object.keys(adminPanel.users).length === 0) {
        createTestUser();
        createTestUser();
        setTimeout(() => {
            generateTestPayments();
        }, 1000);
    }
});