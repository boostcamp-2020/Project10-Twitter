import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
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
import GET_USERDETAIL from '../../../graphql/getUserDetail.gql';
import GET_MYINFO from '../../../graphql/getMyInfo.gql';

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
  const { loading: myInfoLoading, error: myInfoError, data: myInfo } = useQuery(GET_MYINFO);

  const PROFILE_IMG_SIZE = 150;

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const { userDetail, followingList, followerList } = data;

  return (
    <DetailContainer>
      <UserBackgroundContainer>
        <img src={userDetail.background_img_url} alt="user background" />
      </UserBackgroundContainer>
      <UserMainContainer>
        <TopContainer>
          <UserImgContainer>
            <ImgCircleContainer>
              <ProfileImg img={userDetail.profile_img_url} size={PROFILE_IMG_SIZE} />
            </ImgCircleContainer>
          </UserImgContainer>
          {myInfo.myProfile.following_id_list.includes(userDetail.user_id) ? (
            <Button text="unfollow" color="primary" variant="contained" />
          ) : myInfo.myProfile.user_id != userDetail.user_id ? (
            <Button text="follow" color="primary" variant="outlined" />
          ) : (
            <Button text="edit" variant="outlined" color="primary" />
          )}
        </TopContainer>
        <BottomContainer>
          <TitleSubText title={userDetail.name} sub={userDetail.user_id} />
          <Text value={userDetail.comment} />
          <UserFollowContainer>
            <Link href={`/${userDetail.user_id}/follow?Following`}>
              <a>
                <TitleSubText title="팔로잉 수" sub={followingList.length} />
              </a>
            </Link>
            <Link href={`/${userDetail.user_id}/follow?Follower`}>
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
