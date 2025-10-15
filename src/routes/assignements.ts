// src/routes/cases.ts
import { Router } from "express";
import { assignCases } from "../controllers/assignments";
import { authMiddleware } from "../middlewares/authMiddleware";


const assignRouter = Router();

assignRouter.get("/run", authMiddleware([]), assignCases);

export default assignRouter;
