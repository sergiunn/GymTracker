# Phase 3: Building JWT Authentication - Step by Step

## Understanding the Problem

Right now your Express server has NO way to:
- Let users create accounts (register)
- Let users login with email/password
- Prevent unauthorized access to workouts

Phase 3 solves this.

---

## Step 1: Install Dependencies

You need two libraries:
- **bcrypt** - Hashes passwords securely
- **jsonwebtoken** - Creates and verifies JWT tokens

Both are in your package.json already. Just run:
```bash
npm install
```

They'll be installed in node_modules.

---

## Step 2: Understanding Bcrypt

### What it does:
```javascript
const bcrypt = require('bcrypt');

// Hashing a password
const plainPassword = "user123";
const hashedPassword = await bcrypt.hash(plainPassword, 10);
// Result: "$2b$10$YIjlL5ZF5e/Ckh8DLZ5.AOZ0A8F/pSxzkRFv/q0RvKqrDZcw/H5K2"

// Comparing password on login
const isMatch = await bcrypt.compare("user123", hashedPassword);
// Result: true (passwords match)

const isMatch2 = await bcrypt.compare("wrongpassword", hashedPassword);
// Result: false (passwords don't match)
```

**Key:** bcrypt takes time (salting), which makes it hard to hack via brute force.

---

## Step 3: Understanding JWT

### What it does:
```javascript
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Creating a token (during login)
const token = jwt.sign(
  { userId: 1, email: "john@example.com" },  // Payload (data)
  secret,                                      // Secret (only server knows)
  { expiresIn: "24h" }                        // Options
);
// Result: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTY4MzAwMDAwMCwiZXhwIjoxNjgzMDg2NDAwfQ.x3nK..."

// Verifying a token (middleware checks it)
const decoded = jwt.verify(token, secret);
// Result: { userId: 1, email: "john@example.com", iat: 1683000000, exp: 1683086400 }
// iat = issued at, exp = expires at

// If token is invalid or expired:
jwt.verify("invalid.token.here", secret);
// Throws error (catch it and return 401)
```

---

## Step 4: File Structure You'll Create

```
backend/
├── routes/
│   └── auth.js           ← Register and login endpoints
├── middleware/
│   └── auth.js           ← Verify JWT token
└── server.js             ← Updated to use auth routes
```

---

## Step 5: Create `backend/routes/auth.js`

This file needs TWO route handlers:

### Handler 1: `POST /api/auth/register`

**Input:** Body with `{ email, password }`

**What it should do:**
1. Validate input (email and password provided?)
2. Check if user already exists (query database)
   - If exists: return 400 error "User already registered"
   - If not: continue
3. Hash the password with bcrypt
4. Insert new user into database
   ```sql
   INSERT INTO users (email, password_hash) VALUES ($1, $2)
   ```
5. Return 201 status with success message (don't return password!)

**Error cases to handle:**
- Missing email or password
- User already exists
- Database error

---

### Handler 2: `POST /api/auth/login`

**Input:** Body with `{ email, password }`

**What it should do:**
1. Validate input
2. Find user by email
   ```sql
   SELECT * FROM users WHERE email = $1
   ```
3. If user not found: return 401 "Invalid credentials"
4. If user found: compare submitted password with stored hash using bcrypt
   ```javascript
   const isValid = await bcrypt.compare(submittedPassword, user.password_hash);
   ```
5. If password doesn't match: return 401 "Invalid credentials"
6. If password matches:
   - Create JWT token with userId
   - Return 200 with token
   ```javascript
   const token = jwt.sign(
     { userId: user.id },
     process.env.JWT_SECRET,
     { expiresIn: process.env.JWT_EXPIRY }
   );
   ```

**Error cases:**
- Missing email or password
- User not found
- Password doesn't match
- Database error

---

## Step 6: Create `backend/middleware/auth.js`

This middleware protects routes. It runs BEFORE your route handler.

**What it should do:**
1. Get the token from request header
   - Typically sent as: `Authorization: Bearer <token>`
   - Extract: `const token = req.headers.authorization?.split(' ')[1]`
2. If no token: return 401 "No token provided"
3. Try to verify token:
   ```javascript
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   ```
4. If verification fails (invalid/expired): return 401 "Invalid token"
5. If verification succeeds:
   - Attach userId to request: `req.userId = decoded.userId`
   - Call `next()` to let the route handler run
6. Export this as a function so server.js can use it

**Example usage in server.js:**
```javascript
const verifyToken = require('./middleware/auth');

// This route REQUIRES a valid token
app.get('/api/protected', verifyToken, (req, res) => {
  // req.userId is now available
  res.json({ userId: req.userId });
});
```

---

## Step 7: Update `backend/server.js`

1. Import the auth routes:
   ```javascript
   const authRoutes = require('./routes/auth');
   ```

2. Mount the routes (add before error handlers):
   ```javascript
   app.use('/api/auth', authRoutes);
   ```

This creates:
- `POST /api/auth/register`
- `POST /api/auth/login`

---

## Step 8: Testing Your Code

Use **Postman** or `curl` to test:

### Test 1: Register
```
POST http://localhost:5000/api/auth/register
Body: {
  "email": "alice@example.com",
  "password": "mypassword123"
}
```
Expected: 201 Created

### Test 2: Register same email again
```
POST http://localhost:5000/api/auth/register
Body: {
  "email": "alice@example.com",
  "password": "different"
}
```
Expected: 400 "User already registered"

### Test 3: Login
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "alice@example.com",
  "password": "mypassword123"
}
```
Expected: 200 with JWT token like: `{ "token": "eyJhbGciOiJIUzI1..." }`

### Test 4: Login with wrong password
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "alice@example.com",
  "password": "wrongpassword"
}
```
Expected: 401 "Invalid credentials"

---

## Summary of Your Task

1. **Create** `backend/routes/auth.js` with register and login endpoints
2. **Create** `backend/middleware/auth.js` with token verification
3. **Update** `backend/server.js` to include auth routes
4. **Test** with Postman to verify everything works
5. **Tell me** when done, I'll review and we'll commit!

---

## Tips

- Use `try/catch` blocks for database queries
- Always hash passwords - never store plain text
- Return 401 for auth failures, 400 for validation failures
- Check error handling - "Invalid credentials" for both user not found AND wrong password (security: don't reveal which)
- Use `req.body` for JSON input
- Use `process.env.JWT_SECRET` from .env

Good luck! Ask questions anytime. 🚀
