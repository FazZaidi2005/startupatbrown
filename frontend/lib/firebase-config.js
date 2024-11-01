import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

// Initialize Firebase
let app;
let analytics;
let db;

try {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
        
        // Only initialize analytics in browser environment and production
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
            analytics = getAnalytics(app);
        }
    } else {
        app = getApps()[0];
    }
    
    db = getFirestore(app);
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

// Helper function for creating suggestions
export const createSuggestion = async (suggestionData) => {
    if (!db) {
        console.error("Firestore is not initialized");
        return { success: false, error: "Firestore not initialized" };
    }
    
    try {
        const suggestionsRef = collection(db, "resourceSuggestions");
        const docRef = await addDoc(suggestionsRef, {
            ...suggestionData,
            createdAt: new Date(),
            status: "pending",
            environment: process.env.NODE_ENV || 'development'
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating suggestion:", error);
        return { success: false, error: error.message };
    }
};

export { db, analytics };