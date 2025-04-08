import { AuthController } from "../../controllers/auth.controller";
import { AuthService } from "../../services/auth.service";
import { Request, Response } from "express";

jest.mock("../../services/auth.service");

describe("AuthController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis(); 
    jsonMock = jest.fn();

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe("register", () => {
    it("should return 201 and created user on success", async () => {
      const mockUser = { id: 1, name: "Test", email: "test@example.com" };
      (AuthService.register as jest.Mock).mockResolvedValue(mockUser);

      req = {
        body: { name: "Test", email: "test@example.com", password: "123", cpf: "12345678900" },
      };

      await AuthController.register(req as Request, res as Response);

      expect(AuthService.register).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });

    it("should return 400 on service error", async () => {
      (AuthService.register as jest.Mock).mockRejectedValue(new Error("Email already registered"));

      req = {
        body: { name: "Test", email: "test@example.com", password: "123", cpf: "12345678900" },
      };

      await AuthController.register(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Email already registered" });
    });
  });

  describe("login", () => {
    it("should return 200 and token on success", async () => {
      const mockToken = { token: "mocked.jwt.token" };
      (AuthService.login as jest.Mock).mockResolvedValue(mockToken);

      req = {
        body: { email: "test@example.com", password: "123" },
      };

      await AuthController.login(req as Request, res as Response);

      expect(AuthService.login).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockToken);
    });

    it("should return 400 on login error", async () => {
      (AuthService.login as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));

      req = {
        body: { email: "test@example.com", password: "wrong" },
      };

      await AuthController.login(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
  });
});
