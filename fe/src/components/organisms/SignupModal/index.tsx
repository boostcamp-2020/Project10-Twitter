import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import Modal from '../../molecules/Modal';
import InputContainer from '../../molecules/InputContainer';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
  following_user?: User;
}

const HeartListModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn }) => {
  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      <InputContainer labelValue="아이디" />
      <InputContainer labelValue="이름" />
      <InputContainer labelValue="비밀번호" type="password" />
    </Modal>
  );
};

export default HeartListModal;
