import React, { FunctionComponent } from 'react';
import ReTweetContainer from '../ReTweetContainer';
import TweetContainer from '../TweetContainer';

interface Props {
  tweet: Tweet;
}

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
  retweet: Tweet;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const TweetStateContainer: FunctionComponent<Props> = ({ tweet }) => {
  if (tweet.retweet && tweet.retweet._id) return <ReTweetContainer tweet={tweet} />;
  return <TweetContainer tweet={tweet} />;
};
export default TweetStateContainer;
