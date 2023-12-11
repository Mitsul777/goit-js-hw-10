// Настройка Flatpickr:
// Подключаем библиотеку Flatpickr для работы с выбором даты и времени.

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast/dist/js/iziToast.min.js";
import "izitoast/dist/css/iziToast.min.css";

// Определяем переменные userSelectedDate и timerInterval, которые будут использоваться для хранения выбранной даты и идентификатора интервала таймера соответственно.
let userSelectedDate;
let timerInterval;

// Задаем опции для Flatpickr, включая возможность выбора времени и формат 24 часа.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    validateSelectedDate();
  },
};



// Обработка закрытия Flatpickr и валидация выбранной даты:
// Находим кнопку "Start" и сохраняем ее в переменной startButton
const startButton = document.querySelector('[data-start]');

function validateSelectedDate() {
  const currentDate = new Date();
  if (userSelectedDate < currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}
// Преобразование миллисекунд в объект времени:
// Создаем функцию convertMs, которая принимает количество миллисекунд и преобразует его в объект с днями, часами, минутами и секундами.
function convertMs(ms) {
  // Количество миллисекунд в единице времени
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Оставшиеся дни
  const days = Math.floor(ms / day);
  // Оставшиеся часы
  const hours = Math.floor((ms % day) / hour);
  // Оставшиеся минуты
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Оставшиеся секунды
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// Инициализация Flatpickr и обработка клика по кнопке "Start":
// Инициализируем Flatpickr для элемента с идентификатором datetime-picker с использованием заданных опций.
flatpickr("#datetime-picker", options);

// Устанавливаем обработчик события click на кнопку "Start", который вызывает функцию startTimer.
startButton.addEventListener('click', function () {
  // Когда нажата кнопка "Start", запускаем таймер
  startTimer();
});


// Запуск таймера и обновление интерфейса:
// Создаем функцию startTimer, которая инициализирует таймер, вычисляет разницу во времени между выбранной и текущей датами, а затем обновляет интерфейс таймера.
function startTimer() {
  const currentDate = new Date().getTime();
  const selectedDate = userSelectedDate.getTime();
  let timeDifference = selectedDate - currentDate;

  updateTimerUI(timeDifference);
  // Устанавливаем интервал, который каждую секунду обновляет интерфейс и проверяет, не достигнута ли конечная дата.
  timerInterval = setInterval(function () {
    timeDifference -= 1000;
    updateTimerUI(timeDifference);

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// Обновление интерфейса таймера:
// Создаем функцию updateTimerUI, которая обновляет значения элементов таймера на странице с использованием объекта времени.
function updateTimerUI(timeDifference) {
  const timeObject = convertMs(timeDifference);

  // Обновляем значения элементов таймера
  // В этой функции вызывается также вспомогательная функция padZero, которая добавляет ведущий ноль к числам меньше 10.
  document.querySelector('[data-days]').textContent = padZero(timeObject.days);
  document.querySelector('[data-hours]').textContent = padZero(timeObject.hours);
  document.querySelector('[data-minutes]').textContent = padZero(timeObject.minutes);
  document.querySelector('[data-seconds]').textContent = padZero(timeObject.seconds);
}
// Вспомогательная функция добавления ведущего нуля:
function padZero(value) {
  return value < 10 ? `0${value}` : value;
}
