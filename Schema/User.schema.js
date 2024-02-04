const mongoose = require("mongoose")

let schema = mongoose.Schema({
    firstName: {
        type:String,
        required: [true, 'This field is required']
    },
    lastName: {
        type:String,
        required: [true, 'This field is required']
    },
    password: {
        type: String,
        required: [true, 'This field is required'],
    },
    email: {
        type: String,
        required: [true, 'This field is required'],
        unique: true
    },
})

let User = mongoose.model("User", schema)

module.exports = User;