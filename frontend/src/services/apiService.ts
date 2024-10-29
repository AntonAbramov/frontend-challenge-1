import axios from "axios";
import { ACCESS_TOKEN } from "~/constants";

export const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN) ?? ""}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
