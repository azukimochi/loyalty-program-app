# SuperMiles Redemption User Portal

## Problem to Solve/Purpose

This app aims to be a mock up of a redemption portal for loyalty points.  Currently, AirBuds (parody of Air Pods) of various colours are the products that can be redeemed with *SuperMiles*, a type of loyalty points. 

## Main Functionalities

* Users will have to log into their SuperMiles account with their email and password.  A successful login will generate a JWT session token that will be validated with every API call to ensure the correct user is logged in and is thus capable of making changes to their account. For testing purposes, this app's JWT tokens expire in 15 minutes. 
* After logging in, the user is redirected to their dashboard. There, they will see their current balance of SuperMiles points and the AirBuds products that can be redeemed.  
* By clicking on the quantity drop down, colour drop down and the colour cards, the price/value of the potential redemption is updated.
* By clicking the *Redeem* button, a modal to confirm the order will pop up.  The user will either click *Cancel* to discard the order and return to the dashboard or *Redeem* to proceed with the order.  
* The program will validate that the user has enough points for the redemption and that SuperMiles has enough units in stock for the order.  If either the balance and/or the available stock are insufficient, an error message will populate in the modal, notifying the user of the insufficient balance/stock. 
* If the available balance and stock are both sufficient, the order will go through, updating the user's balance of SuperMiles points, the database's inventory of products, and the database's collection of orders.  As a MongoDB database is used here, every new document inserted into the Orders collection will have its id inserted into an array of orders for the respective user's document in the Users collection (*Order* is a ref for *User*).  As such, you will be able to track the orders made by every user account. 
* When a colour is no longer in stock (`qty` is 0), the colour will no longer appear in the colour dropdown and as a colour card.  This will ensure only available products are viewable by the user. 

## Future Enhancements

* As each order is associated with the user who made the order, a page for showing a user's history of orders over time will be a key function to add in.  This can be done using the `populate` method of Mongoose, as the orders collection is a ref for the users collection in the MongoDB database. 

## Technologies/Tools

React.js, JavaScript, ES6/ES7, Node.js, Express.js, MongoDB, Mongoose, NPM, JWT, Semantic UI, CSS, YARN, REST

## Installation

1. Git clone this repo or ensure you have a zip folder of the base code. 
2. Ensure you have MongoDB on your device. A good workbench/management app to use for MongoDB is Robo 3T, where you can use it as a GUI to monitor your collections and documents. You can download Robo 3T at https://robomongo.org/. 
3. In the command line, run `yarn install` at the root and repeat this in the client folder (`cd client` then `yarn install`) to install all the dependencies. 
4. To create an account that can seed into the database before running the program, create a `.env` file at the root.  In this .env file, add in the following key values (with your own email, password, and name). Please ensure your password is 6 characters long and has at least one uppercase letter, one lowercase letter, and one number:

```
EMAIL=example@gmail.com
PASS=examplePSW123!
FIRST_NAME=John
LAST_NAME=Doe
```

In the `seedDB.js` folder, a dummy account will be seeded into the databbase as well.  The login credentials of this dummy account are:

```
email: karen.kuak@gmail.com
password: dummyTest1234!
```

5. In the command line, run `yarn seed` at the root.  This will feed your MongoDB database with a default Inventory collection and User collection. 
6. In the command line, run `yarn start` at the root. This will start your application.  The front-end (react) will run on port 3000 and the back-end (node.js) will run on port 3001.  Both ports must be available for them to proxy into each other.  As such, if your back-end ever fails, run `netstat -vanp tcp | grep 3001` in your command line at the root.  You will see various port credentials populate in the terminal for port 3001.  Run `kill -9 (insert PID number, or otherwise the number next to the 0 at the end)` and port 3001 should clear up.  You can also run `netstat -vanp tcp | grep 3001` again to check that it is free.  When the port is free, run `yarn start` at the root again to start up your application. 

## Creators

This app was created by:

* [azukimochi](https://github.com/azukimochi)
