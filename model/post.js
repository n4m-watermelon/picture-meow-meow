const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  cloudinary_id: String,
  img_url: String,
  author: String,
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model("post", postSchema);
