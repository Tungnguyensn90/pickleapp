const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'picklematch_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection established');

    // Drop existing tables in reverse order (due to foreign key constraints)
    try {
      await connection.execute('DROP TABLE IF EXISTS user_sessions');
      console.log('✅ Dropped user_sessions table');
    } catch (error) {
      console.log('ℹ️ user_sessions table does not exist or could not be dropped');
    }

    try {
      await connection.execute('DROP TABLE IF EXISTS users');
      console.log('✅ Dropped users table');
    } catch (error) {
      console.log('ℹ️ users table does not exist or could not be dropped');
    }

    // Create users table first
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        avatar VARCHAR(500),
        date_of_birth DATE,
        location VARCHAR(200),
        player_rank VARCHAR(50) DEFAULT 'Beginner',
        elo INT DEFAULT 1000,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createUsersTable);
    console.log('✅ Users table created/verified');

    // Create user_sessions table for JWT token management
    const createUserSessionsTable = `
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(500) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    await connection.execute(createUserSessionsTable);
    console.log('✅ User sessions table created/verified');

    console.log('✅ Database tables initialized successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

module.exports = {
  pool,
  testConnection,
  initDatabase
}; 