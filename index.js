function formatDate(date) {
  let mins = date.getMinutes();
  let hr = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();
  day = days[day];
  let final = `${day} ${hr}:${mins}`;

  //console.log(final);
  return final;
}
function formatDay(times){
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dd = new Date(times*1000);
  let day = dd.getDay();
  day = days[day];
  return day;
}
//formateDate(new Date());
let currentTime = document.querySelector("#day");
currentTime.textContent = formatDate(new Date());
let selectedCountry = "";
function showCountry(event) {
  event.preventDefault();
  let count = document.querySelector("#input-form");
  selectedCountry = count.value;
  console.log("Inside function:", selectedCountry);
}

document.querySelector("#form").addEventListener("submit", showCountry);

function getWeather(response) {
  let c = Math.round(response.data.temperature.current);
  let h1 = document.querySelector(".temp-value");
  let icon = document.querySelector("#weather-icon");
  let h2 = document.querySelector("h2");
  let rain = document.querySelector(".rain");
  let humidity = document.querySelector(".humidity");
  let windspeed = document.querySelector(".wind");
  let feels = document.querySelector(".weather");
  h1.innerHTML = `${c}`;
  h2.innerHTML = response.data.city;
  let rai = response.data.condition.description;
  let humid = response.data.temperature.humidity;
  let winds = response.data.wind.speed;
  let feel= response.data.temperature.feels_like;
  rain.innerHTML = `${rai}`;
  humidity.innerHTML = `Humidity: ${humid}%`;
  windspeed.innerHTML = `Windspeed: ${winds} km/h`;
  feels.innerHTML = `Feels like ${Math.round(feel)}°`;

  icon.src = response.data.condition.icon_url;
  icon.alt = response.data.condition.description;
  console.log(response.data);
  getForecast(response.data.city);
}

function showValueOutside() {
  console.log(selectedCountry);
  let apiKey = "fo02406b8c2c0726534b217586ta4b4a";
  let url = `https://api.shecodes.io/weather/v1/current?query=${selectedCountry}&key=${apiKey}`;
  axios.get(url).then(getWeather);
}

document.querySelector("#form").addEventListener("submit", showValueOutside);

function displayForecast(response){
  console.log(response.data);
  
  let loop = "";
  response.data.daily.forEach(function (day,index){
    if (index>0 && index<6){
    loop= loop+`<div class="forecast-day">
                    <div class = "forecast-date">${formatDay(day.time)}</div>
                    <img src = "${day.condition.icon_url}" class = "forecast-icon"/>
                    <div class="forecast-temp">
                        <div class = "forecast-tempHigh">${Math.round(day.temperature.maximum)}°</div>
                        <div class = "forecast-tempLow">${Math.round(day.temperature.minimum)}°</div>
                    </div>
                </div>`;}
    });

  let forecast_ = document.querySelector("#foreCast");
  forecast_.innerHTML=loop;
}

function getForecast(city){
  let apiKey = "fo02406b8c2c0726534b217586ta4b4a";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(url).then(displayForecast);
  //console.log(url);
}

function getCity(city){
  let apiKey = "fo02406b8c2c0726534b217586ta4b4a";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios(url).then(getWeather);
}
getCity("Durban");
getForecast("Durban");
