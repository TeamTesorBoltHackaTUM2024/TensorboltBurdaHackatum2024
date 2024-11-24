import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Change to your backend's base URL
});
