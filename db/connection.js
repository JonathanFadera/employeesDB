const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeesDB'
},
console.log('Connected to the employeesDB database.')
);

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the employeesDB database.');
});

    
module.exports = db;