import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from '@molecules';
import { NewTweetContainer } from '@organisms';
import ADD_BASIC_TWEET from '../../../graphql/addBasicTweet.gql';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
}

const NewTweetModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn }) => {
  const [addBasicTweet, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_BASIC_TWEET,
  );
  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      <NewTweetContainer onClickQuery={addBasicTweet} />
    </Modal>
  );
};

export default NewTweetModal;
