
import axios from "axios";

/**
 * Base API instance
 * Uses VITE_API_BASE_URL from environment
 * Example (Vercel):
 * VITE_API_BASE_URL=https://your-backend.up.railway.app
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Request Interceptor
 * Automatically attach JWT token if present
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Global error handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Token expired / invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      // Optional: redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);