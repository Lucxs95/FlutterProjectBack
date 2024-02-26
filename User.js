const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthday: { type: Date },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;