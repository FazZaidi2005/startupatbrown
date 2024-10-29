import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBdbmxQOYZbTs16wwB895H7Wp_Ogvzc9uc",
    authDomain: "brown-ep-88d98.firebaseapp.com",
    projectId: "brown-ep-88d98",
    storageBucket: "brown-ep-88d98.appspot.com",
    messagingSenderId: "549366293853",
    appId: "1:549366293853:web:87d0df97e9d133a9d1b4b4",
    measurementId: "G-SW2QH9HH46"
};

// Initialize Firebase app if it hasn't been initialized already
let app;
let analytics;

if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    if (typeof window !== 'undefined') {
        analytics = getAnalytics(app); // Only call analytics in a browser environment
    }
} else {
    app = getApps()[0]; // Use the already initialized app
}

const db = getFirestore(app);

export { db, analytics };