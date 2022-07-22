function showDate() {
  let now = new Date();
  let date = now.getDate();
  let day = now.getDay();
  let month = now.getMonth();
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = months[month];

  document.querySelector("#month").innerHTML = `${monthName}`;
  document.querySelector("#date").innerHTML = `${date}`;
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

function showWeather(response) {
  celciusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity} %`;
  document.querySelector(
    "#wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector("#weather-name").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#big-weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  if (city.value) {
    let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
    let apiLink = "https://api.openweathermap.org/data/2.5/weather?";
    let weatherLink = `${apiLink}q=${city.value}&units=metric&appid=${apiKey}`;
    axios.get(weatherLink).then(showWeather);
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

function checkPosition(event) {
  navigator.geolocation.getCurrentPosition(getMyPosition);
}

function showCelciusTemperature() {
  fahrenheitLink.classList.remove("non-active");
  celciusLink.classList.add("non-active");
  document.querySelector("#temperature").innerHTML = Math.round(celciusTemp);
}

function showFahrenheitTemperature() {
  fahrenheitLink.classList.add("non-active");
  celciusLink.classList.remove("non-active");
  let fahrenheitTemp = Math.round(celciusTemp * 1.8 + 32);
  document.querySelector("#temperature").innerHTML = fahrenheitTemp;
}

function showForecast() {
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `  
      <div class="col">
        <div class="forecast-day-container">
          ${day}
          <img
            src="http://openweathermap.org/img/wn/10d@2x.png"
            alt="Weather image"
            class="small-weather-image"
          />
          20°
        </div>
      </div>`;
  });

  forecastHTML =
    forecastHTML +
    `
  </div>`;

  forecastElement.innerHTML = forecastHTML;
}

showDate();
checkPosition();
showForecast();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changeCity);

let currentLocattionButton = document.querySelector("#current-location");
currentLocattionButton.addEventListener("click", checkPosition);

let celciusTemp = null;

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelciusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
