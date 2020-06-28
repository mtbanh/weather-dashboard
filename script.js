//TODO

//1. page layout/content
//element that will float left and contain the search input; unordered list of previous searches
//two elements that will float right and on top of each other 
//1. current weather of the selected city 
//h1 - city name, current date and a weather icon
//div = temperature F
//div = humidity
//div = wind speed
//div = UV index which also has colors to indicate levels
//2. 5 day weather forecast; within in div there has to be:
//date
//weather icon
//temp in F
//humidity
// day +1 
//day + 2
//day +3
//day +4
//day +5

//2. script

$(document).ready(function () {

    var cityArr = [];
    // var city = $("#citySearch").val();

    var date = moment().format('MM/D/YYYY')
    // console.log(date)

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        var city = $("#citySearch").val();

        console.log(city);
        cityArr.push(city);
        var currentCityDiv = $("<li>" + city + "</li>");
        $("#saved-city-searches").append(currentCityDiv);
        localStorage.setItem("search-history", JSON.stringify(cityArr));


        // savedCity();

        // function savedCity() {
        //     var savedCityArr = JSON.parse(localStorage.getItem("search-history"));
        //     if (savedCityArr !== null){
        //         cityArr = savedCityArr;
        //     };

        //     renderSavedCity();

        // };

        //     function renderSavedCity(){
        //     // console.log(savedCityArr)
        //         for (var i = 0; i < cityArr.length; i++) {

        //             var pastCityDiv = $("<li>" + cityArr[i] + "</li>");

        //             $("#save-city-searches").append(pastCityDiv);
        //          };
        //     };


        //TODO-styling: need to fix styling of the populated pastCityDiv

        var apiKey = "0f2310ac3dd2c4522c898be88e5c7e4e"

        var queryURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: queryURLCurrentWeather,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //h1 - city name, current date and a weather icon
            console.log(response.name);
            //TODO: figure out how to add the weather icon
            // console.log(response.weather)
            // console.log(response.weather[0].icon)
            $("#location-name").text(response.name + " " + "(" + date + ")");
            //div = temperature F
            console.log(response.main.temp);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var tempFRounded = tempF.toFixed(0);
            $("#temperature").text("Temperature: " + tempFRounded + "F");
            //div = humidity
            var humidity = response.main.humidity;
            $("#humidity").text("Humidity: " + humidity + "%");
            //div = wind speed
            var windSpeed = response.wind.speed;
            console.log(windSpeed)
            $("#wind-speed").text("Wind speed: " + windSpeed + "MPH");
            //div = UV index which also has colors to indicate levels
            $("#uv-index").text()
        });

        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            //each forecast should display date, weather icon, temp and humidity
            var date0 = moment().add(1, 'days').format('M/D/YYYY');
            $("#date-0").text(date0)
            var date1 = moment().add(2, 'days').format('M/D/YYYY');
            $("#date-1").text(date1)
            var date2 = moment().add(3, 'days').format('M/D/YYYY');
            $("#date-2").text(date2)
            var date3 = moment().add(4, 'days').format('M/D/YYYY');
            $("#date-3").text(date3)
            var date4 = moment().add(5, 'days').format('M/D/YYYY');
            $("#date-4").text(date4)
            // console.log(date0)

        })
    });

})
