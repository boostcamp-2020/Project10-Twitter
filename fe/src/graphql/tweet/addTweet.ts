import gql from 'graphql-tag';

export const ADD_BASIC_TWEET = gql`
  mutation($content: String!, $imgUrlList: [String]) {
    tweet: add_basic_tweet(content: $content, img_url_list: $imgUrlList) {
      content
      author_id
    }
  }
`;

export const ADD_REPLY_TWEET = gql`
  mutation($content: String!, $imgUrlList: [String], $parentId: String!) {
    tweet: add_reply_tweet(content: $content, img_url_list: $imgUrlList, parent_id: $parentId) {
      content
      author_id
    }
  }
`;

export const ADD_RETWEET = gql`
  mutation($content: String, $retweetId: String!) {
    tweet: add_retweet(content: $content, retweet_id: $retweetId) {
      content
      author_id
    }
  }
`;
