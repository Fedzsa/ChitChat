const mysql = require('mysql');

// Setup MySQL database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chitchat_db"
});

con.connect((err) => {
  if(err) throw err;
});

module.exports = con;
