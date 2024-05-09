
 

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
    saveSearch(city);
  });
  
  function fetchWeather(city) {
    const apiKey = '326495482c11dcfd2d4b92026ae9abab';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data && data.coord) {
          fetchForecast(data.coord.lat, data.coord.lon);
          updateWeatherDisplay(data);
        } else {
          document.getElementById('weather-details').innerHTML = '<p>Weather data not available. Try another city.</p>';
        }
      })
      .catch(error => console.error('Error:', error));
  }
  
  function fetchForecast(lat, lon) {
    const apiKey = '326495482c11dcfd2d4b92026ae9abab';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => updateForecastDisplay(data))
      .catch(error => console.error('Error:', error));
  }
  
  function updateWeatherDisplay(data) {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = `
      <h3>${data.name}</h3>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
    `;
  }
  
  function updateForecastDisplay(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    data.list.forEach((forecast, index) => {
      if (index % 8 === 0) {
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'forecast';
        forecastDiv.innerHTML = `
          <h4>${new Date(forecast.dt * 1000).toLocaleDateString()}</h4>
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
          <p>Temp: ${forecast.main.temp}°C</p>
          <p>Wind: ${forecast.wind.speed} m/s</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
        `;
        forecastContainer.appendChild(forecastDiv);
      }
    });
  }
  
  function saveSearch(city) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(city)) {
      searches.push(city);
      localStorage.setItem('searches', JSON.stringify(searches));
      displaySearchHistory();
    }
  }
  
  function displaySearchHistory() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    const searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = searches.map(city => `<button onclick="fetchWeather('${city}')">${city}</button>`).join('');
  }
  
  window.onload = displaySearchHistory;
  