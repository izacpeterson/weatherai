import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9sczuu5sUQYrHfrrt3RX-EllBAPJdpDw",
  authDomain: "weather-e7de1.firebaseapp.com",
  projectId: "weather-e7de1",
  storageBucket: "weather-e7de1.appspot.com",
  messagingSenderId: "116023873521",
  appId: "1:116023873521:web:aa49be757c30bba9907e50",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);

const storageRef = ref(storage, "weather.mp3");
// 'file' comes from the Blob or File API

export async function uploadFile(file) {
  uploadBytes(storageRef, file).then(async (snapshot) => {
    console.log("Uploaded a blob or file!");
    await setDoc(doc(db, "audio", "weather"), { date: Date.now() });
  });
}

export async function getFile() {
  const url = await getDownloadURL(storageRef);
  console.log(url);
  return url;
}

export async function uploadToday() {
  // check to see if an audio file has been uploaded today, if not, return false
  // if it has, return true
  const docRef = doc(db, "audio", "weather");
  const docSnap = await getDoc(docRef);
  let today = new Date();
  let lastUpload = new Date(docSnap.data().date);

  if (today.getDate() === lastUpload.getDate()) {
    return true;
  } else {
    return false;
  }
}
