import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:5050/api",
  headers: {
    "Content-Type": "application/json",
  },
});
