import { Router } from "express";
import { getAnalyticsSummary } from "../controllers/analytics";
import { authMiddleware } from "../middlewares/authMiddleware";

const analyticsRouter = Router();

// Only users with role 'admin' can access
analyticsRouter.get("/summary", authMiddleware(['admin']), getAnalyticsSummary);

export default analyticsRouter;
