const mysql = require(`mysql2`);

const connection = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `r00t`,
    database: `booksdb`
});

connection.connect((err) => {
    if (err) throw err.message;
    console.log(`Connection to database established successfully`)
});

// create database
// const createDB = `CREATE DATABASE booksdb;`
// connection.query(createDB, (error, result) => {
//     if (error) throw error.message;
//     console.log(`Database created`)
//     }
// );

// create table
// const createTable = `CREATE TABLE bestbooks (id INTEGER PRIMARY KEY AUTO_INCREMENT,
//     title CHAR(50),
//     author CHAR(50),
//     price DECIMAL(10, 2))`;
// connection.query(createTable, (error, result) => {
//     if (error) throw error.message;
//     console.log(`Table created`)
// });

module.exports = {connection}