# Phase 2: Database Schema Design

## What You Need to Build

When setting up the database, think about what data matters for the app:

### Users Table
Users need to register and login. So you need:
- Unique ID for each user
- Email (unique, for login)
- Password (hashed with bcrypt, never plain text)
- Timestamps (created_at, updated_at)

Why `VARCHAR` for email? Because we need to validate email format but database should just store the string.
Why `TEXT` for password? Hash outputs are long (~60 chars for bcrypt).
Why `TIMESTAMPTZ`? Shows when user joined, helps with user analytics.

```
users
├── id (serial PRIMARY KEY)
├── email (varchar UNIQUE NOT NULL)
├── password_hash (text NOT NULL)
├── created_at (timestamptz DEFAULT now())
└── updated_at (timestamptz DEFAULT now())
```

### Workouts Table
Users track exercises. Each workout needs:
- Unique ID
- Which user owns it (foreign key to users.id)
- What exercise (name like "Bench Press")
- Muscle group targeted (chest, back, legs, etc.)
- How much weight used
- How many reps
- When they did it

Why foreign key? Prevents orphan data - if a user is deleted, their workouts are too.
Why `DECIMAL(10,2)`? Weight could be 155.5 lbs or 50.25 kg - decimals matter.
Why `timestampz`? Track when they worked out, enables filtering by date.

```
workouts
├── id (serial PRIMARY KEY)
├── user_id (integer FOREIGN KEY → users.id)
├── exercise_name (varchar NOT NULL)
├── muscle_group (varchar NOT NULL)
├── weight (decimal NOT NULL)
├── reps (integer NOT NULL)
├── workout_date (timestamptz NOT NULL)
├── created_at (timestamptz DEFAULT now())
└── updated_at (timestamptz DEFAULT now())
```

## Why These Choices?

- **Primary Keys (id)**: Every table needs unique identifiers for relationships
- **Foreign Keys (user_id)**: Link workouts to users. Database enforces integrity
- **NOT NULL**: Core fields can't be empty (what's a workout with no exercise?)
- **UNIQUE (email)**: Prevents duplicate accounts
- **DEFAULT now()**: Automatically timestamps records
- **DECIMAL vs INT**: Weight needs decimals, reps are whole numbers

## Your Task

You need to create:

1. **File**: `backend/config/database.js` 
   - PostgreSQL connection pool configuration
   - This connects Node.js to your database

2. **File**: `backend/db/schema.sql`
   - SQL script to create both tables
   - Run this once to initialize database

3. **File**: `backend/db/init.sql` (optional but good practice)
   - Seed data for testing
   - A test user and a few workout entries

## Next Steps

1. Install PostgreSQL locally if you don't have it
2. Create a database called `gymtracker`
3. Create the files mentioned above
4. Run the SQL scripts to create tables
5. Test connection from Node.js
6. Commit everything

Ask me when you're ready and I'll review your code before we commit!
