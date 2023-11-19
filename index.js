const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

if (navigator.geolocation) {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(function(position) {
        // The geolocation request was successful
        console.log(position.latitude);
        console.log(position.longitude);
        console.log(position.accuracy);
    }, function(error) {
        // The geolocation request was unsuccessful
        console.log(error);
    });
} else {
    // The browser does not support the Geolocation API
    console.log('The browser does not support the Geolocation API');
}
search.addEventListener('click', () => {

    const APIKey = '282859b6f2c3b2475fc1db747a657a42';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

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
                    image.src = 'images/clear.gif';
                    break;

                case 'Rain':
                    image.src = 'images/rain.gif';
                    break;

                case 'Snow':
                    image.src = 'images/rain.gif';
                    break;

                case 'Clouds':
                    image.src = 'images/rain.gif';
                    break;

                case 'Haze':
                    image.src = 'images/mist.gif';
                    break;

                case 'mist':
                    image.src = 'images/mist.gif';
                    break;

                case 'Scattered Clouds':
                    image.src = 'image/cloud.gif'
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});