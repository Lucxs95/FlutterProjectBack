require('dotenv').config(); // Assurez-vous que cette ligne est tout en haut
const mongoose = require('mongoose');
const Activity = require('../Activity'); // Chemin vers votre modèle d'activité
const activitiesData = require('./activities.json'); // Chemin vers votre fichier JSON

const connectionString = process.env.DB_URI; // Utilisez correctement votre URI de DB

async function importActivities() {
    try {
        await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Optionnel : Effacer toutes les activités existantes pour éviter les doublons
        await Activity.deleteMany({});

        for (const activityData of activitiesData) {
            const activity = new Activity(activityData);
            await activity.save();
        }

        console.log('All activities imported successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error importing activities:', error);
        process.exit(1);
    }
}

importActivities();
