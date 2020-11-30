import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Tweet {
    _id: String
    author_id: String
    author: User
    content: String
    img_url_list: [String]
    parent_id: String
    retweet_id: String
    retweet: Tweet
    child_tweet_number: Int
    child_tweet_list: [Tweet]
    retweet_user_number: Int
    heart_user_number: Int
  }

  type Query {
    following_tweet_list: [Tweet]
    user_tweet_list(user_id: String): [Tweet]
    user_all_tweet_list(user_id: String): [Tweet]
    following_list(user_id: String): [User]
    follower_list(user_id: String): [User]
    search_user_list(search_word: String): [User]
    user_info: User
  }

  type Mutation {
    github_login(code: String!): Auth
    follow_user(follow_user_id: String!): User
    unfollow_user(unfollow_user_id: String!): User
    add_basic_tweet(content: String!, img_url_list: [String]): Tweet
    add_reply_tweet(content: String!, img_url_list: [String], parent_id: String!): Tweet
    add_retweet(content: String, retweet_id: String!): Tweet
    delete_tweet(tweet_id: String!): Auth
  }

  type User {
    _id: String
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
  }
`;

export default typeDefs;
