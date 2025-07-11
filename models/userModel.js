const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add user the Password"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)