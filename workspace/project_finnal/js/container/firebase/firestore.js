const firebaseConfig = {
    apiKey: "AIzaSyCsuqbEEn2XPB-abiXz7P2TIGWy5LxpNvw",
    authDomain: "forums-65697.firebaseapp.com",
    projectId: "forums-65697",
    storageBucket: "forums-65697.appspot.com",
    messagingSenderId: "348672536261",
    appId: "1:348672536261:web:4dc4c35f1caf8c04844aac",
    measurementId: "G-35VNXY89P3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;