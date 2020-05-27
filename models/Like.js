const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  user: String,
  resource: String,
  isLiked: Boolean,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Like", likeSchema);
