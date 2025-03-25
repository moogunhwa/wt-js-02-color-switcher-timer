document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector("#datetime-picker");
    const startButton = document.querySelector("button[data-start]");
    const daysSpan = document.querySelector("span[data-days]");
    const hoursSpan = document.querySelector("span[data-hours]");
    const minutesSpan = document.querySelector("span[data-minutes]");
    const secondsSpan = document.querySelector("span[data-seconds]");

    let countdownInterval;

    // ✅ Разблокируем кнопку "Start" при выборе даты
    input.addEventListener("change", () => {
        if (input.value) {
            startButton.disabled = false;
        }
    });

    startButton.addEventListener("click", () => {
        const targetDate = new Date(input.value).getTime();
        const now = Date.now();
        
        if (isNaN(targetDate) || targetDate <= now) {
            alert("Выберите корректную дату в будущем!");
            return;
        }
        
        startButton.disabled = true;  // ✅ Блокируем кнопку после старта
        input.disabled = true;        // ✅ Блокируем выбор даты
        
        // Очищаем старый интервал перед запуском нового
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            const timeLeft = targetDate - Date.now();
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                updateDisplay(0, 0, 0, 0);
                alert("⏰ Таймер завершен!");
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            updateDisplay(days, hours, minutes, seconds);
        }, 1000);
    });

    function updateDisplay(days, hours, minutes, seconds) {
        daysSpan.textContent = days.toString().padStart(2, '0');
        hoursSpan.textContent = hours.toString().padStart(2, '0');
        minutesSpan.textContent = minutes.toString().padStart(2, '0');
        secondsSpan.textContent = seconds.toString().padStart(2, '0');
    }
});
