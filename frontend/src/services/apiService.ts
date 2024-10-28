import axios from "axios";
import { ACCESS_TOKEN } from "~/constants";

export const api = axios.create({ baseURL: "http://localhost:3000" });

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN) ?? ""}`;
