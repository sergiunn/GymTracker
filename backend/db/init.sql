-- Test data for development and testing

-- Insert test users
-- Password: password123 (hashed with bcrypt - we'll do this in Phase 3)
INSERT INTO users (email, password_hash, created_at, updated_at) VALUES
('john@example.com', '$2b$10$YIjlL5ZF5e/Ckh8DLZ5.AOZ0A8F/pSxzkRFv/q0RvKqrDZcw/H5K2', NOW(), NOW()),
('jane@example.com', '$2b$10$YIjlL5ZF5e/Ckh8DLZ5.AOZ0A8F/pSxzkRFv/q0RvKqrDZcw/H5K2', NOW(), NOW());

-- Insert sample workouts for john@example.com (user_id = 1)
INSERT INTO workouts (user_id, exercise_name, muscle_group, weight, reps, workout_date, created_at, updated_at) VALUES
(1, 'Bench Press', 'chest', 185.5, 8, NOW() - INTERVAL '2 days', NOW(), NOW()),
(1, 'Squats', 'legs', 225.0, 10, NOW() - INTERVAL '1 day', NOW(), NOW()),
(1, 'Deadlift', 'back', 315.0, 5, NOW(), NOW(), NOW());

-- Insert sample workouts for jane@example.com (user_id = 2)
INSERT INTO workouts (user_id, exercise_name, muscle_group, weight, reps, workout_date, created_at, updated_at) VALUES
(2, 'Pull-ups', 'back', 0, 12, NOW() - INTERVAL '3 days', NOW(), NOW()),
(2, 'Dumbbells', 'shoulders', 35.0, 12, NOW(), NOW(), NOW());
