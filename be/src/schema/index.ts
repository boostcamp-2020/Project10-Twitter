import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Tweet {
    author_id: String
    author: User
    content: String
    img_url_list: [String]
    parent_id: String
    retweet_id: String
    retweet: Tweet
    child_tweet_number: Int
    child_tweet_list: [Tweet]
  }

  type Query {
    following_tweet_list(id: String): [Tweet]
    user_tweet_list(id: String): [Tweet]
    following_list(id: String): [User]
    follower_list(id: String): [User]
    search_user_list(word: String): [User]
  }

  type Mutation {
    github_login(code: String!): Auth
    follow_user(follow_user_id: String!): User
    unfollow_user(unfollow_user_id: String!): User
    add_basic_tweet(content: String!, img_url_list: [String]): Tweet
    add_reply_tweet(content: String!, img_url_list: [String]): Tweet
    add_retweet(content: String!): Tweet
  }

  type User {
    user_id: String
    name: String
    profile_img_url: String
    comment: String
    background_img_url: String
    following_list: [String]
    following_user: User
  }

  type Auth {
    token: String
    user_info: User
  }
`;

export default typeDefs;
