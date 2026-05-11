import axios from "axios";

const apiBaseUrl = process.env.API_BASE_URL;

export const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});



