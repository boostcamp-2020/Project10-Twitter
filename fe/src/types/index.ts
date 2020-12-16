interface QueryVariableType {
  variables: VariableType;
}

interface VariableType {
  userId?: string;
  tweetId?: string;
  searchWord?: string;
}

interface UserType {
  _id: string;
  user_id: string;
  name: string;
  profile_img_url: string;
  comment?: string;
  heart_tweet_id_list: [string];
  following_id_list: [string];
  following_user?: UserType;
  lastest_notification_id?: string;
}

interface TweetType {
  _id: string;
  createAt: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  img_url_list: [string];
  author: UserType;
  retweet_id: string;
  retweet: TweetType;
}

interface NotificationType {
  _id: string;
  createAt: string;
  giver: UserType;
  tweet: TweetType;
  type: string;
}

export type { QueryVariableType, VariableType, UserType, TweetType, NotificationType };
