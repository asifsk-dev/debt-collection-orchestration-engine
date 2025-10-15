// src/controllers/assignment.controller.ts
import { Request, Response, NextFunction } from "express";
import { assignCasesService } from "../services/assignmentEngine";

export const assignCases = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const result = await assignCasesService(userId);
    return res.sendJson(200, result.message, result);
  } catch (err) {
    next(err);
  }
};
