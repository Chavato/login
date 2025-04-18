import { HttpError } from "../../errors/HttpError";
import { AuthController } from "../../controllers/auth.controller";
import { AuthService } from "../../services/auth.service";
import { NextFunction, Request, Response } from "express";

jest.mock("../../services/auth.service");

describe("AuthController", () => {
  let req: Partial<Request>;

  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  let next: NextFunction;

  beforeEach(() => {
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();

    res = {
      status: statusMock,
      json: jsonMock,
    };
    next = jest.fn();
  });

  describe("register", () => {
    it("should return 201 and created user on success", async () => {
      const mockUser = { id: 1, name: "Test", email: "test@example.com" };
      (AuthService.register as jest.Mock).mockResolvedValue(mockUser);

      req = {
        body: {
          name: "Test",
          email: "test@example.com",
          password: "123",
          cpf: "12345678900",
        },
      };

      await AuthController.register(req as Request, res as Response, next);

      expect(AuthService.register).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(mockUser);
      expect(next).not.toHaveBeenCalled();
    });

    it("should pass HttpError to next on failure", async () => {
      const error = new HttpError("Email already registered.", 400);
      (AuthService.register as jest.Mock).mockRejectedValue(error);

      await AuthController.register(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe("login", () => {
    it("should return 200 and token on success", async () => {
      const mockToken = { token: "mocked.jwt.token" };
      (AuthService.login as jest.Mock).mockResolvedValue(mockToken);

      req = {
        body: { email: "test@example.com", password: "123" },
      };

      await AuthController.login(req as Request, res as Response, next);

      expect(AuthService.login).toHaveBeenCalledWith(req.body);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockToken);
    });

    it("should pass HttpError to next on login error", async () => {
      const error = new HttpError("Invalid password.", 400);
      (AuthService.login as jest.Mock).mockRejectedValue(error);

      await AuthController.login(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
