const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.body;

let intervalId = null;
stopBtn.disabled = true; // Кнопка "Stop" спочатку вимкнена

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
startBtn.addEventListener('click', () => {
  stopBtn.disabled = false; 
  startBtn.disabled = true; 

  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  clearInterval(intervalId); 
  startBtn.disabled = false; 
  stopBtn.disabled = true; 
});
