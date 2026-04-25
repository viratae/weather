const weather = (function () {
    const cityForm = document.querySelector('#cityForm');
    const now = new Date();
    
    cityForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cityInput = document.querySelector('#cityInput');
        const place = cityInput.value;
        
        await loadWeather(place)
        cityForm.reset();
        
    });
    return {
        // weatherData
        now
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
async function loadWeather(place) {
    const data = await getWeather(place);
    const now = new Date();
    const weatherData = {
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
    renderer.updateWeather(weatherData)
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
                    let prefix = "";
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
renderer.updateBackground(weather.now.getHours());
loadWeather("New York");

