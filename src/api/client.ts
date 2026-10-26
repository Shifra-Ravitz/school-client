import axios from "axios";
import { API_URL, TOKEN_KEY } from "./config";
import type { ApiErrorBody } from "../types";
export const api = axios.create({
    baseURL: API_URL
}
)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export function getErrorMessage(error: unknown) {

    if (axios.isAxiosError<{ error: ApiErrorBody }>(error)) {
        const message = error.response?.data?.error?.message;
        if (message)
            return message
    }
    return "שגיאה בחיבור לשרת"
}