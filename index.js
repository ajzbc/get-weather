let ipifyURL = 'https://api.ipify.org?format=json';
let jsonbinURL = 'https://api.jsonbin.io/g/';
let weatherURL = 'https://fcc-weather-api.glitch.me/api/current?';

(async () => {

    try {

        const requestIP = await fetch(ipifyURL);
        const { ip } = await requestIP.json();

        const ipOutput = document.getElementById('ipOutput');
        ipOutput.innerHTML = ip;

        const requestLatLon = await fetch(`${jsonbinURL}${ip}`);
        const { data: { ll } } = await requestLatLon.json();

        const lat = ll[0];
        const lon = ll[1];

        const latlonOutput = document.getElementById('latlonOutput');
        latlonOutput.innerHTML = `${jsonbinURL}<b>${ip}</b>`;
        latlonOutput.href = `${jsonbinURL}${ip}`;
        latlonOutput.target = '_blank';

        const latOut = document.getElementById('lat');
        latOut.innerHTML = lat;

        const lonOut = document.getElementById('lon');
        lonOut.innerHTML = lon; 

        const requestWeather = await fetch(`${weatherURL}lat=${lat}&lon=${lon}`);
        const { dt, main: { temp }, name } = await requestWeather.json();
        
        const temperature = document.getElementById('temp');
        let f = ((temp) * (9/5)) + 32;
        temperature.innerHTML = `${f}°F`;

        let city = document.getElementById('city');
        city.innerHTML = name;

        const time = document.getElementById('time');
        let date = new Date(dt * 1000);
        let convert  = date.toLocaleString()
        let format = convert.split(' ');
        time.innerHTML = `${format[1]} ${format[2]}`;

        const weatherOutput = document.getElementById('weatherOutput');
        weatherOutput.innerHTML = `${weatherURL}lat=<b>${lat}</b>&lon=<b>${lon}</b>`;
        weatherOutput.href = `${weatherURL}lat=${lat}&lon=${lon}`;
        weatherOutput.target = '_blank';

        const tempOutput = document.getElementById('tempOutput');
        tempOutput.innerHTML = `${temp}°C`;

        const fahrenOutput = document.getElementById('fahrenOutput');
        fahrenOutput.innerHTML = `${f}°F`;

        const cityOutput = document.getElementById('cityOutput');
        cityOutput.innerHTML = name;

        const timeOutput = document.getElementById('timeOutput');
        timeOutput.innerHTML = dt;

        const formatOutput = document.getElementById('formatOutput');
        formatOutput.innerHTML = `${format[1]} ${format[2]}`;
            
    } catch (error) {
        console.log(error);
    }

})();
