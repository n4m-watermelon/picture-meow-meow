const mongoose = require('mongoose');

async function connect() {
    try {
         await mongoose.connect('mongodb+srv://n4msama:nam205806@cluster0.9l5pk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' ,{ useNewUrlParser: true, useUnifiedTopology: true });
         console.log("connected to db !")

    } catch (error) {
        console.log("connected to failure !" , error)
    }

}



module.exports = {connect}