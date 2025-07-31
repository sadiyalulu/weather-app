const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey="af282b5ea8ab149a9e85a6c9e80ac42d";

weatherForm.addEventListener("submit",async event => {
   event.preventDefault();
   const city = cityInput.value;
   if(city){
     try{
        const weatherData = await getWeatherData(city);
        displayWeather(weatherData);
     }
     catch(error){
        console.log(error)
        displayError(error)
     }
   }
   else {
    displayError("Please enter a city");
   }
});

async function getWeatherData(city) {
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   const response = await fetch(apiUrl);
   if(!response.ok){
    throw new Error("Network response was not ok");
   }
   return await response.json();
   console.log(response)
}

function displayWeather(data) {
   const { 
    name : city , 
    main : { temp, humidity},
    weather :[{description,id}]
} = data;

card.textContent="";
card.style.display="flex";
const cityDisplay = document.createElement("h1");
const tempDisplay = document.createElement("p");
const humidityDisplay = document.createElement("p");
const descDisplay = document.createElement("p");
const weatherEmoji = document.createElement("p");
cityDisplay.textContent = city;
tempDisplay.textContent = `${Math.round(temp)}°F`;
humidityDisplay.textContent = `Humidity: ${humidity}%`;
descDisplay.textContent = description;
weatherEmoji.textContent = getWeatherEmoji(id);

cityDisplay.classList.add("cityDisplay");
tempDisplay.classList.add("tempDisplay");
humidityDisplay.classList.add("humidityDisplay");
descDisplay.classList.add("descDisplay");
weatherEmoji.classList.add("weatherEmoji");
card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
   switch(true){
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 600:
      return "🌧️";
    case weatherId >= 600 && weatherId < 800:
      return "⛅";
    case weatherId >= 800 && weatherId < 1000:
      return "☀️";
   }
}

function displayError(message){
    console.log(message);
const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");
card.textContent="";
card.style.display="flex";
card.appendChild(errorDisplay);
}