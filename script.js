document.addEventListener("DOMContentLoaded", function () {
    const welcomeText = document.querySelector(".welcome-text h1");
    const paragraphText = document.querySelector(".welcome-text p");

    const welcomeMessage = "Welcome to Your Trusted Weather Source!";
    const paragraphMessage = `Whether you're planning your next outdoor adventure or simply checking the forecast, we’ve got you covered!
    Stay informed with the latest weather updates and real-time conditions. Our goal is to provide you with accurate, 
    easy-to-read weather information to help you make the best decisions every day.     
    Explore now and know what the weather has in store for you!`;

   
    const typingSpeedWelcome = 30; 
    const typingSpeedParagraph = 10; 

    let welcomeIndex = 0; 
    let paragraphIndex = 0; 

    function typeLetter(element, text, index, speed) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(() => typeLetter(element, text, index, speed), speed); // Call the function recursively for the next letter
        }
    }

    typeLetter(welcomeText, welcomeMessage, welcomeIndex, typingSpeedWelcome);

    setTimeout(() => {
        typeLetter(paragraphText, paragraphMessage, paragraphIndex, typingSpeedParagraph);
        document.querySelector(".welcome-text").classList.add("visible"); // Make the welcome text visible
    }, welcomeMessage.length * typingSpeedWelcome + 500);

} )
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

// const geodbApiUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

// API headers for GeoDB Cities API
// const geodbApiHeaders = {
//     "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
//     "X-RapidAPI-Key": "cff40eb74amshfa43bbbe50b9328p1c66abjsn4edbf783c35d" // Replace with your RapidAPI Key
// };

// Array of cities (Expanded with many more cities)
// const cityList = [
//     "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", 
//     "Austin", "Jacksonville", "Fort Worth", "Columbus", "Indianapolis", "Charlotte", "San Francisco", "Seattle", "Denver", "Washington D.C.",
//     "Boston", "El Paso", "Detroit", "Nashville", "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore",
//     "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Kansas City", "Long Beach", "Mesa", "Atlanta", "Colorado Springs",
//     "Raleigh", "Miami", "Omaha", "Oakland", "Minneapolis", "Tulsa", "Arlington", "New Orleans", "Wichita", "Cleveland", "Tampa",
//     "Bakersfield", "Aurora", "Honolulu", "Anaheim", "Santa Ana", "Corpus Christi", "Riverside", "Lexington", "St. Louis", "Stockton",
//     "Pittsburgh", "Cincinnati", "Anchorage", "Henderson", "Greensboro", "Plano", "Newark", "Lincoln", "Toledo", "Chula Vista",
//     "Buffalo", "Fort Wayne", "Jersey City", "Chandler", "Madison", "Lubbock", "Scottsdale", "Reno", "Glendale", "Norfolk", "Winston-Salem",
//     "North Las Vegas", "Gilbert", "Chesapeake", "Boise", "Baton Rouge", "Spokane", "Des Moines", "Tacoma", "San Bernardino", "Modesto",
//     "Fontana", "Moreno Valley", "Santa Clarita", "Birmingham", "Oxnard", "Fayetteville", "Huntsville", "Aurora", "Columbia", "Denton",
//     "Sterling Heights", "Victorville", "Evansville", "Simi Valley", "Gresham", "Carrollton", "Clearwater", "Manchester", "Columbus", "Ontario",
//     "Downey", "Richmond", "West Valley City", "Murrieta", "Palm Bay", "Costa Mesa", "Inglewood", "Round Rock", "South Bend", "Miami Gardens",
//     "Midland", "Manchester", "Macon", "Waterbury", "Odessa", "Killeen", "Visalia", "O'Fallon", "Gainesville", "Arvada", "Waukegan", "Berkeley",
//     "Pueblo", "Shreveport", "Davenport", "Bellingham", "Westminster", "Green Bay", "Sioux Falls", "Cedar Rapids", "Billings", "Lakewood", 
//     "Kenosha", "Bismarck", "Sparks", "Bend", "Council Bluffs", "Auburn", "Champaign", "Jackson", "Evansville", "Des Moines", "Cedar Rapids",
//     "Peoria", "Newport News", "Concord", "Menifee", "Rochester", "Antioch", "Temecula", "Provo", "Hickory", "Auburn", "Lake Charles", "Chico", 
//     "Camarillo", "Vancouver", "Fargo", "Columbia", "Hilo", "Parker", "Beaumont", "Marysville", "Vallejo", "Pocatello", "Macon", "Lake Havasu City", 
//     "St. Cloud", "Kingman", "Grand Junction", "Bismarck", "Decatur", "Grand Rapids", "Jacksonville", "Eugene", "Springfield", "Hickory", "Orem", 
//     "Shreveport", "Lafayette", "Kennewick", "Eau Claire", "Muskegon", "Duluth", "Iowa City", "Pueblo", "Huntington", "Eugene", "Kalamazoo", 
//     "Greenwood", "Lafayette", "Grand Prairie", "Napa", "Bloomington", "Mansfield", "Macon", "Dothan", "Moore", "La Crosse", "Bismarck", "Killeen", 
//     "Rapid City", "Waco", "Flagstaff", "Ithaca", "Chattanooga", "Rochester", "Syracuse", "Lynchburg", "Minot", "Bismarck", "Flagstaff", "Rapid City",
//     // Some other popular cities from around the world
//     "London", "Paris", "Berlin", "Madrid", "Rome", "Amsterdam", "Brussels", "Vienna", "Oslo", "Prague",
//     "Lisbon", "Stockholm", "Copenhagen", "Zurich", "Geneva", "Dubai", "Abu Dhabi", "Hong Kong", "Tokyo", "Seoul", "Singapore", "Sydney", 
//     "Melbourne", "Auckland", "Vancouver", "Toronto", "Montreal", "Ottawa", "Calgary", "Edmonton", "Los Angeles", "San Francisco", "Chicago", 
//     "Houston", "New York", "Boston", "Chicago", "Toronto", "Rio de Janeiro", "Buenos Aires", "Lima", "Santiago", "Mexico City", "Rio de Janeiro", 
//     "São Paulo", "Kuala Lumpur", "Jakarta", "Manila", "Istanbul", "Mumbai", "Bangalore", "Karachi", "Delhi", "Chennai", "Hyderabad", 
//     "Dhaka", "Kathmandu", "Dhaka", "Lagos", "Nairobi", "Cape Town", "Accra", "Cairo", "Moscow", "Saint Petersburg", "Bucharest", "Warsaw", 
//     "Athens", "Belgrade", "Helsinki", "Riyadh", "Doha", "Bahrain", "Kuwait City", "Cairo", "Dubai", "Sharjah", "Abu Dhabi", "Muscat", 
//     "Manama", "Tehran", "Tashkent", "Bishkek", "Almaty", "Yerevan", "Baku"
// ];

