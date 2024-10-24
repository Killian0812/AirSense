const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
    },
    username: String,
    password: {
        type: String,
        required: true,
    },
    filename: String, // filename in storage  
    image: String, // avatar url
    refreshToken: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);