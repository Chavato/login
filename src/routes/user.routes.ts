import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/users", authenticateToken, UserController.getUsers);

export default router;
