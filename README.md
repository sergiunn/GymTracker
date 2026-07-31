# GymTracker

GymTracker is a simple fitness app for keeping track of workouts. The idea is straightforward: a user can sign up, log in, and save their training sessions in one place.

The project is being built in small steps so it stays easy to understand. The backend handles authentication and workout data, while the frontend will eventually provide a clean interface for interacting with it.

## What the app does

At this stage, the app already supports:

- user registration and login
- secure password handling
- JWT-based authentication
- creating workouts
- listing workouts
- filtering workouts by muscle group
- viewing a single workout
- updating a workout
- deleting a workout

This gives the app a solid foundation for a personal training tracker.

## Project structure

```text
GymTracker/
├── backend/          # API server built with Node.js and Express
├── frontend/         # React app that will connect to the API
└── README.md         # Project overview
```

## Tech stack

- React for the frontend
- Node.js and Express for the API
- PostgreSQL for storing users and workouts
- JWT for protecting private routes
- bcrypt for securely hashing passwords

## How it works

The app is split into two main parts:

1. Backend
   - handles login and registration
   - protects private routes with tokens
   - stores workout information in PostgreSQL

2. Frontend
   - will let users sign in, create workouts, and view their history

## Current backend features

The backend currently supports:

- `POST /api/auth/register` to create an account
- `POST /api/auth/login` to sign in and receive a token
- `GET /api/auth/me` to verify the current user from a token
- `POST /api/workouts` to create a workout
- `GET /api/workouts` to list workouts
- `GET /api/workouts?muscle_group=...` to filter workouts by muscle group
- `GET /api/workouts/:id` to view one workout
- `PUT /api/workouts/:id` to update a workout
- `DELETE /api/workouts/:id` to delete a workout

## Development phases

The project has been built step by step:

1. Phase 1 — project setup
2. Phase 2 — PostgreSQL database and tables
3. Phase 3 — login, registration, and JWT authentication
4. Phase 4 — workout CRUD API with protected routes
5. Phase 5 — frontend setup
6. Phase 6 — frontend and backend integration
7. Phase 7 — polishing, testing, and deployment prep

## What this project is meant to teach

This project is a good way to learn how a full-stack app is put together:

- how a frontend talks to an API
- how authentication works in practice
- how protected routes behave
- how a database stores real application data
- how to structure a project in a way that is easier to grow later

## Getting started

If you want to run the backend locally:

```bash
cd backend
npm install
npm run dev
```

If you want to run the frontend later:

```bash
cd frontend
npm install
npm run dev
```

## Environment notes

The backend expects database and JWT settings in its environment file. The frontend will later use its own environment configuration for connecting to the API.

## License

MIT
