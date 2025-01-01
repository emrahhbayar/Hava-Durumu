const button = document.querySelector("#button");
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const apikey = "YOUR_API_KEY";
const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=`;
runEvents();

function runEvents() {
    button.addEventListener("click", getWeather)
}

function getWeather() {
    if (input.value !== "") {
        showResult();
    } else {
        errorMessage("Lütfen şehir giriniz!");
    }
}

async function showResult() {

    const response = await fetch(`${url}${input.value}&lang=tr`);
    const resultApi = await response.json();

    if (response.status == 200) {
        result.innerHTML = "";
        input.value = "";

        const city = document.createElement("div");
        city.className = "city";
        city.textContent = `${resultApi.location.name}, ${resultApi.location.country}`;
        result.appendChild(city);

        const img = document.createElement("div");
        const imgElement = document.createElement("img");
        img.className = "img";
        imgElement.src = resultApi.current.condition.icon;
        img.appendChild(imgElement);
        result.appendChild(img);

        const temperature = document.createElement("div");
        temperature.className = "temperature";
        temperature.textContent = `${resultApi.current.feelslike_c} °C`;
        result.appendChild(temperature);

        const description = document.createElement("div");
        description.className = "description";
        description.textContent = resultApi.current.condition.text;
        result.appendChild(description);


        const humidityWind = document.createElement("div");
        humidityWind.className = "humidity-wind";
        const iHumidity = document.createElement("i");
        const spanHumidity = document.createElement("span");
        const iWind = document.createElement("i");
        const spanWind = document.createElement("span");
        iHumidity.className = "fa-solid fa-droplet"
        iHumidity.id = "iwind"
        iWind.className = "fa-solid fa-wind"
        iWind.id = "iwind"
        spanHumidity.textContent = `${resultApi.current.humidity} %`;
        spanWind.textContent = `${resultApi.current.wind_kph} km/s`

        iHumidity.appendChild(spanHumidity);
        humidityWind.appendChild(iHumidity);

        iWind.appendChild(spanWind);
        humidityWind.appendChild(iWind);
        result.appendChild(humidityWind);
    }
    else {
        errorMessage("Aradığınız şehir bulunamadı.")
    }
}

function errorMessage(error) {

    result.innerHTML = "";
    input.value = "";
    const spanErrorMessage = document.createElement("span");
    spanErrorMessage.textContent = error;
    result.appendChild(spanErrorMessage);

    setTimeout(() => {
        result.innerHTML = ""
    }, 2500);

}