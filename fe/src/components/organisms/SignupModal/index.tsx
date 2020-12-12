import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from '@molecules';
import { useOnTextChange } from '@hooks';
import { ADD_USER } from '@graphql/user';
import { StyledInputContainer, StyledButton } from './styled';

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
  const [createUser, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_USER);
  const [userId, setUserId, onUserIdChange] = useOnTextChange('');
  const [name, setName, onNameChange] = useOnTextChange('');
  const [password, setPassword, onPasswordChange] = useOnTextChange('');

  const onSignupBtnClick = () => {
    createUser({ variables: { userId, name, password } });
    setUserId('');
    setName('');
    setPassword('');
  };

  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      <StyledInputContainer labelValue="아이디" inputValue={userId} onChange={onUserIdChange} />
      <StyledInputContainer labelValue="이름" inputValue={name} onChange={onNameChange} />
      <StyledInputContainer
        labelValue="비밀번호"
        type="password"
        inputValue={password}
        onChange={onPasswordChange}
      />
      <StyledButton text="가입" color="primary" variant="contained" onClick={onSignupBtnClick} />
    </Modal>
  );
};

export default HeartListModal;
