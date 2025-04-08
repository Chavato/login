import { Request, Response } from "express";
import { RegisterDTO } from "../dtos/RegisterDTO";
import { RegisterResponseDTO } from "../dtos/RegisterResponseDTO";
import { LoginDTO } from "../dtos/LoginDTO";
import { AuthService } from "../services/auth.service";
import { LoginResponseDTO } from "../dtos/LoginResponseDTO";

export class AuthController {
  static async register(
    req: Request<{}, RegisterResponseDTO, RegisterDTO>,
    res: Response
  ): Promise<void> {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(
    req: Request<{}, LoginResponseDTO, LoginDTO>,
    res: Response
  ): Promise<void> {
    try {
      const result = await AuthService.login(req.body);
      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
