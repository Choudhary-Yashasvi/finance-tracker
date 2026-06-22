# Finance & Expense Tracker — Full Stack

A modern, interactive expense tracking application with React frontend, Express backend, MongoDB database, and user authentication.

## 🚀 Quick Start (Docker)

Fastest way to run everything locally:

```bash
# Start server + MongoDB with Docker Compose
docker-compose up --build

# In another terminal, start the React dev server
cd client
npm install
npm run dev
```

Server runs on `http://localhost:4000`  
Client runs on `http://localhost:5173`

## 📋 Manual Setup (Node.js)

### Prerequisites
- Node.js 18+ and npm
- MongoDB running locally (or use Docker for Mongo only)

### Backend Setup

```bash
cd server

# Copy environment template
copy .env.example .env

# Edit .env and set:
# - MONGO_URI=mongodb://localhost:27017/finance_tracker
# - JWT_SECRET=your_random_secret_key
notepad .env

# Install and run
npm install
npm run dev
```

Server listens on `http://localhost:4000` by default.

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Client listens on `http://localhost:5173` by default.

## 🏗️ Project Structure

```
finance-tracker/
├── server/                 # Express API
│   ├── index.js           # Main server entry
│   ├── models/            # Mongoose models (User, Expense)
│   ├── routes/            # API routes (/auth, /expenses)
│   ├── middleware/        # Auth middleware (JWT)
│   ├── package.json       # Server dependencies
│   ├── .env.example       # Environment template
│   └── Dockerfile         # Container for server
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # Dashboard, Login, Register
│   │   ├── components/    # ExpenseForm, ExpenseList
│   │   ├── App.jsx        # Main app routing
│   │   ├── styles.css     # Global styles
│   │   └── api.js         # Axios HTTP client
│   ├── index.html         # HTML entry
│   ├── vite.config.js     # Vite config
│   └── package.json       # Client dependencies
├── docker-compose.yml     # Docker services (Mongo + Server)
└── README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Sign in and get JWT token

### Expenses (require Bearer token)
- `GET /api/expenses` — List all expenses for current user
- `POST /api/expenses` — Create new expense
- `PUT /api/expenses/:id` — Update expense
- `DELETE /api/expenses/:id` — Delete expense

### Example Request
```bash
curl -X GET http://localhost:4000/api/expenses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎨 Features

- **Interactive UI** with glassmorphism, spring animations, and smooth transitions
- **Chart.js doughnut chart** for spending breakdown by category
- **Demo mode** (localStorage) works without backend
- **Server sync** ready — connect to backend when token available
- **Fully responsive** design for mobile, tablet, desktop
- **JWT authentication** with bcrypt password hashing
- **MongoDB persistence** for user accounts and expenses

## 🔧 Environment Variables

### Server (.env)
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/finance_tracker
JWT_SECRET=your_random_secret_here_min_32_chars
```

### Client
Client connects to `http://localhost:4000/api` by default (see `src/api.js`).

## 📦 Production Build

### Frontend
```bash
cd client
npm run build
npm run preview
```

Generates optimized bundle in `dist/`.

### Server
```bash
cd server
npm start
```

Or use `docker-compose up --build` with production env vars.

## 🐛 Troubleshooting

### Node not found in PowerShell
Allow scripts temporarily:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm install
npm run dev
```

Or use Command Prompt instead:
```cmd
cd C:\Users\blitz\finance-tracker\client
npm install
npm run dev
```

### MongoDB connection refused
Ensure MongoDB is running:
```bash
# Docker
docker run --name ft-mongo -p 27017:27017 -d mongo:6

# Or use docker-compose
docker-compose up mongo
```

### CORS errors
Client is configured to connect to `http://localhost:4000`. Ensure server is running and CORS is enabled in `server/index.js`.

## 📝 License

MIT
