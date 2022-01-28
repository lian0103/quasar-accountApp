import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCp9kcAHaK5v53QRzO3FGw9liOT5l9NvMw",
  authDomain: "gt-record.firebaseapp.com",
  projectId: "gt-record",
  storageBucket: "gt-record.appspot.com",
  messagingSenderId: "230029838774",
  appId: "1:230029838774:web:5c5d430ca620632bfe5917"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
