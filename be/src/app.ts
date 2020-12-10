import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import dbStarter from './providers/dbProvider';

import typeDefs from './schema';
import resolvers from './resolvers';
import { verifyToken } from './lib/jwt-token';

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (!req.headers.authorization) return { authUser: undefined };

    const bearerHeader = req.headers.authorization;
    const token = bearerHeader.split(' ')[1];
    const authUser = verifyToken(token);
    return { authUser };
  },
  formatError: (err) => ({ message: err.message }),
});

app.use(logger('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../uploads')));
server.applyMiddleware({ app, path: '/graphql' });

const booting = async () => {
  await dbStarter();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

booting();
