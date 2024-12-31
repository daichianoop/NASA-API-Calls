const apiKey = "2qobaitzA3U8hGcdDELREL8btPtF8UzIUZBwQaPh"; // Replace with your actual API key  
const apiUrl = `https://api.nasa.gov/insight_weather/?api_key=${apiKey}&feedtype=json&ver=1.0`;  

document.getElementById('fetchWeatherButton').addEventListener('click', fetchWeatherData);  

function fetchWeatherData() {  
    fetch(apiUrl)  
        .then(response => {  
            if (!response.ok) {  
                throw new Error('Network response was not ok');  
            }  
            return response.json();  
        })  
        .then(data => {  
            displayWeatherData(data);  
        })  
        .catch(error => {  
            console.error('There was a problem with the fetch operation:', error);  
            document.getElementById('results').innerHTML = '<p>Error fetching data.</p>';  
        });  
}  

function displayWeatherData(data) {  
    const resultsDiv = document.getElementById('results');  
    resultsDiv.innerHTML = ''; // Clear previous results  

    const solKeys = data.sol_keys;  
    if (solKeys.length === 0) {  
        resultsDiv.innerHTML = '<p>No weather data available.</p>';  
        return;  
    }  

    solKeys.forEach(sol => {  
        const weather = data[sol];  
        const weatherInfo = `  
            <div class="weather-card">  
                <h3>Sol ${sol} - ${weather.Season}</h3>  
                <p><strong>Temperature:</strong> ${weather.AT ? weather.AT.av + ' °C' : 'N/A'}</p>  
                <p><strong>Pressure:</strong> ${weather.PRE ? weather.PRE.av + ' Pa' : 'N/A'}</p>  
                <p><strong>Wind Speed:</strong> ${weather.HWS ? weather.HWS.av + ' m/s' : 'N/A'}</p>  
                <p><strong>Most Common Wind Direction:</strong> ${weather.WD && weather.WD.most_common ? weather.WD.most_common.compass_point : 'N/A'}</p>  
                <p><strong>First Data Point:</strong> ${weather.First_UTC}</p>  
                <p><strong>Last Data Point:</strong> ${weather.Last_UTC}</p>  
            </div>  
        `;  
        resultsDiv.innerHTML += weatherInfo;  
    });  
}