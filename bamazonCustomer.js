// Requirements
var inquirer = require("inquirer");
var mysql = require("mysql");



// IMPORTANT: PASSWORDS
// **********************************
// **********************************
// Passwords File
var keys = require('./keys.js');
// My SQL Password
var password = keys.SQLPassword;
// **********************************
// **********************************



// Global Variables
var product_numbers = [];

// Create Connection to My SQL Server
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: password,
    database: "bamazon"
});

// Connect to My SQL Server
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    read();
});

// Get current products menu
function read() {
    console.log("Finding Products Available...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.log(res);
        //   Loop Results and display
        for (i = 0; i < res.length; i++) {
            console.log("Product Number: ", res[i].item_id);
            console.log("Product: ", res[i].product_name);
            console.log("Price: ", res[i].price);
            console.log("-------------------");
            product_numbers.push(res[i].item_id);
        }
        purchase();
    });
}

// Purchas Funcationality
function purchase() {
    inquirer.prompt([

        {
            type: "list",
            name: "productPurchase",
            message: "Which Product would you like to purchase?",
            choices: product_numbers
        },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?"
        }
    ]).then(function (result) {
        var productChoice = result.productPurchase;
        var quantityChoice = result.quantity;

        console.log("Checking Product Availability...\n");
        connection.query(
          "SELECT * FROM products WHERE ?",
          {
            item_id: productChoice
          },
          function(err, res) {
            if (err) throw err;
            // GET CURRENT AVAILABLE QUANTITY
            var availableQuantity = res[0].stock_quantity;
            var productPrice = res[0].price;
            console.log("Quantity Currently Available: ",availableQuantity);

            // DETERMINE IF THERE IS ENOUGH QUANTITY
            if(availableQuantity >= quantityChoice){
                console.log("Completing Purchase...\n");

                var totalPrice = productPrice * quantityChoice; 

                var query = connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: quantityChoice
                    },
                    {
                      item_id: productChoice
                    }
                  ],
                  function(err, res) {
                    if (err) throw err;
                    console.log("Purchase Complete \n");
                    console.log("Total Purchase Price: ", totalPrice);
                  }
                );
            // NOT ENOUGH QUANTITY 
            } else {
                console.log("Insufficient quantity!");
            }

          }
        );

    })
}