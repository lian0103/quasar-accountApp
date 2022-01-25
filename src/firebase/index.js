import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBncSexDmqEHo1V_SgpHsi6FUdiNiiayoA",
  authDomain: "account-app-f70c0.firebaseapp.com",
  projectId: "account-app-f70c0",
  storageBucket: "account-app-f70c0.appspot.com",
  databaseURL:
    "https://account-app-f70c0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "893886700460",
  appId: "1:893886700460:web:fbcc5bd3fc95013714f809",
  measurementId: "G-J6SMYP2MZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
