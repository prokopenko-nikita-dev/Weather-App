//Создаем переменные 
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

//Отслеживаем событие нажатия на кнопку поиска
search.addEventListener('click', () => {

    const APIKey = '45b7d4275ee752727fbee5fc91026a9f';
    const city = document.querySelector('.search-box input').value; //Получаем значение, введенное в поле ввода

    //Проверяем, что поле ввода не пустое. Если пустое, то завершаем выполнение функции.
    if (city === '')
        return;

        //Отправляем GET-запрос к APIпогоды и получаем ответ в формате  JSON
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json()) //Преобразуем ответ в формате JSON в обьект JS
        .then(json => {
//Проверяем код ответа, который содержится в поле "cod"
            if (json.cod === '404') {
                container.style.height = '400px'; //изменяем высоту контейнера
                weatherBox.style.display = 'none';//скрываем блок для отображения погода
                weatherDetails.style.display = 'none';//скрываем блок для отображения дополнительный деталей о погоде
                error404.style.display = 'block';//отображаем блок с ошибкой
                error404.classList.add('fadeIn');//добавляем класс анимации для появления блока
                return;
            }

            error404.style.display = 'none';//скрываем блок с ошибкой
            error404.classList.remove('fadeIn');//удаляем класс с анимацией
//получаем ссылки на элементы, где будут отображаться данные о погоде
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            //используем оператор switch для выбора изображения погоды в зависимости от значения поля "main" из обьекта JSON
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
                    image.src = ''; // устанавливаем пустое значение погоды, если оно не рспознано
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;//устанавливаем значение температуры
            description.innerHTML = `${json.weather[0].description}`;//устанавливаем описание погоды
            humidity.innerHTML = `${json.main.humidity}%`;//устанавливаеи значение влажности
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;//порывы ветра

            weatherBox.style.display = '';//отображаем блок для отожражения погоды
            weatherDetails.style.display = ''; // Отображаем блок для отображения дополнительных деталей о погоде

            weatherBox.classList.add('fadeIn');// Добавляем класс анимации для появления блока 

            weatherDetails.classList.add('fadeIn'); // Добавляем класс анимации для появления блока

            container.style.height = '590px';  // Изменяем высоту контейнера



        });


});