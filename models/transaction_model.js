// TransactionModel.js
const util = require('util');

class TransactionModel {
    constructor(database) {
        this.database = database;
        this.query = util.promisify(database.query).bind(database);
    }
    async addTransaction(student_id,copy_id,admin_id,issue_date,return_date,status) {
        try {
            const result = await this.query('INSERT INTO transactions (student_id,copy_id,admin_id,issue_date,return_date,status) VALUES (?,?,?,?,?,?)', [student_id,copy_id,admin_id,issue_date,return_date,status]);
            console.log(result);
            const [transaction] = await this.query('SELECT * FROM transactions  WHERE transaction_id  = ?', [result.insertId]);
            return transaction;

        } catch (error) {
            console.error('Error Adding Transaction:', error.message);
            return;
        }
    }

    async getTransaction(Transaction_id) {
        try {
            const [transaction] = await this.query('SELECT * FROM transactions WHERE transaction_id  = ?', [Transaction_id]);
            return transaction;

        } catch (error) {
            console.error('Error getting Transaction :', error.message);
            return;
        }
    }
    async getAllTransactions() {
        try {

            const Transactions = await this.query('SELECT * FROM transactions ');
            return Transactions;

        } catch (error) {
            console.error('Error getting all Transactions:', error.message);
            return;
        }
    }

    async updateTransaction(Transaction_id, newData) {
        try {
            await this.query('UPDATE transactions SET ? WHERE transaction_id = ?', [newData, Transaction_id]);
        } catch (error) {
            console.error('Error updating Transaction:', error.message);
            throw error;
        }
    }

    async deleteTransaction(Transaction_id) {
        try {
            await this.query('DELETE FROM transactions WHERE transaction_id = ?', [Transaction_id]);
        } catch (error) {
            console.error('Error deleting Transaction:', error.message);
            throw error;
        }
    }

    async getStudentAllTransactions(student_id) {
        try {

            const Transactions = await this.query('SELECT * FROM transactions WHERE student_id = ?',[student_id]);
            return Transactions;

        } catch (error) {
            console.error('Error getting all Transactions:', error.message);
            return;
        }
    }

}

module.exports = TransactionModel;
