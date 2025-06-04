document.addEventListener('DOMContentLoaded', function() {
    // Элементы предзагрузки
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    const loadingText = document.querySelector('.loading-text');

    // Функция завершения загрузки
    const completeLoading = () => {
        document.body.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('preload');
        }, 500);
    };

    // Имитация загрузки
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += 20;
        loadingText.textContent = `Загрузка ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadInterval);
            completeLoading();
            initAll();
        }
    }, 150);

    // Инициализация всех компонентов
    function initAll() {
        initSwiper();
        initFormStorage();
        initScrollToTop();
        updateFooterYear();
    }

    // 1. Карусель Swiper
    function initSwiper() {
        // Загружаем данные услуг
        fetch('data/services.json')
            .then(response => response.json())
            .then(data => {
                const swiperWrapper = document.querySelector('.swiper-wrapper');
                swiperWrapper.innerHTML = data.services.items.map(service => `
                    <div class="swiper-slide">
                        <div class="service-card">
                            <img src="${service.icon}" alt="${service.title}">
                            <h3>${service.title}</h3>
                            <p>${service.description}</p>
                            <button class="btn-book" data-service="${service.title}">Записаться</button>
                        </div>
                    </div>
                `).join('');

                // Инициализируем Swiper после загрузки карточек
                new Swiper('.services-swiper', {
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }
                });

                // Добавляем обработчики для кнопок записи
                document.querySelectorAll('.btn-book').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const serviceName = this.getAttribute('data-service');
                        const form = document.getElementById('booking-form');
                        let serviceValue = 'walking';
                        
                        if (serviceName.includes('урок')) serviceValue = 'lesson';
                        if (serviceName.includes('мероприятие')) serviceValue = 'event';
                        
                        form.service.value = serviceValue;
                        form.scrollIntoView({ behavior: 'smooth' });
                    });
                });
            })
            .catch(error => {
                console.error('Ошибка загрузки услуг:', error);
                document.querySelector('#services .container').innerHTML = `
                    <div class="error">Не удалось загрузить услуги. Пожалуйста, попробуйте позже.</div>
                `;
            });
    }

    // 2. Работа с LocalStorage для формы
    function initFormStorage() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        // Восстановление данных из LocalStorage
        const savedData = JSON.parse(localStorage.getItem('bookingFormData'));
        if (savedData) {
            form.name.value = savedData.name || '';
            form.phone.value = savedData.phone || '';
            form.date.value = savedData.date || '';
            form.service.value = savedData.service || 'walking';
        }

        // Сохранение данных при изменении
        form.addEventListener('input', () => {
            const formData = {
                name: form.name.value,
                phone: form.phone.value,
                date: form.date.value,
                service: form.service.value
            };
            localStorage.setItem('bookingFormData', JSON.stringify(formData));
        });

        // Очистка при отправке
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.removeItem('bookingFormData');
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            form.reset();
        });
    }

    // 3. Кнопка скролла вверх
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        document.body.appendChild(scrollBtn);

        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility();

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Обновление года в футере
    function updateFooterYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
});