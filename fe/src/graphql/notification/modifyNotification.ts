import gql from 'graphql-tag';

const CONFIRM_NOTIFICATION = gql`
  mutation($id: String) {
    update_notification(id: $id) {
      response
    }
  }
`;

export default CONFIRM_NOTIFICATION;
