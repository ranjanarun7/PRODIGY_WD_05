const apiKey = 'dc7cc0621d70670014d745f7389a8ca7';

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found!");
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("city").innerText = "City not found!";
            document.getElementById("temp").innerText = "";
            document.getElementById("weatherMain").innerText = "";
            document.getElementById("weatherImage").src = "";
            document.getElementById("additionalInfo").innerText = "";
        });
}

function displayWeatherData(data) {
    const city = document.getElementById("city");
    const temp = document.getElementById("temp");
    const weatherMain = document.getElementById("weatherMain");
    const weatherImage = document.getElementById("weatherImage");
    const additionalInfo = document.getElementById("additionalInfo");

    city.innerText = `${data.name}, ${data.sys.country}`;
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    weatherMain.innerText = data.weather[0].description;
    weatherImage.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    additionalInfo.innerHTML = `
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
        <p>Visibility: ${data.visibility / 1000} km</p>
    `;
}

document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const location = document.getElementById("weatherInput").value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a city name!");
    }
});
