const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
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

module.exports = mongoose.model("images", imageSchema);
