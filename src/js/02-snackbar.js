// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// Добавляем обработчик события на отправку формы с классом 'form'
document.querySelector('.form').addEventListener('submit', function (event) {
    // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    event.preventDefault();
  
    // Получаем значение задержки из элемента формы с именем 'delay'
    const delay = parseInt(this.elements.delay.value, 10);
  
    // Получаем выбранное состояние из элемента формы с именем 'state'
    const state = this.elements.state.value;
  
    // Создаем промис, который разрешится или отклонится после задержки
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  
    // Обработка разрешенного промиса
    myPromise.then((delay) => {
        iziToast.success({
            title: 'Success',
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topCenter',
          });
          // Очистка поля после успешной отправки
        this.reset();
    // Обработка отклоненного промиса
    }).catch((delay) => {
        iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${delay}ms`,
            position: 'topCenter',
          });
          // Очистка поля после успешной отправки
        this.reset();
    });
  });
  
  // Функция для отображения Snackbar
  function showSnackbar(message) {
    // Создаем элемент div для Snackbar
    const snackbar = document.createElement('div');
    snackbar.className = 'snackbar';
    snackbar.textContent = message;
  
    // Добавляем Snackbar к телу документа
    document.body.appendChild(snackbar);
  
    // Устанавливаем таймер для удаления Snackbar через 3 секунды
    setTimeout(() => {
      snackbar.remove();
    }, 3000);
  }
  
//   Добавляет обработчик события на форму с классом 'form', который срабатывает при её отправке.

// Предотвращает стандартное поведение формы (перезагрузку страницы) с помощью event.preventDefault().

// Получает значения задержки и состояния из элементов формы.

// Создает промис, который разрешается через указанную задержку или отклоняется в зависимости от выбранного состояния.

// В случае успешного разрешения промиса вызывается функция showSnackbar с соответствующим сообщением.

// В случае отклонения промиса также вызывается showSnackbar, но с другим сообщением.const apartment = {

// Функция showSnackbar создает элемент Snackbar, добавляет его к телу документа и устанавливает таймер для его удаления через 3 секунды.