import dotenv from "dotenv";
import routes from "./routes";
import express, { Express } from "express";
import { swaggerSpec } from "./docs/swagger.config";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app: Express = express();

app.use(express.json());

routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
