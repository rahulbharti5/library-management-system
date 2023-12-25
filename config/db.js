const mysql = require('mysql');
const dotenv = require('dotenv');
const chalk = require('chalk');

const environment = process.env.NODE_ENV || 'development';
// Load the appropriate .env file
dotenv.config({
  path: `.env.${environment}`
});


// MySQL/MariaDB connection options
const dbOptions = {
    //port: 'your-mariadb-port'
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATA_BASE,
    connectionLimit: 5,
};

// Create a MySQL connection pool
const db = mysql.createPool(dbOptions);

console.log(chalk.blue("Pool Created Successfully limit 5"));

module.exports = db;