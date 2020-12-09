import React, { FunctionComponent } from 'react';
import Modal from '../../molecules/Modal';
import NewTweetContainer from '../NewTweetContainer';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
}

const TweetModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn }) => (
  <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
    <NewTweetContainer />
  </Modal>
);

export default TweetModal;
