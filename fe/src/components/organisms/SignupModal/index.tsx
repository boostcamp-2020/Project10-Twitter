import React, { FunctionComponent, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from '@molecules';
import { useOnTextChange } from '@hooks';
import { ADD_USER } from '@graphql/user';
import { StyledInputContainer, StyledButton } from './styled';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
}

const HeartListModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn }) => {
  const [createUser] = useMutation(ADD_USER);
  const [userId, setUserId, onUserIdChange] = useOnTextChange('');
  const [name, setName, onNameChange] = useOnTextChange('');
  const [password, setPassword, onPasswordChange] = useOnTextChange('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    setBtnDisabled(!userId || !name || !password);
  }, [userId, name, password]);

  const onSignupBtnClick = () => {
    createUser({ variables: { userId, name, password } });
    setUserId('');
    setName('');
    setPassword('');
    onClickCloseBtn();
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
      <StyledButton
        text="가입"
        color="primary"
        variant="contained"
        onClick={onSignupBtnClick}
        disabled={btnDisabled}
      />
    </Modal>
  );
};

export default HeartListModal;
