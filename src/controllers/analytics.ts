import { NextFunction, Request, Response } from "express";
import { APIError } from "../utils/APIError";
import models from "../models";
import { col, fn, literal } from "sequelize";

const { CASES_PROCESSED, CASE_ASSIGNMENTS } = models;

// Extend Request to include user from middleware
interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string; email: string };
}

// Aggregation result types
type CasesByStatus = { status: string; count: string };
type AvgResolutionTime = { avgDays: string };
type TotalRecovered = { total_due_recovered: string };
type CaseCountPerTeam = { assigned_to: number; case_count: string };

export const getAnalyticsSummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    if (!user || user.role !== "admin") {
      throw new APIError({ status: 403, message: "Forbidden: Admins only" });
    }
    // Total cases by status
    const casesByStatusRaw = await CASES_PROCESSED.findAll({
      attributes: ["status", [fn("COUNT", col("id")), "count"]],
      group: ["status"],
      raw: true,
    });
    const casesByStatus = casesByStatusRaw as unknown as CasesByStatus[];

    // Mock average resolution time (days)
    const avgResolutionTimeRaw = await CASES_PROCESSED.findAll({
      where: { status: "Resolved" },
      attributes: [
        [fn("AVG", literal('EXTRACT(EPOCH FROM ("updatedAt" - "createdAt"))/86400')), "avgDays"]
      ],
      raw: true,
    });
    const avgResolutionTime = avgResolutionTimeRaw as unknown as AvgResolutionTime[];

    // Case count per team
    const caseAssignmentsRaw = await CASE_ASSIGNMENTS.findAll({
      attributes: ["assigned_to", [fn("COUNT", col("id")), "case_count"]],
      group: ["assigned_to"],
      raw: true,
    });
    const caseAssignments = caseAssignmentsRaw as unknown as CaseCountPerTeam[];

    // Total due amount recovered
    const totalRecoveredRaw = await CASES_PROCESSED.findAll({
      where: { status: "Resolved" },
      attributes: [[fn("SUM", col("due_amount")), "total_due_recovered"]],
      raw: true,
    });
    const totalRecovered = totalRecoveredRaw as unknown as TotalRecovered[];
    return res.sendJson(200, "Analytics summary", {
      total_cases_by_status: casesByStatus.map(c => ({ ...c, count: Number(c.count) })),
      avg_resolution_time_days: Number(avgResolutionTime[0]?.avgDays || 0),
      case_count_per_team: caseAssignments.map(c => ({ ...c, case_count: Number(c.case_count) })),
      total_due_amount_recovered: Number(totalRecovered[0]?.total_due_recovered || 0),
    });
  } catch (err) {
    next(
      new APIError({
        status: 500,
        message: err instanceof Error ? err.message : "Failed to fetch analytics summary",
      })
    );
  }
};
