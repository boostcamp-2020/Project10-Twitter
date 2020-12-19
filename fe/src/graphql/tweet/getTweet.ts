import gql from 'graphql-tag';

export const GET_TWEETLIST = gql`
  query($oldestTweetId: String, $latestTweetId: String) {
    tweetList: following_tweet_list(
      oldest_tweet_id: $oldestTweetId
      latest_tweet_id: $latestTweetId
    ) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      retweet_id
      parent_id
      img_url_list
      retweet {
        _id
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        author {
          _id
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
  }
`;

export const GET_USER_TWEETLIST = gql`
  query($userId: String, $oldestTweetId: String) {
    tweetList: user_tweet_list(user_id: $userId, oldest_tweet_id: $oldestTweetId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      retweet_id
      parent_id
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
  }
`;

export const GET_USER_ALL_TWEETLIST = gql`
  query($userId: String, $oldestTweetId: String) {
    tweetList: user_all_tweet_list(user_id: $userId, oldest_tweet_id: $oldestTweetId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      retweet_id
      parent_id
      img_url_list
      retweet {
        _id
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        img_url_list
        author {
          _id
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
  }
`;

export const GET_TWEET_DETAIL = gql`
  query($tweetId: String!) {
    tweetList: detail_tweet(tweet_id: $tweetId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      retweet_id
      parent_id
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
  }
`;

export const GET_CHILD_TWEETLIST = gql`
  query($tweetId: String!, $oldestTweetId: String) {
    tweetList: child_tweet_list(tweet_id: $tweetId, oldest_tweet_id: $oldestTweetId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      retweet_id
      parent_id
      img_url_list
      retweet {
        _id
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        author {
          _id
          user_id
          name
          profile_img_url
        }
      }
      img_url_list
      author {
        _id
        user_id
        name
        profile_img_url
      }
    }
  }
`;

export const GET_SEARCH_TWEETLIST = gql`
  query($searchWord: String!, $oldestTweetId: String) {
    tweetList: search_tweet_list(search_word: $searchWord, oldest_tweet_id: $oldestTweetId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      img_url_list
      heart_user_number
      retweet_id
      parent_id
      retweet {
        _id
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        author {
          _id
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
  }
`;

export const GET_HEART_TWEETLIST = gql`
  query($userId: String!) {
    tweetList: heart_tweet_list(user_id: $userId) {
      _id
      createAt
      content
      child_tweet_number
      retweet_user_number
      heart_user_number
      img_url_list
      retweet_id
      parent_id
      retweet {
        _id
        content
        child_tweet_number
        retweet_user_number
        heart_user_number
        img_url_list
        author {
          _id
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
  }
`;
