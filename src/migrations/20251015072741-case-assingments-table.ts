import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('CASE_ASSIGNMENTS', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    case_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: 'CASES_PROCESSED', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    assigned_to: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: 'USERS', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    assigned_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: 'USERS', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('CASE_ASSIGNMENTS');
}
