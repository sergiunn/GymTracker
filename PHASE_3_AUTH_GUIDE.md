# Phase 3: JWT Authentication - Learning Guide

## What You're Building

JWT (JSON Web Token) authentication is how you'll handle login/register. Here's the flow:

### Registration Flow
```
User submits email + password
       ↓
Server hashes password with bcrypt
       ↓
Save user to database (email + hashed password)
       ↓
Return success message
```

### Login Flow
```
User submits email + password
       ↓
Find user in database by email
       ↓
Compare submitted password with stored hash (bcrypt)
       ↓
If match: Create JWT token
       ↓
Return JWT to client
```

### Protected Routes
```
Client sends JWT in request header
       ↓
Server middleware verifies JWT signature
       ↓
If valid: Allow request to continue
       ↓
If invalid: Return 401 Unauthorized
```

---

## Key Concepts

### **Bcrypt** (Password Hashing)
- Converts plain text password into a hash (one-way encryption)
- Example: `password123` → `$2b$10$YIjlL5ZF5e/Ckh8DL...` (60 chars)
- **Why?** Even if database is stolen, passwords are unreadable
- Compare: `bcrypt.compare(submittedPassword, storedHash)` returns true/false

### **JWT Token**
- A signed string with 3 parts separated by dots:
  ```
  header.payload.signature
  ```
- Example payload contains: `{ userId: 1, email: "john@example.com", exp: 1234567 }`
- Only server knows the SECRET to create/verify tokens
- Expires automatically (we use 24h in .env)
- Can't be tampered with (signature prevents that)

### **Middleware**
- Functions that run before your route handler
- Can check JWT before allowing access to protected routes
- Extracts userId from token so you know which user is making request

---

## What You Need to Build

### **File 1: `backend/routes/auth.js`**
- `POST /api/auth/register` - Create new user account
  - Body: `{ email, password }`
  - Hash password with bcrypt
  - Save to database
  - Return success

- `POST /api/auth/login` - User login
  - Body: `{ email, password }`
  - Find user by email
  - Compare password with bcrypt
  - If match: Create JWT and return it
  - If no match: Return 401 error

### **File 2: `backend/middleware/auth.js`**
- `verifyToken` middleware
- Extracts JWT from request header
- Verifies signature using JWT_SECRET
- If valid: attach userId to request
- If invalid: return 401 error

### **File 3: Update `backend/server.js`**
- Import auth routes
- Mount them: `app.use('/api/auth', authRoutes);`
- Mount middleware on protected routes (we'll do this in Phase 4)

---

## Implementation Steps (You'll Do These)

1. Install dependencies (bcrypt, jsonwebtoken) via npm
2. Create auth.js route file with register and login endpoints
3. Create auth middleware to verify tokens
4. Test with Postman:
   - Register new user → should save to DB
   - Login with that user → should return JWT token
   - Test protected route with/without token

---

## Interview Talking Points

When you present this:
- "I used bcrypt to securely hash passwords so they're never stored in plain text"
- "JWT tokens are stateless - no need for server-side sessions"
- "The middleware verifies the token before allowing access to protected routes"
- "24 hour expiration means tokens become invalid after 24 hours for security"

---

## Ready?

Tell me when you're ready to start Phase 3 and I'll guide you through creating these files!
