import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import { Modal, ComponentLoading } from '@molecules';
import { UserCard } from '@organisms';
import { GET_HEART_USERLIST } from '@graphql/user';
import { UserType } from '@types';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  tweetId: string;
}

const HeartListModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn, tweetId }) => {
  const { data } = useQuery(GET_HEART_USERLIST, { variables: { tweetId } });

  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      {data ? (
        data.userList?.map((user: UserType, index: number) => <UserCard key={index} user={user} />)
      ) : (
        <ComponentLoading />
      )}
    </Modal>
  );
};

export default HeartListModal;
