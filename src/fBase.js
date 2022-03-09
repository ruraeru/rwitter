import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_APP,
//     messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//     appId: process.env.REACT_APP_APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyDOp53RnNlPg3mMGjg5L1YXeblzKP5ZajU",
    authDomain: "rwitter-42436.firebaseapp.com",
    projectId: "rwitter-42436",
    storageBucket: "rwitter-42436.appspot.com",
    messagingSenderId: "371276068297",
    appId: "1:371276068297:web:ac2597b8f7c36eb2782418"
};

const app = initializeApp(firebaseConfig);

export const firebaseInstance = getAuth();
export const authService = getAuth();
export const dbService = getFirestore();