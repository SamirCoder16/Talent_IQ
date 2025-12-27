import axios from "axios";

// create a axios Instance for making API requests
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    withCredentials: true, // include cookies in requests by default
    headers: {
        "Content-Type": "application/json", // default content type
    }
});

export default axiosInstance;