# Finance Tracker - Server

Backend API using Node.js, Express and MongoDB (Mongoose).

## Setup

1. Copy `.env.example` to `.env` and set values (MONGO_URI, JWT_SECRET)

2. Install dependencies:

```powershell
cd server
npm install
```

3. Run in development:

```powershell
npm run dev
```

Server runs on `http://localhost:4000` by default.

## API endpoints

- `POST /api/auth/register` { name, email, password }
- `POST /api/auth/login` { email, password }
- `GET /api/expenses` (auth)
- `POST /api/expenses` (auth)
- `PUT /api/expenses/:id` (auth)
- `DELETE /api/expenses/:id` (auth)

Auth: Bearer token in `Authorization` header.
