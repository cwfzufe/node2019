const mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'www.mycourse.top',
  user     : 'cwf',
  password : '123456',
  database : 'myblog'
});

connection.connect();

connection.query("SELECT username, password FROM users WHERE sex='女'", function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();