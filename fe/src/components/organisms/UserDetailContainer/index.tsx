import React,{FunctionComponent} from 'react';
import TitleSubText from '../../molecules/TitleSubText';
import ProfileImg from '../../atoms/ProfileImg';
import Button from '../../molecules/Button';
import {DetailContainer, UserBackgroundContainer,BottomContainer, UserMainContainer , TopContainer,  UserFollowContainer , UserImgContainer ,ImgCircleContainer} from './styled'
import Text from '../../atoms/Text'
import { useQuery } from '@apollo/client';
import GET_MYINFO from '../../../graphql/getMyInfo.gql'
import GET_USERDETAIL from '../../../graphql/getUserDetail.gql'

interface Props {
    userId: string;
}

const UserDetailContainer: FunctionComponent<Props> = ({children , userId}) => {
    const { loading, error, data } = useQuery(GET_MYINFO);

    const PROFILE_IMG_SIZE = 150
    // const { } = useQuery(GET_USERDETAIL,profileId );
    if (loading) return <div>'Loading...'</div>;
    if (error) return <div>`Error! ${error.message}`</div>;

    const {myProfile }= data

    return (
        <DetailContainer>
            <UserBackgroundContainer>
                <img alt="user background image" src={"https://thumbs.dreamstime.com/z/abstract-orange-yellow-screen-design-mobile-app-soft-trendy-color-gradient-background-144162269.jpg"}/>
            </UserBackgroundContainer>
            <UserMainContainer>
                <TopContainer>
                    <UserImgContainer>
                       <ImgCircleContainer>
                            <ProfileImg img = {myProfile.profile_img_url} size={PROFILE_IMG_SIZE}/>
                        </ImgCircleContainer>
                    </UserImgContainer>
                    {myProfile.user_id == myProfile.user_id ?<Button text="edit"  variant="outlined" color="primary" /> : <Button text="follow" variant="outlined"  color="primary"/> }
                </TopContainer>
                <BottomContainer>
                    <TitleSubText title={myProfile.name} sub={myProfile.user_id} />
                    <Text value={myProfile.comment} />
                    <UserFollowContainer>
                        <TitleSubText title={"팔로우 수"} sub={"133"} />
                        <TitleSubText title={"팔로워 수"} sub={"222"} />
                    </UserFollowContainer>
                </BottomContainer>
                {children}
            </UserMainContainer>
        </DetailContainer>
    );
};

export default UserDetailContainer;

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  