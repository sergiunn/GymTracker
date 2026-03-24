# GymTracker - Full Stack Fitness App

A modern web application for tracking gym workouts built with **React**, **Express.js**, **Node.js**, and **PostgreSQL**.

## Features

✅ User Authentication (JWT-based)
✅ Workout CRUD Operations (Create, Read, Update, Delete)
✅ Filter Workouts by Muscle Group
✅ REST API Architecture
✅ Secure Password Hashing
✅ Protected Routes & Endpoints

## Project Structure

```
GymTracker/
├── backend/          # Express.js API server
│   ├── package.json
│   ├── server.js
│   └── README.md
├── frontend/         # React frontend application
│   ├── package.json
│   └── README.md
└── README.md         # This file
```

## Prerequisites

- **Node.js** v14+
- **npm** or **yarn**
- **PostgreSQL** v12+

## Quick Start

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your PostgreSQL credentials
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Development Phases

This project is built in distinct phases, each with clean git commits demonstrating version control knowledge:

1. **Phase 1** ✓ - Project Setup (current)
2. **Phase 2** - Database Schema & PostgreSQL Connection
3. **Phase 3** - JWT Authentication System
4. **Phase 4** - Workout CRUD REST APIs
5. **Phase 5** - React Frontend Scaffolding
6. **Phase 6** - Frontend-Backend Integration
7. **Phase 7** - Testing & Deployment Prep

## Learning Objectives

By building this project step-by-step, you'll understand:

- **Frontend**: React hooks, routing, state management, API integration
- **Backend**: Express middleware, request validation, error handling
- **Database**: PostgreSQL queries, relational data models
- **Authentication**: JWT tokens, password hashing with bcrypt
- **DevOps**: Environment variables, CORS, error handling
- **Version Control**: Atomic commits, branch strategy, meaningful messages

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Workouts
- `GET /api/workouts` - List all workouts (with filters)
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

## Environment Variables

See `.env.example` files in `backend/` and `frontend/` directories.

## License

MIT
