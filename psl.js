const apiKey = '############'; // Go get your own free key at openweathermap.org.

const check_psl_weather = () => {
	let zip = document.getElementById('zip_code').value;
	let out = document.getElementById('answer');
	fetch('https://api.openweathermap.org/data/2.5/weather?appid='+apiKey+"&zip="+zip)
  .then(response => response.json())
  .then(result => out.innerText = evaluate_psl_weather(result))
  .catch(error => console.log('error',error));
}

const evaluate_psl_weather = (local_weather) => {
	if (local_weather.cod != 200) {
			return local_weather.message;
	}
	let month = new Date().getMonth() + 1; //getMonth() returns 0-11
	if (!(8 < month < 12)) {
		return "No, it's not fall. That's sacriledge.";
	}
	let hour = new Date().getHours() + 1;
	if (hour > 14) {
		return "No, it's too late for caffeine.";
	}
	let temp = (local_weather.main.feels_like - 273.15) * (9/5) + 32; // They return it in Kelvin??
	if (temp > 70) {
		return "No, it's too hot for a PSL, maybe a pumpkin cold brew?";
	}
	let weather_condition = local_weather.weather[0].id; //Get status code, outlined at https://openweathermap.org/weather-conditions
	if (weather_condition < 7 ) {
		return "it's IDEAL PSL time!"
	}
	return "it's PSL time!"
}
