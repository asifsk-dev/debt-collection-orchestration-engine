import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('CASE_STATUS_HISTORY', {
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
    old_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    new_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    changed_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: 'USERS', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
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
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('CASE_STATUS_HISTORY');
}
