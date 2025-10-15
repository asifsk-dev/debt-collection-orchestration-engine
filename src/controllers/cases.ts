import { Request, Response, NextFunction } from "express";
import { parseString } from "fast-csv";
import models, { sequelize } from "../models";
import { APIError } from "../utils/APIError";

const { CASES_RAW, CASES_PROCESSED, CASE_STATUS_HISTORY } = models;

type CaseStatus = "Pending" | "In Progress" | "Resolved" | "Escalated";

interface CaseRecord {
  case_id: string;
  bank_code: string;
  borrower_name: string;
  loan_amount: string | number;
  due_amount: string | number;
  days_past_due: string | number;
  priority: string;
  region: string;
  [key: string]: any;
};

interface UpdateStatusBody {
  status: "Pending" | "In Progress" | "Resolved" | "Escalated";
  comment?: string;
}

// Extend Request to include multer file and user from middleware
interface AuthenticatedRequest extends Request {
  file?: Express.Multer.File;
  user?: { id: number, role: string, email: string };
};

const normalizeCase = (record: CaseRecord) => ({
  case_id: record.case_id,
  bank_code: record.bank_code,
  borrower_name: record.borrower_name,
  loan_amount: parseFloat(record.loan_amount as string),
  due_amount: parseFloat(record.due_amount as string),
  days_past_due: parseInt(record.days_past_due as string, 10),
  priority: record.priority,
  region: record.region,
});

const bulkInsertCases = async (records: CaseRecord[], userId: number) => {
  const rawRecords = records.map(r => ({
    ...normalizeCase(r),
    raw_json: r,
    created_by: userId,
  }));

  const processedRecords = records.map(r => ({
    ...normalizeCase(r),
    status: "Pending" as CaseStatus,
  }));

  await sequelize.transaction(async t => {
    await CASES_RAW.bulkCreate(rawRecords, { transaction: t });
    await CASES_PROCESSED.bulkCreate(processedRecords, { transaction: t });
  });
};

export const uploadCases = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new APIError({ status: 401, message: "Unauthorized: user not found" });

    let records: CaseRecord[] = [];

    // JSON upload
    if (req.is("application/json")) {
      if (!Array.isArray(req.body)) throw new APIError({ status: 400, message: "JSON body must be an array" });
      records = req.body;
    }

    if (req.file) {
      const fileBuffer = req.file.buffer;
      if (!fileBuffer) {
        throw new APIError({ status: 400, message: "Uploaded file is empty or invalid" });
      }

      await new Promise<void>((resolve, reject) => {
        parseString(fileBuffer.toString(), { headers: true })
          .on("error", reject)
          .on("data", (row: CaseRecord) => records.push(row))
          .on("end", () => resolve());
      });
    }
    if (records.length === 0) throw new APIError({ status: 400, message: "No records found" });

    await bulkInsertCases(records, userId);

    return res.sendJson(200, `Successfully ingested ${records.length} cases.`);
  } catch (err) {
    next(err);
  }
};

export const getCase = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { assigned_to } = req.query;
    const loggedInUser = req.user!;

    // Only admin can fetch other users' cases
    let agentId: number;

    if (assigned_to) {
      if (loggedInUser?.role !== "admin") {
        throw new APIError({ status: 403, message: "Forbidden: only admins can view other users' cases" });
      }
      agentId = parseInt(assigned_to as string, 10);
      if (isNaN(agentId)) {
        throw new APIError({ status: 400, message: "Invalid assigned_to parameter" });
      }
    } else {
      // Normal user fetches their own cases
      agentId = loggedInUser.id;
    }

    const cases = await CASES_PROCESSED.findAll({
      where: { assigned_to: agentId, isDeleted: false },
      order: [["createdAt", "DESC"]],
    });

    return res.sendJson(200, `Fetched ${cases.length} case(s)`, { cases });
  } catch (err: any) {
    next(err);
  }
};

export const updateCase = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();

  try {
    const caseId = parseInt(req.params.case_id!, 10);
    const currentUser = req.user!;
    if (isNaN(caseId)) throw new APIError({ status: 400, message: "Invalid case_id parameter" });

    const { status, comment } = req.body as UpdateStatusBody;

    if (!status) throw new APIError({ status: 400, message: "Status is required" });

    const caseItem = await CASES_PROCESSED.findOne({ where: { id: caseId, isDeleted: false }, transaction });
    if (!caseItem) throw new APIError({ status: 404, message: "Case not found" });

    // Optional: Only assigned agent or admin can update
    if (currentUser.role !== "admin" && caseItem.assigned_to !== currentUser.id) {
      throw new APIError({ status: 403, message: "Forbidden: you cannot update this case" });
    }

    // Record status change history
    await CASE_STATUS_HISTORY.create(
      {
        case_id: caseItem.dataValues.id,
        old_status: caseItem.dataValues.status || "Pending",
        new_status: status,
        changed_by: currentUser.id,
        comment: comment ?? `Changed status from ${caseItem.dataValues.status} to ${status}`
      },
      { transaction }
    );

    // Update case status
    await caseItem.update({ status }, { transaction });

    await transaction.commit();

    return res.sendJson(200, "Case status updated successfully", { case: caseItem });
  } catch (error: any) {
    await transaction.rollback();
    next(error);
  }
};