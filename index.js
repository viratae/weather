const weather = (function () {
    const cityForm = document.querySelector('#cityForm');
    const now = new Date();
    let weatherData = {
        city: "New York",
        date: now,
        temp: 50,
        tempHigh: 64,
        tempLow: 48,
        description: "Cooling down with a chance of rain multiple days",
        feelsLike: 45,
        summary: "Partially Cloudy",
        precipitation: 0,
        probability: 5,
        cloudCover: 9.9,
        windSpeed: 9.2,
        windGust: 9.0,
        windDirection: 231,
        uv: 3,
        solarRadiation: 123,
        solarEnergy: .6,
        humidity: 54.3,
        pressure: 2,
        visibility: 9.9,
        sunrise: "06:41:21",
        sunset: "06:41:21",
    }
    cityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cityInput = document.querySelector('#cityInput');
        const place = cityInput.value;
        const data = await getWeather(place);
        weatherData = {
            city: data.address,
            date: now,
            temp: data.days[0].temp,
            tempHigh: data.days[0].tempmax,
            tempLow: data.days[0].tempmin,
            description: data.days[0].description,
            feelsLike: data.days[0].feelslike,
            summary: data.days[0].conditions,
            precipitation: data.days[0].precip,
            probability: data.days[0].precipprob,
            cloudCover: data.days[0].cloudcover,
            windSpeed: data.days[0].windspeed,
            windGust: data.days[0].windgust,
            windDirection: data.days[0].winddir,
            uv: data.days[0].uvindex,
            solarRadiation: data.days[0].solarradiation,
            solarEnergy: data.days[0].solarenergy,
            humidity: data.days[0].humidity,
            pressure: data.days[0].pressure,
            visibility: data.days[0].visibility,
            sunrise: data.days[0].sunrise,
            sunset: data.days[0].sunset,
        }
        console.log(weatherData);
        cityForm.reset();
        renderer.updateWeather(weatherData);
    });
    return {
        weatherData
    }
})();
async function getWeather(place) {
    try {
        url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + place + "?key=W9XMRR8NL9CM34QWFUH9LVAKP";
        const weatherUnprocessed = await fetch(url);
        const weatherProcessed = await weatherUnprocessed.json();
        return weatherProcessed;
    }
    catch(err) {
        alert(err);
    }
}
const renderer = (function ScreenController() {
    function updateBackground(hour) {
        const body = document.body;
        if(hour >= 6 && hour <=11) {
            console.log("Good morning!");
            body.style.backgroundImage = "url('images/sunrise.jpg')";
        }
        else if(hour >= 12 && hour <=17) {
            console.log("Good afternoon!");
            body.style.backgroundImage = "url('images/afternoon.jpg')";
        }
        else if(hour >= 18 && hour <=23) {
            console.log("Good evening!");
            body.style.backgroundImage = "url('images/evening.jpg')";
        }
        else if(hour >= 1 && hour <= 5) {
            console.log("Goodnight!")
            body.style.backgroundImage = "url('images/night.jpg')";
        }
    }
    function updateWeather(weatherData) {
        for(let key in weatherData) {
            const element = document.querySelector("#" + key);
            if(element) {
                if(key == "temp" || key=="tempHigh" || key=="tempLow") {
                    const prefix = "";
                    if(key=="tempHigh") {
                        prefix = "High: "
                    }
                    else if(key=="tempLow") {
                        prefix="Low: "
                    }
                    element.textContent = prefix + weatherData[key] + "°F";
                } 
                else if(key=="date") {
                    element.textContent = weatherData[key].toLocaleDateString();
                }
                else {
                    element.textContent = weatherData[key];
                }
            }
        }
        const actual = document.querySelector('#actual');
        actual.textContent = weatherData.temp;
    }
    return {
        updateBackground,
        updateWeather
    }
})();
renderer.updateBackground(weather.weatherData.date.getHours());
