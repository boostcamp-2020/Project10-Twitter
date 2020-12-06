import React, { FunctionComponent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation } from '@apollo/client';
import useUserState from '../../../hooks/useUserState';
import TitleSubText from '../../molecules/TitleSubText';
import ProfileImg from '../../atoms/ProfileImg';
import Button from '../../molecules/Button';

import {
  DetailContainer,
  UserBackgroundContainer,
  BottomContainer,
  UserMainContainer,
  TopContainer,
  UserFollowContainer,
  UserImgContainer,
  ImgCircleContainer,
} from './styled';
import Text from '../../atoms/Text';
import { getJSXwithUserState } from '../../../utilitys';
import GET_USERDETAIL from '../../../graphql/getUserDetail.gql';
import FOLLOW_USER from '../../../graphql/followUser.gql';
import UNFOLLOW_USER from '../../../graphql/unfollowUser.gql';

interface Props {
  userId: string;
}

interface QueryVariable {
  variables: Variable;
}

interface Variable {
  userId: string;
}

const UserDetailContainer: FunctionComponent<Props> = ({ children, userId }) => {
  const queryVariable: QueryVariable = { variables: { userId: userId as string } };
  const { loading, error, data } = useQuery(GET_USERDETAIL, queryVariable);
  const [userValue, setUserValue] = useState({ user_id: 'initial', following_id_list: [''] });
  const [userState, setFollowUser, setUnfollowUser] = useUserState(userValue);

  useEffect(() => {
    if (data) setUserValue(data.user);
  }, [data]);

  const [followUser] = useMutation(FOLLOW_USER);

  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  const onClickEdit = () => {};

  const onClickFollow = () => {
    followUser({ variables: { follow_user_id: user.user_id } });
    setFollowUser();
  };

  const onClickUnfollow = () => {
    unfollowUser({ variables: { unfollow_user_id: user.user_id } });
    setUnfollowUser();
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const PROFILE_IMG_SIZE = 150;

  const { user, followingList, followerList } = data;

  return (
    <DetailContainer>
      <UserBackgroundContainer>
        <img src={user.background_img_url} alt="user background" />
      </UserBackgroundContainer>
      <UserMainContainer>
        <TopContainer>
          <UserImgContainer>
            <ImgCircleContainer>
              <ProfileImg img={user.profile_img_url} size={PROFILE_IMG_SIZE} />
            </ImgCircleContainer>
          </UserImgContainer>
          {getJSXwithUserState(
            userState,
            <Button text="edit" variant="outlined" color="primary" onClick={onClickEdit} />,
            <Button
              text="unfollow"
              color="primary"
              variant="contained"
              onClick={onClickUnfollow}
            />,
            <Button text="follow" color="primary" variant="outlined" onClick={onClickFollow} />,
          )}
        </TopContainer>
        <BottomContainer>
          <TitleSubText title={user.name} sub={user.user_id} />
          <Text value={user.comment} />
          <UserFollowContainer>
            <Link href={`/${user.user_id}/follow?Following`}>
              <a>
                <TitleSubText title="팔로잉 수" sub={followingList.length} />
              </a>
            </Link>
            <Link href={`/${user.user_id}/follow?Follower`}>
              <a>
                <TitleSubText title="팔로워 수" sub={followerList.length} />
              </a>
            </Link>
          </UserFollowContainer>
        </BottomContainer>
        {children}
      </UserMainContainer>
    </DetailContainer>
  );
};

export default UserDetailContainer;
