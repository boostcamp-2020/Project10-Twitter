import { getTweetList } from '../services/index';

const resolvers = {
  Query: { tweet_list: getTweetList },
};

export default resolvers;
