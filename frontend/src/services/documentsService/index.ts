import { AxiosResponse } from "axios";
import { DocumentInterface } from "./types.ts";
import { api } from "../apiService.ts";

export const uploadDocument = async (document: File) => {
  const formData = new FormData();
  formData.set("document", document);

  const response: AxiosResponse<DocumentInterface> = await api.post("documents/upload", formData);

  return response.data;
};

export const getPublicDocuments = async () => {
  const response: AxiosResponse<DocumentInterface[]> = await api.get("documents/public");

  return response.data;
};

export const getDocument = async (documentId: string) => {
  const response: AxiosResponse<DocumentInterface> = await api.get(`documents/${documentId}`);

  return response.data;
};

export * from "./types.ts";
