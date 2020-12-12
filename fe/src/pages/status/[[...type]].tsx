import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Loading } from '@molecules';
import { SideBar, TweetContainer, TweetDetailContainer } from '@organisms';
import { useInfiniteScroll } from '@hooks';
import { Container, MainContainer } from './styled';
import GET_CHILD_TWEETLIST from '../../graphql/getChildTweetList.gql';
import apolloClient from '../../libs/apolloClient';

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  tweetId: string;
}

interface Tweet {
  _id: string;
  content: string;
  author: Author;
  img_url_list: [string];
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const UserDetail: FunctionComponent = () => {
  const router = useRouter();
  const { type } = router.query;
  const tweetId = type ? type[0] : '';
  const queryVariable: QueryVariable = { variables: { tweetId: tweetId as string } };
  const { loading, error, data, fetchMore } = useQuery(GET_CHILD_TWEETLIST, queryVariable);
  const { _id: bottomTweetId } = data?.tweetList[data?.tweetList.length - 1] || {};
  const fetchMoreEl = useRef(null);
  const [intersecting, loadFinished, setLoadFinished] = useInfiniteScroll(fetchMoreEl);

  useEffect(() => {
    apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'child_tweet_list' });
  }, [tweetId]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (!intersecting || loadFinished || !bottomTweetId || !fetchMore) return;
      const { data: fetchMoreData } = await fetchMore({
        variables: { oldestTweetId: bottomTweetId },
      });
      if (fetchMoreData.tweetList.length < 20) setLoadFinished(true);
    };
    asyncEffect();
  }, [intersecting]);

  return (
    <Container>
      <SideBar />
      <MainContainer>
        <TweetDetailContainer tweetId={tweetId as string} />
        {data ? (
          data.tweetList?.map((tweet: Tweet, index: number) => (
            <TweetContainer key={index} tweet={tweet} updateQuery={GET_CHILD_TWEETLIST} />
          ))
        ) : (
          <Loading message="Loading" />
        )}
        <div ref={fetchMoreEl} />
      </MainContainer>
    </Container>
  );
};

export default UserDetail;
