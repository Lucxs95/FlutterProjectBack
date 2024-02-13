require('dotenv').config(); // Assurez-vous que cette ligne est en haut
const mongoose = require('mongoose');
const User = require('../User'); // Chemin vers votre modèle User
const usersData = require('./users.json'); // Chemin vers votre fichier JSON

const connectionString = process.env.DB_URI; // Cela devrait maintenant correctement référencer votre URI de base de données

async function importUsers() {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Nettoyer la collection User avant l'importation pour éviter les doublons
        await User.deleteMany({});

        for (const userData of usersData) {
            const { email, password, birthday, address, postalCode, city } = userData;
            const user = new User({
                email,
                password, // Considérez d'utiliser bcrypt pour hasher les mots de passe avant de les stocker
                birthday,
                address,
                postalCode,
                city
            });
            await user.save();
        }

        console.log('All users imported successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error importing users:', error);
        process.exit(1);
    }
}

importUsers();
