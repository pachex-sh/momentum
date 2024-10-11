async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc69281dafbd41bc278bcdc73deba426&lang=ru&units=metric`);

        return await response.json();
    } catch (error) {
        console.error(error);
    };
};

function createWeatherBlock(city, data) {
    const weatherBlock = document.createElement('div');
    const weatherBlockTop = document.createElement('div');
    const cityName = document.createElement('h3');
    const currentLocationBtn = document.createElement('button');
    const currentLocationBtnSvg = document.createElement('img');
    const weatherBlockBottom = document.createElement('div');
    const temp = document.createElement('span');
    const weatherDescription = document.createElement('span');

    cityName.textContent = city;
    currentLocationBtn.textContent = 'Мое местоположение';
    currentLocationBtnSvg.src = "./img/position-svgrepo-com.svg";
    temp.textContent = Math.floor(data.main.temp) + '°C';
    weatherDescription.textContent = data.weather[0].description;

    weatherBlock.classList.add('text-light', 'weather-block');
    currentLocationBtn.classList.add('btn', 'text-light', 'location-btn');
    currentLocationBtnSvg.classList.add('current-location-btn-svg', 'pr-1');
    weatherBlockTop.classList.add('d-flex', 'justify-content-between');
    temp.classList.add('pr-2', 'temp');

    currentLocationBtn.prepend(currentLocationBtnSvg);
    weatherBlockTop.append(cityName, currentLocationBtn);
    weatherBlockBottom.append(temp, weatherDescription);
    weatherBlock.append(weatherBlockTop, weatherBlockBottom);

    async function weatherByGeolocation() {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        const success = async (pos) => {
            const crd = pos.coords;
            const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${crd.latitude}&lon=${crd.longitude}&apiKey=a3799d4acc1843c59b86c6c3ea666487`);
            const result = await response.json();

            const weather = await getWeatherData(result.features[0].properties.city);

            cityName.textContent = weather.name;
            temp.textContent = Math.floor(weather.main.temp) + '°C';
            weatherDescription.textContent = weather.weather[0].description;

            localStorage.setItem('currentCity', JSON.stringify(weather.name));
        };
        const error = (err) => {
            console.log(err);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    };

    currentLocationBtn.addEventListener('click', weatherByGeolocation);

    return weatherBlock;
};

export const createWeatherApp = async () => {
    const weather = await getWeatherData(JSON.parse(localStorage.getItem('currentCity')) || 'Краснодар');
    const weatherBlock = createWeatherBlock(weather.name, weather);
    return weatherBlock;
};