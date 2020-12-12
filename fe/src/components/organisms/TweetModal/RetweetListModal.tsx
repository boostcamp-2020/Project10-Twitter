import React, { FunctionComponent } from 'react';
import { useQuery } from '@apollo/client';
import { Modal, Loading } from '@molecules';
import { UserCard } from '@organisms';
import GET_RETWEET_USER_LIST from '../../../graphql/getRetweetUserList.gql';

interface Props {
  displayModal: boolean;
  onClickCloseBtn: () => void;
  tweetId: string;
}

interface User {
  user_id: string;
  name: string;
  profile_img_url?: string;
  comment?: string;
  following_user?: User;
}

const HeartListModal: FunctionComponent<Props> = ({ displayModal, onClickCloseBtn, tweetId }) => {
  const { loading, error, data } = useQuery(GET_RETWEET_USER_LIST, { variables: { tweetId } });

  return (
    <Modal displayModal={displayModal} onClickCloseBtn={onClickCloseBtn}>
      {data ? (
        data.userList?.map((user: User, index: number) => <UserCard key={index} user={user} />)
      ) : (
        <Loading message="Loading" />
      )}
    </Modal>
  );
};

export default HeartListModal;
