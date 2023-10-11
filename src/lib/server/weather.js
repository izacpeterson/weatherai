import { OPEN_WEATHER_API_KEY } from "$env/static/private";

export async function getWeather() {
  const lat = 40.22818394427729;
  const lon = -111.64357574499815;
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;

  let res = await fetch(url);
  let data = await res.json();
  return data;
}
