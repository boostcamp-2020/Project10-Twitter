import gql from 'graphql-tag';

export const GET_NOTIFICATION_LIST = gql`
  query($id: String) {
    notifications: notification_list(oldest_notification_id: $id) {
      giver {
        _id
        user_id
        name
        comment
        profile_img_url
      }
      tweet {
        _id
        createAt
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
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
          user_id
          name
          profile_img_url
        }
      }
      type
      _id
      createAt
    }
  }
`;

export const GET_MENTION_NOTIFICATION_LIST = gql`
  query($id: String) {
    notifications: notification_mention_list(oldest_notification_id: $id) {
      giver {
        _id
        user_id
        name
        comment
        profile_img_url
      }
      tweet {
        _id
        createAt
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
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
          user_id
          name
          profile_img_url
        }
      }
      type
      _id
      createAt
    }
  }
`;

export const GET_NOTIFICATION_COUNT = gql`
  query($id: String) {
    count: notification_count(lastest_notification_id: $id) {
      count
    }
  }
`;
