import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { API_SERVER_URL } from '@config';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createUploadLink({
  uri: API_SERVER_URL,
  credentials: 'include',
});

const mergeItems = (a = [], b = []) => {
  return Array.from(new Set([...a, ...b].map((m: any) => m.__ref))).map((r) => ({ __ref: r }));
};

const tweetPolicies = {
  read(existing: any) {
    return existing;
  },
  merge(existing = [], incoming = [], { args: { oldest_tweet_id, latest_tweet_id } }: any) {
    if (oldest_tweet_id) return mergeItems(existing, incoming);
    if (latest_tweet_id) return mergeItems(incoming, existing);
    return incoming;
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

const createApolloClient = () =>
  new ApolloClient({
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

const initializeApollo = (initialState: NormalizedCacheObject = {}) => {
  const _apolloClient = apolloClient || createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = Object.assign(existingCache, initialState);
    _apolloClient.cache.restore(data);
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
};

export default initializeApollo;
