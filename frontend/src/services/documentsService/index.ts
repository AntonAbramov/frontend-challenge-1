import { AxiosResponse } from "axios";
import { DocumentInterface } from "./types.ts";
import { api } from "../apiService.ts";

export const uploadDocument = async (document: File) => {
  const formData = new FormData();
  formData.set("document", document);

  await api.post("documents/upload", formData);
};

export const getPublicDocuments = async () => {
  const response: AxiosResponse<DocumentInterface[]> = await api.get("documents/public");

  return response.data;
};

export const getDocument = async (documentId: string) => {
  const response: AxiosResponse<DocumentInterface> = await api.get(`documents/${documentId}`);

  return response.data;
};

export const removeDocument = async (documentId: string) => {
  await api.delete(`documents/delete/${documentId}`);
};

export const updateDocument = async (documentId: string, document: DocumentInterface) => {
  await api.put(`documents/update/${documentId}`, {
    document,
  });
};

export * from "./types.ts";
