import dotenv from "dotenv";
import routes from "./routes";
import express, { Express } from "express";

dotenv.config();

const app: Express = express();

app.use(express.json());

routes(app);

export default app;
