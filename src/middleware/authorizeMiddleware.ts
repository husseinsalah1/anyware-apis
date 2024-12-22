import jwt from 'jsonwebtoken';
import UnauthorizedException from '../exceptions/unauthorized';
import { ErrorCodes } from '../exceptions/root';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'anyware-task';

interface TokenData {
  role?: string;
  [key: string]: any;
}

interface CustomRequest extends Request {
  tokenData?: TokenData;
}

const extractToken = (authHeader: string | undefined): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  return parts.length === 2 ? parts[1] : null;
};

const verifyToken = (token: string): TokenData | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenData;
  } catch (err) {
    return null;
  }
};

const authMiddleware = (roles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = extractToken(req.headers['authorization']);
    if (!token) {
      return next(new UnauthorizedException('Unauthorized access, no token provided', ErrorCodes.UNAUTHORIZED_ACCESS));
    }

    const tokenData = verifyToken(token);
    if (!tokenData) {
      return next(new UnauthorizedException('Unauthorized access, invalid token', ErrorCodes.UNAUTHORIZED_ACCESS));
    }

    if (!roles.includes(tokenData.role ?? '')) {
      return next(new UnauthorizedException('Unauthorized access, invalid role', ErrorCodes.UNAUTHORIZED_ACCESS));
    }
    req.tokenData = tokenData;
    return next();
  };
};

export default authMiddleware;
