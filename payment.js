// Payment Processing System
class PaymentManager {
    constructor() {
        this.paymentHistory = JSON.parse(localStorage.getItem('cosmo_payments') || '[]');
        this.pricingTiers = {
            'basic': {
                name: 'Базовый курс',
                price: 49900,
                features: [
                    'Доступ к 30 видеоурокам',
                    'Записи 6 космосеансов',
                    '12 медитаций с аватарами'
                ],
                modules: [1, 2]
            },
            'premium': {
                name: 'Премиум',
                price: 89900,
                features: [
                    'Все из базового',
                    'Участие в лайв космосеансах',
                    'Персональная консультация с аватаром'
                ],
                modules: [1, 2, 3, 4]
            },
            'vip': {
                name: 'VIP',
                price: 149900,
                features: [
                    'Все из премиум',
                    'Индивидуальные сеансы с аватарами',
                    'Персональная программа трансформации'
                ],
                modules: [1, 2, 3, 4, 5, 6]
            }
        };
    }

    async processPayment(tier, paymentMethod = 'yukassa') {
        const currentUser = authManager.getCurrentUser();
        if (!currentUser) {
            throw new Error('Необходимо войти в систему для оплаты');
        }

        const tierData = this.pricingTiers[tier];
        if (!tierData) {
            throw new Error('Неверный тарифный план');
        }

        // Create payment record
        const payment = {
            id: 'pay_' + Date.now(),
            userId: currentUser.id,
            userEmail: currentUser.email,
            tier: tier,
            amount: tierData.price,
            currency: 'RUB',
            method: paymentMethod,
            status: 'pending',
            createdAt: new Date().toISOString(),
            description: `Оплата курса "${tierData.name}"`
        };

        try {
            // Simulate payment processing
            const result = await this.simulatePayment(payment);
            
            if (result.success) {
                payment.status = 'completed';
                payment.completedAt = new Date().toISOString();
                
                // Update user subscription
                await this.updateUserSubscription(currentUser, tier);
                
                // Save payment history
                this.paymentHistory.push(payment);
                localStorage.setItem('cosmo_payments', JSON.stringify(this.paymentHistory));
                
                return {
                    success: true,
                    paymentId: payment.id,
                    message: 'Оплата прошла успешно!'
                };
            } else {
                payment.status = 'failed';
                payment.error = result.error;
                this.paymentHistory.push(payment);
                localStorage.setItem('cosmo_payments', JSON.stringify(this.paymentHistory));
                
                throw new Error(result.error || 'Ошибка обработки платежа');
            }
        } catch (error) {
            payment.status = 'failed';
            payment.error = error.message;
            this.paymentHistory.push(payment);
            localStorage.setItem('cosmo_payments', JSON.stringify(this.paymentHistory));
            throw error;
        }
    }

    async simulatePayment(payment) {
        // Simulate API call to payment provider (ЮKassa, Сбербанк, etc.)
        return new Promise((resolve) => {
            setTimeout(() => {
                // 95% success rate for simulation
                const success = Math.random() > 0.05;
                
                if (success) {
                    resolve({ 
                        success: true, 
                        transactionId: 'txn_' + Date.now(),
                        providerResponse: 'Payment processed successfully'
                    });
                } else {
                    resolve({ 
                        success: false, 
                        error: 'Недостаточно средств на карте' 
                    });
                }
            }, 2000); // Simulate network delay
        });
    }

    async updateUserSubscription(user, tier) {
        const tierData = this.pricingTiers[tier];
        const subscription = {
            tier: tierData.name,
            tierKey: tier,
            purchasedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
            modules: tierData.modules,
            status: 'active'
        };

        user.subscription = subscription;
        
        // Update user in storage
        const users = JSON.parse(localStorage.getItem('cosmo_users') || '{}');
        users[user.email] = user;
        localStorage.setItem('cosmo_users', JSON.stringify(users));
        localStorage.setItem('cosmo_current_user', JSON.stringify(user));
        
        // Update current user in auth manager
        authManager.currentUser = user;
        authManager.updateUIForLoggedInUser();
    }

    initializePaymentUI() {
        // Add payment buttons to pricing cards
        document.querySelectorAll('.pricing-card').forEach((card, index) => {
            const tiers = ['basic', 'premium', 'vip'];
            const tier = tiers[index];
            const tierData = this.pricingTiers[tier];
            
            if (tierData) {
                const button = card.querySelector('.btn');
                if (button) {
                    button.onclick = () => this.showPaymentModal(tier);
                }
            }
        });
    }

    showPaymentModal(tier) {
        const currentUser = authManager.getCurrentUser();
        if (!currentUser) {
            showNotification('Необходимо войти в систему для оплаты', 'error');
            showLoginModal();
            return;
        }

        const tierData = this.pricingTiers[tier];
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal payment-modal">
                <div class="modal-header">
                    <h3>Оплата курса</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="payment-details">
                    <h4>${tierData.name}</h4>
                    <div class="price">${tierData.price.toLocaleString('ru')} ₽</div>
                    <ul class="features-list">
                        ${tierData.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="payment-methods">
                    <h5>Способ оплаты:</h5>
                    <div class="payment-options">
                        <label class="payment-option">
                            <input type="radio" name="payment-method" value="yukassa" checked>
                            <span>💳 ЮKassa (Карта)</span>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="payment-method" value="sberbank">
                            <span>🏦 Сбербанк Онлайн</span>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="payment-method" value="qiwi">
                            <span>💰 QIWI Кошелек</span>
                        </label>
                    </div>
                </div>
                <div class="payment-actions">
                    <button class="btn btn--primary btn--full" onclick="processPayment('${tier}')">
                        Оплатить ${tierData.price.toLocaleString('ru')} ₽
                    </button>
                </div>
                <div class="payment-security">
                    <small>🔒 Безопасная оплата через защищенное соединение</small>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    getUserPayments(userId) {
        return this.paymentHistory.filter(payment => payment.userId === userId);
    }

    getPaymentById(paymentId) {
        return this.paymentHistory.find(payment => payment.id === paymentId);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(price);
    }
}

// Initialize payment manager
const paymentManager = new PaymentManager();

// Global payment function
async function processPayment(tier) {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'yukassa';
    const button = document.querySelector('.payment-actions button');
    
    if (button) {
        button.disabled = true;
        button.innerHTML = '⏳ Обработка платежа...';
    }

    try {
        const result = await paymentManager.processPayment(tier, paymentMethod);
        closeModal();
        showNotification(result.message, 'success');
        
        // Show success modal
        showPaymentSuccessModal(tier);
        
    } catch (error) {
        showNotification(error.message, 'error');
        
        if (button) {
            button.disabled = false;
            button.innerHTML = `Оплатить ${paymentManager.pricingTiers[tier].price.toLocaleString('ru')} ₽`;
        }
    }
}

function showPaymentSuccessModal(tier) {
    const tierData = paymentManager.pricingTiers[tier];
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal success-modal">
            <div class="modal-header">
                <h3>🎉 Оплата успешна!</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h4>Добро пожаловать в курс "${tierData.name}"!</h4>
                <p>Теперь у вас есть доступ ко всем материалам курса. Начните свою трансформацию прямо сейчас!</p>
                <div class="success-actions">
                    <button class="btn btn--primary" onclick="startCourse()">Начать обучение</button>
                    <button class="btn btn--secondary" onclick="closeModal()">Позже</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function startCourse() {
    closeModal();
    // Navigate to course section
    document.querySelector('[data-page="course"]')?.click();
}

// Initialize payment UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    paymentManager.initializePaymentUI();
});