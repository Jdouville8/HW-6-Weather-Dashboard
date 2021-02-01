

$(document).ready(function (){
    
    var weatherSearch = function (city) {


        var apiKey = "10c09efbf0b22626ae2ec897c06f2ced"
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    
    console.log(queryURL);
    
    console.log(response);

    var tempKel = response.main.temp
    console.log(tempKel)

      var tempFar = ((tempKel - 273.15) * 1.8 + 32).toFixed(2);

    $(".city").text("City: " + response.name)
    $(".wind").text("Current wind speed in " + city + " is: " + response.wind.speed)
    $(".humidity").text("Current humidity: " + response.main.humidity)
    $(".temp").text("Current temperature in Fahrenheit is: " + tempFar)
  });

};

weatherSearch('london');

$('#saveBtn').on('click', function() {
    // retrieves id from save button
    event.preventDefault();
    
    var newCity = $('#search-input').val();
    console.log(newCity)
    // Stores value of input in local storage object
    localStorage.setItem('location', newCity);
    
    weatherSearch(newCity);
})

});