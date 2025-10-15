import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId } from './CASE_ASSIGNMENTS';
import type { CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId } from './CASE_STATUS_HISTORY';
import type { USERS, USERSId } from './USERS';

export interface CASES_PROCESSEDAttributes {
  id: number;
  case_id: string;
  bank_code: string;
  borrower_name: string;
  loan_amount: number;
  due_amount: number;
  days_past_due: number;
  priority: string;
  region: string;
  assigned_to?: number;
  status?: "Pending" | "In Progress" | "Resolved" | "Escalated";
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CASES_PROCESSEDPk = "id";
export type CASES_PROCESSEDId = CASES_PROCESSED[CASES_PROCESSEDPk];
export type CASES_PROCESSEDOptionalAttributes = "id" | "assigned_to" | "status" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt";
export type CASES_PROCESSEDCreationAttributes = Optional<CASES_PROCESSEDAttributes, CASES_PROCESSEDOptionalAttributes>;

export class CASES_PROCESSED extends Model<CASES_PROCESSEDAttributes, CASES_PROCESSEDCreationAttributes> implements CASES_PROCESSEDAttributes {
  id!: number;
  case_id!: string;
  bank_code!: string;
  borrower_name!: string;
  loan_amount!: number;
  due_amount!: number;
  days_past_due!: number;
  priority!: string;
  region!: string;
  assigned_to?: number;
  status?: "Pending" | "In Progress" | "Resolved" | "Escalated";
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  // CASES_PROCESSED hasMany CASE_ASSIGNMENTS via case_id
  CASE_ASSIGNMENTs!: CASE_ASSIGNMENTS[];
  getCASE_ASSIGNMENTs!: Sequelize.HasManyGetAssociationsMixin<CASE_ASSIGNMENTS>;
  setCASE_ASSIGNMENTs!: Sequelize.HasManySetAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  addCASE_ASSIGNMENT!: Sequelize.HasManyAddAssociationMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  addCASE_ASSIGNMENTs!: Sequelize.HasManyAddAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  createCASE_ASSIGNMENT!: Sequelize.HasManyCreateAssociationMixin<CASE_ASSIGNMENTS>;
  removeCASE_ASSIGNMENT!: Sequelize.HasManyRemoveAssociationMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  removeCASE_ASSIGNMENTs!: Sequelize.HasManyRemoveAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  hasCASE_ASSIGNMENT!: Sequelize.HasManyHasAssociationMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  hasCASE_ASSIGNMENTs!: Sequelize.HasManyHasAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  countCASE_ASSIGNMENTs!: Sequelize.HasManyCountAssociationsMixin;
  // CASES_PROCESSED hasMany CASE_STATUS_HISTORY via case_id
  CASE_STATUS_HISTORies!: CASE_STATUS_HISTORY[];
  getCASE_STATUS_HISTORies!: Sequelize.HasManyGetAssociationsMixin<CASE_STATUS_HISTORY>;
  setCASE_STATUS_HISTORies!: Sequelize.HasManySetAssociationsMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  addCASE_STATUS_HISTORy!: Sequelize.HasManyAddAssociationMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  addCASE_STATUS_HISTORies!: Sequelize.HasManyAddAssociationsMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  createCASE_STATUS_HISTORy!: Sequelize.HasManyCreateAssociationMixin<CASE_STATUS_HISTORY>;
  removeCASE_STATUS_HISTORy!: Sequelize.HasManyRemoveAssociationMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  removeCASE_STATUS_HISTORies!: Sequelize.HasManyRemoveAssociationsMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  hasCASE_STATUS_HISTORy!: Sequelize.HasManyHasAssociationMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  hasCASE_STATUS_HISTORies!: Sequelize.HasManyHasAssociationsMixin<CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId>;
  countCASE_STATUS_HISTORies!: Sequelize.HasManyCountAssociationsMixin;
  // CASES_PROCESSED belongsTo USERS via assigned_to
  assigned_to_USER!: USERS;
  getAssigned_to_USER!: Sequelize.BelongsToGetAssociationMixin<USERS>;
  setAssigned_to_USER!: Sequelize.BelongsToSetAssociationMixin<USERS, USERSId>;
  createAssigned_to_USER!: Sequelize.BelongsToCreateAssociationMixin<USERS>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CASES_PROCESSED {
    return CASES_PROCESSED.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    case_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "CASES_PROCESSED_case_id_key"
    },
    bank_code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    borrower_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    loan_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    due_amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    days_past_due: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    assigned_to: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'USERS',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM("Pending","In Progress","Resolved","Escalated"),
      allowNull: true,
      defaultValue: "Pending"
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'CASES_PROCESSED',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "CASES_PROCESSED_case_id_key",
        unique: true,
        fields: [
          { name: "case_id" },
        ]
      },
      {
        name: "CASES_PROCESSED_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IDX_cases_processed_case_id",
        fields: [
          { name: "case_id" },
        ]
      },
    ]
  });
  }
}
