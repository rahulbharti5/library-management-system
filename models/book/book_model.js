// BookModel.js
const util = require('util');

class BookModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }
    async addBook(title, author, isbn, quantity, available_quantity, category_id) {
        try {
            const result = await this.query('INSERT INTO books  (title, author, isbn, quantity, available_quantity, category_id) VALUES (?,?,?,?,?,?)', [title, author, isbn, quantity, available_quantity, category_id]);
            console.log(result);
            const [copy] = await this.query('SELECT * FROM books  WHERE book_id  = ?', [result.insertId]);
            return copy;

        } catch (error) {
            console.error('Error Adding Book:', error.message);
            return;
        }
    }

    async getBook(book_id) {
        try {
            const [book] = await this.query('SELECT * FROM books WHERE book_id  = ?', [book_id]);
            return book;

        } catch (error) {
            console.error('Error getting Book :', error.message);
            return;
        }
    }
    async getAllBooks() {
        try {

            const books = await this.query('SELECT * FROM books ');
            return books;

        } catch (error) {
            console.error('Error getting all Books:', error.message);
            return;
        }
    }

    async updateBook(book_id, newData) {
        try {
            await this.query('UPDATE books SET ? WHERE book_id = ?', [newData, book_id]);
        } catch (error) {
            console.error('Error updating Book:', error.message);
            throw error;
        }
    }

    async deleteBook(book_id) {
        try {
            await this.query('DELETE FROM book_copies WHERE book_id = ?', [book_id]);
        } catch (error) {
            console.error('Error deleting Book:', error.message);
            throw error;
        }
    }

}

module.exports = BookModel;
