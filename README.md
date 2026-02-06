# Resource Booking API
This frontend consumes the Resource Booking API:
https://resource-booking-api-r1cp.onrender.com

Backend API for managing reservations of shared resources (rooms, equipment, courts),
designed with a strong focus on **data consistency**, **clean architecture** and
**real-world backend practices**.

This project was built for **learning and portfolio purposes**, prioritizing
production-oriented decisions over unnecessary complexity.

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
└─ modules/
├─ user/
├─ resource/
└─ booking/
├─ routes
├─ controllers
├─ services
├─ repositories
└─ schemas


---

## 🚀 Running Locally

### Prerequisites
- Node.js >= 18
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
Swagger UI is available at:

http://localhost:3333/docs
🧪 Manual Testing
You can test the API using Swagger UI or an API client (Insomnia/Postman).

Recommended flow:

Create a user

Create a resource

Create a booking

Try creating another booking with an overlapping time range
→ should return a conflict

Cancel the booking

Create a booking for the same time range again
→ should succeed (only CONFIRMED bookings block)

☁️ Deployment
The application is prepared to be deployed using a managed PostgreSQL database
(e.g. Render).

Prisma migrations are executed during deployment using:

npx prisma migrate deploy
📌 Notes
This project was designed for learning and portfolio presentation, focusing on
real-world backend concerns such as concurrency, data integrity and clean design.