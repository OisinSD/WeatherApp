/** Changes from Celsius to Fahrenheit */
function toggle(button) {
    let tempElement = document.getElementById("temperature");
    let weatherData = JSON.parse(localStorage.getItem("weatherData"));

    if (!weatherData || !tempElement) return;

    if (button.value === "Fahrenheit") {
        button.value = "Celsius";
        let Cel = weatherData.temperatureCelsius;
        tempElement.innerText = Cel + "°C";
    } else {
        button.value = "Fahrenheit";
        tempElement.innerText = (weatherData.temperatureCelsius * 9/5 + 32).toFixed(1) + "°F";
    }
}

/** Load stored weather data when the page loads */
document.addEventListener("DOMContentLoaded", function () {
    let weatherData = JSON.parse(localStorage.getItem("weatherData"));

    if (weatherData) {
        if (document.getElementById("cityName")) {
            document.getElementById("cityName").innerText = weatherData.cityName;
        }

        let tempElement = document.getElementById("temperature");
        let tempIcon = document.getElementById("tempIcon");

        if (tempElement) {
            tempElement.innerText = weatherData.temperatureCelsius + "°C";

            // Change temperature icon color based on temperature
            if (tempIcon) {
                tempIcon.classList.remove("hot", "cold", "moderate"); // Remove previous classes

                if (weatherData.temperatureCelsius > 20) {
                    tempIcon.classList.add("hot"); // Red for hot temperatures
                } else if (weatherData.temperatureCelsius < 10) {
                    tempIcon.classList.add("cold"); // Blue for cold temperatures
                } else {
                    tempIcon.classList.add("moderate"); // Orange for moderate temperatures
                }
            }
        }

        let humidityElement = document.getElementById("humidity");
        let humidityIcon = document.getElementById("humidityIcon");

        if (humidityElement) {
            humidityElement.innerText = (weatherData.humidity * 100) + "%";

            if (humidityIcon) {
                humidityIcon.classList.remove("hot", "moderate", "cold"); // Remove previous classes

                if (weatherData.humidity < 0.5) {
                    humidityIcon.classList.add("high"); // High humidity (Red)
                } else if (weatherData.humidity >= 0.5) {
                    humidityIcon.classList.add("cold"); // Low humidity (Blue)
                } else {
                    humidityIcon.classList.add("moderate"); // Moderate humidity (Orange)
                }
            }
        }
        let uvIndexElement = document.getElementById("uvIndex");
        let uvIcon = document.getElementById("uvIcon");

        if (uvIndexElement) {
            uvIndexElement.innerText = weatherData.uvIndex;

            if(uvIcon){
                uvIcon.classList.remove("hot","moderate","cold","high");

                if(weatherData.uvIndex > 10){
                    uvIcon.classList.add("hot");
                } else if (weatherData.uvIndex <= 10){
                    uvIcon.classList.add("cold");
                }
            }
        }

        let windSpeedElement = document.getElementById("windSpeed");
        let windIcon = document.getElementById("windIcon");

        if (windSpeedElement) {
            let windSpeedValue = parseInt(weatherData.windSpeed, 10); 

            windSpeedElement.innerText = windSpeedValue + "km/h";

            if(windIcon){
                windIcon.classList.remove("cold", "high","moderate","hot");

                if(windSpeedValue > 20){
                    windIcon.classList.add("cold");
                }else if(windSpeedValue <= 20){
                    windIcon.classList.add("high");
                }
            }
        }

    } else {
        console.warn("No weather data found in localStorage.");
    }
});

/** Fetch weather data when the user searches for a city */
document.getElementById("weatherForm").addEventListener("submit", function (e) { 
    e.preventDefault(); // Prevent form reload

    let cityInput = document.getElementById("cityInput").value.trim(); // Get user input

    fetch("weather.json")
        .then(response => response.json())
        .then(data => { 
            let cityData = data.find(city => city.cityName.toLowerCase() === cityInput.toLowerCase());

            if (cityData) {
                // Save data in localStorage so it's available on other pages
                localStorage.setItem("weatherData", JSON.stringify(cityData));

                document.getElementById("cityName").innerText = cityData.cityName;
                document.getElementById("temperature").innerText = cityData.temperatureCelsius + "°C";
                document.getElementById("humidity").innerText = (cityData.humidity * 100) + "%";
                document.getElementById("uvIndex").innerText = cityData.uvIndex;
                document.getElementById("windSpeed").innerText = cityData.windSpeed;
            } else {
                alert("City not found. Try another location.");
            }
        })
        .catch(error => console.error("Error loading weather data:", error));
});
