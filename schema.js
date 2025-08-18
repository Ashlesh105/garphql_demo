export const typeDefs = `#graphql
    type Game {
        id: ID! #this will stored as a string
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        games: [Game]
        game(id: ID!): Game
        reviews: [Review]
        review(id: ID!): Review
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addGame(game: AddGameInput!) : Game
        deleteGame(id: ID!) : [Game]
        updateGame(id: ID!,game: UpdateGame!) : Game

        addReview(review: AddReviewInput!) : Review
        addAuthor(author: AddAuthorInput!): Author
        # deleteReview(id: ID!) : [Review]
        # updateReview(id: ID!,review: UpdateReview!) : Review

    }

    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input UpdateGame {
        title: String
        platform: [String!]
    }

    input AddReviewInput {
        rating: Int!
        content: String!
        game_id: ID!
        author_id: ID!
    }

    input AddAuthorInput {
        name: String!
        verified: Boolean!
        reviews: [AddReviewInput!]
    }



    # input UpdateReview {
    #     title: String
    #     rating: Int
    #     content: String
    #     game: Game
    #     author: Author
    # }
`