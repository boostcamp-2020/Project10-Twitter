import React, { FunctionComponent } from 'react';
import { useMutation } from '@apollo/client';
import { Modal } from '@molecules';
import { useOnTextChange } from '@hooks';
import { UPDATE_USER_INFO, GET_MYINFO } from '@graphql/user';
import { UserType } from '@types';
import { StyledInputContainer, StyledButton } from './styled';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  user: UserType;
}

const UserEditModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn, user }) => {
  const [editUser, { loading: mutationLoading, error: mutationError }] = useMutation(
    UPDATE_USER_INFO,
  );
  const [name, setName, onNameChange] = useOnTextChange(user.name);
  const [comment, setComment, onCommentChange] = useOnTextChange(user.comment || '');

  const onEditBtnClick = () => {
    editUser({
      variables: { name, comment },
      update: (cache) => {
        cache.writeQuery({
          query: GET_MYINFO,
          data: { myProfile: { ...user, name, comment } },
        });
      },
    });
    onClickCloseBtn();
  };

  const onCloseBtnClick = () => {
    setName(user.name);
    setComment(user.comment || '');
    onClickCloseBtn();
  };

  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onCloseBtnClick}>
      <StyledInputContainer labelValue="이름" inputValue={name} onChange={onNameChange} />
      <StyledInputContainer
        labelValue="자기소개"
        type="Comment"
        inputValue={comment}
        onChange={onCommentChange}
      />
      <StyledButton
        text="수정"
        color="primary"
        variant="contained"
        onClick={onEditBtnClick}
        disabled={name === ''}
      />
    </Modal>
  );
};

export default UserEditModal;
