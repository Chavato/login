import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Failed to retrieve users", error: err });
    }
  }
}