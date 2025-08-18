import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    platform: {
        type: [String],
        required: true
    },
})

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    game_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }
})

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
})

export const Game = mongoose.model('Game',gameSchema) ;
export const Author = mongoose.model('Author',authorSchema);
export const Review = mongoose.model('Review',reviewSchema);