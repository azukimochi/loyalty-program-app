# SuperMiles Redemption User Portal

## Problem to Solve/Purpose

This app aims to be a mock up of a redemption portal for loyalty points.  Currently, AirBuds (parody of Air Pods) of various colours are the products that can be redeemed with *SuperMiles*, a type of loyalty points. 

## Main Functionalities

* Users will have to log into their SuperMiles account with their email and password.  A successful login will generate a JWT session token that will be validated with every API call to ensure the correct user is logged in and is thus capable of making changes to their account. For testing purposes, this app's JWT tokens expire in about 10 minutes. 
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

## Deployed Site

This app has also been deployed on Heroku.  In this version, you will need to use the dummy account (the login credentials are above).  The link to the Heroku app is https://supermiles-user-portal.herokuapp.com/. 


## Thought Process

I decided to make this a full-stack application with React on the front end and Node.js on the back end.  Although a backend was not necessary and one could simply hard code any data to fetch instead, I wanted to do both the front and back end for these reasons:

* I can add in session token validation using JWT web tokens.  This allows for further validation when users make API calls, thus ensure data is not incorrectly manipulated.  For example, if someone were to go away from their computer while logged in, when they return after some time, the program will prompt them to log in again if their session token has expired.  This prevents unauthorized users to create falsified orders in this case. 

* By having a node-express envrionment, I can architect this application to have a MVC structure, which has become an industry standard for web applications.

* By utilizing a database, such as MongoDB, I am able to associate orders with individual user accounts.  Specifically, the *Orders* collection is a ref in the *Users* collection, so whenever a new order document is inserted into the Orders collection, the document's id is also stored in the user's document.  Having a MongoDB database (with Mongoose) allows for simple relations to be brought forth between different collections.  As a future enhancement, I can now add in an order history for each user account because of the assoication between the *Orders* collection and *Users* collection.  I would just need to use the `populate` methods as per the Mongoose documentation. 

I decided to use MongoDB instead of MySQL because the schema can be dynamic with the former, allowing me to easily change up the organization of data if needed when new features need to be added in. In the future, this application would need a MySQL database for more complex associations between data sets.  

I decided to allow users to query colours via a dropdown and coloured cards.  The reason for having both is because some users are colour blind and thus would mistaken certain colours if they were to only have coloured cards to choose from. A dropdown with simple text solves this problem. 

For the aforementioned session tokens, I purposely coded in the function that verifies the session token *before* any API call is able to proceed to the back end point.  This is seen in line 36 of `index.js` in the routes folder.  By doing so, API calls done by unauthorized users will be rejected, thus maintaining data integry.  Only the login-related routes do not have the verify function preceeding them because a session token does not need to be validated upon logging in. 

 The app has been made responsive using Semantic UI and media queries.  Semantic UI's grid system is more compatible with React apps than Bootstrap.  

## Creators

This app was created by:

* [azukimochi](https://github.com/azukimochi)
She can be contacted via karen.kuak@gmail.com

![](README_images/screenshot.png)
