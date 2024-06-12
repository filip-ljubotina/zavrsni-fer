import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the axios instance with the base URL and default headers
const api = axios.create({
    baseURL: "https://zavrsni-be-production.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to add token to headers
const addTokenToHeaders = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    } catch (error) {
        console.error("Error retrieving token:", error);
    }
};

// Define the ApiService with the HTTP methods
export const ApiService = {
    get: async (url: string) => {
        await addTokenToHeaders();
        return await api.get(url);
    },

    post: async (url: string, data: any) => {
        await addTokenToHeaders();
        return await api.post(url, data);
    },

    put: async (url: string, data: any) => {
        await addTokenToHeaders();
        return await api.put(url, data);
    },

    delete: async (url: string) => {
        await addTokenToHeaders();
        return await api.delete(url);
    },
};

export default ApiService;