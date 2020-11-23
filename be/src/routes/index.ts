import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas/index';
import root from '../controllers/index';

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
