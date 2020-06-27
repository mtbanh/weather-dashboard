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

    $("#searchBtn").on("click", function (event) {
        event.preventDefault();

        var city = $("#citySearch").val();
        console.log(city);
        cityArr.push(city);
        var currentCityDiv = $("<li>" + city + "</li>");
        $("#saved-city-searches").append(currentCityDiv);
        localStorage.setItem("search-history", JSON.stringify(cityArr));
    });

    savedCity();

    function savedCity() {
        var savedCityArr = JSON.parse(localStorage.getItem("search-history"));
        if (savedCityArr !== null){
            cityArr = savedCityArr;
        };
    };

    renderSavedCity();
        
        function renderSavedCity(){
        // console.log(savedCityArr)
            for (var i = 0; i < cityArr.length; i++) {

                var pastCityDiv = $("<li>" + city[i] + "</li>");

                $("#save-city-searches").append(pastCityDiv);
             };
        };

     



        //TODO-styling: need to fix styling of the populated pastCityDiv

        var apiKey = "0f2310ac3dd2c4522c898be88e5c7e4e"

        var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid={" + apiKey + "}";

        // $.ajax({
        //     url: queryURL,
        //     method: "GET"
        // }).then (function(response){
        //     console.log(response)
        // });

})
