import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:5501/api",
  headers: {
    "Content-Type": "application/json",
  },
});
