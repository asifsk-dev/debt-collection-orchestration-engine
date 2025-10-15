import { Request, Response, NextFunction } from "express";
import { APIError } from "./APIError";

/**
 * Global error handler
 * Sends unified response using res.sendJson
 */
export function errorHandler(err: APIError, req: Request, res: Response, next: NextFunction) {
  let message = err.message || "Something went wrong! Please try again later";

  if (!err.isPublic) {
    message = err.stack || message;
  }

  if (err.status === 422) {
    message = "Invalid or missing parameters";
  } else if (err.status === 500) {
    console.error("URL:", req.originalUrl);
    console.error("Error message:", err.message);
    console.error("Stack:", err.stack);
    console.error("Errors:", err.errors);
    return res.sendJson(err.status, message, err.data);
  }

  if (err.stack) console.error(err.stack);
  if (err.errors) console.error(err.errors);

  return res.sendJson(err.status, message, err.data);
}