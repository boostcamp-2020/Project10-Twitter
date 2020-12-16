import React, { useCallback, useState, useEffect } from 'react';
import { DocumentNode } from 'graphql';
import { useQuery, useMutation, ApolloCache } from '@apollo/client';
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
  updateQuery: { query: DocumentNode; variables?: {}; object?: boolean },
): [boolean, () => Promise<void>, () => Promise<void>] => {
  const { data } = useQuery(GET_MYINFO);
  const [isHeart, setIsHeart] = useState(getIsHeart(tweet, data?.myProfile));
  const [state, setState] = useState(false);

  const [heartTweet] = useMutation(HEART_TWEET);
  const [unheartTweet] = useMutation(UNHEART_TWEET);
  const setHeartTweet = () => {
    setIsHeart(true);
  };

  const setUnheartTweet = () => {
    setIsHeart(false);
  };

  const updateCache = (cache: ApolloCache<any>, type: string) => {
    let source;
    if (updateQuery.object) {
      source = { ...tweet };
      if (type === 'heart') {
        const number = source.heart_user_number + 1;
        source = { ...source, heart_user_number: number };
      } else {
        const number = source.heart_user_number - 1;
        source = { ...source, heart_user_number: number };
      }
    } else {
      const res: any = cache.readQuery({
        query: updateQuery.query,
        variables: updateQuery.variables || {},
      });
      source = [...res.tweetList];
      const idx = binarySearch(source, tweet._id);
      if (idx === -1) return;
      let number;
      if (type === 'heart') number = source[idx].heart_user_number + 1;
      else number = source[idx].heart_user_number - 1;
      source[idx] = {
        ...source[idx],
        heart_user_number: number,
      };
    }
    cache.writeQuery({
      query: updateQuery.query,
      variables: updateQuery.variables || {},
      data: { tweetList: source },
    });
    cache.evict({ id: 'ROOT_QUERY', fieldName: 'heart_user_list' });
  };

  const onClickHeart = async () => {
    if (!state) {
      setState(true);
      await heartTweet({
        variables: { tweet_id: tweet._id },
        update: (cache) => {
          const userInfo: any = cache.readQuery({ query: GET_MYINFO });
          cache.writeQuery({
            query: GET_MYINFO,
            data: {
              myProfile: {
                ...userInfo.myProfile,
                heart_tweet_id_list: [...userInfo.myProfile.heart_tweet_id_list, tweet._id],
              },
            },
          });
          updateCache(cache, 'heart');
        },
      });
      setHeartTweet();
      setState(false);
    }
  };

  const onClickUnheart = async () => {
    if (!state) {
      setState(true);
      await unheartTweet({
        variables: { tweet_id: tweet._id },
        update: (cache) => {
          const userInfo: any = cache.readQuery({
            query: GET_MYINFO,
          });
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
          updateCache(cache, 'unheart');
        },
      });
      setUnheartTweet();
      setState(false);
    }
  };

  useEffect(() => {
    if (tweet) setIsHeart(getIsHeart(tweet, data?.myProfile));
  }, [tweet]);

  return [isHeart, onClickHeart, onClickUnheart];
};

export default useHeartState;
