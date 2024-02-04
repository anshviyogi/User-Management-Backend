const mongoose = require("mongoose")

function connectMongoose() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('DB Connected Successfully')
    })
    .catch(error => {
        console.log('Something went wront in DB connection', error.message)
    })
}

module.exports = connectMongoose