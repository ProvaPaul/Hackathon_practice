const mongoose = require("mongoose");

// Define the schema for the text data
const textSchema = new mongoose.Schema(
  {
    text: { type: String, required: true }, // The extracted text
  },
  {
    timestamps: true, // This will add `createdAt` and `updatedAt` fields
  }
);

// Create a model based on the schema
const TextModel = mongoose.model("Text", textSchema);

module.exports = TextModel;
