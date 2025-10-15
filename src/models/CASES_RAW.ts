import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { USERS, USERSId } from './USERS';

export interface CASES_RAWAttributes {
  id: number;
  case_id: string;
  bank_code: string;
  borrower_name: string;
  loan_amount: number;
  due_amount: number;
  days_past_due: number;
  priority: string;
  region: string;
  raw_json?: object;
  created_by?: number;
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CASES_RAWPk = "id";
export type CASES_RAWId = CASES_RAW[CASES_RAWPk];
export type CASES_RAWOptionalAttributes = "id" | "raw_json" | "created_by" | "isDeleted" | "deletedAt" | "createdAt" | "updatedAt";
export type CASES_RAWCreationAttributes = Optional<CASES_RAWAttributes, CASES_RAWOptionalAttributes>;

export class CASES_RAW extends Model<CASES_RAWAttributes, CASES_RAWCreationAttributes> implements CASES_RAWAttributes {
  id!: number;
  case_id!: string;
  bank_code!: string;
  borrower_name!: string;
  loan_amount!: number;
  due_amount!: number;
  days_past_due!: number;
  priority!: string;
  region!: string;
  raw_json?: object;
  created_by?: number;
  isDeleted?: boolean;
  deletedAt?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  // CASES_RAW belongsTo USERS via created_by
  created_by_USER!: USERS;
  getCreated_by_USER!: Sequelize.BelongsToGetAssociationMixin<USERS>;
  setCreated_by_USER!: Sequelize.BelongsToSetAssociationMixin<USERS, USERSId>;
  createCreated_by_USER!: Sequelize.BelongsToCreateAssociationMixin<USERS>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CASES_RAW {
    return CASES_RAW.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    case_id: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    raw_json: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'USERS',
        key: 'id'
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'CASES_RAW',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "CASES_RAW_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "IDX_cases_raw_case_id",
        fields: [
          { name: "case_id" },
        ]
      },
    ]
  });
  }
}
