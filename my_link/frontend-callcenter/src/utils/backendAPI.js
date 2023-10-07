import axios from "axios";
import { API_URL } from "./constant";

const backendAPI = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
});

export default backendAPI;
