// db.js

const mysql = require('mysql');
const util = require('util');

class MySQLDatabase {
  constructor(config) {
    this.pool = mysql.createPool(config);
    this.query = util.promisify(this.pool.query).bind(this.pool);
  }

  async connect() {
    try {
      // Use a simple query to test the connection
      await this.query('SELECT 1');
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      throw error;
    }
  }

  async close() {
    try {
      await this.pool.end();
      console.log('Database connection closed');
    } catch (error) {
      console.error('Error closing the database connection:', error.message);
      throw error;
    }
  }

  async createSchema() {
    try {
      // Create a simple schema with a 'users' table
      await this.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL
        )
      `);
      console.log('Schema created or already exists');
    } catch (error) {
      console.error('Error creating schema:', error.message);
      throw error;
    }
  }
}

module.exports = MySQLDatabase;
