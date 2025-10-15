import { Op } from "sequelize";
import { sequelize } from "../models";
import models from "../models";
import { APIError } from "../utils/APIError";

const { CASES_PROCESSED, CASE_ASSIGNMENTS, USERS } = models;

/**
 * Assignment Engine Service
 * 
 * Based on business rules, assigns each case to:
 * - Call Center Agent
 * - Field Agent
 * - Legal Team
 * 
 * Rules:
 * - days_past_due <= 30 → Call Center
 * - days_past_due > 30 && <= 90 → Field Agent
 * - days_past_due > 90 → Legal Team
 */

type Role = "call_center_agent" | "field_agent" | "legal_team";

export const assignCasesService = async (assignedByUserId: number) => {
  const transaction = await sequelize.transaction();

  try {
    const unassignedCases = await CASES_PROCESSED.findAll({
      where: {
        assigned_to: { [Op.is]: null as any },
        isDeleted: false,
      },
      transaction,
    });

    if (unassignedCases.length === 0) {
      throw new APIError({ status: 404, message: "No unassigned cases found." });
    }

    const allUsers = await USERS.findAll({ where: { isDeleted: false }, raw: true });
    const roleGroups: Record<Role, InstanceType<typeof USERS>[]> = {
      call_center_agent: allUsers.filter(u => u.role === "call_center_agent"),
      field_agent: allUsers.filter(u => u.role === "field_agent"),
      legal_team: allUsers.filter(u => u.role === "legal_team"),
    };

    const roundRobin = (() => {
      const counters: Record<Role, number> = {
        call_center_agent: 0,
        field_agent: 0,
        legal_team: 0,
      };

      return (role: Role) => {
        const agents = roleGroups[role];
        if (!agents || agents.length === 0) {
          throw new APIError({
            status: 400,
            message: `No users available for role: ${role}`,
          });
        }

        const agent = agents[counters[role] % agents.length];
        counters[role]++;
        return agent;
      };
    })();

    const assignmentRecords: any[] = [];

    for (const caseItem of unassignedCases) {
      let role: keyof typeof roleGroups;

      if (caseItem.dataValues.days_past_due <= 30) role = "call_center_agent";
      else if (caseItem.dataValues.days_past_due <= 90) role = "field_agent";
      else role = "legal_team";

      const agent = roundRobin(role);

      if (!agent) {
        throw new APIError({ status: 400, message: `No available agent for role: ${role}` });
      }

      await caseItem.update({ assigned_to: agent.id, status: "In Progress" }, { transaction });

      assignmentRecords.push({
        case_id: caseItem.dataValues.id,
        assigned_to: agent.id,
        assigned_by: assignedByUserId,
      });
    }

    await CASE_ASSIGNMENTS.bulkCreate(assignmentRecords, { transaction });

    await transaction.commit();

    return {
      message: `Successfully assigned ${assignmentRecords.length} cases.`,
      total_assigned: assignmentRecords.length,
    };
  } catch (error) {
    await transaction.rollback();
    throw new APIError({
      status: 500,
      message: error instanceof Error ? error.message : "Case assignment failed",
    });
  }
};
