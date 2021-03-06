// Updates the date and time to the current date and time
function updateDate(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[currentDate.getDay()];
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  const formatedDate = `${day} ${hours}:${minutes}`;
  return formatedDate;
}

const currentDate = new Date();

const dateDisplay = document.querySelector("#date");

dateDisplay.innerHTML = updateDate(currentDate);

// Updates h1 when a city is entered in the search bar
function search(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-text-input");
  const city = searchInput.value;

  getCityTemperature(city);
}
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemperature);
}

const currentLocationForm = document.querySelector("#current-location-form");
currentLocationForm.addEventListener("submit", searchCurrentLocation);

// Allows user to search for a city then updates the h1 and the current temp for that city
function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);

  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${temperature}°F.`;
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = city;
  // h1.innerHTML
  // include functionality that updates the h1
}

function fetchTemperature(queryParameters) {
  const apiKey = "0a4dc3c696be7291e8d469a7dbee552f";
  let units = "imperial";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}&${queryParameters}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCityTemperature(city) {
  const queryParameters = `q=${city}`;

  fetchTemperature(queryParameters);
}

function getCurrentLocationTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  const queryParameters = `lat=${latitude}&lon=${longitude}`;

  fetchTemperature(queryParameters);
}
