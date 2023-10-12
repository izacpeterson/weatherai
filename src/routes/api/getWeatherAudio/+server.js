import { json } from "@sveltejs/kit";
import { getWeather } from "$lib/server/weather.js";
import { getWeatherDescription } from "$lib/server/gpt";
import { getVoice } from "$lib/server/voice";
import { uploadToday, getFile } from "$lib/server/firebase";

import { generateVoiceWeather } from "$lib/server/generate";

export async function GET({ url }) {
  let uploaded = await uploadToday();

  if (!uploaded) {
    generateVoiceWeather();
    return json({ message: "uploading" });
  } else {
    return json({ message: "already uploaded" });
  }
}
