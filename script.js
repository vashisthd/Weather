// Api key = d7958a0221f3588dc2f7b6ec70d94339
// second key = 375a382eb741343076ed9eaa7e67e366
// 
// https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=d7958a0221f3588dc2f7b6ec70d94339 q=Germany
// Final Link - https://api.openweathermap.org/data/2.5/weather?q=Germany&appid=d7958a0221f3588dc2f7b6ec70d94339&units=metric
const apiKey = "d7958a0221f3588dc2f7b6ec70d94339"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&appid="
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-icon")
const weatherIcon = document.querySelector(".weather-icon");
// const weather = document.querySelector(".weather");
async function checkWeather(city){
    const response = await fetch(apiUrl + apiKey + "&q=" + city);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";

    }
    else{
        
    var data = await response.json();
    const temp = document.querySelector(".temp");
    temp.innerText = Math.round(data.main.temp) + " °C";
    const cityName = document.querySelector(".city");
    cityName.innerText = data.name;
    const humidity = document.querySelector(".humidity");
    humidity.innerText = data.main.humidity + "%";
    const windSpeed = document.querySelector(".wind");
    windSpeed.innerText = data.wind.speed + " Km/H";
    const condition = data.weather[0].main ;
    if(condition == "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(condition == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(condition == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(condition == "Mist"){
        weatherIcon.src = "images/mist.png";
    }else if(condition == "Rain"){
        weatherIcon.src = "images/rain.png";
    }else if(condition == "Snow"){
        weatherIcon.src = "images/snow.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";


    }
}
searchBtn.addEventListener("click" , ()=>
{

    checkWeather(searchBox.value);
}
)
