import { EnvironmentVariableMissing } from '../errors/EnvironmentVariableMissing';
import { HttpError } from '../errors/HttpError';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Error } from 'sequelize';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new HttpError('Access token required', 401);
    }

    if (!JWT_SECRET) {
      throw new EnvironmentVariableMissing('JWT_SECRET');
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        throw new HttpError('Invalid or expired token', 403);
      }
    });

    next();
  } catch (erro) {
    next(erro);
  }
};
