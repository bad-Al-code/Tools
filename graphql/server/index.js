import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';

const server = new ApolloServer({
    typeDefs,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log('Server running at: ', 4000);
