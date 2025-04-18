import { HttpError } from "../errors/HttpError";
import { Request, Response, NextFunction } from "express";
import { BaseError, UniqueConstraintError, ValidationError } from "sequelize";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let statusCode = 500;
  let message = "Internal server error";

  if (err instanceof HttpError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 400;
    message = "Duplicate entry: " + Object.values(err.fields).join(", ");
  } else if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join("; ");
  } else if (err instanceof BaseError) {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
