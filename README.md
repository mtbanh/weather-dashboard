# Weather Forecast

## About the project

This application allow users to search for the current and five days weather forecast for their selected city. 

---

## Getting started
Below are the prerequisite understanding and programs that were utilized :
* Visual Studio Code-click [here](https://code.visualstudio.com/) to a tutorial to install
* Github repository-click [here](https://help.github.com/en/github/)
* Bulma-click [here](https://bulma.io/documentation/)

* jQuery-click [here](https://code.jquery.com/jquery-3.4.1.min.js)

* aJax- click [here](https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js)

* openWeatherAPI [here](https://openweathermap.org/api)
---

## Code spotlight

The code snippet below changes the display of the UV index base on its value to inform user of the uv exposure during the day.
```js
{

                function color() {
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
}
```
## Demo


![Deployed Application](deployed-site.gif)
---

## Deployed link

[Live site](https://mtbanh.github.io/weather-dashboard/)
---

## Author

**Mai Banh**
- [Link to Github](https://github.com/mtbanh)
- [Link to LinkedIn](https://www.linkedin.com/in/mai-banh-311ba6164/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## Acknowledgments
Thank you to my tutor, Matthew Chen.