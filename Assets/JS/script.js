var city = "London"
var apiKey = "10c09efbf0b22626ae2ec897c06f2ced"
var queryUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    var tempKel = response.main.temp
    console.log(tempKel)

      var tempFar = ((tempKel - 273.15) * 1.8 + 32).toFixed(2);

    
    // Create CODE HERE to transfer content to HTML
    // You need windspeed, humidity and temp
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML
    $(".city").append("City: " + response.name)
    $(".wind").append("Current wind speed in Bujumbura is: " + response.wind.speed)
    $(".humidity").append("Current humidity: " + response.main.humidity)
    $(".temp").append("Current temperature in F is: " + tempFar)
  });