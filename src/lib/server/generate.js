import { getWeather } from "./weather";
import { getWeatherDescription } from "./gpt";
import { getVoice } from "./voice";

export async function generateVoiceWeather() {
  let weatherDesc = await getWeatherDescription();
  getVoice(weatherDesc);
  return "done";
}
