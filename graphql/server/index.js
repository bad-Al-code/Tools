import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
    Query: {
        games() {
            return db.games;
        },

        game(_, args) {
            return db.games.find((game) => {
                return game.id === args.id;
            });
        },

        reviews() {
            return db.reviews;
        },

        review(_, args) {
            return db.reviews.find((review) => {
                return review.id === args.id;
            });
        },

        authors() {
            return db.authors;
        },

        author(_, args) {
            return db.authors.find((author) => {
                return author.id === args.id;
            });
        },
    },

    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => {
                return review.game_id === parent.id;
            });
        },
    },

    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => {
                return review.author_id === parent.id;
            });
        },
    },

    Review: {
        author(parent) {
            return db.authors.find((author) => {
                return author.id === parent.author_id;
            });
        },
        game(parent) {
            return db.games.find((game) => {
                return game.id === parent.game_id;
            });
        },
    },

    Mutation: {
        deleteGame(_, args) {
            db.games = db.games.filter((game) => {
                return game.id !== args.id;
            });

            return db.games;
        },

        addGame(_, args) {
            let game = {
                ...args.game,
                id: crypto.randomUUID(),
            };

            db.games.push(game);

            return game;
        },

        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return { ...game, ...args.edits };
                }

                return game;
            });

            return db.games.find((game) => {
                return game.id === args.id;
            });
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log('Server running at: ', url);
