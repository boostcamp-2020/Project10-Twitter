import gql from 'graphql-tag';

const DELETE_TWEET = gql`
  mutation($tweetId: String!) {
    result: delete_tweet(tweet_id: $tweetId) {
      response
    }
  }
`;

export default DELETE_TWEET;
