import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP3xjsXjCRf7lAJF6qFx_lDlqLFlZuwNQ",
  authDomain: "clone-35103.firebaseapp.com",
  projectId: "clone-35103",
  storageBucket: "clone-35103.appspot.com",
  messagingSenderId: "667744608602",
  appId: "1:667744608602:web:984e1952e37ac32f9a9363",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
