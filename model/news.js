const mongoose = require('mongoose');
const newsSchema = mongoose.Schema({
    title: String,
    srcSet: String,
},
  {
    timestamps: true
  })
module.exports = mongoose.model('news', newsSchema)