const mongoose = require("mongoose")
const db = require("../models")

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/supermiles"
)

const inventorySeed = [
  {
    colour: "red",
    qty: 100
  },
  {
    colour: "blue",
    qty: 100
  },
  {
    colour: "white",
    qty: 100
  },
  {
    colour: "orange",
    qty: 100
  },
  {
    colour: "pink",
    qty: 100
  },
  {
    colour: "black",
    qty: 100
  }
]

const usersSeed = [
  {
    email: "karen.kuak@gmail.com",
    password: "dummyTest1234!"
  }
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