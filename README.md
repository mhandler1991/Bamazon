# Bamazon

Node.js &amp; MySQL Server 

Bamazon is a Node.js Server connected to MYSQL which allows users to:
1. bamazonCustomer: Interact with a Marketplace in the users console to purchase murchandise similar to an 'Amazon' Marketplace
2. bamazonManager: Manage the Marketplace to manage products available on the Bamazon Marketplace. 

#### Problem being Solved:
These two Node.Js applications allow users to interact with an 'Amazon' like marketplace.

#### Application(s) Organization:
The applications are comprised of the following:
1. bamazonCustomer
2. bamazonManager
3. Keys
4. MYSQL

#### Files Included:
1. bamazonCustomer.js
2. bamazonManager.js
3. SampleData.csv


## Instructions:
Please follow the below instructions to create/deploy:

1. Create a MYSQL Database in the following structure: 

Table: Products = {
    item_id:
    product_name:
    department_name:
    price:
    stock_quantity
}

2. Upload data from the SampleData.csv file into your MYSQL or Add your own!

3. Create a personal 'Keys.js' file this will act as your lock for your MYSQL Server. It should be structured as follows:

module.exports = {
    SQLPassword: '**YOUR PASSWORD HERE**'
}

You can then use this file to expand on any further functionality requiring keys/passwords. If pushing into Github, please remember to indlude a .gitignore file to remove this file. 

## Items of Note:

**A Deployed Version can be found https://github.com/mhandler1991/Bamazon**

Developed by M Handler

### Integrations Used
- My SQL
- Node.js

### Packages Used
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [MySQL](https://www.npmjs.com/package/mysql)

## General Functionality:

#### BamazonCustomer
BamazonCustomer allows the user to view current products available in the bamazon marketplace and meta data including Product Number, Product Name, & Price. The user will be prompted to decide which product they would like to purchase. After deciding which product they would like to purchase the user will be prompted to decide how much (quantity) they would like to purchase. They application will check if there is enough availability of that product, if there is enough product the user will be prompted with a success message. If there is not enough product, the user will be promted with a failure message.

#### BamazonManager
The BamazonManager application has 4 main compontents/capabilities that the user will be prompted upon start of the application:
    1. View Products for Sale
    2. View Low Inventory
    3. Add to Inventory
    4. Add New Product


- View Products for Sale
Selecting this option will show a 'menu' of available products within the MYSQL Database. Each 'menu' line item will show the product number, product name, & price.

- View Low Inventory
Similar to 'View Products for Sale' selecting this option will show a 'menu' of available products within the MYSQL Database **WITH** inventory below 5.

- Add to Inventory
Selecting this option will prompt the user to first decide which product they would like to edit. After Selecting this product the user will be input the new quantity of that product. Please note that this will overwrite current values NOT add values.

- Add New Product
Selecting this will allow the user to add a new product to the MYSQL database. The user will first be prompted to input what product they would like to add (Name). Then the department that product is under, the per item price of the product, then finally the available quantity of the product. 