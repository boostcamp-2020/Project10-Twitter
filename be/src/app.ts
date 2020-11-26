import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import dbStarter from './providers/dbProvider';

import schema from './schema';
import resolvers from './resolvers';
import { verifyToken } from './services/auth';

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 3000;
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req }) => {
    const bearerHeader = req.headers.authorization || '';
    const token = bearerHeader.split(' ')[1];
    const user = verifyToken(token);
    return { user };
  },
});

app.use(logger('dev'));
app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

const booting = async () => {
  await dbStarter();
  app.listen(port, () => {
    console.log('Example app listening on port 3000!');
  });
};

booting();
