document.getElementById('search-btn').addEventListener('click', function() {
    var city = document.getElementById('city-input').value;
    fetchWeather(city);
});

function fetchWeather(city) {
    var apiKey = 'YOUR_API_KEY'; 
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            showWeather(data);
            addToHistory(city);
        })
        .catch(error => {
            console.log('Error fetching weather:', error);
            alert('Error fetching weather. Please try again.');
        });
}

function showWeather(data) {
    var weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '';

    var cityName = data.name;
    var date = new Date();
    var dateString = date.toLocaleDateString();
    var temperature = Math.round(data.main.temp - 273.15); 
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var iconCode = data.weather[0].icon;
    var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    var currentWeather = document.createElement('div');
    currentWeather.classList.add('current-weather');
    currentWeather.innerHTML = `
        <h2>${cityName} (${dateString})</h2>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
    weatherInfo.appendChild(currentWeather);
}

function addToHistory(city) {
    var searchHistory = document.getElementById('search-history');
    var historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    historyItem.textContent = city;
    historyItem.addEventListener('click', function() {
        fetchWeather(city);
    });
    searchHistory.appendChild(historyItem);
}