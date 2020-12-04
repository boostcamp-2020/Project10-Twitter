import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MainContaier from '../MainContainer';
import TextArea from '../../atoms/TextArea';
import IconButton from '../../molecules/IconButton';
import { Picture } from '../../atoms/Icons';
import Button from '../../molecules/Button';
import ButtonsBox from './styled';
import GET_MYINFO from '../../../graphql/getMyInfo.gql';
import ADD_BASIC_TWEET from '../../../graphql/addBasicTweet.gql';
import useOnTextChange from '../../../hooks/useOnTextChange';

const NewTweetContainer: FunctionComponent = () => {
  const { loading: queryLoading, error: queryError, data } = useQuery(GET_MYINFO);
  const [value, setValue, onTextChange] = useOnTextChange('');
  const placeholder = "What's happening";
  const content = 'Tweet';
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [addBasicTweet, { loading: mutationLoading, error: mutationError }] = useMutation(
    ADD_BASIC_TWEET,
  );
  useEffect(() => {
    setBtnDisabled(!value);
  }, [value]);

  const onTweetBtnClick = () => {
    addBasicTweet({ variables: { content: value } });
    setValue('');
  };

  if (queryLoading) return <div>Loading...</div>;
  if (queryError)
    return (
      <div>
        Error!
        {queryError.message}
      </div>
    );

  const { myProfile } = data;
  const userProfileImg = myProfile.profile_img_url;

  return (
    <MainContaier ProfileImgUrl={userProfileImg}>
      <TextArea placeholder={placeholder} value={value} onChange={onTextChange} />
      <ButtonsBox component="div">
        <IconButton icon={Picture} />
        <Button
          borderRadius={borderRadius}
          text={content}
          color={color}
          variant={variant}
          onClick={onTweetBtnClick}
          disabled={btnDisabled}
        />
      </ButtonsBox>
    </MainContaier>
  );
};
export default NewTweetContainer;
