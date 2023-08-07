async function fetchWeatherData(location) {
  const apiKey = "124be5bbccfd47c19f6163106230708";
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.current.condition.text);
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

let isCelsius = true;
let currentTempC = 0; // Initialize these variables
let currentTempF = 0;

function updateTemperatureDisplay() {
  const currentTemp = isCelsius ? currentTempC : currentTempF;
  const unit = isCelsius ? "°C" : "°F";

  document.getElementById(
    "temperature"
  ).textContent = `Current Temperature: ${currentTemp}${unit}`;
}

function extractWeatherData(jsonData) {
  const location = jsonData.location.name;
  const country = jsonData.location.country;
  const currentTempC = jsonData.current.temp_c;
  const currentTempF = jsonData.current.temp_f;
  const conditionText = jsonData.current.condition.text;
  const currentHumidity = jsonData.current.humidity;
  const currentWindSpeed = jsonData.current.wind_kph;
  const currentUVIndex = jsonData.current.uv;

  return {
    location,
    country,
    currentTempC,
    currentTempF,
    condition: {
      text: conditionText,
    },
    currentHumidity,
    currentWindSpeed,
    currentUVIndex,
  };
}


function displayWeatherInfo(data) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = `
    <h2>Weather in ${data.location}, ${data.country}</h2>
    <p>Current Temperature: ${data.currentTempC}°C / ${data.currentTempF}°F</p>
    <p>Condition: ${data.condition.text}</p>
    <p>Humidity: ${data.currentHumidity}%</p>
    <p>Wind Speed: ${data.currentWindSpeed} km/h</p>
    <p>UV Index: ${data.currentUVIndex}</p>
  `;
}


const loadingScreen = document.getElementById("loadingScreen");

document
  .getElementById("weatherForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    loadingScreen.style.display = "block";

    const location = document.getElementById("locationInput").value;
    const weatherData = await fetchWeatherData(location);

    loadingScreen.style.display = "none";

    if (weatherData) {
      const processedData = extractWeatherData(weatherData);
      displayWeatherInfo(processedData);
    }
  });
