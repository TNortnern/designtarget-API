const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  isDeleted: { type: Boolean, default: 0 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Category", categorySchema);
