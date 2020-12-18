import gql from 'graphql-tag';

const DETAIL_PAGE = gql`
  query($userId: String, $oldestTweetId: String) {
    tweetList: user_tweet_list(user_id: $userId, oldest_tweet_id: $oldestTweetId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      retweet_id
      img_url_list
      retweet {
        _id
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        img_url_list
        author {
          user_id
          name
          profile_img_url
        }
      }
      author {
        _id
        user_id
        name
        profile_img_url
      }
    }
    user: user_info(user_id: $userId) {
      _id
      user_id
      name
      comment
      profile_img_url
      background_img_url
      following_id_list
    }
    followerCount: follower_count(user_id: $userId) {
      count
    }
  }
`;

export default DETAIL_PAGE;
