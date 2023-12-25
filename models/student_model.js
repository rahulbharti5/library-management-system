// userModel.js
const util = require('util');

class StudentModel {
  constructor(database) {
    this.database = database;
    this.query = util.promisify(database.query).bind(database);
  }

  async createUser(roll_number,full_name,email,username, hashed_password,branch,year,address) {
    try {
      const result = await this.query('INSERT INTO students (roll_number,full_name,email,username,hashed_password) VALUES (?,?,?,?,?)', [roll_number,full_name,email,username, hashed_password,branch,year,address]);
      console.log(result);
      const [user] = await this.query('SELECT * FROM students WHERE student_id = ?', [result.insertId]);

      return user;
      
    } catch (error) {
      console.error('Error creating student account:', error.message);
      return;
    }
  }

   async getUserByUserName(username) {
    try {
      const [user] = await this.query('SELECT * FROM students WHERE username = ?', [username]);
      console.log(user)
      return user;
    } catch (error) {
      console.error('Error fetching student account:', error.message);
      //throw error;
      return;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.query('SELECT * FROM students');
      return users;
    } catch (error) {
      console.error('Error fetching all admin users:', error.message);
      throw error;
    }
  }

  async updateUser(userId, newData) {
    try {
      await this.query('UPDATE admins SET ? WHERE student_id = ?', [newData, userId]);
    } catch (error) {
      console.error('Error updating  student account:', error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await this.query('DELETE FROM admin WHERE student_id = ?', [userId]);
    } catch (error) {
      console.error('Error deleting  student account:', error.message);
      throw error;
    }
  }
}

module.exports = StudentModel;
