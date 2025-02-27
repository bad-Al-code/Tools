import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import db from './_db.js';

const resolvers = {
    Query: {
        games() {
            return db.games;
        },

        reviews() {
            return db.reviews;
        },

        authors() {
            return db.authors;
        },

        review(_, args) {
            return db.reviews.find((review) => {
                review.id === args.id;
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

console.log('Server running at: ', 4000);
