import { Request, Response, NextFunction } from "express";

// Extend Express Response type
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

export function attachSendJson(req: Request, res: Response, next: NextFunction) {
	res.sendJson = function (
		status: number = 200,
		message: string | null = null,
		data: any = null,
		pages: number | null = null,
		total: number | null = null
	) {
		const responseObj = {
			status,
			statusState: status === 200 ? "success" : "error",
			message: message ?? undefined,
			data: data instanceof Array ? data : data instanceof Object ? data : [],
			pages: pages ?? undefined,
			total: total ?? undefined,
		};

		return this.status(status).json(responseObj);
	};

	next();
};