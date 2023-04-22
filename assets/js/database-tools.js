var mysql = require('mysql');

RDS_HOSTNAME = "citrusproducts.cwrtbbresrab.us-east-1.rds.amazonaws.com"
RDS_USERNAME = "admin"
RDS_PASSWORD = "Cytosine3141"
RDS_PORT = "3306"

// var connection = mysql.createConnection({
//     host     : process.env.RDS_HOSTNAME,
//     user     : process.env.RDS_USERNAME,
//     password : process.env.RDS_PASSWORD,
//     port     : process.env.RDS_PORT
//   });


var connection = mysql.createConnection({
  host     : "citrusproducts.cwrtbbresrab.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "Cytosine3141",
  database: "products",
  port     : "3306"
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');


  connection.query("SELECT * FROM productTable", function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    connection.end();
  });
});


