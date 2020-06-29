//TODO

//retrieving information and displaying it when user click on their past searches

$(document).ready(function () {

    var cityArr = [];
    // var city = $("#citySearch").val();

    var date = moment().format('MM/D/YYYY')

    init()

    function renderSavedCity() {
        for (var i = 0; i < cityArr.length; i++) {

            // var pastCityDiv = $("<li>" + cityArr[i] + "</li>");
            $("#saved-city-searches").append($("<button class='button saved-city is-fullwidth'>" + cityArr[i] + "</button>"));
        };
    };

    function init() {
        var savedCity = JSON.parse(localStorage.getItem("search-history"));
        console.log(savedCity);
        if (savedCity !== null) {
            cityArr = savedCity;
        }

        renderSavedCity()
    };

    $(".saved-city").on("click", function (event) {
        var city = $(this).text();
        fetchAndRenderSavedCity(city);
    });

    function fetchAndRenderSavedCity(city) {
        console.log(city);

        var apiKey = "0f2310ac3dd2c4522c898be88e5c7e4e"

        //current weather
        var queryURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
        $.ajax({
            url: queryURLCurrentWeather,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var iconCode = response.weather[0].icon;
            var iconUrl = " http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            $("#location-name").text(response.name + " " + "(" + date + ")");
            $("#location-name").append($("<img>").attr('src', iconUrl));

            //div = temperature F
            console.log(response.main.temp);
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var tempFRounded = tempF.toFixed(1);
            $("#temperature").text("Temperature: " + tempFRounded + "F");

            //div = humidity
            var humidity = response.main.humidity;
            $("#humidity").text("Humidity: " + humidity + "%");

            //div = wind speed
            var windSpeed = response.wind.speed;
            console.log(windSpeed)
            $("#wind-speed").text("Wind speed: " + windSpeed + "MPH");

            //div = UV index which also has colors to indicate levels
            // console.log(response.coord)
            var longitude = response.coord.lon;
            var latitude = response.coord.lat;
            var queryURLUvIndex = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude;

            $.ajax({
                url: queryURLUvIndex,
                method: "GET"
            }).then(function (response) {
                // console.log(response)
                var index = response.value;
                // console.log(index)
                // $("#uv-index").text("UV index: ");
                //TODO: how to put index value into the span element
                $("#index-num").empty();
                $("#index-num").append(index)

                color()

                function color() {
                    //TODO: not working
                    console.log(index)
                    if (index <= 2) {
                        $("#index-num").removeClass();
                        $("#index-num").addClass("uv-low");
                    } else if (2 <= index && index <= 5) {
                        $("#index-num").removeClass();
                        $("#index-num").addClass("uv-moderate");
                    } else if (6 <= index && index <= 7) {
                        $("#index-num").removeClass();
                        $("#index-num").addClass("uv-high");
                    } else if (8 <= index && index <= 10) {
                        $("#index-num").removeClass();
                        $("#index-num").addClass("uv-very-high");
                    } else {
                        $("#index-num").removeClass();
                        $("#index-num").addClass("uv-extreme");
                    };
                };



            })
        });


        //five day forecast
        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
        $.ajax({
            url: queryURLForecast,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            //each forecast should display date, weather icon, temp and humidity
            function generateDates() {

                // var date = {};

                for (var i = 0; i < 5; i++) {
                    var date = moment().add(i + 1, 'days').format('M/D/YYYY');
                    $("#date-" + i.toString()).text(date);
                }
            };
            generateDates();


            function Forecast() {
                // var tempForecastArr = [];

                for (var i = 0; i < 5; i++) {
                    var forecastTempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                    var forecastTempFRounded = forecastTempF.toFixed(0);
                    forecastHumidity = response.list[i].main.humidity;
                    var iconCodeForecast = response.list[i].weather[0].icon;
                    var iconUrlForecast = " http://openweathermap.org/img/wn/" + iconCodeForecast + "@2x.png"
                    // tempForecastArr.push(forecastTempFRounded);
                    $("#date-" + i.toString()).append($("<img>").attr('src', iconUrlForecast));
                    $("#weather-icon-" + i.toString()).html("<div>" + "Temp: " + forecastTempFRounded + "F" + "</div>");
                    $("#weather-icon-" + i.toString()).append("<div>" + "Humidity: " + forecastHumidity + "%" + "</div>");

                };
            };

            Forecast();




        });
    };


    $("#searchBtn").on("click", function (event) {
        event.preventDefault();
        var city = $("#citySearch").val();

        if (!cityArr.includes(city)) {
            cityArr.push(city);
            var currentCityDiv = $("<button class='button is-fullwidth'>" + city + "</button>");
            $("#saved-city-searches").append(currentCityDiv);
            localStorage.setItem("search-history", JSON.stringify(cityArr));
        };

        fetchAndRenderSavedCity(city);

        //conditional statement that if city is already in array, don't create new but




    });
});