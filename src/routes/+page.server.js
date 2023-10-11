import { getFile } from "../lib/server/firebase";

export async function load() {
  let url = await getFile();
  console.log(url);
  return {
    url: url,
  };
}
