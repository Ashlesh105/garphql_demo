import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    platform: {
        type: [String],
        required: true
    },

},
    {
        timestamps: true
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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }
},
    {
        timestamps: true
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
},
    {
        timestamps: true
    })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

export const Game = mongoose.model('Game', gameSchema);
export const Author = mongoose.model('Author', authorSchema);
export const Review = mongoose.model('Review', reviewSchema);
export const User = mongoose.model('User', userSchema);