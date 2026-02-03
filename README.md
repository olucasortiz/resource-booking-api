# Resource Booking API

Backend API for managing reservations of shared resources (rooms, equipment, courts),
focused on data consistency, clean architecture and real-world backend practices.

## 🎯 Project Goals
- Build a production-oriented backend project
- Prevent double booking using proper business rules and transactions
- Apply clean architecture with clear separation of concerns
- Use PostgreSQL + Prisma with real migrations
- Prepare the application for cloud deployment

## 🧠 Business Rules (MVP)
- A resource can have multiple reservations
- Reservations have a start and end time
- Only one CONFIRMED reservation can exist for the same resource in an overlapping time range
- Reservations can be canceled but not deleted
- All dates are stored in UTC

## 🛠️ Tech Stack
- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Prisma ORM
- Zod (request validation)
- Swagger / OpenAPI
- Docker (local development)

## 🗂️ Architecture
The project follows a layered architecture:

- Routes → HTTP layer
- Controllers → Request/response handling
- Services → Business rules and transactions
- Repositories → Data access (Prisma)
- Shared → Errors, utilities, configs

## 📦 Main Entities
- User
- Resource
- Booking

## 🚀 Running Locally

### Prerequisites
- Node.js >= XX
- Docker & Docker Compose

### Steps
```bash
git clone https://github.com/your-username/resource-booking-api
cd resource-booking-api
cp .env.example .env
docker-compose up -d
npm install
npx prisma migrate dev
npm run dev
📄 API Documentation
Swagger will be available at:

bash
Copiar código
http://localhost:3333/docs
☁️ Deployment   
The application is prepared to be deployed using a managed PostgreSQL database
(Render).

Migrations are executed during deployment using Prisma CLI.

📌 Notes
This project was designed with learning and portfolio purposes in mind,
prioritizing real-world backend practices over unnecessary complexity.