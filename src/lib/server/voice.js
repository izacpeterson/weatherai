import { uploadFile } from "./firebase";
import { Readable } from "stream";

import { ELEVENLABS_API_KEY } from "$env/static/private";

export async function getVoice(text) {
  let message = `Today is ${formatDate(new Date())}. ${text.content}`;

  console.log(message);

  try {
    let response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/reWuFadv4Fine7b6TYuc", {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
        voice_settings: {
          stability: 0.25,
          similarity_boost: 1,
        },
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const errorBody = await response.text(); // or response.json() if the response is JSON
      console.error(errorBody);
      return;
    } else {
      // your code to handle the response data
    }

    console.log("response", response);

    let blob = await response.blob();

    let buffer = await blob.arrayBuffer(); // blob.arrayBuffer() returns a promise that resolves with an ArrayBuffer
    let nodeBuffer = Buffer.from(buffer);

    uploadFile(nodeBuffer); // Now you're uploading a Buffer instead of a Blob
    console.log(nodeBuffer.length); // Buffer objects use the 'length' property instead of 'size'
    let url = "done";
    return url;
  } catch (error) {
    console.log(error);
    return error;
  }
}
function toOrdinalSuffix(num) {
  const j = num % 10,
    k = num % 100;
  if (j === 1 && k !== 11) {
    return num + "st";
  }
  if (j === 2 && k !== 12) {
    return num + "nd";
  }
  if (j === 3 && k !== 13) {
    return num + "rd";
  }
  return num + "th";
}

function toWords(num) {
  const belowTwenty = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const belowHundred = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (num < 20) {
    return belowTwenty[num];
  }
  if (num < 100) {
    return belowHundred[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + belowTwenty[num % 10] : "");
  }
  if (num < 1000) {
    return belowTwenty[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + toWords(num % 100) : "");
  }
  return toWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 !== 0 ? " " + toWords(num % 1000) : "");
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    return "Invalid input";
  }

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const day = toOrdinalSuffix(date.getDate());
  const month = months[date.getMonth()];
  const year = toWords(date.getFullYear());

  return `${month} ${day}, ${year}`;
}
