import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CASES_PROCESSED, CASES_PROCESSEDId } from './CASES_PROCESSED';
import type { USERS, USERSId } from './USERS';

export interface CASE_ASSIGNMENTSAttributes {
  id: number;
  case_id: number;
  assigned_to: number;
  assigned_by: number;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  deletedAt?: Date;
}

export type CASE_ASSIGNMENTSPk = "id";
export type CASE_ASSIGNMENTSId = CASE_ASSIGNMENTS[CASE_ASSIGNMENTSPk];
export type CASE_ASSIGNMENTSOptionalAttributes = "id" | "createdAt" | "updatedAt" | "isDeleted" | "deletedAt";
export type CASE_ASSIGNMENTSCreationAttributes = Optional<CASE_ASSIGNMENTSAttributes, CASE_ASSIGNMENTSOptionalAttributes>;

export class CASE_ASSIGNMENTS extends Model<CASE_ASSIGNMENTSAttributes, CASE_ASSIGNMENTSCreationAttributes> implements CASE_ASSIGNMENTSAttributes {
  id!: number;
  case_id!: number;
  assigned_to!: number;
  assigned_by!: number;
  createdAt!: Date;
  updatedAt!: Date;
  isDeleted?: boolean;
  deletedAt?: Date;

  // CASE_ASSIGNMENTS belongsTo CASES_PROCESSED via case_id
  case!: CASES_PROCESSED;
  getCase!: Sequelize.BelongsToGetAssociationMixin<CASES_PROCESSED>;
  setCase!: Sequelize.BelongsToSetAssociationMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  createCase!: Sequelize.BelongsToCreateAssociationMixin<CASES_PROCESSED>;
  // CASE_ASSIGNMENTS belongsTo USERS via assigned_by
  assigned_by_USER!: USERS;
  getAssigned_by_USER!: Sequelize.BelongsToGetAssociationMixin<USERS>;
  setAssigned_by_USER!: Sequelize.BelongsToSetAssociationMixin<USERS, USERSId>;
  createAssigned_by_USER!: Sequelize.BelongsToCreateAssociationMixin<USERS>;
  // CASE_ASSIGNMENTS belongsTo USERS via assigned_to
  assigned_to_USER!: USERS;
  getAssigned_to_USER!: Sequelize.BelongsToGetAssociationMixin<USERS>;
  setAssigned_to_USER!: Sequelize.BelongsToSetAssociationMixin<USERS, USERSId>;
  createAssigned_to_USER!: Sequelize.BelongsToCreateAssociationMixin<USERS>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CASE_ASSIGNMENTS {
    return CASE_ASSIGNMENTS.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    case_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'CASES_PROCESSED',
        key: 'id'
      }
    },
    assigned_to: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'USERS',
        key: 'id'
      }
    },
    assigned_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
    tableName: 'CASE_ASSIGNMENTS',
    schema: 'public',
    timestamps: true,
    paranoid: false,
    indexes: [
      {
        name: "CASE_ASSIGNMENTS_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
