var ipifyURL = "https://api.ipify.org?format=json"
var jsonbinURL = "https://api.jsonbin.io/g/"
var weatherURL = "https://fcc-weather-api.glitch.me/api/current?"

fetch(ipifyURL).then(response => {
    return response.json();
}).then(ipify => {
    var ip = ipify.ip;

    var ipOutput = document.getElementById("ipOutput");
    ipOutput.innerHTML = ip;

    fetch(jsonbinURL + ip).then(response => {
        return response.json();
    }).then(jsonbin => {
    
        var lat = jsonbin.data.ll[0];
        var lon = jsonbin.data.ll[1];

        var latlonOutput = document.getElementById("latlonOutput");
        latlonOutput.innerHTML = jsonbinURL + "<b>" + ip + "</b>";
        latlonOutput.href = jsonbinURL + ip;
        latlonOutput.target = "_blank";

        var latOut = document.getElementById("lat");
        latOut.innerHTML = lat;

        var lonOut = document.getElementById("lon");
        lonOut.innerHTML = lon;

        fetch(weatherURL + "lat=" + lat + "&lon=" + lon).then(response => {
            return response.json();
        }).then(weather => {
        
            var temp = document.getElementById("temp");
            var f = ((weather.main.temp)*(9/5)) + 32;
            temp.innerHTML = f + "°F";

            var city = document.getElementById("city");
            city.innerHTML = weather.name;

            var time = document.getElementById("time");
            var date = new Date(weather.dt *1000);
            var convert  = date.toLocaleString()
            var format = convert.split(" ");
            time.innerHTML = format[1] + " " + format[2];

            var weatherOutput = document.getElementById("weatherOutput");
            weatherOutput.innerHTML = weatherURL + "lat=<b>" + lat + "</b>&lon=<b>" + lon + "</b>";
            weatherOutput.href = weatherURL + "lat=" + lat + "&lon=" + lon;
            weatherOutput.target = "_blank";

            var tempOutput = document.getElementById("tempOutput");
            tempOutput.innerHTML = weather.main.temp + "°C";

            var fahrenOutput = document.getElementById("fahrenOutput");
            fahrenOutput.innerHTML = f + "°F"

            var cityOutput = document.getElementById("cityOutput");
            cityOutput.innerHTML = weather.name;

            var timeOutput = document.getElementById("timeOutput");
            timeOutput.innerHTML = weather.dt;

            var formatOutput = document.getElementById("formatOutput");
            formatOutput.innerHTML = format[1] + " " + format[2];
        
        }).catch(err => {
            console.log(err);
        });
    
    }).catch(err => {
        console.log(err);
    });

}).catch(err => {
    console.log(err);
});