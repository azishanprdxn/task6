// Javascript Here
function getWeatherData() {
  var newRequest = new XMLHttpRequest(); // New Request
  var apiId = 'b19047189a728dd584f7853252d0d7b3'; // Weather API Id
  var cityName = document.getElementById('search-for').value; // Stores input given by the user
  var apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiId}`; // URL for API
  var helper = document.getElementsByClassName('helper')[0]; // Stores helper text against the input given by the user
  // If input box is empty, run this
  if (!cityName) {
    // Displays helper text if not input
    helper.style.opacity = '1';
    helper.style.transform = 'translateY(0)';
    helper.style.transition = '.1s';
  } else { // Run this if input given by the user
    helper.style.opacity = '0'; // Hides helper text if input given
    helper.style.transform = 'translateY(-7px)';

    // Sending request to API
    newRequest.open('GET', apiLink, true);
    newRequest.send();
    newRequest.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var weatherDetails = JSON.parse(this.responseText); // Stores the JSON response in weatherDetails
        var weatherOf = weatherDetails.name; // Stores the city name of searched data
        var weatherType = weatherDetails.weather[0].main; // Stores the weather type of searched data
        var logoId = weatherDetails.weather[0].icon; // Stores the logo id of searched data
        var temperatureInCelcius = weatherDetails.main.temp - 273.15; // Stores the temp in deg Celcius (K - 273.15)
        var maxTemp = weatherDetails.main.temp_max - 273.15; // Stores the max temp
        var minTemp = weatherDetails.main.temp_min - 273.15; // Stores the min temp
        var displayWeather = document.getElementById('search-result'); // Stores the html id where to display my data
        // Runs if city is found and displays the data on the page
        if (weatherOf) {
          displayWeather.style.display = 'block';
          displayWeather.innerHTML =
            "City: " + weatherOf + "<br>" +
            "Type: " + weatherType + `<img src='https://openweathermap.org/img/wn/${logoId}.png' alt='logo'><br>` +
            "Temperature: " + temperatureInCelcius.toPrecision(2) + "&deg;C " +
            "<span>Max: " + maxTemp.toPrecision(2) + "&deg;C Min: " + minTemp.toPrecision(2) + "&deg;C</span>";
        }
        // For changing the background based on the type of weather
        if (weatherType.toLowerCase() == 'clear') { // Clear
          displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #fff57b, #fa8607)';
        } else if (weatherType.toLowerCase() == 'thunderstorm') { // Thuderstorm
          displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #00468C, #202223)';
        } else if (weatherType.toLowerCase() == 'drizzle') { // Drizzle
          displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #ecfcff, #9acae7)';
        } else if (weatherType.toLowerCase() == 'snow') { // Snow
          displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #fcfcfc, #f5f5f5)';
        } else if (weatherType.toLowerCase() == 'rain') { // Rain
          displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #3986a6, #1d3663)';
        } else { // Rest of the weather types
          displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #c5e2f7, #395877)';
        }
      }
    }
  }
}