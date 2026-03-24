# GymTracker Backend

Express.js REST API for GymTracker application with JWT authentication and PostgreSQL.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL credentials

### Running the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on the port specified in `.env` (default: 5000)

## Endpoints Structure

- **Authentication**: `/api/auth/register`, `/api/auth/login`
- **Workouts**: `/api/workouts` (CRUD operations)
- **Users**: `/api/users/profile`

## Next Steps

Phase 2 will set up the PostgreSQL database schema and connection pool.
