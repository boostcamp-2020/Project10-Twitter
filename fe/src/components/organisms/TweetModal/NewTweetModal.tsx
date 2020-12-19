import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { Modal } from '@molecules';
import { NewTweetContainer } from '@organisms';
import { ADD_BASIC_TWEET } from '@graphql/tweet';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  updateQuery?: { query: DocumentNode; variables?: {}; object?: boolean };
}

const NewTweetModal: FunctionComponent<Props> = ({
  displayModal,
  onClickCloseBtn,
  updateQuery,
}) => {
  const [addBasicTweet, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_BASIC_TWEET,
  );
  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      <NewTweetContainer
        onClickQuery={addBasicTweet}
        onClickCloseBtn={onClickCloseBtn}
        updateQuery={updateQuery}
      />
    </Modal>
  );
};

export default NewTweetModal;
