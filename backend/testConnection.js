console.log('Starting connection test...');

const db = require('./config/database');

console.log('Database module loaded');

db.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Connected to database!');
  console.log('Current time:', result.rows[0]);
  
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      process.exit(1);
    }
    
    console.log(`✅ Found ${result.rows.length} users`);
    
    db.query('SELECT * FROM workouts', (err, result) => {
      if (err) {
        console.error('Error fetching workouts:', err.message);
        process.exit(1);
      }
      
      console.log(`✅ Found ${result.rows.length} workouts`);
      console.log('All tests passed!');
      process.exit(0);
    });
  });
});