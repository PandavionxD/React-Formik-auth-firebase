import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);

// Funcion de Login con contraseña y password en Firebase (Promise)
export const login = ( {email, password} ) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Funcion de registro para registrar nuevos usuarios en Firebase (Promise)
export const register = ({email,password})=>{
    return createUserWithEmailAndPassword(auth,email,password)
}

// Funcion para Logout desde Firebase (Promise)
export const Logout = ()=>{
  return  signOut(auth)
}