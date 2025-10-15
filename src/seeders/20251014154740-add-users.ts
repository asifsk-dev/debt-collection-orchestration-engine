'use strict';

import { QueryInterface } from 'sequelize';
import bcrypt from 'bcryptjs';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    const passwordHash = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('USERS', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Call Center Agent',
        email: 'callcenter@example.com',
        password: passwordHash,
        role: 'call_center_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field Agent',
        email: 'field@example.com',
        password: passwordHash,
        role: 'field_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Legal Team Member',
        email: 'legal@example.com',
        password: passwordHash,
        role: 'legal_team',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Call Center Agent 1',
        email: 'callcenter1@example.com',
        password: passwordHash,
        role: 'call_center_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Call Center Agent 2',
        email: 'callcenter2@example.com',
        password: passwordHash,
        role: 'call_center_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Call Center Agent 3',
        email: 'callcenter3@example.com',
        password: passwordHash,
        role: 'call_center_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field Agent 1',
        email: 'field1@example.com',
        password: passwordHash,
        role: 'field_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field Agent 2',
        email: 'field2@example.com',
        password: passwordHash,
        role: 'field_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Field Agent 3',
        email: 'field3@example.com',
        password: passwordHash,
        role: 'field_agent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Legal Team Member 1',
        email: 'legal1@example.com',
        password: passwordHash,
        role: 'legal_team',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Legal Team Member 2',
        email: 'legal2@example.com',
        password: passwordHash,
        role: 'legal_team',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Legal Team Member 3',
        email: 'legal3@example.com',
        password: passwordHash,
        role: 'legal_team',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('USERS', {
      email: [
        'admin@example.com',
        'callcenter@example.com',
        'field@example.com',
        'legal@example.com',
      ],
    });
  },
};
