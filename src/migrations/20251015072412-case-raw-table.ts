import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('CASES_RAW', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    case_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bank_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    borrower_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loan_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    due_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    days_past_due: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    raw_json: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: 'USERS', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deletedAt: {
      type: DataTypes.DATE,
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

  await queryInterface.addIndex('CASES_RAW', ['case_id'], { name: 'IDX_cases_raw_case_id' });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('CASES_RAW');
}