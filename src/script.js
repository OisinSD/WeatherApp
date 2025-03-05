function toggle(button) {
    let tempElement = document.getElementById("temperature");
    let weatherData = JSON.parse(localStorage.getItem("weatherData"));

    // if (!weatherData || !tempElement) return;

    if (button.value === "Fahrenheit") {
        button.value = "Celsius";
        tempElement.innerText = weatherData.temperatureCelsius + "°C";
    } else {
        button.value = "Fahrenheit";
        tempElement.innerText = (weatherData.temperatureCelsius * 9/5 + 32).toFixed(1) + "°F";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Load stored weather data when page loads
    let weatherData = JSON.parse(localStorage.getItem("weatherData"));

    if (weatherData) {
        if (document.getElementById("cityName")) {
            document.getElementById("cityName").innerText = weatherData.cityName;
        }

        let tempElement = document.getElementById("temperature");
        let toggleButton = document.getElementById("toggleTemp");

        if (tempElement) {
            if (toggleButton && toggleButton.value === "Fahrenheit") {
                tempElement.innerText = (weatherData.temperatureCelsius * 9/5 + 32).toFixed(1) + "°F";
            } else {
                tempElement.innerText = weatherData.temperatureCelsius + "°C";
            }
        }

        if (document.getElementById("humidity")) {
            document.getElementById("humidity").innerText = (weatherData.humidity * 100) + "%";
        }
        if (document.getElementById("uvIndex")) {
            document.getElementById("uvIndex").innerText = weatherData.uvIndex;
        }
        if (document.getElementById("windSpeed")) {
            document.getElementById("windSpeed").innerText = weatherData.windSpeed;
        }
    } else {
        console.warn("No weather data found in localStorage.");
    }
});

document.getElementById("weatherForm").addEventListener("submit", function (e) { 
    e.preventDefault(); // Prevents form from reloading the page.

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


/** ICON COLOR CHANGE **/

document.addEventListener("DOMContentLoaded", function () {
    let weatherData = JSON.parse(localStorage.getItem("weatherData"));

    if (weatherData && weatherData.temperatureCelsius) {
        let temp = weatherData.temperatureCelsius;
        let icon = document.getElementById("tempIcon");

        if (icon) { // Ensure the element exists before modifying it
            if (temp > 19) {
                icon.classList.add("hot");
                icon.classList.remove("cold", "moderate");
            } else if (temp < 10) {
                icon.classList.add("cold");
                icon.classList.remove("hot", "moderate");
            } else {
                icon.classList.add("moderate");
                icon.classList.remove("hot", "cold");
            }
        }
    }
});
