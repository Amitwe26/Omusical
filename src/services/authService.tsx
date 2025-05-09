import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};
