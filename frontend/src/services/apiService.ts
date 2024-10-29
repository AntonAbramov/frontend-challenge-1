import axios from "axios";
import { enqueueSnackbar } from "notistack";
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      enqueueSnackbar("Your session is expired, please login again !", { autoHideDuration: 2500, variant: "warning" });
      window.location.pathname = "/login";
    }
    return error;
  },
);
