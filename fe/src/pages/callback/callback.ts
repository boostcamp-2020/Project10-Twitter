import { gql } from '@apollo/client';

const GITHUB_LOGIN = gql`
  mutation GithubLogin($code: String!) {
    auth: github_login(code: $code) {
      token
    }
  }
`;

export default GITHUB_LOGIN;
