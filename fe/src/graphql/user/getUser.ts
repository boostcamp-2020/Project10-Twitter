import gql from 'graphql-tag';

export const GET_MYINFO = gql`
  query {
    myProfile: my_info {
      user_id
      name
      comment
      profile_img_url
      following_id_list
      heart_tweet_id_list
      lastest_notification_id
    }
  }
`;

export const GET_USER_DETAIL = gql`
  query($userId: String) {
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

export const GET_FOLLOWER_LIST = gql`
  query($userId: String, $oldestUserId: String) {
    list: follower_list(user_id: $userId, oldest_user_id: $oldestUserId) {
      _id
      user_id
      name
      comment
      profile_img_url
    }
  }
`;

export const GET_FOLLOWING_LIST = gql`
  query($userId: String, $oldestUserId: String) {
    list: following_list(user_id: $userId, oldest_user_id: $oldestUserId) {
      _id
      user_id
      name
      comment
      profile_img_url
    }
  }
`;

export const GET_SEARCH_USERLIST = gql`
  query($searchWord: String!, $oldestUserId: String) {
    searchList: search_user_list(search_word: $searchWord, oldest_user_id: $oldestUserId) {
      _id
      user_id
      name
      comment
      profile_img_url
    }
  }
`;

export const GET_HEART_USERLIST = gql`
  query($tweetId: String, $oldestUserId: String) {
    userList: heart_user_list(tweet_id: $tweetId, oldest_user_id: $oldestUserId) {
      user_id
      name
      profile_img_url
    }
  }
`;

export const GET_RETWEET_USERLIST = gql`
  query($tweetId: String, $oldestUserId: String) {
    userList: retweet_user_list(tweet_id: $tweetId, oldest_user_id: $oldestUserId) {
      user_id
      name
      profile_img_url
    }
  }
`;
