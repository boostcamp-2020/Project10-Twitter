import gql from 'graphql-tag';

export const FOLLOW_USER = gql`
  mutation($follow_user_id: String!) {
    user: follow_user(follow_user_id: $follow_user_id) {
      user_id
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation($unfollow_user_id: String!) {
    user: unfollow_user(unfollow_user_id: $unfollow_user_id) {
      user_id
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation($name: String!, $comment: String) {
    update_user_info(name: $name, comment: $comment) {
      response
    }
  }
`;
