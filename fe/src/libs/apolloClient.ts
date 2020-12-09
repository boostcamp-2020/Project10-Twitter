import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('jwt_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3001/graphql',
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
  link: authLink.concat(httpLink), // api 서버 url
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
        },
      },
    },
  }),
});

export default apolloClient;
