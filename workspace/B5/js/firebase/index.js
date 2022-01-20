const firebaseConfig = {
  apiKey: "AIzaSyAMITPHSZZOEdJp3VG1O8tXKsLLnt1JLN0",
  authDomain: "ci-70-f9de1.firebaseapp.com",
  projectId: "ci-70-f9de1",
  storageBucket: "ci-70-f9de1.appspot.com",
  messagingSenderId: "110858338136",
  appId: "1:110858338136:web:ef4ab641bb6df47479af2d",
  measurementId: "G-W026930RR0"
};

const appFb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;