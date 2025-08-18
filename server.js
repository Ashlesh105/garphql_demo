import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//types
import { typeDefs } from './schema.js';
//db
import { connectDB } from './mongoDbInit.js';
//mongoose schema for mongo db
import { Game, Review, Author } from './models/model.js';

connectDB()

const resolvers = {
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
            // console.log(`Data:${reviewObj}`)
            return reviewObj;
        },
        review: async (_, args) => {
            return await Review.findById(args.id)
        },
        authors: async()=> {
            return await Author.find({});
        },
        author(_, args) {
            // console.log(args.id)
            const author = db.authors.find((author) => author.id === args.id);
            // console.log(res)
            return author;
        },
    },
    Game: {
        reviews: async(parent)=> {
            return await Review.find({author_id: parent.id})
        }
    },
    Author: {
        reviews: async(parent) => {
            return await Review.find({author_id: parent.id})
        }
    },
    Review: {
        game(parent) {
            return db.games.find((g) => g.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find((a) => a.id === parent.author_id)
        }
    },

    Mutation: {
        deleteGame(_, args) {
            const gameObj = () => db.games.find((game) => game.id === args.id)
            if (!gameObj) {
                return "game with Id not found"
            }
            db.games = db.games.filter((g) => g.id !== args.id) // this will create a new array excluding that array that we want to delete
            return db.games
        },

        addGame: async (_, { game }) => {
            try {
                const newGame = await Game.create(game);
                return newGame
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }

        },

        updateGame(_, args) {
            db.games = db.games.map((g) => {
                if (g.id === args.id)
                    return { ...g, ...args.game } //In this first it will return the correct orginal obj while args.game overrides the specified element eg title or platform
                return g
            })
            return db.games.find((g) => g.id === args.id)
        },

        addReview: async (_, { review }) => {
            try {
                const newReview = await Review.create(review)
                return newReview
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        },
        addAuthor: async (_,{author})=>{
            try {
                const newAuthor = await Author.create(author)
                return newAuthor
            } catch (error) {
                 throw new Error(`Error: ${error}`)
            }
        }

    }
}




//server setup

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
