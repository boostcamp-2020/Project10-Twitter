import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import logger from 'morgan';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import typeDefs from '@schema';
import resolvers from '@resolvers';
import { verifyToken } from '@libs/jwt-token';
import dbStarter from '@providers/dbProvider';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../uploads')));

const port: number = Number(process.env.PORT) || 3000;
const corsOptions = { origin: 'http://localhost:3000', credentials: true };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    if (!req.cookies.jwt) return { authUser: undefined };

    const authUser = verifyToken(req.cookies.jwt);
    return { authUser, res };
  },
  formatError: (err) => ({ message: err.message }),
});
server.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });

const booting = async () => {
  await dbStarter();
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
};

booting();
