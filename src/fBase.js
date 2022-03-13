import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storageService = getStorage();