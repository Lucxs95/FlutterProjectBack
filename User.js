const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Envisagez d'utiliser le hachage pour le stockage sécurisé
    birthday: { type: Date },
    address: { type: String },
    postalCode: { type: String },
    city: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;