import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { sign } from "hono/jwt";
import { generateResponse } from "../tools/responseTools.js";
import { getDirName } from "../tools/fileTools.js";
import type { DBUserInterface, DTOUserInterface } from "./types.js";

class UsersController {
  async getMe(userName) {
    const users = await this.getUsers();

    const user = this.getUser(users, { name: userName });

    return user ? generateResponse(200, user) : generateResponse(404, { message: "User not found" });
  }

  async login(user: DTOUserInterface) {
    const users = await this.getUsers();

    const userData = {
      ...user,
      id: uuidv4(),
    };
    const userFromDb = this.getUser(users, user);

    if (userFromDb) {
      const token = await this.generateToken(userFromDb);

      return generateResponse(200, { accessToken: token, user: userFromDb });
    }

    try {
      await this.saveUser(userData);
      const token = await this.generateToken(userData);

      return generateResponse(200, { accessToken: token, user: userData });
    } catch (err) {
      return generateResponse(500, { message: `The error occurred while creating the user: ${err}` });
    }
  }

  private async generateToken(userData: DBUserInterface) {
    const payload = {
      id: userData.id,
      name: userData.name,
      exp: Date.now() + 1000 * 60 * 30, // 30 minutes
    };

    return await sign(payload, process.env.JWT_SECRET_KEY);
  }

  getUsers() {
    const filePath = path.join(getDirName(), "users.json");

    return new Promise<DBUserInterface[]>((resolve, reject) => {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          reject(new Error(`Error reading users data: ${err}`));
          return;
        }

        try {
          resolve(JSON.parse(data));
        } catch (parseError) {
          reject(new Error(`Error parsing users data: ${parseError}`));
        }
      });
    });
  }

  private getUser(users: DBUserInterface[], user: DTOUserInterface) {
    return users.find((userItem) => userItem.name === user.name);
  }

  private async saveUser(user: DBUserInterface) {
    const users = await this.getUsers();

    if (this.getUser(users, user)) {
      throw new Error("User already exist");
    }

    const filePath = path.join(getDirName(), "users.json");
    users.push(user);
    const data = JSON.stringify(users);

    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
        if (err) {
          reject(new Error(`Error saving users data: ${err}`));
        }

        resolve();
      });
    });
  }
}

export default new UsersController();
