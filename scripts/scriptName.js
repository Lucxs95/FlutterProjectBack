require('dotenv').config(); // Make sure this line is at the very top
const mongoose = require('mongoose');
const User = require('./User'); // Path to your User model
const usersData = require('./users.json'); // Path to your JSON file

const connectionString = process.env.DB_URI; // This should now correctly reference your DB URI

async function importUsers() {
    try {
        await mongoose.connect(connectionString);
        console.log('MongoDB connected');

        for (const userData of usersData) {
            const user = new User({ email: userData.email, password: userData.password });
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
