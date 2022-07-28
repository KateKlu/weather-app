function showDate() {
  let now = new Date();
  // let date = now.getDate();
  let day = now.getDay();
  //  let month = now.getMonth();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satyrday",
  ];
  let dayName = weekDays[day];

  document.querySelector("#week-day").innerHTML = `${dayName}`;
  let currentHours = document.querySelector("#hours");
  if (hours < 10) {
    currentHours.innerHTML = `0${hours}`;
  } else {
    currentHours.innerHTML = `${hours}`;
  }
  let currentMinutes = document.querySelector("#minutes");
  if (minutes < 10) {
    currentMinutes.innerHTML = `0${minutes}`;
  } else {
    currentMinutes.innerHTML = `${minutes}`;
  }
}

function formatUnitsLinkForCelcius() {
  fahrenheitLink.classList.remove("non-active");
  celciusLink.classList.add("non-active");
}

function formatUnitsLinkForFahrenheit() {
  fahrenheitLink.classList.add("non-active");
  celciusLink.classList.remove("non-active");
}

function formateForecastDate(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekDays[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastCelciusTemp[index] = forecastDay.temp.day;

      forecastHTML =
        forecastHTML +
        `  
      <div class="col">
        <div class="forecast-day-container">
          ${formateForecastDate(forecastDay.dt)}
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="Weather image"
            class="small-weather-image"
          />
          <span id=forecastTemp${index}>${Math.round(
          forecastDay.temp.day
        )}</span>°
        </div>
      </div>`;
    }
  });

  forecastHTML =
    forecastHTML +
    `
  </div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?`;
  let apiUrl = `${apiLink}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  formatUnitsLinkForCelcius();
  celciusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("#weather-name").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#main-weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  showDate();
  getForecast(response.data.coord);
}
function makeCityWeatherLink(city) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiLink = "https://api.openweathermap.org/data/2.5/weather?";
  let weatherLink = `${apiLink}q=${city}&units=metric&appid=${apiKey}`;
  axios.get(weatherLink).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  if (city.value) {
    makeCityWeatherLink(city.value);
  } else {
    alert(`Enter city name`);
  }
}

function getMyPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiLink = "https://api.openweathermap.org/data/2.5/weather?";
  let weatherLink = `${apiLink}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherLink).then(showWeather);
}

function errorPosition() {
  let city = document.querySelector("#search-input");
  if (city.value) {
    makeCityWeatherLink(city.value);
  } else {
    makeCityWeatherLink(`kharkiv`);
  }
  alert(
    "Allow the app to find your location or enter your city into the search field"
  );
}

function checkPosition(event) {
  navigator.geolocation.getCurrentPosition(getMyPosition, errorPosition);
}

function showCelciusTemperature() {
  formatUnitsLinkForCelcius();
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);

  forecastCelciusTemp.forEach(function (celcTemp, index) {
    document.querySelector(`#forecastTemp${index}`).innerHTML =
      Math.round(celcTemp);
  });
}

function showFahrenheitTemperature() {
  formatUnitsLinkForFahrenheit();
  document.querySelector("#temperature").innerHTML = Math.round(
    celciusTemp * 1.8 + 32
  );

  forecastCelciusTemp.forEach(function (celcTemp, index) {
    document.querySelector(`#forecastTemp${index}`).innerHTML = Math.round(
      celcTemp * 1.8 + 32
    );
  });
}

checkPosition();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

let currentLocattionButton = document.querySelector("#current-location");
currentLocattionButton.addEventListener("click", checkPosition);

let celciusTemp = null;
let forecastCelciusTemp = [];

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
