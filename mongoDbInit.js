import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/';
import { Game, Review, Author } from './models/model.js';
import { games, authors, reviews } from "./_db.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        // await Review.deleteMany({})
        // await Game.insertMany(games)
        // await Review.insertMany(reviews)
        // await Author.insertMany(authors)
        mongoose.set('debug',true)
        console.log('✅ Connected to MongoDB...');
    } catch (err) {
        console.error('❌ Could not connect to MongoDB...', err);
        process.exit(1); // Exit process with failure
    }
};