import gql from 'graphql-tag';

const ADD_USER = gql`
  mutation($userId: String!, $name: String!, $password: String!) {
    response: create_user(user_id: $userId, name: $name, password: $password) {
      response
    }
  }
`;

export default ADD_USER;
