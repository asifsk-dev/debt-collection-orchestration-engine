import { Response } from "express";

declare module "express-serve-static-core" {
  interface Response {
    sendJson: (
      status?: number,
      message?: string | null,
      data?: any,
      pages?: number | null,
      total?: number | null
    ) => Response;
  }
}
