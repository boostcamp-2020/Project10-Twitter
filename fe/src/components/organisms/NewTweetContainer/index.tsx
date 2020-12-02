import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useQuery } from '@apollo/client';
import MainContaier from '../MainContainer';
import TextArea from '../../atoms/TextArea';
import IconButton from '../../molecules/IconButton';
import { Picture } from '../../atoms/Icons';
import Button from '../../molecules/Button';
import ButtonsBox from './styled';
import GET_MYINFO from '../../../graphql/getMyInfo.gql';
import useOnTextChange from '../../../hooks/useOnTextChange';

const NewTweetContainer: FunctionComponent = () => {
  const { loading, error, data } = useQuery(GET_MYINFO);
  const [value, , onTextChange] = useOnTextChange('');

  const placeholder = "What's happening";
  const content = 'Tweet';
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error!
        {error.message}
      </div>
    );

  const { myProfile } = data;

  const userProfileImg = myProfile.profile_img_url;

  return (
    <MainContaier ProfileImgUrl={userProfileImg}>
      <TextArea placeholder={placeholder} value={value} onChange={onTextChange} />
      <ButtonsBox component="div">
        <IconButton icon={Picture} />
        <Button borderRadius={borderRadius} text={content} color={color} variant={variant} />
      </ButtonsBox>
    </MainContaier>
  );
};
export default NewTweetContainer;
