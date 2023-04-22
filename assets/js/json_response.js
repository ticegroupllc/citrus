var mysql = require('mysql');

var productsList;

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
      console.log(results[0]);
      for (i = 0;i< results.length;i++){
        productsList = results;
      }
      const productsToReturn = JSON.stringify(productsList);
      connection.end();
      console.log(productsList);


      const http = require("http");
      const host = 'localhost';
      const port = 8000;
      
      
      
      
      console.log(productsToReturn)
      
      const books = JSON.stringify([
          { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
          { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
      ]);
      
      const authors = JSON.stringify([
          { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
          { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
      ]);
      
      
    //   const productsToReturn = JSON.stringify([{
    //       id: 0,
    //       name: "Meyer Lemon",
    //       price: 29.99,
    //       instock: 100,
    //       description:
    //         "traditional meyer lemon.",
    //       imgSrc: "./assets/img/shutterstock_336818993meyer.jpg",
    //       family: "lemon",
    //     },
    //     {
    //       id: 1,
    //       name: "Owari Orange",
    //       price: 24.99,
    //       instock: 43,
    //       description:
    //         "Cold hardy orange.",
    //       imgSrc: "./assets/img/owari.jpg",
    //       family: "orange",
    //     }])
      
      
      const requestListener = function (req, res) {
          res.setHeader("Content-Type", "application/json");
          switch (req.url) {
              case "/books":
                  res.writeHead(200);
                  res.end(books);
                  break
              case "/authors":
                  res.writeHead(200);
                  res.end(authors);
                  break
              case "/products":
                  res.writeHead(200);
                  res.end(productsToReturn);
                  break
              default:
                  res.writeHead(404);
                  res.end(JSON.stringify({error:"Resource not found"}));
          }
      };
      
      
      const server = http.createServer(requestListener);
      //server.listen(port, host, () => {
      server.listen(port, () => {
          console.log(`Server is running on http://${host}:${port}`);
      });



    });
  });

  


