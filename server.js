import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AuthenticationError,UserInputError } from 'apollo-server-errors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {authDirectiveTrasnformer} from './directives/isAuthenticated.js';

import GraphQLJSON from 'graphql-type-json';
import DataLoader from 'dataloader';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

//types
import { typeDefs } from './schema.js';
//db
import { connectDB } from './mongoDbInit.js';
//mongoose schema for mongo db
import { Game, Review, Author, User } from './models/model.js';

connectDB()

const gameLoader = new DataLoader(async (ids) => {
    const games = await Game.find({ _id: { $in: ids } })
    console.log(`GameIds:${games}`)
    return ids.map(id => games.find(game => game._id.toString() === id.toString()));
});

const authorLoader = new DataLoader(async (ids) => {
    const authors = await Author.find({ _id: { $in: ids } })
    return ids.map(id => authors.find(author => author._id.toString() === id.toString()));
});

const reviewLoader = new DataLoader(async (ids) => {
    const reviews = await Review.find({ _id: { $in: ids } })
    return ids.map(id => reviews.find(review => review._id.toString() === id.toString()))
})
const resolvers = {

    JSON: GraphQLJSON,
    Query: {
        games: async () => {
            const gameObj = await Game.find()
            // console.log(`Data:${gameObj}`)
            return gameObj;
        },
        game: async (_, args) => {
            return await Game.findById(args.id)
        },
        reviews: async () => {
            const reviewObj = await Review.find({})
            return reviewObj;
        },
        review: async (_, { id }) => {
            return await Review.findById(id)
        },
        authors: async () => {
            return await Author.find({});
        },
        author: async (_, args) => {
            return await Review.findById(args.id)
        },
        gameSkip: async (_, { limit, skip }) => {
            let game = Game.find({}).skip(skip).limit(limit)
            console.log(game)
            return game
        },
        gameSort: async (_, { sort }) => {
            let query = Game.find({})
            let sortOptions = {}
            if (sort.title) {
                sortOptions.title = sort.title === 'ASC' ? 1 : -1;
            }
            if (sort.id) {
                sortOptions.id = sort.id === 'ASC' ? 1 : -1;
            }
        },
        generateAccessToken: async (_, { username, password }) => {
            const newUser = await User.create({ username: username, password: password });
            if (!newUser) {
                throw new UserInput('User not created')
            }
            const payload = {
                username: newUser.username,
                role: "admin",
            }
            const accessToken = jwt.sign(payload, process.env.sceret_key, { expiresIn: '1hr' })
            const refreshToken = jwt.sign(payload, process.env.sceret_key, { expiresIn: '24hr' })
            return { accessToken: accessToken, refreshToken: refreshToken }
        }
    },
    Game: {
        reviews: async (parent) => {
            return await reviewLoader.load(parent.id)
        }
    },
    Author: {
        reviews: async (parent) => {
            return await Review.find({ author: parent.id })
        }
    },
    Review: {
        game: async (parent) => {
            const games = await gameLoader.load(parent.game)
            console.log(games)
            return games
        },
        author: async (parent) => {
            return await authorLoader.load(parent.author)
        },
    },
    Mutation: {
        deleteGame: async (_, { id }) => {
            const deletedGame = await Game.findByIdAndDelete(id)
            if (!deletedGame)
                throw new Error(`Game not deleted`)
            return await Game.find({})
        },

        addGame: async (_, { game }) => {

            try {
                // console.log(`User:${user}`)
        //         if (!user || user.role !== 'admin') {
        //     throw new AuthenticationError('Not authorized');
        // }
                const newGame = await Game.create(game);
                return newGame
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        },

        updateGame: async (_, { id, game }) => {
            const updatedGame = await Game.findByIdAndUpdate(id, game, { new: true })
            console.log(updatedGame)
            if (updatedGame == null) {
                throw Error(`Game with is ${id} not found`)
            }
            return updatedGame
        },

        addReview: async (_, { review }) => {
            try {
                const newReview = await Review.create(review)
                return newReview
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        },
        addAuthor: async (_, { author }) => {
            try {
                const newAuthor = await Author.create(author)
                return newAuthor
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        },

    }
}

const getUser = (token) => {
    try {
        console.log('hello')
        if (token) {
             const realToken = token.replace(/^Bearer\s+/i, '');
           const decoded = jwt.verify(realToken, process.env.sceret_key);
           console.log(`${decoded.role}`)
           return {role: decoded.role,...decoded};
        } else {
            throw new UserInputError('Invalid token')
        }
    } catch (error) {
        throw new UserInputError(`Something went wrong: ${error}`)
    }
}


//server setup
const schema = makeExecutableSchema({
     typeDefs,
    resolvers,
});

// const transformedSchema = authDirectiveTrasnformer(schema);
const server = new ApolloServer({
    schema: schema,
    context: ({ req }) => ({
        authToken: req.headers.authorization
    })
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },

});

console.log(`🚀  Server ready at: ${url}`);
