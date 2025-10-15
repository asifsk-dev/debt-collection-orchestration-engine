// src/routes/cases.ts
import { Request, Response, Router } from "express";
import multer from "multer";
import { uploadCases, getCase, updateCase } from "../controllers/cases";
import { authMiddleware } from "../middlewares/authMiddleware";
import { updateCaseSchema, getCaseSchema } from "../validations/case";
import { validate } from "express-validation";


const caseRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

caseRouter.get("/", authMiddleware([]), validate(getCaseSchema, { context: true }, { abortEarly: true }) , getCase);
caseRouter.post("/upload", authMiddleware([]), upload.single("file"), uploadCases);
caseRouter.patch("/:case_id/update-status", authMiddleware([]), validate(updateCaseSchema, { context: true }, { abortEarly: true }), updateCase);

export default caseRouter;
