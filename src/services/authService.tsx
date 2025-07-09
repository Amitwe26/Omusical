import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import Cookies from 'js-cookie';
import axios from 'axios';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    saveTokens(token, "");
    return userCredential;
};

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    saveTokens(token, "");
    return userCredential;
};

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = await result.user.getIdToken()
    saveTokens(token, "");
    return result;
};

// --- Token helpers ---
export const saveTokens = (accessToken: string, refreshToken: string) => {
    // Set access token to expire in 15 minutes
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { secure: true, sameSite: 'strict', expires: 1/96 }); // 15 min = 1/96 day
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { secure: true, sameSite: 'strict' });
};

export const getAccessToken = () => {
    return Cookies.get(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return Cookies.get(REFRESH_TOKEN_KEY);
};

export const removeTokens = () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
};

// --- Token validation ---
const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const isAccessTokenValid = () => {
    const token = getAccessToken();
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return false;
    // exp is in seconds since epoch
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
};

// --- Example: login with tokens from backend ---
export async function loginWithTokens(email: string, password: string) {
    // Replace with your backend endpoint
    const response = await axios.post('/api/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;
    console.log('accessToken', accessToken, refreshToken,'refresh token');
    saveTokens(accessToken, refreshToken);
    return response.data;
}

// --- Example: refresh access token ---
export async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');
    // Replace with your backend endpoint
    const response = await axios.post('/api/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    console.log('accessToken', accessToken,'inside refresh token ');
    saveTokens(accessToken, newRefreshToken);
    return accessToken;
}
