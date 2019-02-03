const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  colour: { type: String, required: true },
  qty: { type: Number, required: true},
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
