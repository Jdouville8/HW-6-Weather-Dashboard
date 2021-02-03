$(document).ready(function () {
  var location = 0;
  var locationStore = []
  // If key exists set variable to current, if not setItem and set variable = 0

  var storedCity = function () {
    if (localStorage.count != null) {
        location = (localStorage.count)
        console.log(location);

        for (i = 0; i < location; i++){
          var pastEntry = localStorage.getItem('place' + (i + 1))
          var btnDiv = $('<div>');
          var historyEntry = $('<button>');
          $(historyEntry).text(pastEntry)
          $(historyEntry).attr('class', 'histBtn m-4')
          $(btnDiv).append(historyEntry)
          $('#search-history').append(btnDiv);
          console.log(pastEntry)
        }
    } else {
      location = 0;
      console.log(location);
    }
  }


  var weatherSearch = function (city) {
    var apiKey = "10c09efbf0b22626ae2ec897c06f2ced";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=" +
      apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL);

      console.log(response);

      var tempKel = response.main.temp;
      console.log(tempKel);

      var tempFar = ((tempKel - 273.15) * 1.8 + 32).toFixed(2);

      $(".city").text("City: " + response.name);
      $(".wind").text(
        "Current wind speed in " + city + " is: " + response.wind.speed
      );
      $(".humidity").text("Current humidity: " + response.main.humidity);
      $(".temp").text("Current temperature in Fahrenheit is: " + tempFar);
      
      var lon = response.coord.lon
      var lat = response.coord.lat
      var queryURL2 =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey;

      $.ajax({
        url: queryURL2,
        method: "GET",
      }).then(function (uvForecast) {
        $('.uvi').text('UV index: ' + uvForecast.current.uvi)
        console.log(uvForecast.current.uvi);

        for (i = 0; i < 5; i++) {
        console.log(uvForecast);
        var date = uvForecast.daily[i].dt
        var tempHighKel = uvForecast.daily[i].temp.max
        var tempHighFar = ((tempHighKel - 273.15) * 1.8 + 32).toFixed(2);
        var tempLowKel = uvForecast.daily[i].temp.max
        var tempLowFar = ((tempLowKel - 273.15) * 1.8 + 32).toFixed(2);
        var dailyHumidity = uvForecast.daily[i].humidity
        
        $('.date' + i).text(date)
        $('.daily-humidity' + i).text(dailyHumidity)
        $('.temp-high' + i).text(tempHighFar)
        $('.temp-low' + i).text(tempLowFar)
        console.log(uvForecast.daily[i].dt)





      }})
    });
  };

  storedCity();
  
  weatherSearch("London");

  $("#saveBtn").on("click", function (event) {
    // retrieves id from save button
    event.preventDefault();

    location++;

    var newCity = $("#search-input").val();
    console.log(newCity);
    // Stores value of input in local storage object
    localStorage.setItem("count", location);
    localStorage.setItem("place" + location, newCity);
    // console.log(history.indexof())
    weatherSearch(newCity);
  });
  
  $(".histBtn").on("click", function (event) {
    // retrieves id from save button
    event.preventDefault();

    $("#search-input").text(event.currentTarget.innerText);
    console.log(event.currentTarget.innerText);
    weatherSearch(event.currentTarget.innerText);
  });
  


  // weatherSearch(localStorage.getItem("count"));
});
