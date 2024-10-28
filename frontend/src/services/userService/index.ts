import { AxiosResponse } from "axios";
import { api } from "~/services/apiService.ts";
import { LoginBody, LoginResponse, UserInterface } from "./types";

export const getMe = async () => {
  const response: AxiosResponse<UserInterface> = await api.get("/me");

  return response.data;
};

export const login = async (body: LoginBody) => {
  const response: AxiosResponse<LoginResponse> = await api.post("/login", body);

  return response.data;
};

export * from "./types.ts";
