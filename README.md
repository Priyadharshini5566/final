# Peer Project Hub

A professional full-stack student project-sharing platform built for the EMC Final Assessment.

## Stack
- Frontend: React + Vite + React Router + Axios + Bootstrap
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: Firebase Authentication + Firebase Admin
- Deployment: Vercel (client) + Render (server)

## Features
### Required MVP
- Firebase signup/login/logout
- Protected routes
- Create, read, update and delete your own projects
- Project feed, newest first
- Project details
- Authenticated comments
- Responsive UI
- REST API and error handling

### Professional extras
- Search
- Tag filtering
- Pagination
- Favorites
- Likes/upvotes
- 1–5 star ratings
- User profile
- Loading/error/empty states

## Project structure
```text
peer-project-hub/
├── client/
└── server/
```

## Local setup

### 1. Frontend
```bash
cd client
npm install
npm run dev
```

### 2. Backend
Open another terminal:
```bash
cd server
npm install
npm run dev
```

### 3. Environment files
Copy:
- `client/.env.example` -> `client/.env`
- `server/.env.example` -> `server/.env`

Fill in MongoDB and Firebase values before running.

## Important
Never commit `.env` files or Firebase Admin private keys.
