# GymTracker Backend

This is the backend for GymTracker. It handles the part of the app that users do not see directly: authentication, secure login, and workout storage.

The server is built with Node.js and Express, and it talks to PostgreSQL to keep everything organized.

## What the backend does

Right now, the backend can:

- register a new user
- log a user in securely
- issue a JWT token after login
- protect private routes with that token
- create and save workouts
- read a list of workouts
- filter workouts by muscle group
- view one workout
- update a workout
- delete a workout

## Main parts

- `server.js` starts the API and connects the routes
- `routes/auth.js` handles account creation and login
- `middleware/auth.js` checks the JWT token
- `routes/workouts.js` handles workout CRUD operations
- `config/database.js` connects the app to PostgreSQL

## How to run it locally

From the backend folder:

```bash
npm install
npm run dev
```

The API will run on port 5000 by default.

## API overview

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Workouts
- `POST /api/workouts`
- `GET /api/workouts`
- `GET /api/workouts?muscle_group=legs`
- `GET /api/workouts/:id`
- `PUT /api/workouts/:id`
- `DELETE /api/workouts/:id`

## Notes

The backend expects a PostgreSQL database and a JWT secret in the environment file. This keeps configuration simple and makes the app easier to move between machines.
