import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CASES_PROCESSED, CASES_PROCESSEDId } from './CASES_PROCESSED';
import type { USERS, USERSId } from './USERS';

export interface CASE_STATUS_HISTORYAttributes {
  id: number;
  case_id: number;
  old_status: string;
  new_status: string;
  changed_by: number;
  comment?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export type CASE_STATUS_HISTORYPk = "id";
export type CASE_STATUS_HISTORYId = CASE_STATUS_HISTORY[CASE_STATUS_HISTORYPk];
export type CASE_STATUS_HISTORYOptionalAttributes = "id" | "comment" | "createdAt";
export type CASE_STATUS_HISTORYCreationAttributes = Optional<CASE_STATUS_HISTORYAttributes, CASE_STATUS_HISTORYOptionalAttributes>;

export class CASE_STATUS_HISTORY extends Model<CASE_STATUS_HISTORYAttributes, CASE_STATUS_HISTORYCreationAttributes> implements CASE_STATUS_HISTORYAttributes {
  id!: number;
  case_id!: number;
  old_status!: string;
  new_status!: string;
  changed_by!: number;
  comment?: string;
  createdAt!: Date;
  updateAt!: Date;

  // CASE_STATUS_HISTORY belongsTo CASES_PROCESSED via case_id
  case!: CASES_PROCESSED;
  getCase!: Sequelize.BelongsToGetAssociationMixin<CASES_PROCESSED>;
  setCase!: Sequelize.BelongsToSetAssociationMixin<CASES_PROCESSED, CASES_PROCESSEDId>;
  createCase!: Sequelize.BelongsToCreateAssociationMixin<CASES_PROCESSED>;
  // CASE_STATUS_HISTORY belongsTo USERS via changed_by
  changed_by_USER!: USERS;
  getChanged_by_USER!: Sequelize.BelongsToGetAssociationMixin<USERS>;
  setChanged_by_USER!: Sequelize.BelongsToSetAssociationMixin<USERS, USERSId>;
  createChanged_by_USER!: Sequelize.BelongsToCreateAssociationMixin<USERS>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CASE_STATUS_HISTORY {
    return CASE_STATUS_HISTORY.init({
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
    old_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    new_status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    changed_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'USERS',
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CASE_STATUS_HISTORY',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "CASE_STATUS_HISTORY_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
