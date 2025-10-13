import express, { Application, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan";

import { attachSendJson } from "./middlewares/response";
import { asyncHandler } from "./utils/asyncHandler";
import { errorHandler } from "./utils/errorHandler";
import sequelize from "./config/db";

const app: Application = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Attach wrapper function to send a unified JSON response
app.use(attachSendJson);

// Health check route
app.get("/health", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await sequelize.authenticate();
    res.sendJson(200, "Okay")
}));

// Not Found Error
app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendJson(404, "Not Found.")
})

// Error handler
app.use(errorHandler);

export default app;
