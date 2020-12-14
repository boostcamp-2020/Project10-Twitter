import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include',
});

const mergeItems = (a = [], b = []) => {
  return Array.from(new Set([...a, ...b].map((m: any) => m.__ref))).map((r) => ({ __ref: r }));
};

const tweetPolicies = {
  read(existing: any) {
    return existing;
  },
  merge(existing = [], incoming = [], { args: { oldest_tweet_id } }: any) {
    if (!oldest_tweet_id) return mergeItems(incoming, existing);
    return mergeItems(existing, incoming);
  },
};

const userPolicies = {
  read(existing: any) {
    return existing;
  },
  merge(existing = [], incoming = [], { args }: any) {
    return mergeItems(existing, incoming);
  },
};

const notificationPolicies = {
  read(existing: any) {
    return existing;
  },
  merge(existing = [], incoming = [], { args: { oldest_notification_id } }: any) {
    if (!oldest_notification_id) return mergeItems(incoming, existing);
    return mergeItems(existing, incoming);
  },
};

const apolloClient = new ApolloClient({
  link: httpLink, // api 서버 url
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          following_tweet_list: tweetPolicies,
          child_tweet_list: tweetPolicies,
          heart_tweet_list: tweetPolicies,
          search_tweet_list: tweetPolicies,
          user_tweet_list: tweetPolicies,
          user_all_tweet_list: tweetPolicies,
          search_user_list: userPolicies,
          following_list: userPolicies,
          follower_list: userPolicies,
          notification_list: notificationPolicies,
          notification_mention_list: notificationPolicies,
        },
      },
    },
  }),
});

export default apolloClient;
