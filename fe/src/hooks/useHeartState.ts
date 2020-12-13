import React, { useCallback, useState, useEffect } from 'react';
import { DocumentNode } from 'graphql';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MYINFO } from '@graphql/user';
import { HEART_TWEET, UNHEART_TWEET, GET_TWEETLIST } from '@graphql/tweet';
import { TweetType, UserType } from '@types';
import { binarySearch } from '@libs';

const getIsHeart = (tweet: TweetType, myProfile: UserType) => {
  if (myProfile?.heart_tweet_id_list.includes(tweet?._id)) return true;
  return false;
};

const useHeartState = (
  tweet: TweetType,
  updateQuery: DocumentNode,
): [boolean, () => Promise<void>, () => Promise<void>] => {
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
    await heartTweet({
      variables: { tweet_id: tweet._id },
      update: (cache) => {
        const userInfo = cache.readQuery({ query: GET_MYINFO });
        cache.writeQuery({
          query: GET_MYINFO,
          data: {
            myProfile: {
              ...userInfo.myProfile,
              heart_tweet_id_list: [...userInfo.myProfile.heart_tweet_id_list, tweet._id],
            },
          },
        });
        const res = cache.readQuery({ query: updateQuery });
        const source = [...res.tweetList];
        const idx = binarySearch(source, tweet._id);
        if (idx === -1) return;
        const number: number = source[idx].heart_user_number + 1;
        source[idx] = {
          ...source[idx],
          heart_user_number: number,
        };
        cache.writeQuery({
          query: updateQuery,
          data: { tweetList: source },
        });
      },
    });
    setHeartTweet();
  };

  const onClickUnheart = async () => {
    await unheartTweet({
      variables: { tweet_id: tweet._id },
      update: (cache) => {
        const userInfo = cache.readQuery({ query: GET_MYINFO });
        const arr = [...userInfo.myProfile.heart_tweet_id_list];
        const index = arr.indexOf(tweet._id);
        arr.splice(index, 1);
        cache.writeQuery({
          query: GET_MYINFO,
          data: {
            myProfile: {
              ...userInfo.myProfile,
              heart_tweet_id_list: arr,
            },
          },
        });
        const res = cache.readQuery({ query: updateQuery });
        const source = [...res.tweetList];
        const idx = binarySearch(source, tweet._id);
        if (idx === -1) return;
        const number: number = source[idx].heart_user_number - 1;
        source[idx] = {
          ...source[idx],
          heart_user_number: number,
        };
        cache.writeQuery({
          query: updateQuery,
          data: { tweetList: source },
        });
      },
    });
    setUnheartTweet();
  };

  useEffect(() => {
    if (tweet) setIsHeart(getIsHeart(tweet, data?.myProfile));
  }, [tweet]);

  return [isHeart, onClickHeart, onClickUnheart];
};

export default useHeartState;
