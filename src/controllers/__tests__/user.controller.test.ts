import { UserResponseDTO } from "@/dtos/UserResponseDTO";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";
import { Request, Response } from "express";

jest.mock("../../services/user.service");

describe("UserController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = {};
    statusMock = jest.fn().mockReturnThis();
    jsonMock = jest.fn();
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe("getUsers", () => {
    it("should return 200 and user list on success", async () => {
      const mockUsers: UserResponseDTO[] = [
        {
          id: 1,
          name: "Rafael",
          email: "rafael@example.com",
          cpf: "***45678900",
        },
        {
          id: 2,
          name: "Lucas",
          email: "lucas@example.com",
          cpf: "***12345678",
        },
      ];
      (UserService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      await UserController.getUsers(req as Request, res as Response);

      expect(UserService.getAllUsers).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(mockUsers);
    });

    it("should return 500 on service error", async () => {
      const error = new Error("DB failure");
      (UserService.getAllUsers as jest.Mock).mockRejectedValue(error);

      await UserController.getUsers(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Failed to retrieve users",
        error,
      });
    });
  });
});
