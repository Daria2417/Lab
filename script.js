// 1. Инициализация после загрузки DOM (5 баллов)
document.addEventListener('DOMContentLoaded', function () {
    
    // Находим элементы на странице
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calcButton = document.getElementById('calc-btn');
    const resultDiv = document.getElementById('result');

    // 2. Добавляем обработчик события на клик (5 баллов)
    calcButton.addEventListener('click', function () {
        const quantityValue = quantityInput.value.trim();
        const productPrice = parseFloat(productSelect.value);

        // 3. Проверка корректности ввода с помощью регулярного выражения (5 баллов)
        // Регулярное выражение: только положительные числа (целые или с точкой)
        const numberRegex = /^\d+(\.\d+)?$/;

        if (!numberRegex.test(quantityValue)) {
            // Вывод сообщения об ошибке, если введены недопустимые символы
            resultDiv.textContent = 'Ошибка: Пожалуйста, введите корректное положительное число!';
            resultDiv.classList.add('text-danger');
            resultDiv.classList.remove('text-success');
            return; // Прерываем выполнение функции
        }

        const quantity = parseFloat(quantityValue);

        // 4. Подсчет стоимости (15 баллов)
        const totalCost = quantity * productPrice;

        // Вывод результата
        resultDiv.textContent = `Итоговая стоимость заказа: ${totalCost.toFixed(2)} руб.`;
        resultDiv.classList.add('text-success');
        resultDiv.classList.remove('text-danger');
    });
});