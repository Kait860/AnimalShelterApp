const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection using environment variables from the .env file.
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Attempt to connect when the application starts and log the result.
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Export the connection so it can be used in controllers.
module.exports = connection;
