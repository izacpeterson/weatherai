import OpenAI from "openai";
import { getWeather } from "./weather";

import { OPENAI_API_KEY } from "$env/static/private";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export async function getWeatherDescription() {
  const weather = await getWeather();

  console.log(weather.daily[0]);

  let weatherMessage = `Using the following weather data, please generate a short weather forcast for Provo, UT. The data is todays weather.  ${JSON.stringify(weather.daily[0])}`;
  console.log(weatherMessage);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: weatherMessage }],
    model: "gpt-4-0613",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message;
}
