document.addEventListener('DOMContentLoaded', function () {
    
    // Находим элементы на странице
    const radioTypes = document.querySelectorAll('.service-type');
    const optionsWrapper = document.getElementById('options-wrapper');
    const checkboxWrapper = document.getElementById('checkbox-wrapper');
    const productOption = document.getElementById('productOption');
    const productProperty = document.getElementById('productProperty');
    const quantityInput = document.getElementById('quantityInput');
    const totalPriceDisplay = document.getElementById('totalPrice');

    // Базовые цены для типов услуг
    const basePrices = {
        '1': 100, // Услуга 1
        '2': 200, // Услуга 2
        '3': 300  // Услуга 3
    };

    // Главная функция пересчета и управления видимостью
    function updateCalculator() {
        // 1. Определяем выбранный тип услуги
        let selectedType = '1';
        radioTypes.forEach(radio => {
            if (radio.checked) selectedType = radio.value;
        });

        // 2. Показываем/скрываем элементы (динамика)
        if (selectedType === '1') {
            optionsWrapper.classList.add('d-none');
            checkboxWrapper.classList.add('d-none');
        } else if (selectedType === '2') {
            optionsWrapper.classList.remove('d-none');
            checkboxWrapper.classList.add('d-none');
        } else if (selectedType === '3') {
            optionsWrapper.classList.add('d-none');
            checkboxWrapper.classList.remove('d-none');
        }

        // 3. Считаем стоимость
        let price = basePrices[selectedType];

        // Добавляем цену опции (если Тип 2)
        if (selectedType === '2') {
            price += parseFloat(productOption.value) || 0;
        }
        
        // Добавляем цену свойства (если Тип 3 и галочка стоит)
        if (selectedType === '3' && productProperty.checked) {
            price += parseFloat(productProperty.value) || 0;
        }

        // Учитываем количество
        let quantity = parseFloat(quantityInput.value);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1; 
        }

        const total = price * quantity;

        // 4. Выводим результат
        totalPriceDisplay.textContent = total;
    }

    // --- Обработчики событий (чтобы пересчет был динамическим) ---
    radioTypes.forEach(radio => {
        radio.addEventListener('change', updateCalculator);
    });

    productOption.addEventListener('change', updateCalculator);
    productProperty.addEventListener('change', updateCalculator);
    
    // Событие 'input' срабатывает при каждом вводе цифры
    quantityInput.addEventListener('input', updateCalculator);

    // Первоначальный расчет при загрузке страницы
    updateCalculator();
});