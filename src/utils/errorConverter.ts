import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ValidationError } from "express-validation";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
import { APIError } from "./APIError";
import { errorHandler } from "./errorHandler";

/**
 * Extract validation error messages
 */
const getErrorMessages = (error: any) => {
  const details = error.details;
  const validateError: string[] = [];

  if (details.params) details.params.forEach((err: any) => validateError.push(err.message));
  else if (details.query) details.query.forEach((err: any) => validateError.push(err.message));
  else if (details.body) details.body.forEach((err: any) => validateError.push(err.message));

  return validateError;
};

/**
 * Error converter middleware
 */
export async function errorConverter(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let convertedError: APIError = err;

  if (err instanceof ValidationError || err.name === "ValidationError") {
    convertedError = new APIError({
      message: "Validation failed",
      status: 422,
      data: getErrorMessages(err),
    });
  }
  else if (err instanceof ForeignKeyConstraintError || err instanceof UniqueConstraintError) {
    convertedError = new APIError({
      message: "Params missing or not allowed",
      status: 400,
      data: ["Params missing or not allowed"],
    });
  }
  else if (err.name === "SequelizeValidationError") {
    const errorList = err.errors.map((e: any) => e.message);
    convertedError = new APIError({
      message: "Invalid or missing parameter",
      status: 400,
      data: errorList,
    });
  }
  else if (err instanceof multer.MulterError) {
    let errorMsg = err.message || "Multer error!";
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      errorMsg = "Number of files uploaded is incorrect.";
    }
    convertedError = new APIError({
      message: "Invalid or missing parameter",
      status: 422,
      data: [errorMsg],
    });
  }
  else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message || "Internal Server Error",
      status: 500,
      isPublic: false,
      stack: err.stack,
    });
  }

  // Pass to global error handler
  return errorHandler(convertedError, req, res, next);
}
