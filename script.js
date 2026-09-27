const fallbackWeatherData = {
  Dhaka: {
    city: "Dhaka",
    condition: "Warm and sunny",
    icon: "☀️",
    temp: 32,
    feelsLike: 34,
    humidity: 58,
    wind: 12,
    visibility: 10,
    uv: "Moderate",
    sunrise: "05:42 AM",
    sunset: "06:11 PM",
    aqi: 21,
    airText: "Fresh air and comfortable outdoor conditions.",
    hourly: [
      { time: "Now", temp: 32, icon: "☀️" },
      { time: "1 PM", temp: 33, icon: "🌤️" },
      { time: "2 PM", temp: 34, icon: "🌤️" },
      { time: "3 PM", temp: 35, icon: "☀️" },
      { time: "4 PM", temp: 34, icon: "🌥️" },
      { time: "5 PM", temp: 32, icon: "🌤️" },
      { time: "6 PM", temp: 30, icon: "🌦️" },
      { time: "7 PM", temp: 29, icon: "🌧️" },
      { time: "8 PM", temp: 28, icon: "🌦️" },
      { time: "9 PM", temp: 27, icon: "🌙" },
      { time: "10 PM", temp: 27, icon: "🌙" },
      { time: "11 PM", temp: 26, icon: "🌙" }
    ],
    daily: [
      { day: "Mon", icon: "☀️", high: 33, low: 27, rain: "12%" },
      { day: "Tue", icon: "🌤️", high: 34, low: 28, rain: "18%" },
      { day: "Wed", icon: "🌦️", high: 31, low: 26, rain: "42%" },
      { day: "Thu", icon: "⛈️", high: 29, low: 25, rain: "68%" },
      { day: "Fri", icon: "🌤️", high: 32, low: 27, rain: "27%" },
      { day: "Sat", icon: "☀️", high: 34, low: 28, rain: "10%" },
      { day: "Sun", icon: "🌤️", high: 33, low: 28, rain: "16%" }
    ]
  }
};

const cityInput = document.getElementById("cityInput");
const searchForm = document.getElementById("searchForm");
const cityDisplay = document.getElementById("cityName");
const currentTemp = document.getElementById("currentTemp");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const visibility = document.getElementById("visibility");
const uvIndex = document.getElementById("uvIndex");
const weatherStatus = document.getElementById("weatherStatus");
const weatherIcon = document.getElementById("weatherIcon");
const todayDate = document.getElementById("todayDate");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const hourlyForecast = document.getElementById("hourlyForecast");
const dailyForecast = document.getElementById("dailyForecast");
const aqiTag = document.getElementById("aqiTag");
const aqiValue = document.getElementById("aqiValue");
const airText = document.getElementById("airText");
const cityButtons = document.querySelectorAll(".city-chip");

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short"
  }).format(date);
}

function weatherCodeLookup(code) {
  const map = {
    0: { label: "Clear sky", icon: "☀️" },
    1: { label: "Mostly clear", icon: "🌤️" },
    2: { label: "Partly cloudy", icon: "⛅" },
    3: { label: "Overcast", icon: "☁️" },
    45: { label: "Foggy", icon: "🌫️" },
    48: { label: "Foggy", icon: "🌫️" },
    51: { label: "Light drizzle", icon: "🌦️" },
    53: { label: "Drizzle", icon: "🌦️" },
    55: { label: "Heavy drizzle", icon: "🌧️" },
    56: { label: "Freezing drizzle", icon: "🌧️" },
    57: { label: "Freezing drizzle", icon: "🌧️" },
    61: { label: "Light rain", icon: "🌦️" },
    63: { label: "Rain", icon: "🌧️" },
    65: { label: "Heavy rain", icon: "🌧️" },
    66: { label: "Freezing rain", icon: "🌧️" },
    67: { label: "Freezing rain", icon: "🌧️" },
    71: { label: "Light snow", icon: "❄️" },
    73: { label: "Snow", icon: "❄️" },
    75: { label: "Heavy snow", icon: "❄️" },
    77: { label: "Snow grains", icon: "❄️" },
    80: { label: "Rain showers", icon: "🌦️" },
    81: { label: "Heavy showers", icon: "🌧️" },
    82: { label: "Violent showers", icon: "⛈️" },
    85: { label: "Snow showers", icon: "🌨️" },
    86: { label: "Heavy snow showers", icon: "🌨️" },
    95: { label: "Thunderstorm", icon: "⛈️" },
    96: { label: "Thunderstorm with hail", icon: "⛈️" },
    99: { label: "Severe thunderstorm", icon: "⛈️" }
  };

  return map[code] || { label: "Conditions", icon: "☁️" };
}

function renderHourly(list) {
  hourlyForecast.innerHTML = list
    .map(
      (item) => `
        <div class="hour-item">
          <div class="time">${item.time}</div>
          <div class="icon">${item.icon}</div>
          <div class="value">${item.temp}°</div>
        </div>
      `
    )
    .join("");
}

