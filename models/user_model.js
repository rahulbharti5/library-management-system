// userModel.js
const util = require('util');

class UserModel {
  constructor(database) {
    this.database = database;
    this.query = util.promisify(database.query).bind(database);
  }

  async createUser(username, hashed_password) {
    try {
      const result = await this.query('INSERT INTO users (username, hashed_password) VALUES (?, ?)', [username, hashed_password]);
      
      const [user] = await this.query('SELECT * FROM users WHERE id = ?', [result.insertId]);

      return user;
      
    } catch (error) {
      console.error('Error creating user:', error.message);
      return;
    }
  }

   async getUserByUserName(username) {
    try {
      const [user] = await this.query('SELECT * FROM users WHERE username = ?', [username]);
      console.log(user)
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error.message);
      //throw error;
      return;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.query('SELECT * FROM users');
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error.message);
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      await this.query('UPDATE users SET ? WHERE id = ?', [newData, userId]);
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await this.query('DELETE FROM users WHERE id = ?', [userId]);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  }
}

module.exports = UserModel;
