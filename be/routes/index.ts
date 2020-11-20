import express from 'express';
import schema from './schemas/index';
import root from '../controllers/index';
import { graphqlHTTP } from 'express-graphql';

const router = express.Router();

router.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);

export default router;
