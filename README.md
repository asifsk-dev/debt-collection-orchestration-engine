# Debt Collection Orchestration Engine

## Overview

This project is a **Debt Collection Orchestration Engine** built with **Node.js, Express, TypeScript, and PostgreSQL**. It manages financial cases, assigns them to agents dynamically based on business rules, and provides analytics for monitoring collection progress.

---

## Table of Contents

- [Tech Stack](#tech-stack)  
- [Setup](#setup)  
- [Database](#database)  
- [API Endpoints](#api-endpoints)  
- [Design Decisions](#design-decisions)

---

## Tech Stack

- **Backend:** Node.js, Express, TypeScript  
- **Database:** PostgreSQL, Sequelize ORM  
- **Authentication:** JWT  
- **File Upload:** Multer  
- **CSV Parsing:** `fast-csv`  
- **Task Management:** Role-based case assignment  
- **Deployment:** AWS EC2 (optional)

---

## Setup

### Prerequisites

- Node.js v18+  
- PostgreSQL v13+  
- npm or yarn  

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd debt-collection-orchestration-engine

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Update DB credentials, JWT secret, etc.

# Create DB and Run Migration
npm run db:create
npm run db:migrate

# Seed Initial Data
npm run db:seeders

# Start the server
npm run dev

## Server & Swagger

### Server
The server runs at:

http://localhost:<PORT>
Replace `<PORT>` with the port defined in your `.env` file.

### Swagger UI
Swagger UI is available at:
http://localhost:<PORT>/api-docs

- View all API endpoints.
- See request and response examples.
- Test API calls directly from the browser.

## Database

### Models

- **USERS**: Stores agents, admins, and their roles.  
- **CASES_RAW**: Stores raw uploaded case data.  
- **CASES_PROCESSED**: Stores normalized cases with assignment & status.  
- **CASE_ASSIGNMENTS**: Stores case-to-agent assignments.  
- **CASE_STATUS_HISTORY**: Tracks case status changes over time.  

### Relationships

- `CASES_PROCESSED` → `CASE_ASSIGNMENTS` (1:N)  
- `CASES_PROCESSED` → `CASE_STATUS_HISTORY` (1:N)  
- `CASE_ASSIGNMENTS` → `USERS` (assigned_to & assigned_by)  

## API Endpoints

### Auth
- **POST** `/auth/login` → Login & return JWT

### Cases
- **POST** `/cases/upload` → Upload JSON or CSV cases
- **GET** `/cases` → Get all cases or filter by `assigned_to`
- **PATCH** `/cases/:case_id/update-status` → Update status of a case

### Assignment
- **POST** `/cases/assign` → Assign unassigned cases to agents based on `days_past_due`

### Analytics
- **GET** `/analytics/summary` → Returns:
  - Total cases by status
  - Average resolution time
  - Case count per team
  - Total due amount recovered

### Postman Collection
The Postman collection for testing all API endpoints is available at:

`./src/docs/DCOE.postman_collection.json`


## Design Decisions

- **Express + TypeScript:** Provides strong typing and enables faster, safer development.
- **Sequelize ORM:** Offers database abstraction, migrations, and easier model management.
- **Raw + Processed tables:** Maintains both raw uploads and normalized cases for auditing and tracking.
- **Round-robin assignment:** Ensures simple and fair distribution of cases among agents.
- **CSV & JSON ingestion:** Supports flexible input formats for case uploads.
- **APIError utility:** Provides consistent and centralized error handling across all endpoints.