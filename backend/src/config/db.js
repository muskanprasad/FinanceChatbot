// backend/src/config/db.js

const mongoose = require('mongoose');
const config = require('./index'); //Import the config

async function connectDB() {
    try {
        console.log('Attempting to connect to MongoDB with URI:', typeof config.mongodbURI, config.mongodbURI);
        
        await mongoose.connect(config.mongodbURI, {
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        //Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;