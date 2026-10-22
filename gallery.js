document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('gallery-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pagerContainer = document.getElementById('gallery-pager');
    
    // Получаем все картинки
    const items = document.querySelectorAll('.gallery-item');
    const totalImages = items.length;
    
    // Определяем, сколько фото показывать (3 на ПК, 1 на телефоне)
    let itemsPerView = window.innerWidth >= 768 ? 3 : 1;
    let currentPage = 0;

    // Вычисляем общее количество страниц
    function getTotalPages() {
        return Math.ceil(totalImages / itemsPerView);
    }

    // Рисуем точки (пейджер)
    function renderPager() {
        pagerContainer.innerHTML = ''; 
        const totalPages = getTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('pager-dot');
            if (i === currentPage) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                currentPage = i;
                updateGallery();
            });
            pagerContainer.appendChild(dot);
        }
    }

    // Главная функция сдвига
function updateGallery() {
    // Вычисляем ширину одного фото в ПИКСЕЛЯХ
    const itemWidth = items[0].offsetWidth;
    
    // Считаем, на сколько пикселей сдвинуть ленту
    let shiftAmount = currentPage * itemsPerView * itemWidth;
    
    // Считаем МАКСИМАЛЬНО возможный сдвиг
    // (Общее кол-во фото минус кол-во видимых на экране) * ширина фото
    const maxShift = (totalImages - itemsPerView) * itemWidth;
    
    // Если мы посчитали сдвинуть дальше, чем можно — принудительно останавливаемся на максимуме
    if (shiftAmount > maxShift) {
        shiftAmount = maxShift;
    }
    
    // Двигаем ленту
    track.style.transform = `translateX(-${shiftAmount}px)`;

    // Обновляем активную точку
    const dots = document.querySelectorAll('.pager-dot');
    dots.forEach((dot, index) => {
        if (index === currentPage) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

    // Обработчик кнопки "Вперед"
    btnNext.addEventListener('click', () => {
        if (currentPage < getTotalPages() - 1) {
            currentPage++;
            updateGallery();
        }
    });

    // Обработчик кнопки "Назад"
    btnPrev.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateGallery();
        }
    });

    // Обработка изменения размера окна (адаптивность)
    window.addEventListener('resize', () => {
        const newItemsPerView = window.innerWidth >= 768 ? 3 : 1;
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            currentPage = 0; // При смене ширины возвращаемся в начало
            renderPager();
            
            // Небольшая задержка, чтобы браузер успел перестроить верстку перед замером
            setTimeout(updateGallery, 50); 
        }
    });

    // Запускаем всё при загрузке
    renderPager();
    // Небольшая задержка нужна, чтобы картинки успели загрузиться и получить правильную ширину
    setTimeout(updateGallery, 100); 
});