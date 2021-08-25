const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  title: String,
  description: String,
  cloudinary_id: String,
  img_url: String,
  author: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("images", imageSchema);