// // Function to filter cities based on user input
// function filterCities(query) {
//     const filteredCities = cityList.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));

//     // Clear previous suggestions
//     suggestionsContainer.innerHTML = '';

//     if (filteredCities.length > 0) {
//         // Show the suggestions container when there are matching cities
//         suggestionsContainer.style.display = 'block';

//         filteredCities.forEach(city => {
//             const cityElement = document.createElement("div");
//             cityElement.textContent = city;
//             suggestionsContainer.appendChild(cityElement);

//             // When a city is clicked, set it as the input value and hide suggestions
//             cityElement.addEventListener('click', () => {
//                 searchBox.value = city;
//                 suggestionsContainer.innerHTML = ''; // Clear suggestions after selection
//                 suggestionsContainer.style.display = 'none'; // Hide suggestions
//                 checkWeather(city); // Function to fetch weather for the selected city
//             });
//         });
//     } else {
//         suggestionsContainer.style.display = 'none'; // Hide suggestions if no matching cities
//     }
// }
// function convertAQI(scaleValue) {
//     switch (scaleValue) {
//         case 1:
//             return Math.floor(Math.random() * (50 - 0 + 1)) + 0;  // Random AQI between 0 and 50
//         case 2:
//             return Math.floor(Math.random() * (100 - 51 + 1)) + 51;  // Random AQI between 51 and 100
//         case 3:
//             return Math.floor(Math.random() * (150 - 101 + 1)) + 101;  // Random AQI between 101 and 150
//         case 4:
//             return Math.floor(Math.random() * (200 - 151 + 1)) + 151;  // Random AQI between 151 and 200
//         case 5:
//             return Math.floor(Math.random() * (500 - 201 + 1)) + 201;  // Random AQI between 201 and 500
//         default:
//             return "Invalid scale value";  // Handle invalid input
//     }
// }

// const suggestionsContainer = document.querySelector('#suggestions');

// searchBox.addEventListener('input', function () {
//     const query = searchBox.value.trim();
//     if (query) {
//         filterCities(query); // Call filterCities to show city suggestions
//     } else {
//         suggestionsContainer.innerHTML = ''; // Clear suggestions when input is empty
//     }
// });
// async function getAQI(lat, lon) {
//     const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//     const aqiResponse = await fetch(aqiUrl);
//     console.log(aqiResponse)
//     if (aqiResponse.ok) {
//         const aqiData = await aqiResponse.json();
        
//         const aqi = aqiData.list[0].main.aqi;
//         console.log(aqi) // Get AQI value from the response
//         return aqi;
//     } else {
//         throw new Error("Failed to fetch AQI");
//     }
// }
// const weather = document.querySelector(".weather");
async function checkWeather(city){
    const response = await fetch(apiUrl + apiKey + "&q=" + city);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".welcome-text").style.display = "none";
    }
    else{
        
    var data = await response.json();
    // console.log(data);
    // const aqi = await getAQI(data.coord.lat, data.coord.lon);
     
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
    document.querySelector(".welcome-text").classList.remove("visible");
        setTimeout(() => {
            document.querySelector(".welcome-text").style.display = "none";
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".weather").classList.add("visible");
        }, 1000);
    document.querySelector(".error").style.display = "none";
    }
}
// let debounceTimeout;

// searchBox.addEventListener('input', function(event) {
//     const query = searchBox.value.trim();
//     if (query.length > 2) {
//         clearTimeout(debounceTimeout); // Clear previous timeout
//         debounceTimeout = setTimeout(() => {
//             fetchCitySuggestions(query); // Make the API call after the debounce delay
//         }, 500); // 500ms debounce delay
//     } else {
//         suggestionsList.style.display = "none";
//     }
// });
searchBox.addEventListener("keydown", function(event) {
    // Check for "Enter" key
    if (event.key === "Enter" || event.code === "Enter") {
        event.preventDefault(); // Prevent default action (form submission, etc.)
        checkWeather(searchBox.value);
        setTimeout(()=>{
            searchBox.value = "";
        },1000)
        
    }
});
searchBtn.addEventListener("click" , ()=>
{

    checkWeather(searchBox.value);
    setTimeout(()=>{
        searchBox.value = "";
    },1000)

}
)

