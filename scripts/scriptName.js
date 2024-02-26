require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../User');
const usersData = require('./users.json');

const connectionString = process.env.DB_URI;

async function importUsers() {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connectée');

        await User.deleteMany({});

        for (const userData of usersData) {
            const { email, password, birthday, address, postalCode, city } = userData;
            const user = new User({
                email,
                password,
                birthday,
                address,
                postalCode,
                city
            });
            await user.save();
        }

        console.log('Tous les utilisateurs ont été importés avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'importation des utilisateurs:', error);
        process.exit(1);
    }
}

importUsers();
