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

// GET /api/workouts/:id - get single workout (must belong to user)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = parseInt(req.params.id, 10);

    const found = await db.query('SELECT * FROM workouts WHERE id = $1', [workoutId]);
    if (found.rows.length === 0) return res.status(404).json({ error: 'Workout not found' });

    const workout = found.rows[0];
    if (workout.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

    return res.json({ workout });
  } catch (err) {
    console.error('Get workout error:', err);
    return res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// PUT /api/workouts/:id - update workout (must belong to user)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = parseInt(req.params.id, 10);
    const { exercise_name, muscle_group, reps, weight, workout_date } = req.body;

    const found = await db.query('SELECT * FROM workouts WHERE id = $1', [workoutId]);
    if (found.rows.length === 0) return res.status(404).json({ error: 'Workout not found' });
    const workout = found.rows[0];
    if (workout.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

    // Build dynamic update
    const fields = [];
    const values = [];
    let idx = 1;
    if (exercise_name !== undefined) { fields.push(`exercise_name = $${idx++}`); values.push(exercise_name); }
    if (muscle_group !== undefined) { fields.push(`muscle_group = $${idx++}`); values.push(muscle_group); }
    if (weight !== undefined) { fields.push(`weight = $${idx++}`); values.push(weight); }
    if (reps !== undefined) { fields.push(`reps = $${idx++}`); values.push(reps); }
    if (workout_date !== undefined) { fields.push(`workout_date = $${idx++}`); values.push(workout_date); }

    if (fields.length === 0) return res.status(400).json({ error: 'No fields to update' });

    const sql = `UPDATE workouts SET ${fields.join(', ')} , updated_at = NOW() WHERE id = $${idx} RETURNING id, user_id, exercise_name, muscle_group, weight, reps, workout_date, updated_at`;
    values.push(workoutId);

    const result = await db.query(sql, values);
    return res.json({ workout: result.rows[0] });
  } catch (err) {
    console.error('Update workout error:', err);
    return res.status(500).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id - delete workout (must belong to user)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const workoutId = parseInt(req.params.id, 10);

    const found = await db.query('SELECT * FROM workouts WHERE id = $1', [workoutId]);
    if (found.rows.length === 0) return res.status(404).json({ error: 'Workout not found' });
    const workout = found.rows[0];
    if (workout.user_id !== userId) return res.status(403).json({ error: 'Forbidden' });

    await db.query('DELETE FROM workouts WHERE id = $1', [workoutId]);
    return res.status(204).send();
  } catch (err) {
    console.error('Delete workout error:', err);
    return res.status(500).json({ error: 'Failed to delete workout' });
  }
});