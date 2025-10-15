// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../models';
import { JWT_SECRET } from '../config/env';
import { APIError } from '../utils/APIError';

const { USERS } = models;

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await USERS.findOne({ where: { email, isDeleted: false }, raw: true });

    if (!user) {
      throw new APIError({ status: 401, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new APIError({ status: 401, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.sendJson(200, "Login successful", {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token
    })
  } catch (err) {
    return next(err);
  }
};
