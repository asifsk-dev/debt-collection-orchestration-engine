import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";

import { attachSendJson } from "./middlewares/response";
import { asyncHandler } from "./utils/asyncHandler";
import { errorConverter } from "./utils/errorConverter";
import sequelize from "./config/db";
import router from "./routes/index.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("dev"));

// Attach wrapper function to send a unified JSON response
app.use(attachSendJson);

// Health check route
app.get("/health", asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await sequelize.authenticate();
    res.sendJson(200, "Okay")
}));

// Mount all the routes
app.use('/api', router);

// Swagger API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Not Found Error
app.use((req: Request, res: Response, next: NextFunction) => {
    res.sendJson(404, "Not Found.")
})

// Error converter (must be before error handler)
app.use(errorConverter);

export default app;
