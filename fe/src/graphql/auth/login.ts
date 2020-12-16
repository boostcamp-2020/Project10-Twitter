import gql from 'graphql-tag';

export const GITHUB_LOGIN = gql`
  mutation($code: String!) {
    auth: github_login(code: $code) {
      token
    }
  }
`;

export const LOCAL_LOGIN = gql`
  mutation($userId: String!, $password: String!) {
    auth: local_login(user_id: $userId, password: $password) {
      token
    }
  }
`;
