import { decode } from 'punycode';
import { Role } from '../enums/Role';
import { EnvironmentVariableMissing } from '../errors/EnvironmentVariableMissing';
import { HttpError } from '../errors/HttpError';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (role?: Role) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        throw new HttpError('Access token required', 401);
      }

      if (!JWT_SECRET) {
        throw new EnvironmentVariableMissing('JWT_SECRET');
      }

      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new HttpError('Invalid or expired token', 403);
        }

        const payload = decoded as { id: number; name: string; role: Role };

        if (role && payload.role !== role) {
          throw new HttpError('Insufficient access', 403);
        }
      });

      next();
    } catch (erro) {
      next(erro);
    }
  };
};
