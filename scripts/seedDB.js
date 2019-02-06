const mongoose = require("mongoose")
const db = require("../models")
require('dotenv').config()

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/supermiles"
)

const inventorySeed = [
  {
    colour: "Red",
    qty: 100,
    price: 2000
  },
  {
    colour: "Blue",
    qty: 100,
    price: 2000
  },
  {
    colour: "Grey",
    qty: 100,
    price: 1000
  },
  {
    colour: "Orange",
    qty: 100,
    price: 2000
  },
  {
    colour: "Pink",
    qty: 100,
    price: 10000
  },
  {
    colour: "Black",
    qty: 100,
    price: 3000
  }
]

const usersSeed = [
  {
    email: "karen.kuak@gmail.com",
    password: "dummyTest1234!",
    firstName: "Karen",
    lastName: "Kua",
    balance: 100000
  },
  {
    email: process.env.EMAIL,
    password: process.env.PASS,
    firstName: process.env.FIRST_NAME,
    lastName: process.env.LAST_NAME,
    balance: 100000
  },
]

db.Inventory
  .remove({})
  .then(() => db.Inventory.collection.insertMany(inventorySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })