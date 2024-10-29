import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/serve-static";
import fs from "fs";
import * as dotenv from "dotenv";
import { authMiddleware } from "./middlewareUtils/authMiddleware.js";
import userController from "./users/users.controller.js";
import documentsController from "./documents/documents.controller.js";
import type { DBUserInterface } from "./users/types.js";
import { getDirName } from "./tools/fileTools.js";

dotenv.config();

const app = new Hono();

app.use("/*", cors());

app.use(async (c, next) => {
  let accessToken = c.req.header("Authorization") ?? "";
  accessToken = accessToken.split(" ")?.[1] ?? "";

  c.req["user"] = await authMiddleware(accessToken);

  await next();
});

// auth
app.get("/me", async (c) => {
  const user: DBUserInterface | undefined = c.req["user"];
  const { responseBody, status } = await userController.getMe(user?.name ?? "");

  return c.json({ ...responseBody }, status);
});

app.post("/login", async (c) => {
  const body = await c.req.json();
  const { responseBody, status } = await userController.login(body);

  return c.json({ ...responseBody }, status);
});

// documents
app.post("/documents/upload", async (c) => {
  const user: DBUserInterface | undefined = c.req["user"];
  if (!user) {
    return c.json({ message: "Access denied" }, 401);
  }

  const result = await documentsController.uploadDocument(user);
  if (!result) {
    return c.json({ message: "Internal error" }, 500);
  }

  try {
    const formData = await c.req.formData();
    const documentFile = formData.get("document") as File;
    const buffer = await documentFile.arrayBuffer();

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(
        `${getDirName()}/uploads/documents/${result.documentData.id}.json`,
        Buffer.from(buffer),
        "utf8",
        async (err) => {
          if (err) {
            await result.clean();
            reject(new Error(`Error writing to file: ${err}`));
            return;
          }

          resolve();
        },
      );
    });

    return c.json(result.documentData, 200);
  } catch {
    return c.json({ message: "Document not uploaded" }, 500);
  }
});

app.use(
  "/uploads/documents/*",
  serveStatic({
    root: "./",
    getContent: async (path) => {
      return fs.readFileSync(`${getDirName()}/${path}`, "utf-8");
    },
  }),
);

app.get("/documents/public", async (c) => {
  const users = await userController.getUsers();
  const documents = await documentsController.getPublicDocuments();

  return c.json(
    documents.map((document) => {
      const owner = users.find((user) => user.id === document.ownerId);
      return {
        id: document.id,
        owner,
      };
    }),
    200,
  );
});

serve({ fetch: app.fetch, port: 8080 });
console.log("Server is running on http://localhost:8080");
