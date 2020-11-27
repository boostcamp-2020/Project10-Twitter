import React from 'react';
import TweetContainer from './index';

export default {
  title: 'Organisms/TweetContainer',
  component: TweetContainer,
};

const tweet = {
  user_id: '1',
  name: 'test',
  content: 'test',
  profile_img_url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
};

export const Default = () => <TweetContainer tweet={tweet} />;
