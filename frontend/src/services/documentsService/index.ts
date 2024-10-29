import { AxiosResponse } from "axios";
import { DocumentInterface, UploadedDocumentInterface } from "./types.ts";
import { api } from "../apiService.ts";

export const uploadDocument = async (document: File) => {
  const formData = new FormData();
  formData.set("document", document);

  const response: AxiosResponse<UploadedDocumentInterface> = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPublicDocuments = async () => {
  const response: AxiosResponse<DocumentInterface[]> = await api.get("/documents/public");

  return response.data;
};

export * from "./types.ts";
