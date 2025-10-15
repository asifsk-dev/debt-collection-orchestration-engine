import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CASES_PROCESSED, CASES_PROCESSEDId } from './CASES_PROCESSED';
import type { CASES_RAW, CASES_RAWId } from './CASES_RAW';
import type { CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId } from './CASE_ASSIGNMENTS';
import type { CASE_STATUS_HISTORY, CASE_STATUS_HISTORYId } from './CASE_STATUS_HISTORY';

export interface USERSAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type USERSPk = "id";
export type USERSId = USERS[USERSPk];
export type USERSOptionalAttributes = "id" | "isDeleted" | "createdAt" | "updatedAt" | "deletedAt";
export type USERSCreationAttributes = Optional<USERSAttributes, USERSOptionalAttributes>;

export class USERS extends Model<USERSAttributes, USERSCreationAttributes> implements USERSAttributes {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  isDeleted?: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // USERS hasMany CASES_PROCESSED via assigned_to
  CASES_PROCESSEDs!: CASES_PROCESSED[];
  getCASES_PROCESSEDs!: Sequelize.HasManyGetAssociationsMixin<CASES_PROCESSED>;
  setCASES_PROCESSEDs!: Sequelize.HasManySetAssociationsMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  addCASES_PROCESSED!: Sequelize.HasManyAddAssociationMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  addCASES_PROCESSEDs!: Sequelize.HasManyAddAssociationsMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  createCASES_PROCESSED!: Sequelize.HasManyCreateAssociationMixin<CASES_PROCESSED>;
  removeCASES_PROCESSED!: Sequelize.HasManyRemoveAssociationMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  removeCASES_PROCESSEDs!: Sequelize.HasManyRemoveAssociationsMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  hasCASES_PROCESSED!: Sequelize.HasManyHasAssociationMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  hasCASES_PROCESSEDs!: Sequelize.HasManyHasAssociationsMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  countCASES_PROCESSEDs!: Sequelize.HasManyCountAssociationsMixin;
  // USERS hasMany CASES_RAW via created_by
  CASES_RAWs!: CASES_RAW[];
  getCASES_RAWs!: Sequelize.HasManyGetAssociationsMixin<CASES_RAW>;
  setCASES_RAWs!: Sequelize.HasManySetAssociationsMixin<CASES_RAW, CASES_RAWId>;
  addCASES_RAW!: Sequelize.HasManyAddAssociationMixin<CASES_RAW, CASES_RAWId>;
  addCASES_RAWs!: Sequelize.HasManyAddAssociationsMixin<CASES_RAW, CASES_RAWId>;
  createCASES_RAW!: Sequelize.HasManyCreateAssociationMixin<CASES_RAW>;
  removeCASES_RAW!: Sequelize.HasManyRemoveAssociationMixin<CASES_RAW, CASES_RAWId>;
  removeCASES_RAWs!: Sequelize.HasManyRemoveAssociationsMixin<CASES_RAW, CASES_RAWId>;
  hasCASES_RAW!: Sequelize.HasManyHasAssociationMixin<CASES_RAW, CASES_RAWId>;
  hasCASES_RAWs!: Sequelize.HasManyHasAssociationsMixin<CASES_RAW, CASES_RAWId>;
  countCASES_RAWs!: Sequelize.HasManyCountAssociationsMixin;
  // USERS hasMany CASE_ASSIGNMENTS via assigned_by
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
  // USERS hasMany CASE_ASSIGNMENTS via assigned_to
  assigned_to_CASE_ASSIGNMENTs!: CASE_ASSIGNMENTS[];
  getAssigned_to_CASE_ASSIGNMENTs!: Sequelize.HasManyGetAssociationsMixin<CASE_ASSIGNMENTS>;
  setAssigned_to_CASE_ASSIGNMENTs!: Sequelize.HasManySetAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  addAssigned_to_CASE_ASSIGNMENT!: Sequelize.HasManyAddAssociationMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  addAssigned_to_CASE_ASSIGNMENTs!: Sequelize.HasManyAddAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  createAssigned_to_CASE_ASSIGNMENT!: Sequelize.HasManyCreateAssociationMixin<CASE_ASSIGNMENTS>;
  removeAssigned_to_CASE_ASSIGNMENT!: Sequelize.HasManyRemoveAssociationMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  removeAssigned_to_CASE_ASSIGNMENTs!: Sequelize.HasManyRemoveAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  hasAssigned_to_CASE_ASSIGNMENT!: Sequelize.HasManyHasAssociationMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  hasAssigned_to_CASE_ASSIGNMENTs!: Sequelize.HasManyHasAssociationsMixin<CASE_ASSIGNMENTS, CASE_ASSIGNMENTSId>;
  countAssigned_to_CASE_ASSIGNMENTs!: Sequelize.HasManyCountAssociationsMixin;
  // USERS hasMany CASE_STATUS_HISTORY via changed_by
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

  static initModel(sequelize: Sequelize.Sequelize): typeof USERS {
    return USERS.init({
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "USERS_email_key"
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'USERS',
      schema: 'public',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "USERS_email_key",
          unique: true,
          fields: [
            { name: "email" },
          ]
        },
        {
          name: "USERS_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
  }
}