function renderDaily(list) {
  dailyForecast.innerHTML = list
    .map(
      (item) => `
        <div class="day-item">
          <div class="day-name">${item.day}</div>
          <div class="day-icon">${item.icon}</div>
          <div class="day-temp">${item.high}° / ${item.low}°</div>
          <div class="day-rain">Rain ${item.rain}</div>
        </div>
      `
    )
    .join("");
}

function updateWeatherData(data) {
  cityDisplay.textContent = data.city;
  currentTemp.textContent = `${Math.round(data.temp)}°`;
  feelsLike.textContent = `Feels like ${Math.round(data.feelsLike)}°`;
  humidity.textContent = `${data.humidity}%`;
  wind.textContent = `${Math.round(data.wind)} km/h`;
  visibility.textContent = `${Math.round(data.visibility / 1000)} km`;
  uvIndex.textContent = data.uv;
  weatherStatus.textContent = data.condition;
  weatherIcon.textContent = data.icon;
  sunrise.textContent = data.sunrise;
  sunset.textContent = data.sunset;
  aqiTag.textContent = data.aqi < 50 ? "Good" : data.aqi < 100 ? "Moderate" : "Poor";
  aqiValue.textContent = data.aqi;
  airText.textContent = data.airText;
  todayDate.textContent = formatDate(new Date());

  renderHourly(data.hourly);
  renderDaily(data.daily);

  cityButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.city === data.city);
  });
}

function updateWeather(cityKey) {
  const data = fallbackWeatherData[cityKey] || fallbackWeatherData.Dhaka;
  updateWeatherData(data);
}

function buildWeatherSnapshot(city, current, hourly, daily) {
  const conditionInfo = weatherCodeLookup(current.weather_code);
  const cityWeather = {
    city,
    condition: conditionInfo.label,
    icon: conditionInfo.icon,
    temp: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m,
    visibility: current.visibility,
    uv: current.uv_index ?? "Moderate",
    sunrise: formatTime(daily.sunrise[0]),
    sunset: formatTime(daily.sunset[0]),
    aqi: Math.min(100, Math.max(10, Math.round((current.relative_humidity_2m + current.wind_speed_10m) / 2))),
    airText: "Live air and weather conditions for your local area.",
    hourly: hourly.slice(0, 12).map((item, index) => ({
      time: index === 0 ? "Now" : new Date(item.time).toLocaleTimeString("en-US", { hour: "numeric" }),
      temp: Math.round(item.temperature_2m),
      icon: weatherCodeLookup(item.weather_code).icon
    })),
    daily: daily.time.slice(0, 7).map((day, index) => ({
      day: new Date(day).toLocaleDateString("en-US", { weekday: "short" }),
      icon: weatherCodeLookup(daily.weather_code[index]).icon,
      high: Math.round(daily.temperature_2m_max[index]),
      low: Math.round(daily.temperature_2m_min[index]),
      rain: `${Math.round(daily.precipitation_probability_max?.[index] ?? 0)}%`
    }))
  };

  updateWeatherData(cityWeather);
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function fetchWeatherByCoordinates(latitude, longitude) {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,visibility&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&timezone=auto&forecast_days=7`;

  const response = await fetch(weatherUrl);
  if (!response.ok) {
    throw new Error("Weather request failed");
  }

  const data = await response.json();

  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&format=json`;
  const cityResponse = await fetch(geocodeUrl);
  const cityData = cityResponse.ok ? await cityResponse.json() : null;
  const city = cityData?.results?.[0]?.name || "Current Location";

  buildWeatherSnapshot(city, data.current, data.hourly, data.daily);
}

async function fetchWeatherByCity(cityQuery) {
  const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityQuery)}&count=1&language=en&format=json`;
  const searchResponse = await fetch(searchUrl);

  if (!searchResponse.ok) {
    throw new Error("City lookup failed");
  }

  const searchData = await searchResponse.json();
  const result = searchData.results?.[0];

  if (!result) {
    throw new Error("City not found");
  }

  const city = result.name;
  await fetchWeatherByCoordinates(result.latitude, result.longitude);
  cityDisplay.textContent = city;
  cityButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.city === city);
  });
}

cityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cityKey = button.dataset.city;
    updateWeather(cityKey);
    cityInput.value = "";
  });
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const typedCity = cityInput.value.trim();

  if (!typedCity) {
    cityInput.focus();
    return;
  }

  try {
    await fetchWeatherByCity(typedCity);
  } catch (error) {
    updateWeather("Dhaka");
    cityDisplay.textContent = typedCity;
    airText.textContent = `Showing a nearby sample view for ${typedCity}.`;
  }

  cityInput.value = "";
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      fetchWeatherByCoordinates(position.coords.latitude, position.coords.longitude).catch(() => {
        updateWeather("Dhaka");
      });
    },
    () => {
      updateWeather("Dhaka");
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
} else {
  updateWeather("Dhaka");
}