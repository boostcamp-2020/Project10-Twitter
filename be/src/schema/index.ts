const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tweet {
    author_id: String
    content: String
    img_url_list: [String]
    parent_id: String
    retweet_id: String
    child_tweet_number: Int
    child_tweet_list: [Tweet]
  }

  type Query {
    tweet_list: [Tweet]
  }
`;

export default typeDefs;
