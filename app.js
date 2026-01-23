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
//formateDate(new Date());
let currentTime = document.querySelector("#day");
currentTime.textContent = formatDate(new Date());
let selectedCountry = "";
function showCountry(event) {
  event.preventDefault();
  let count = document.querySelector("#input-form");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${count.value}`;
  selectedCountry = count.value;
  //console.log("Inside function:", selectedCountry);
}

document.querySelector("#form").addEventListener("submit", showCountry);

function getWeather(response) {
  let c = Math.round(response.data.temperature.current);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${c}° ☀️`;
}

function showValueOutside() {
  console.log(selectedCountry);
  let apiKey = "fo02406b8c2c0726534b217586ta4b4a";
  let url = `https://api.shecodes.io/weather/v1/current?query=${selectedCountry}&key=${apiKey}`;
  axios.get(url).then(getWeather);
}

document.querySelector("#form").addEventListener("submit", showValueOutside);
