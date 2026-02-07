# Resource Booking API

Backend API for managing reservations of shared resources (rooms, equipment, courts),
designed with a strong focus on **data consistency**, **clean architecture** and
**real-world backend practices**.

This project was built for **learning and portfolio purposes**, prioritizing
production-oriented decisions over unnecessary complexity.

---

## ✅ Live
- **API (Render):** https://resource-booking-api-r1cp.onrender.com  
- **Swagger (OpenAPI):** https://resource-booking-api-r1cp.onrender.com/docs

> Most endpoints require an API key header: `x-api-key`.

---

## 🎯 Project Goals
- Build a production-oriented backend API
- Prevent double booking using **business rules and database transactions**
- Apply clean architecture with clear separation of concerns
- Use PostgreSQL + Prisma with real migrations
- Prepare the application for cloud deployment

---

## 🧠 Business Rules (MVP)
- A resource can have multiple bookings
- Bookings have `startAt` and `endAt`
- Only one **CONFIRMED** booking can exist for the same resource in an overlapping time range
- Bookings can be canceled but **not deleted** (`CONFIRMED → CANCELED`)
- All dates are stored in **UTC**

### Overlapping rule
A booking conflicts when:
- `startAt < existingEndAt` **AND**
- `endAt > existingStartAt`

---

## 🧩 Key Technical Decisions
- **Transactional booking creation**: conflict check and booking creation run inside a Prisma
  `$transaction`, preventing double bookings under concurrent requests.
- **Layered architecture**:
  - Routes → HTTP layer
  - Controllers → request/response handling
  - Services → business rules and transactions
  - Repositories → Prisma data access
- **Defense in depth validation**:
  - Zod validates request input (body/params)
  - Services enforce business rules
  - Prisma/PostgreSQL ensure persistence and integrity
- **Soft-cancel strategy**: bookings are never deleted, preserving history and auditability.
- **UTC-first approach**: all dates are handled in ISO 8601 (UTC).
- **API Key protection**: endpoints are protected by `x-api-key` (except `/health` and `/docs`).

---

## 🛠️ Tech Stack
- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Prisma ORM
- Zod (request validation)
- Swagger / OpenAPI
- Docker (local development)

---

## 📦 Main Entities
- User
- Resource
- Booking

---

## 🗂️ Architecture
src/
modules/
user/
routes/
controllers/
services/
repositories/
schemas/
resource/
routes/
controllers/
services/
repositories/
schemas/
booking/
routes/
controllers/
services/
repositories/
schemas/
shared/
infra/


---

## 🔐 Authentication (API Key)
All endpoints (except `/health` and `/docs`) require:

**Header**
x-api-key: <API_KEY>


---

## 🚀 Running Locally

### Prerequisites
- Node.js >= 18
- Docker & Docker Compose

### Steps
```bash
git clone https://github.com/olucasortiz/resource-booking-api
cd resource-booking-api
cp .env.example .env
docker-compose up -d
npm install
npx prisma migrate dev
npm run dev

Environment variables
Example .env:
Create a `.env` file based on `.env.example`:

```env
PORT=3333
DATABASE_URL=your_postgres_connection_string
API_KEY=your_api_key
NODE_ENV=development
📄 API Documentation (Swagger)
Swagger UI:

Local: http://localhost:3333/docs

Production: https://resource-booking-api-r1cp.onrender.com/docs

📌 Endpoints (Summary)
Health

GET /health

Users

POST /users

GET /users

Resources

POST /resources

GET /resources

Bookings

POST /bookings

GET /bookings

GET /bookings/:id

PATCH /bookings/:id/cancel

🧪 Manual Testing (recommended flow)
Create a user

Create a resource

Create a booking

Try creating another booking with an overlapping time range → should return 409 Conflict

Cancel the booking

Create a booking for the same time range again → should succeed

☁️ Deployment
This API is deployed on Render using a managed PostgreSQL database.

Migrations are executed during deployment using:

npx prisma migrate deploy
📌 Notes
This project was designed for learning and portfolio presentation, focusing on
real-world backend concerns such as concurrency, data integrity and clean design.