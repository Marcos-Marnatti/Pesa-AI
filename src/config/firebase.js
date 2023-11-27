import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBUkH2nnspdpC-EmcaRSzY13Xho0RGfwk",
  authDomain: "pesai-e9afe.firebaseapp.com",
  databaseURL: "https://pesai-e9afe-default-rtdb.firebaseio.com",
  projectId: "pesai-e9afe",
  storageBucket: "pesai-e9afe.appspot.com",
  messagingSenderId: "1042808905184",
  appId: "1:1042808905184:web:200b9d9cd5a745397e9f85",
  measurementId: "G-0P3DPVS555"
}

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app);
export const storage = getStorage(app);