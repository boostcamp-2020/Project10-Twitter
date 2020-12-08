import React from 'react';
import TweetContainer from './index';

export default {
  title: 'Organisms/TweetContainer',
  component: TweetContainer,
};

const tweet = {
  _id: '1',
  child_tweet_number: 0,
  content: 'test',
  retweet_user_number: 0,
  heart_user_number: 0,
  author: {
    user_id: '1',
    name: 'test',
    profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
};

export const Default = () => <TweetContainer tweet={tweet} />;
