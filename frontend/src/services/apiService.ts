import axios from "axios";
import { ACCESS_TOKEN } from "~/constants";

export const api = axios.create();

api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(ACCESS_TOKEN) ?? ""}`;
