// BookCategoryModel.js
const util = require('util');

class BookCategoryModel {
  constructor(database) {
    this.database = database;
    this.query = util.promisify(database.query).bind(database);
  }
  async addBookCategory(name) {
    try {
      const result = await this.query('INSERT INTO categories (name) VALUES (?)', [name]);
      console.log(result);
      const [category ] = await this.query('SELECT * FROM categories  WHERE category_id  = ?', [result.insertId]);
      return category;

    } catch (error) {
      console.error('Error creating Book Categoy:', error.message);
      return;
    }
  }

  async getBookCategory(category_id) {
    try {
      const [category ] = await this.query('SELECT * FROM categories  WHERE category_id  = ?', [category_id]);
      return category;

    } catch (error) {
      console.error('Error getting Book Categoy:', error.message);
      return;
    }
  }
  async getAllBookCategory() {
    try {
      const categories  = await this.query('SELECT * FROM categories');
      return categories;

    } catch (error) {
      console.error('Error getting all Book Categories:', error.message);
      return;
    }
  }

  async updateBookCategory(category_id, newData) {
    try {
      await this.query('UPDATE categories SET ? WHERE category_id = ?', [newData, category_id]);
    } catch (error) {
      console.error('Error updating Book Category:', error.message);
      throw error;
    }
  }

  async deleteBookCategory(category_id) {
    try {
      await this.query('DELETE FROM categories WHERE category_id = ?', [category_id]);
    } catch (error) {
      console.error('Error deleting Book Cetories:', error.message);
      throw error;
    }
  }

}

module.exports = BookCategoryModel;
