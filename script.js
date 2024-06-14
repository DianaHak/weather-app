const apiKey = '2ede39989afec42bf49216b8e2b29a33';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const errorElement = document.getElementById('error');

searchButton.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        errorElement.textContent = 'Please enter a location.';
        clearWeatherInfo();
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    // Clear previous data
    clearWeatherInfo();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 200) {
                locationElement.textContent = `Location: ${data.name}`;
                temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                descriptionElement.textContent = `Weather: ${data.weather[0].description}`;
                errorElement.textContent = ''; // Clear error message
            } else {
                throw new Error('Location not found');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorElement.textContent = 'Location not found. Please check the spelling and try again.';
        });
}

function clearWeatherInfo() {
    locationElement.textContent = '';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
    errorElement.textContent = '';
}
searchInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});