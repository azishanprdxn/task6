// Javascript Here
function getWeatherData() {
  // Clear Timeout
  clearTimeout(timer);
  // Sets timeout to send request after 3000ms
  var timer = setTimeout(function () {
    var newRequest = new XMLHttpRequest(); // New Request
    var apiId = 'b19047189a728dd584f7853252d0d7b3';
    var cityName = document.getElementById('search-for').value;
    // URL for API
    var apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiId}`;
    var displayWeather = document.getElementById('search-result');
    var helperText = document.getElementsByClassName('helper-text')[0];

    // If input box is empty, run this
    if (!cityName) {
      // Displays helper text if not input
      helperText.style.opacity = '1';
      helperText.style.transform = 'translateY(0)';
      helperText.style.transition = '.1s';
      // Hides the search result
      displayWeather.style.display = 'none';
    } else { // Run this if input given by the user
      helperText.style.opacity = '0'; // Hides helper text if input given
      helperText.style.transform = 'translateY(-7px)';

      // Sending request to API
      newRequest.open('GET', apiLink, true);
      newRequest.send();
      newRequest.onreadystatechange = function () {
        // If request is found i.e. status is OK
        if (this.readyState == 4 && this.status == 200) {
          var weatherDetails = JSON.parse(this.responseText); // Stores the JSON response in weatherDetails
          var weatherOf = weatherDetails.name;
          var weatherType = weatherDetails.weather[0].main;
          var weatherDesc = weatherDetails.weather[0].description;
          var logoId = weatherDetails.weather[0].icon;
          var temperatureInCelcius = weatherDetails.main.temp - 273.15; // Stores the temp in deg Celcius (K - 273.15)
          var maxTemp = weatherDetails.main.temp_max - 273.15;
          var minTemp = weatherDetails.main.temp_min - 273.15;
          // Runs if city is found and displays the data on the page
          if (weatherOf) {
            displayWeather.style.display = 'block';
            displayWeather.style.textAlign = 'left';
            displayWeather.innerHTML =
              'City: ' + weatherOf + '<br>' +
              'Type: ' + weatherType + `<img src='https://openweathermap.org/img/wn/${logoId}.png' alt='logo'><br>` +
              'Description: ' + weatherDesc + '<br>' +
              'Temperature: ' + temperatureInCelcius.toPrecision(2) + '&deg;C ' +
              '<span>Max: ' + maxTemp.toPrecision(2) + '&deg;C Min: ' + minTemp.toPrecision(2) + '&deg;C</span>';
          }
          // For changing the background based on the type of weather
          if (weatherType.toLowerCase() == 'clear') {
            displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #fff57b, #fa8607)';
          } else if (weatherType.toLowerCase() == 'thunderstorm') {
            displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #00468C, #202223)';
          } else if (weatherType.toLowerCase() == 'drizzle') {
            displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #ecfcff, #9acae7)';
          } else if (weatherType.toLowerCase() == 'snow') {
            displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #fcfcfc, #f5f5f5)';
          } else if (weatherType.toLowerCase() == 'rain') {
            displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #3986a6, #1d3663)';
          } else {
            displayWeather.style.backgroundImage = 'linear-gradient(to bottom right, #c5e2f7, #395877)';
          }
        } else if (this.readyState == 4 && this.status == 404) { // Runs if error 404 occurs
          displayWeather.style.display = 'block';
          displayWeather.style.textAlign = 'center';
          displayWeather.innerHTML = 'Invalid or ' + cityName + ' not found in the DataBase!';
        }
      }
    }
  }, 3000);
}