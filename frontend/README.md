# GymTracker Frontend

The frontend is the part of the app people interact with. It will eventually let users sign up, log in, create workouts, and see their history in a simple dashboard.

Right now, the project is still in the early stages of that setup. The backend is already in place, and the frontend will be built around it.

## What the frontend will do

The planned frontend experience includes:

- a login page
- a signup page
- a page to create workouts
- a page to view and filter existing workouts
- a way to edit or delete workouts
- a simple layout that feels clean and easy to use

## Setup

From the frontend folder:

```bash
npm install
npm run dev
```

The dev server will usually start on port 5173.

## Planned structure

The frontend will be organized around a few simple folders:

- pages for screens like login and dashboard
- components for reused UI pieces
- services for talking to the backend API
- styles for the visual layout

## Notes

The frontend will connect to the backend over HTTP and use the JWT token returned after login. That makes it possible to keep workout data private to each account.
