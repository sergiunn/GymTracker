const express = require('express');
const db = require('../config/database');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// POST /api/workouts
router.post('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { exercise_name, muscle_group, reps, weight = 0, workout_date } = req.body;

    // Basic validation
    if (!exercise_name || !muscle_group || typeof reps === 'undefined') {
      return res.status(400).json({ error: 'exercise_name, muscle_group and reps are required' });
    }

    const queryText = `
      INSERT INTO workouts (user_id, exercise_name, muscle_group, weight, reps, workout_date)
      VALUES ($1, $2, $3, $4, $5, COALESCE($6, NOW()))
      RETURNING id, user_id, exercise_name, muscle_group, weight, reps, workout_date, created_at
    `;
    const values = [userId, exercise_name, muscle_group, weight, reps, workout_date];

    const result = await db.query(queryText, values);
    return res.status(201).json({ workout: result.rows[0] });
  } catch (err) {
    console.error('Create workout error:', err);
    return res.status(500).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts?muscle_group=chest
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { muscle_group } = req.query;

    let sql = `
      SELECT id, user_id, exercise_name, muscle_group, weight, reps, workout_date, created_at
      FROM workouts
      WHERE user_id = $1
    `;
    const params = [userId];

    if (muscle_group) {
      params.push(muscle_group);
      sql += ` AND muscle_group = $${params.length}`;
    }

    sql += ' ORDER BY workout_date DESC';

    const result = await db.query(sql, params);
    return res.json({ workouts: result.rows });
  } catch (err) {
    console.error('List workouts error:', err);
    return res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

module.exports = router;