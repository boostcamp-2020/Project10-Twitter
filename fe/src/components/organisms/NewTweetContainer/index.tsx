import React, { FunctionComponent, useState, useEffect, ReactChild } from 'react';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import useMyInfo from '../../../hooks/useMyInfo';
import MainContaier from '../MainContainer';
import ReTweetContaier from '../ReTweetContainer';
import TextArea from '../../atoms/TextArea';
import { Picture } from '../../atoms/Icons';
import TweetFooter from '../../molecules/TweetFooter';
import useOnTextChange from '../../../hooks/useOnTextChange';

interface Props {
  children?: ReactChild;
  tweet?: Tweet;
  onClickQuery: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  parentId?: string;
}

interface Tweet {
  _id: string;
  content: string;
  child_tweet_number: number;
  retweet_user_number: number;
  heart_user_number: number;
  author: Author;
}
interface Author {
  user_id: string;
  name: string;
  profile_img_url: string;
}

const NewTweetContainer: FunctionComponent<Props> = ({ tweet, onClickQuery, parentId }) => {
  const { myProfile } = useMyInfo();
  const [value, setValue, onTextChange] = useOnTextChange('');
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    setBtnDisabled(!value);
  }, [value]);

  const onTweetBtnClick = () => {
    if (parentId) onClickQuery({ variables: { content: value, parentId } });
    else if (tweet) onClickQuery({ variables: { content: value, retweetId: tweet._id } });
    else onClickQuery({ variables: { content: value } });
    setValue('');
  };

  const placeholder = "What's happening";

  return (
    <MainContaier userId={myProfile.user_id} ProfileImgUrl={myProfile.profile_img_url}>
      <TextArea placeholder={placeholder} value={value} onChange={onTextChange} />
      {tweet ? <ReTweetContaier tweet={tweet} /> : <></>}
      <TweetFooter onClick={onTweetBtnClick} btnDisabled={btnDisabled} icons={[Picture]} />
    </MainContaier>
  );
};
export default NewTweetContainer;
