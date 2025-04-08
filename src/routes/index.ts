import { Express } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const routes = (app: Express) => {  
  app.use("/api", authRoutes);
  app.use("/api", userRoutes);
};

export default routes;
