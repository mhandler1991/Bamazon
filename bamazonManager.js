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
    menu();
});


// View Prodcuts for Sale
function viewProductsforSale() {
    console.log("Finding Products Available...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.log(res);
        // Loop Results and display
        for (i = 0; i < res.length; i++) {
            console.log("Product Number: ", res[i].item_id);
            console.log("Product: ", res[i].product_name);
            console.log("Price: ", res[i].price);
            console.log("-------------------");
        }
    });
}

// View Prodcuts for Sale
function viewLowInventory() {
    console.log("Finding Products with Low Inventory...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity < 5",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            // console.log(res);
            // Loop Results and display
            for (i = 0; i < res.length; i++) {
                console.log("Product Number: ", res[i].item_id);
                console.log("Product: ", res[i].product_name);
                console.log("Quantity: ", res[i].stock_quantity);
                console.log("-------------------");
            }
        });
}

// Add to Inventory
function addToInventory() {

    // Variables
    var product_numbers = [];

    console.log("Finding Products with Low Inventory...\n");
    connection.query("SELECT * FROM products",
        function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            // console.log(res);
            // Loop Results and display
            for (i = 0; i < res.length; i++) {
                console.log("Product Number: ", res[i].item_id);
                console.log("Product: ", res[i].product_name);
                console.log("Quantity: ", res[i].stock_quantity);
                console.log("-------------------");
                console.log("\n")
                product_numbers.push(res[i].item_id);
            }

            inquirer.prompt([

                {
                    type: "list",
                    name: "productNumber",
                    message: "Which Product would you like to change inventory to?",
                    choices: product_numbers
                },
                {
                    type: "number",
                    name: "quantity",
                    message: "What is the new inventory quantity?",
                }

            ]).then(function (result) {

                var product = result.productNumber;
                var quantity = result.quantity;

                console.log("Adding requested Inventory...\n");

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: quantity
                        },
                        {
                            item_id: product
                        }
                    ],
                    function (err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " Product updated!\n");
                    }
                );

            })

        })


}

// View Prodcuts for Sale
function addNewProduct() {

    
    inquirer.prompt([

        {
            type: "input",
            name: "product_name",
            message: "What product would you like to add?"
        },
        {
            type: "input",
            name: "department_name",
            message: "What is the department of this product?"
        },
        {
            type: "input",
            name: "price",
            message: "What is the per item price of this product?"
        },
        {
            type: "input",
            name: "quantity",
            message: "What is the current quantity of the product?"
        }

    ]).then(function (result) {

        console.log("Inserting a new product...\n");
        var query = connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: result.product_name,
            department_name: result.department_name,
            price: result.price,
            stock_quantity: result.quantity
          },
          function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
          }
        );

    })
}


// Menu Function
function menu() {

    // Variables
    var menuOptions = ['View Products for Sales', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

    inquirer.prompt([

        {
            type: "list",
            name: "menuOptions",
            message: "What would you like to do?",
            choices: menuOptions
        }

    ]).then(function (result) {

        var a = result.menuOptions

        switch (a) {
            case 'View Products for Sales':
                // code block
                viewProductsforSale();
                break;
            case 'View Low Inventory':
                // code block
                viewLowInventory();
                break;
            case 'Add to Inventory':
                // code block
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                // code block
                break;
            default:
                // code block
                return;
        }

    })
}






// // Get current products menu
// function read() {
//     console.log("Finding Products Available...\n");
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         // Log all results of the SELECT statement
//         // console.log(res);
//         //   Loop Results and display
//         for (i = 0; i < res.length; i++) {
//             console.log("Product Number: ", res[i].item_id);
//             console.log("Product: ", res[i].product_name);
//             console.log("Price: ", res[i].price);
//             console.log("-------------------");
//             product_numbers.push(res[i].item_id);
//         }
//         purchase();
//     });
// }

// // Purchas Funcationality
// function purchase() {
//     inquirer.prompt([

//         {
//             type: "list",
//             name: "productPurchase",
//             message: "Which Product would you like to purchase?",
//             choices: product_numbers
//         },
//         {
//             type: "input",
//             name: "quantity",
//             message: "How many would you like to purchase?"
//         }
//     ]).then(function (result) {
//         var productChoice = result.productPurchase;
//         var quantityChoice = result.quantity;

//         console.log("Checking Product Availability...\n");
//         connection.query(
//           "SELECT * FROM products WHERE ?",
//           {
//             item_id: productChoice
//           },
//           function(err, res) {
//             if (err) throw err;
//             // GET CURRENT AVAILABLE QUANTITY
//             var availableQuantity = res[0].stock_quantity;
//             var productPrice = res[0].price;
//             console.log("Quantity Currently Available: ",availableQuantity);

//             // DETERMINE IF THERE IS ENOUGH QUANTITY
//             if(availableQuantity >= quantityChoice){
//                 console.log("Completing Purchase...\n");

//                 var totalPrice = productPrice * quantityChoice; 

// var query = connection.query(
//   "UPDATE products SET ? WHERE ?",
//   [
//     {
//       stock_quantity: quantityChoice
//     },
//     {
//       item_id: productChoice
//     }
//   ],
//                   function(err, res) {
//                     if (err) throw err;
//                     console.log("Purchase Complete \n");
//                     console.log("Total Purchase Price: ", totalPrice);
//                   }
//                 );
//             // NOT ENOUGH QUANTITY 
//             } else {
//                 console.log("Insufficient quantity!");
//             }

//           }
//         );

//     })
// }