// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import models from "../models";
import { APIError } from "../utils/APIError";
import { JWT_SECRET } from "../config/env";

const { USERS } = models;

interface AuthRequest extends Request {
  user?: any;
}

/**
 * Combined authentication and authorization middleware
 * @param allowedRoles Roles allowed to access this route
 */
export const authMiddleware = (allowedRoles: string[] = []) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new APIError({ status: 401, message: "Authorization header missing or malformed" });
      }

      const token = authHeader.split(" ")[1] as string;
      const secret = JWT_SECRET;

      const decoded: any = jwt.verify(token, secret);
      if (!decoded || !decoded.userId) {
        throw new APIError({ status: 401, message: "Invalid token" });
      }

      const user = await USERS.findOne({ where: { id: decoded.userId, isDeleted: false }, attributes: ['id', 'role', 'email'] });
      if (!user) {
        throw new APIError({ status: 401, message: "User not found or deleted" });
      }

      req.user = user.dataValues;

      if (allowedRoles.length && !allowedRoles.includes(user.dataValues.role)) {
        throw new APIError({ status: 403, message: "Forbidden: insufficient role" });
      }

      next();
    } catch (err: any) {
      if (err instanceof APIError) return next(err);

      next(new APIError({ status: 401, message: "Unauthorized", stack: err.stack }));
    }
  };
};