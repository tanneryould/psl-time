// ✅ Clarity emerges: named functions
const apiKey = '#########'; // This is mine. Don't be a jerk and go get your own free key at openweathermap.org. This is a small project and I don't have an interest in setting up a proxy api.
let out = document.getElementById('answer');
const check_psl_weather = () => {
	let zip = document.getElementById('zip_code').value;
	fetch('https://api.openweathermap.org/data/2.5/weather?appid='+apiKey+"&zip="+zip)
  .then(response => response.json())
  .then(result => evaluate_psl_weather(result))
  .catch(error => console.log('fetch error',error));
}

const evaluate_psl_weather = (local_weather) => {
	out.innerText = ""
	if (local_weather.cod != 200) {
			out.innerText +=  local_weather.message;
	}
	let month = new Date().getMonth() + 1; //getMonth() returns 0-11
	out.innerHTML += "The month is: "+month+"<br>";
	if (!(8 < month < 12)) {
		out.innerHTML += "❌ No PSL for you, it's not fall. That's sacriledge.<br><br>";
	} else {out.innerHTML += "✅ it's autumn<br><br>"}
	
	let hour = new Date().getHours() + 1;
	out.innerHTML += "The hour is: "+hour+"<br>";
	if (hour > 14) {
		out.innerHTML += "❌ It's too late for caffeine.<br><br>";
	} else {out.innerHTML += "✅ A good time for coffee.<br><br>"}
	
	let temp = (local_weather.main.feels_like - 273.15) * (9/5) + 32; // They return it in Kelvin??
	out.innerHTML += "The temperature is: "+Math.round(temp,0)+"ºF<br>";
	if (temp > 70) {
		out.innerHTML += "❌ It's too hot for a PSL, maybe a pumpkin cold brew?<br><br>";
	} else {out.innerHTML += "✅ it's cold enough to appropriately enjoy a hot beverage!<br><br>";}
	/* // for the future
	let weather_condition = local_weather.weather[0].id; //Get status code, outlined at https://openweathermap.org/weather-conditions
	if (weather_condition < 7 ) {
		return "it's IDEAL PSL time!"
	}
	return "it's PSL time!"
}
*/
