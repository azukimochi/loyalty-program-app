const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, minlength: 6, required: true },
  password: { type: String, minlength: 6, required: true },
  firstName: { type: String, minlength: 1, required: true },
  lastName: { type: String, minlength: 1, required: true },
  balance: { type: Number, min: 0, required: true },

  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order"
  }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;