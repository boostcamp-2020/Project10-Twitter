import React, { FunctionComponent, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import useMyInfo from '../../../hooks/useMyInfo';
import MainContaier from '../MainContainer';
import TextArea from '../../atoms/TextArea';
import IconButton from '../../molecules/IconButton';
import { Picture } from '../../atoms/Icons';
import Button from '../../molecules/Button';
import ButtonsBox from './styled';
import ADD_BASIC_TWEET from '../../../graphql/addBasicTweet.gql';
import useOnTextChange from '../../../hooks/useOnTextChange';

const NewTweetContainer: FunctionComponent = () => {
  const { myProfile } = useMyInfo();
  const [value, setValue, onTextChange] = useOnTextChange('');
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

  const placeholder = "What's happening";
  const content = 'Tweet';
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;

  return (
    <MainContaier userId={myProfile.user_id} ProfileImgUrl={myProfile.profile_img_url}>
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
