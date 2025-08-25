export const typeDefs = `#graphql
    scalar JSON

    type Game {
        id: ID! #this will stored as a string
        title: String!
        platform: [String!]!
        reviews: [JSON!]
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
        reviews: [JSON!]
    }

    type Login {
        accessToken: String!,
        refreshToken: String!
    }

    type Query {
        games: [Game]
        game(id: ID!): Game
        gameSkip(limit: Int, skip: Int): [Game]
        reviews: [Review]
        review(id: ID!): Review
        authors: [Author]
        author(id: ID!): Author
        gameSort(sort: GameSortInput!): [Game]
        generateAccessToken(username: String!, password: String!): Login!
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

    enum SortDirection {
        ASC
        DESC
    }

    input GameSortInput {
        id: SortDirection
        title: SortDirection
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
        game: ID!
        author: ID!
    }

    input AddAuthorInput {
        name: String!
        verified: Boolean!
        reviews: [AddReviewInput!]
    }
`