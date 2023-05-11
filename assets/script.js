var apiKey = "197660d5d1be5775fd17a0773b97e4a5";
var city;
var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-form");
var currResult = document.querySelector("#result-current");
var fiveDaysForecast = document.querySelector("#result-forecast");
var cityList = document.querySelector("#city-lists");
var cityListStorage = [];

// eventlistener for search button
searchBtn.addEventListener("submit", searchForm);

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added 
// to the search history

// fetch weather data using city and apiKey
function fetchWeatherData(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // display current weather result
        displayCurrentResult(data);
  
        // fetch 5 days forecast
        var forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        fetch(forecastApiUrl)
          .then((response) => response.json())
          .then((forecastData) => {
            // display forecast 
            displayForecast(forecastData);
          })
      });
  }

    // WHEN I view current weather conditions for that city
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, 
    // the temperature, the humidity, and the wind speed
  
  // display current weather 
  function displayCurrentResult(data) {
    var cityName = data.name;
    var date = new Date(data.dt * 1000).toLocaleDateString();
    var icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
  
    var currentWeatherHtml = `
      <div>
        <h2>${cityName} (${date}) <img src="${icon}" alt="${data.weather[0].description}"></h2>
        <p>Temperature: ${temp} &#8451;</p>
        <p>Wind: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>    
      </div>
    `;
  
    currResult.innerHTML = currentWeatherHtml;
  }

    // WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, 
    // an icon representation of weather conditions, the temperature, the wind speed, and the humidity

//   display forecast
  function displayForecast(data) {
    var forecastData = data.list;
    var forecastHtml = "";
    console.log(forecastData);
    // for loop the forecast to display 5 days
    for (var i = 3; i < forecastData.length && i < 40; i += 8) {
      var forecastDate = new Date(forecastData[i].dt * 1000).toLocaleDateString();
      var forecastIcon = `http://openweathermap.org/img/w/${forecastData[i].weather[0].icon}.png`;
      var forecastTemp = forecastData[i].main.temp;
      var forecastHumidity = forecastData[i].main.humidity;
      var forecastWindSpeed = forecastData[i].wind.speed;
  
      forecastHtml += `
        <div class="card mb-3 p-3 text-dark">
          <p>${forecastDate}</p>
          <img src="${forecastIcon}" alt="${forecastData[i].weather[0].description}">
          <p>Temperature: ${forecastTemp} &#8451;</p>
          <p>Wind: ${forecastWindSpeed} m/s</p>
          <p>Humidity: ${forecastHumidity}%</p>
        </div>
      `;
    }
  
    fiveDaysForecast.innerHTML = forecastHtml;
  }
  
  
  
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
function saveCityList() {
    localStorage.setItem("cityList", JSON.stringify(cityListStorage));
  
    // add event listener to all city buttons
    var cityButtons = document.querySelectorAll("#city-lists button");
    cityButtons.forEach((button) => {
      button.addEventListener("click", () => {
        fetchWeatherData(button.textContent);
      });
    });
  }
  
  // function for search button
  function searchForm(event) {
    event.preventDefault();
    var city = searchInput.value.trim();
  
    if (!cityListStorage.includes(city)) {
      cityListStorage.push(city);
  
      var cityListItem = document.createElement("button");
      cityListItem.textContent = city;
      cityListItem.classList.add("list-group-item", "btn", "btn-block", "my-3");
      cityList.appendChild(cityListItem);
  
      // add event listener to new city button
      cityListItem.addEventListener("click", () => {
        fetchWeatherData(cityListItem.textContent);
      });
  
      saveCityList();
      fetchWeatherData(city);
  
      searchInput.value = "";
    }
  };
  
  function loadCityList() {
    var storedCityList = localStorage.getItem("cityList");
    if (storedCityList) {
      cityListStorage = JSON.parse(storedCityList);
      for (var i = 0; i < cityListStorage.length; i++) {
        var cityListItem = document.createElement("button");
        cityListItem.textContent = cityListStorage[i];
        cityListItem.classList.add("list-group-item", "btn", "btn-block", "my-3");
        cityList.appendChild(cityListItem);
  
        // add event listener to city button 
        cityListItem.addEventListener("click", () => {
          fetchWeatherData(cityListItem.textContent);
        });
      }
    }
  
    saveCityList(); 
  }
  
  window.onload = function() {
    loadCityList();
  };
  