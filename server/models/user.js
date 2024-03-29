const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema({
    handle: {
        type: String,
    },
    name: {
        type: String,
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
})

const User = mongoose.model('users', UserSchema);

module.exports = {User};