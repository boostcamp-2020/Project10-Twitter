import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { TitleSubText, Button, Loading, ComponentLoading } from '@molecules';
import { ProfileImg, Text } from '@atoms';
import { useDisplay, useUserState } from '@hooks';
import { getJSXwithUserState } from '@libs';
import { GET_USER_DETAIL } from '@graphql/user';
import { QueryVariableType } from '@types';
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
import UserEditModal from '../UserEditModal';

interface Props {
  userId: string;
}

const UserDetailContainer: FunctionComponent<Props> = ({ children, userId }) => {
  const queryVariable: QueryVariableType = { variables: { userId: userId as string } };
  const { data } = useQuery(GET_USER_DETAIL, queryVariable);
  const [userState, onClickFollow, onClickUnfollow] = useUserState(data?.user);
                                                                   
  const [displayModal, , onClickEditModal] = useDisplay(false);

  const PROFILE_IMG_SIZE = 150;

  const { user, followerCount } = data;

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
            <Button text="edit" variant="outlined" color="primary" onClick={onClickEditModal} />,
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
            <Link href={`/${user.user_id}/follow/`}>
              <a>
                <TitleSubText title="팔로워 수" sub={followerCount.count || 0} />
              </a>
            </Link>
            <Link href={`/${user.user_id}/follow/following`}>
              <a>
                <TitleSubText title="팔로잉 수" sub={user.following_id_list.length} />
              </a>
            </Link>
          </UserFollowContainer>
        </BottomContainer>
        {children}
      </UserMainContainer>
      <UserEditModal displayModal={displayModal} onClickCloseBtn={onClickEditModal} user={user} />
    </DetailContainer>
  );
};

export default UserDetailContainer;
