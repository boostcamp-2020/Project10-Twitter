import gql from 'graphql-tag';

export const UNHEART_TWEET = gql`
  mutation($tweet_id: String!) {
    tweet: unheart_tweet(tweet_id: $tweet_id) {
      content
    }
  }
`;

export const HEART_TWEET = gql`
  mutation($tweet_id: String!) {
    tweet: heart_tweet(tweet_id: $tweet_id) {
      content
    }
  }
`;
