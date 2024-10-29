import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import type { DBUserInterface } from "../users/types.js";
import type { DBDocumentInterface } from "./types.js";
import { getDirName } from "../tools/fileTools.js";

class DocumentsController {
  public async getPublicDocuments() {
    return await this.getDocuments();
  }

  public async uploadDocument(user: DBUserInterface) {
    const documentData: DBDocumentInterface = {
      id: uuidv4(),
      ownerId: user.id,
    };

    try {
      await this.saveDocument(documentData);
    } catch {
      return;
    }

    return { documentData, clean: () => this.removeDocument(documentData.id) };
  }

  private getDocuments() {
    const filePath = path.join(getDirName(), "documents.json");

    return new Promise<DBDocumentInterface[]>((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          reject(new Error(`Error reading documents data: ${err}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          reject(new Error(`Error parsing documents data: ${parseError}`));
        }
      });
    });
  }

  private getDocument(documents: DBDocumentInterface[], documentId: string) {
    return documents.find((documentItem) => documentItem.id === documentId);
  }

  private async removeDocument(documentId: string) {
    const documents = await this.getDocuments();

    const filePath = path.join(getDirName(), "documents.json");
    const data = JSON.stringify(documents.filter((document) => document.id !== documentId));

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          reject(new Error(`Error saving document data: ${err}`));
        }

        resolve();
      });
    });
  }

  private async saveDocument(document: DBDocumentInterface) {
    const documents = await this.getDocuments();

    if (this.getDocument(documents, document.id)) {
      throw new Error("Document already exist");
    }

    const filePath = path.join(getDirName(), "documents.json");
    documents.push(document);
    const data = JSON.stringify(documents);

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          reject(new Error(`Error saving document data: ${err}`));
          return;
        }

        resolve();
      });
    });
  }
}

export default new DocumentsController();
