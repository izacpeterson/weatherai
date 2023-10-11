import { json } from "@sveltejs/kit";
import { getWeather } from "$lib/server/weather.js";
import { getWeatherDescription } from "$lib/server/gpt";
import { getVoice } from "$lib/server/voice";
import { uploadToday, getFile } from "$lib/server/firebase";

export async function GET({ url }) {
  let uploaded = await uploadToday();

  let response = "";

  if (uploaded) {
    response = await getWeatherDescription();
    getVoice(response);
  } else {
    console.log("already uploaded today");
    response = "already uploaded today";
  }

  return json(response);
}
