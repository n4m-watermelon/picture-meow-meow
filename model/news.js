const mongoose = require('mongoose');
const newsSchema = mongoose.Schema({
    title: String,
    srcSet: String,
    date:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('news', newsSchema)