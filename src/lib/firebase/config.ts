// // Import the functions you need from the SDKs you need
// import { initializeApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDHImb2ul6OgHMtalz8YOH6ORZOMXw9DS0",
//   authDomain: "product-management-app-8c8e3.firebaseapp.com",
//   projectId: "product-management-app-8c8e3",
//   storageBucket: "product-management-app-8c8e3.firebasestorage.app",
//   messagingSenderId: "1073209305199",
//   appId: "1:1073209305199:web:4524a36b739e0ccaa8c59a",
//   measurementId: "G-KQW5RW3MTG",
// };

// // Initialize Firebase

// const app =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// // export const analytics = getAnalytics(app);

// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: "G-KQW5RW3MTG",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// const analytics = getAnalytics(app);
