document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    const loadingText = document.querySelector('.loading-text');
    
    // Функция завершения загрузки
    function completeLoading() {
        // Показываем контент
        content.style.opacity = '1';
        
        // Плавно скрываем прелоадер
        preloader.style.opacity = '0';
        
        setTimeout(() => {
            // Удаляем прелоадер после анимации
            preloader.style.display = 'none';
            
            // Возвращаем скролл
            document.body.classList.remove('preload');
            document.body.classList.add('loaded');
            
            // Инициализируем компоненты
            initComponents();
        }, 500);
    }

    // Имитация загрузки
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += 20;
        loadingText.textContent = `Загрузка ипподрома... ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadInterval);
            completeLoading();
        }
    }, 150);

    // Инициализация компонентов
    function initComponents() {
        initScrollToTop();
        initSmoothScrolling();
        initFormHandling();
        loadServices();
        updateFooterYear();
    }

    // Загрузка услуг
    async function loadServices() {
        try {
            const response = await fetch('data/services.json');
            if (!response.ok) throw new Error('Ошибка загрузки');
            const data = await response.json();
            renderServices(data.services);
        } catch (error) {
            console.error('Ошибка:', error);
            renderError();
        }
    }

    function renderServices(services) {
        const container = document.querySelector('#services .container');
        if (!container) return;
        
        container.innerHTML = `
            <h2>${services.title}</h2>
            <div class="services-grid">
                ${services.items.map(service => `
                    <div class="service-item">
                        <img src="${service.icon}" alt="${service.title}" width="300" height="200">
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                        <a href="${service.link}" class="service-link">Подробнее →</a>
                    </div>
                `).join('')}
            </div>
        `;
        
        initServiceAnimations();
    }

    function renderError() {
        const container = document.querySelector('#services .container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h3>Произошла ошибка при загрузке услуг</h3>
                    <p>Попробуйте обновить страницу</p>
                </div>
            `;
        }
    }

    function initScrollToTop() {
        const btn = document.createElement('button');
        btn.className = 'scroll-to-top';
        btn.innerHTML = '↑';
        document.body.appendChild(btn);

        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                btn.style.opacity = '1';
                btn.style.visibility = 'visible';
            } else {
                btn.style.opacity = '0';
                btn.style.visibility = 'hidden';
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility();

        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initFormHandling() {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Спасибо за заявку! Мы свяжемся с вами.');
                this.reset();
            });
        }
    }

    function initServiceAnimations() {
        document.querySelectorAll('.service-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            });
            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
                item.style.boxShadow = '';
            });
        });
    }

    function updateFooterYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
});