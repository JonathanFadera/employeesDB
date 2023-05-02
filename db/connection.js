const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'managers_DB'
});

connection.connect(function (err){
  if(err) throw err
})

module.exports = connection;