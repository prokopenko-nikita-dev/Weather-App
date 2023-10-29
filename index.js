// Создаем переменные
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Функция для выполнения запроса и обработки данных о погоде
function fetchData() {
  const APIKey = '45b7d4275ee752727fbee5fc91026a9f';
  const cityInput = document.querySelector('.search-box input');
  const city = cityInput.value.trim(); // Удаляем лишние пробелы из значения поля ввода

  // Проверяем, что поле ввода не пустое. Если пустое, завершаем функцию.
  if (city === '') {
    return;
  }


  // Отправляем GET-запрос к API погоды и получаем ответ в формате JSON
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json()) // Преобразуем ответ в формате JSON в объект JavaScript
    .then(json => {
      // Проверяем код ответа, который содержится в поле "cod"
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Haze':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = '';
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      container.style.height = '590px';

      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
    });
}

// Отслеживаем событие нажатия на кнопку поиска
search.addEventListener('click', fetchData);

// Отслеживаем событие нажатия клавиши Enter на поле ввода
const cityInput = document.querySelector('.search-box input');
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault(); // Отменяем отправку формы по умолчанию
    fetchData();
  }
});

