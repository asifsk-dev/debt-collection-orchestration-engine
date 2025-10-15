import type { Sequelize } from "sequelize";
import { CASES_PROCESSED as _CASES_PROCESSED } from "./CASES_PROCESSED";
import type { CASES_PROCESSEDAttributes, CASES_PROCESSEDCreationAttributes } from "./CASES_PROCESSED";
import { CASES_RAW as _CASES_RAW } from "./CASES_RAW";
import type { CASES_RAWAttributes, CASES_RAWCreationAttributes } from "./CASES_RAW";
import { CASE_ASSIGNMENTS as _CASE_ASSIGNMENTS } from "./CASE_ASSIGNMENTS";
import type { CASE_ASSIGNMENTSAttributes, CASE_ASSIGNMENTSCreationAttributes } from "./CASE_ASSIGNMENTS";
import { CASE_STATUS_HISTORY as _CASE_STATUS_HISTORY } from "./CASE_STATUS_HISTORY";
import type { CASE_STATUS_HISTORYAttributes, CASE_STATUS_HISTORYCreationAttributes } from "./CASE_STATUS_HISTORY";
import { USERS as _USERS } from "../models/USERS";
import type { USERSAttributes, USERSCreationAttributes } from "../models/USERS";

export {
  _CASES_PROCESSED as CASES_PROCESSED,
  _CASES_RAW as CASES_RAW,
  _CASE_ASSIGNMENTS as CASE_ASSIGNMENTS,
  _CASE_STATUS_HISTORY as CASE_STATUS_HISTORY,
  _USERS as USERS,
};

export type {
  CASES_PROCESSEDAttributes,
  CASES_PROCESSEDCreationAttributes,
  CASES_RAWAttributes,
  CASES_RAWCreationAttributes,
  CASE_ASSIGNMENTSAttributes,
  CASE_ASSIGNMENTSCreationAttributes,
  CASE_STATUS_HISTORYAttributes,
  CASE_STATUS_HISTORYCreationAttributes,
  USERSAttributes,
  USERSCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const CASES_PROCESSED = _CASES_PROCESSED.initModel(sequelize);
  const CASES_RAW = _CASES_RAW.initModel(sequelize);
  const CASE_ASSIGNMENTS = _CASE_ASSIGNMENTS.initModel(sequelize);
  const CASE_STATUS_HISTORY = _CASE_STATUS_HISTORY.initModel(sequelize);
  const USERS = _USERS.initModel(sequelize);

  CASE_ASSIGNMENTS.belongsTo(CASES_PROCESSED, { as: "case", foreignKey: "case_id" });
  CASES_PROCESSED.hasMany(CASE_ASSIGNMENTS, { as: "CASE_ASSIGNMENTs", foreignKey: "case_id" });
  CASE_STATUS_HISTORY.belongsTo(CASES_PROCESSED, { as: "case", foreignKey: "case_id" });
  CASES_PROCESSED.hasMany(CASE_STATUS_HISTORY, { as: "CASE_STATUS_HISTORies", foreignKey: "case_id" });
  CASES_PROCESSED.belongsTo(USERS, { as: "assigned_to_USER", foreignKey: "assigned_to" });
  USERS.hasMany(CASES_PROCESSED, { as: "CASES_PROCESSEDs", foreignKey: "assigned_to" });
  CASES_RAW.belongsTo(USERS, { as: "created_by_USER", foreignKey: "created_by" });
  USERS.hasMany(CASES_RAW, { as: "CASES_RAWs", foreignKey: "created_by" });
  CASE_ASSIGNMENTS.belongsTo(USERS, { as: "assigned_by_USER", foreignKey: "assigned_by" });
  USERS.hasMany(CASE_ASSIGNMENTS, { as: "CASE_ASSIGNMENTs", foreignKey: "assigned_by" });
  CASE_ASSIGNMENTS.belongsTo(USERS, { as: "assigned_to_USER", foreignKey: "assigned_to" });
  USERS.hasMany(CASE_ASSIGNMENTS, { as: "assigned_to_CASE_ASSIGNMENTs", foreignKey: "assigned_to" });
  CASE_STATUS_HISTORY.belongsTo(USERS, { as: "changed_by_USER", foreignKey: "changed_by" });
  USERS.hasMany(CASE_STATUS_HISTORY, { as: "CASE_STATUS_HISTORies", foreignKey: "changed_by" });

  return {
    CASES_PROCESSED: CASES_PROCESSED,
    CASES_RAW: CASES_RAW,
    CASE_ASSIGNMENTS: CASE_ASSIGNMENTS,
    CASE_STATUS_HISTORY: CASE_STATUS_HISTORY,
    USERS: USERS,
  };
}