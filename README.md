# 📚 NestJS Microservices Bookstore

This repository is the **microservices-based evolution** of the [NestJS User Project](https://github.com/Asyaberk/nestjs-user-project). It transforms the monolithic user-management system into a **fully distributed bookstore application** with Kafka event streaming, Redis caching, PostgreSQL persistence, and a modular NestJS architecture.

---

## 🚀 Overview

The system is designed around **domain-driven microservices**, each responsible for a clear business capability:

- **API Gateway** (port `3010`): Entry point, routes all requests to services, handles JWT/cookie forwarding.
- **Books Service** (port `3020`): Manages book records (create, update, delete).
- **Library Service** (port `3030`): Handles rentals, returns, and repository listings.
- **Users Service** (port `3040`): User entity persistence and retrieval.
- **Roles Service** (port `3050`): Role definitions and assignment.
- **Auth Service** (port `3060`): Registration, login, logout, JWT issuing & validation.

Supporting infrastructure:
- **PostgreSQL** (DB persistence)
- **pgAdmin** (DB UI)
- **Redis** (caching)
- **Kafka** (event-driven communication)

---

## 🛠 Features

- ✅ **Authentication & Authorization**: Secure JWT-based auth with cookies.
- ✅ **Role Management**: Admin vs. User permissions.
- ✅ **Book Management**: CRUD operations on books.
- ✅ **Library Rentals**: Rent and return flows.
- ✅ **Event-Driven Design**: Kafka producers/consumers publish & listen to events.
- ✅ **Caching Layer**: Redis integration for optimized performance.
- ✅ **Centralized Gateway**: Uniform API for clients with Swagger docs.

---

## 🏗 Architecture

```
                        ┌─────────────────┐
                        │   API Gateway   │
                        │  (3010)         │
                        └───▲───────┬─────┘
                            │       │
   ┌──────────────┐ ┌───────┴───────┴────────┐ ┌─────────────┐
   │ Books (3020) │ │ Library (3030)         │ │  Auth (3060)│
   │ Book CRUD    │ │ Rentals, Returns, Repo │ │ JWT, Login  │
   └──────────────┘ └───────────────▲────────┘ └─────▲───────┘
                                    │                │
                             ┌──────┴───────┐ ┌──────┴───────┐
                             │ Users (3040) │ │ Roles (3050) │
                             │ User Data    │ │ Role Mgmt    │
                             └──────────────┘ └──────────────┘
```

- **Kafka** connects all services for events (`user_registered`, `user_logged_in`, `user_logged_out`, `book_rented`, etc.).
- **Redis** is plugged in at the gateway level.
- **Postgres** stores persistent state.

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Asyaberk/nestjs-microservices-bookstore.git
cd nestjs-microservices-bookstore
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file at the root (adjust values if needed):
```env
API_GATEWAY_PORT=3010
BOOKS_PORT=3020
LIBRARY_PORT=3030
USERS_PORT=3040
ROLES_PORT=3050
AUTH_PORT=3060
JWT_SECRET=cat

DB_HOST=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_DATABASE=

PGADMIN_EMAIL=admin@admin.com
PGADMIN_PASSWORD=123
PGADMIN_HOST_PORT=5050
PGADMIN_CONTAINER_PORT=80

REDIS_PORT=6379
REDIS_HOST=redis
REDIS_URL=redis://redis:6379

KAFKA_BROKERS=localhost:9092
KAFKA_TOPIC=topic-test
```

### 4. Start Services
Run all services in dev mode:
```bash
npm run start:dev
```

This concurrently launches **gateway + all microservices**.

### 5. Access Swagger Docs
- **Gateway Swagger** → [http://localhost:3010/api](http://localhost:3010/api)
- Each microservice also exposes its own Swagger.
- 📄 You can also check the bundled [Swagger_UI.pdf](./Swagger_UI.pdf) located in the project root for an offline view.

---

## 🔑 Example Flows

- **Register** → `/auth/register` (gateway forwards to Auth service).
- **Login** → `/auth/login` (JWT cookie issued at gateway).
- **WhoAmI** → `/auth/whoami` (gateway forwards with JWT).
- **Create Book** → `/books/create` (requires Admin).
- **Rent Book** → `/library/rent` (produces Kafka event).
- **Return Book** → `/library/return/:bookId`.

---

## 🔗 Related Repository

This repo extends **[nestjs-user-project](https://github.com/Asyaberk/nestjs-user-project)** — the monolithic version. The current project shows how the same system can evolve into **distributed microservices with Kafka and Redis**.

---

## 📌 Notes

- This project shows **how to migrate a monolith to a microservices architecture** with Kafka.
- If you want to see the **original monolith project**, check here → [nestjs-user-project](https://github.com/Asyaberk/nestjs-user-project).
- For **Docker setup (Postgres, Redis, Kafka, pgAdmin)**, see the instructions in the original repo. This repo focuses on the microservices codebase.
- Built with **NestJS v10+**
- Event streaming powered by **KafkaJS**
- Database persistence: **PostgreSQL**
- Authentication: **JWT with cookie storage**
- Dockerization possible (Postgres, Redis, Kafka, pgAdmin)

---

## 👩‍💻 Author
Developed by **Asya Berk** as part of exploring **NestJS, Kafka, and microservices architecture**.
