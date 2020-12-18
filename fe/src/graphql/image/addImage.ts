import gql from 'graphql-tag';

const UPLOAD_IMAGE = gql`
  mutation($file: Upload!) {
    img: single_upload(file: $file) {
      img_url
    }
  }
`;

export default UPLOAD_IMAGE;
