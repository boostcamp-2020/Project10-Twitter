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
    createAt: Date
  }

  type Query {
    following_tweet_list(time: Date!): [Tweet]
    user_tweet_list(user_id: String, time: Date!): [Tweet]
    user_all_tweet_list(user_id: String, time: Date!): [Tweet]
    following_list(user_id: String): [User]
    follower_list(user_id: String): [User]
    search_user_list(search_word: String): [User]
    user_info: User
    get_notification_count: Count
    get_notification: [Notification]
    uploads: [File]
  }

  type Mutation {
    update_user_name(name: String!): Response
    create_user(
      user_id: String!
      name: String!
      password: String!
      profile_img_url: String
    ): Response
    github_login(code: String!): Auth
    local_login(user_id: String!, password: String!): Auth
    follow_user(follow_user_id: String!): User
    unfollow_user(unfollow_user_id: String!): User
    add_basic_tweet(content: String!, img_url_list: [String]): Tweet
    add_reply_tweet(content: String!, img_url_list: [String], parent_id: String!): Tweet
    add_retweet(content: String, retweet_id: String!): Tweet
    delete_tweet(tweet_id: String!): Response
    update_notification: Response
    single_upload(file: Upload!): Image!
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
  }

  type Count {
    count: Int
  }

  type Response {
    response: Boolean
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Notification {
    user: User
    tweet: Tweet
    type: String
    is_read: Boolean
    createAt: Date
  }

  type Image {
    img_url: String
  }

  scalar Date
`;

export default typeDefs;
