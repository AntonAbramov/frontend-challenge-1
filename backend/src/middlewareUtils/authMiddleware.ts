import { decode, verify } from "hono/jwt";
import type { DBUserInterface } from "../users/types.js";

export const authMiddleware = async (accessToken: string): Promise<DBUserInterface | undefined> => {
  try {
    const verifiedPayload = await verify(accessToken, process.env.JWT_SECRET_KEY);
    const decodedPayload = decode(accessToken);

    const now = new Date().getTime();
    if (verifiedPayload) {
      // @ts-ignore
      return now > verifiedPayload.exp
        ? undefined
        : { name: decodedPayload.payload.name, id: decodedPayload.payload.id };
    }
  } catch {
    console.log("Anonymous user");
  }
};
