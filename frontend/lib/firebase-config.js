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

let app;
let analytics;
let db;

try {
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
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

// Helper functions for each collection
export const createJoinUsSubmission = async (data) => {
    if (!db) return { success: false, error: "Firestore not initialized" };
    try {
        const docRef = await addDoc(collection(db, "joinUsSubmissions"), {
            ...data,
            createdAt: new Date(),
            status: "pending"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating join us submission:", error);
        return { success: false, error: error.message };
    }
};

export const createResourceSuggestion = async (data) => {
    if (!db) return { success: false, error: "Firestore not initialized" };
    try {
        const docRef = await addDoc(collection(db, "resourceSuggestions"), {
            ...data,
            createdAt: new Date(),
            status: "pending"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating resource suggestion:", error);
        return { success: false, error: error.message };
    }
};

export const createOpportunityListing = async (data) => {
    if (!db) return { success: false, error: "Firestore not initialized" };
    try {
        const docRef = await addDoc(collection(db, "opportunityListings"), {
            ...data,
            createdAt: new Date(),
            status: "pending"
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating opportunity listing:", error);
        return { success: false, error: error.message };
    }
};

export { db, analytics };