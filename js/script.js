document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For demonstration, we'll just show an alert
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            
            // Reset the form after submission
            this.reset();
        });
    }

    // Service items animation
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        });
    });

    // Current year in footer
    const yearElement = document.querySelector('footer p:last-child');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }

    // 1. Создаем массив из заголовков и выводим их
    const headings = Array.from(document.querySelectorAll('h2')).map(h2 => h2.textContent);
    console.log('Все заголовки h2 на странице:', headings);
    
    // Выводим заголовки в специальный блок (можно создать или использовать существующий)
    const headingsContainer = document.createElement('div');
    headingsContainer.className = 'headings-list';
    headingsContainer.style.background = '#f9f9f9';
    headingsContainer.style.padding = '20px';
    headingsContainer.style.margin = '20px 0';
    headingsContainer.style.borderRadius = '8px';
    
    const headingsTitle = document.createElement('h3');
    headingsTitle.textContent = 'Все разделы на странице:';
    headingsContainer.appendChild(headingsTitle);
    
    const headingsList = document.createElement('ul');
    headings.forEach(heading => {
        const li = document.createElement('li');
        li.textContent = heading;
        headingsList.appendChild(li);
    });
    headingsContainer.appendChild(headingsList);
    
    // Вставляем после hero-секции
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.insertAdjacentElement('afterend', headingsContainer);
    }

    // 2. Добавляем кнопку скролла вверх
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑ Наверх';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.padding = '10px 15px';
    scrollToTopBtn.style.backgroundColor = '#2c3e50';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.borderRadius = '5px';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.zIndex = '99';
    scrollToTopBtn.style.transition = 'opacity 0.3s';
    
    document.body.appendChild(scrollToTopBtn);
    
    // Показываем/скрываем кнопку при скролле
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
            scrollToTopBtn.style.opacity = '0.8';
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Обработчик клика по кнопке
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});