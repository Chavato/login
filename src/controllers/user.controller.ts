import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}
