// userModel.js
const util = require('util');

class AdminModel {
  constructor(database) {
    this.database = database;
    this.query = util.promisify(database.query).bind(database);
  }

  async createUser(username, hashed_password,full_name,email) {
    try {
      const result = await this.query('INSERT INTO admins (username, hashed_password,full_name,email) VALUES (?, ?,?,?)', [username, hashed_password,full_name,email]);
      
      const [user] = await this.query('SELECT * FROM admins WHERE admin_id = ?', [result.insertId]);

      return user;
      
    } catch (error) {
      console.error('Error creating admin user:', error.message);
      return;
    }
  }

   async getUserByUserName(username) {
    try {
      const [user] = await this.query('SELECT * FROM admins WHERE username = ?', [username]);
      console.log(user)
      return user;
    } catch (error) {
      console.error('Error fetching admin user by ID:', error.message);
      //throw error;
      return;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.query('SELECT * FROM admins');
      return users;
    } catch (error) {
      console.error('Error fetching all admin users:', error.message);
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      await this.query('UPDATE admins SET ? WHERE admin_id = ?', [newData, userId]);
    } catch (error) {
      console.error('Error updating  admin user:', error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await this.query('DELETE FROM admins WHERE admin_id = ?', [userId]);
    } catch (error) {
      console.error('Error deleting admin user:', error.message);
      throw error;
    }
  }
}

module.exports = AdminModel;
