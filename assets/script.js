var apiKey = "197660d5d1be5775fd17a0773b97e4a5";
var city;
var searchInput = document.querySelector("#search-input");
var searchBtn = document.querySelector("#search-form");
var currResult = document.querySelector("#result-current");
var fiveDaysForecast = document.querySelector("#result-forecast");
var cityList = document.querySelector("#city-lists");
var cityListStorage = [];

// fetch weather data using city and apiKey
function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // display current weather result
        displayCurrentResult(data);
  
        // fetch 5 days forecast
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        fetch(forecastApiUrl)
          .then((response) => response.json())
          .then((forecastData) => {
            // display forecast 
            displayForecast(forecastData);
          })
      });
  }
  
  // Function to display current weather data
  function displayCurrentResult(data) {
    const cityName = data.name;
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
  
    const currentWeatherHtml = `
      <div>
        <h2>${cityName} (${date}) <img src="${icon}" alt="${data.weather[0].description}"></h2>
        <p>Temperature: ${temp} &#8451;</p>
        <p>Wind: ${windSpeed} m/s</p>
        <p>Humidity: ${humidity}%</p>    
      </div>
    `;
  
    currResult.innerHTML = currentWeatherHtml;
  }
  
  function displayForecast(data) {
    const forecastData = data.list;
    let forecastHtml = "";
  
    // Loop through forecast data starting from the third element (i.e., index 2) and display for next 5 days
    for (let i = 3; i < forecastData.length && i < 40; i += 8) {
      const forecastDate = new Date(forecastData[i].dt * 1000).toLocaleDateString();
      const forecastIcon = `http://openweathermap.org/img/w/${forecastData[i].weather[0].icon}.png`;
      const forecastTemp = forecastData[i].main.temp;
      const forecastHumidity = forecastData[i].main.humidity;
      const forecastWindSpeed = forecastData[i].wind.speed;
  
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
  
  
  
  // Function to handle search form submission
// Function to handle search form submission
function handleSearchForm(event) {
    event.preventDefault();
    city = searchInput.value.trim();
  
    // Check if city already exists in search history
    if (!cityListStorage.includes(city)) {
      // Add city to search history
      cityListStorage.push(city);
  
      // Display city in search history list
      const cityListItem = document.createElement("button");
      cityListItem.textContent = city;
      cityListItem.classList.add("list-group-item", "btn", "btn-block", "my-3");
      cityList.appendChild(cityListItem);
  
      // Add event listener to city button to fetch weather data and display results
      cityListItem.addEventListener("click", () => {
        fetchWeatherData(cityListItem.textContent);
      });
    }
  
    // Fetch weather data and display results
    fetchWeatherData(city);
  
    // Clear search input field
    searchInput.value = "";
  };
  
  searchBtn.addEventListener("submit", handleSearchForm);

// searchBtn.addEventListener("submit", function(e){
//     e.preventDefault();
//     var userInput = searchInput.value;
//     console.log(userInput);
    
//     if (!userInput) {
//         alert('Please input a city name');
//         return;
//     }
//     // validate function
//     // trim
//     // normalize capital
    
//     // once validated, managed the input in local storage
// });



// api call for 5 days forecast
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// api call for current weather data
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added 
// to the search history
// TODO:  
// 



// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, 
// the temperature, the humidity, and the wind speed
// "name": "Adelaide"
// "dt": 1683268367,
// "weather":"icon": "04d","temp": 14.69,"humidity": 87,"speed": 2.06,


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, 
// an icon representation of weather conditions, the temperature, the wind speed, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city