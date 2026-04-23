const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  category: String,
  type: String, // lost or found
  location: String,
  date: Date,
});

module.exports = mongoose.model("Item", itemSchema);