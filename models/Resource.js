const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    alt: String
  },
  category: [String],
  url: String,
  importance: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Resource", resourceSchema);
