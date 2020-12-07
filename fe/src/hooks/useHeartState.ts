import React, { useCallback, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import GET_MYINFO from '../graphql/getMyInfo.gql';
import HEART_TWEET from '../graphql/heartTweet.gql';
import UNHEART_TWEET from '../graphql/unheartTweet.gql';

interface Tweet {
  _id: string;
}

interface User {
  heart_tweet_id_list: string[];
}

const getIsHeart = (tweet: Tweet, myProfile: User) => {
  if (myProfile?.heart_tweet_id_list.includes(tweet?._id)) return true;
  return false;
};

const useHeartState = (tweet: Tweet): [boolean, () => Promise<void>, () => Promise<void>] => {
  const { data } = useQuery(GET_MYINFO);
  const [isHeart, setIsHeart] = useState(getIsHeart(tweet, data?.myProfile));

  const [heartTweet] = useMutation(HEART_TWEET);
  const [unheartTweet] = useMutation(UNHEART_TWEET);

  const setHeartTweet = () => {
    setIsHeart(true);
  };

  const setUnheartTweet = () => {
    setIsHeart(false);
  };

  const onClickHeart = async () => {
    await heartTweet({ variables: { tweet_id: tweet._id } });
    setHeartTweet();
  };

  const onClickUnheart = async () => {
    await unheartTweet({ variables: { tweet_id: tweet._id } });
    setUnheartTweet();
  };

  useEffect(() => {
    if (tweet) setIsHeart(getIsHeart(tweet, data?.myProfile));
  }, [tweet]);

  return [isHeart, onClickHeart, onClickUnheart];
};

export default useHeartState;
