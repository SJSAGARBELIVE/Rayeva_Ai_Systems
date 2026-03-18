const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "Other"
  },

  subCategory: {
    type: String,
    default: "General"
  },

  tags: {
    type: [String],
    default: []
  },

  sustainability: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);