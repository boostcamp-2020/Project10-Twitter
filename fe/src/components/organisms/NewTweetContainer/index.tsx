import React, { FunctionComponent, useState, useEffect, ReactChild } from 'react';
import { useMutation } from '@apollo/client';
import useMyInfo from '../../../hooks/useMyInfo';
import MainContaier from '../MainContainer';
import TextArea from '../../atoms/TextArea';
import { Picture } from '../../atoms/Icons';
import TweetFooter from '../../molecules/TweetFooter';
import ADD_BASIC_TWEET from '../../../graphql/addBasicTweet.gql';
import useOnTextChange from '../../../hooks/useOnTextChange';
import Container from './styled';

interface Props {
  children?: ReactChild;
}

const NewTweetContainer: FunctionComponent<Props> = () => {
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

  return (
    <MainContaier userId={myProfile.user_id} ProfileImgUrl={myProfile.profile_img_url}>
      <TextArea placeholder={placeholder} value={value} onChange={onTextChange} />
      <TweetFooter onClick={onTweetBtnClick} btnDisabled={btnDisabled} icons={[Picture]} />
    </MainContaier>
  );
};
export default NewTweetContainer;
