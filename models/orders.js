const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  colour: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  userId: { type: String, required: true},
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
