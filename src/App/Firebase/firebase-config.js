import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa-B4LU1rFK17EbSiHCVlRsFex0TQwZko",
  authDomain: "certificadora1-5653e.firebaseapp.com",
  projectId: "certificadora1-5653e",
  storageBucket: "certificadora1-5653e.appspot.com",
  messagingSenderId: "86500267338",
  appId: "1:86500267338:web:7736aae7093f0343729db3"
};

const app = initializeApp(firebaseConfig);


export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
})