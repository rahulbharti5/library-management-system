// BookCopyModel.js
const util = require('util');

class BookCopyModel {
  constructor(database) {
    this.database = database;
    this.query = util.promisify(database.query).bind(database);
  }
  async addBookCopy(book_id,unique_identifier) {
    try {
      const result = await this.query('INSERT INTO book_copies (book_id,unique_identifier) VALUES (?,?)', [book_id,unique_identifier]);
      console.log(result);
      const [copy ] = await this.query('SELECT * FROM book_copies WHERE copy_id  = ?', [result.insertId]);
      return copy;

    } catch (error) {
      console.error('Error creating Book Copy:', error.message);
      return;
    }
  }

  async getBookCopy(copy_id) {
    try {
      const [copy ] = await this.query('SELECT * FROM book_copies WHERE copy_id  = ?', [copy_id]);
      return copy;

    } catch (error) {
      console.error('Error getting Book Copy:', error.message);
      return;
    }
  }
  async getAllBookCopy() {
    try {
      
      const book_copies = await this.query('SELECT * FROM book_copies ');
      return book_copies;

    } catch (error) {
      console.error('Error getting all Book book_copies:', error.message);
      return;
    }
  }

  async updateBookCopy(copy_id, newData) {
    try {
      await this.query('UPDATE book_copies SET ? WHERE copy_id = ?', [newData, copy_id]);
    } catch (error) {
      console.error('Error updating Book Copy:', error.message);
      throw error;
    }
  }

  async deleteBookCopy(copy_id) {
    try {
      await this.query('DELETE FROM book_copies WHERE copy_id = ?', [copy_id]);
    } catch (error) {
      console.error('Error deleting Book book_copies:', error.message);
      throw error;
    }
  }

}

module.exports = BookCopyModel;
