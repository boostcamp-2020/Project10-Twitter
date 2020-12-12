import React, { FunctionComponent, useState, useEffect, ReactChild, useRef } from 'react';
import { useMutation, MutationFunctionOptions, FetchResult } from '@apollo/client';
import { TweetFooter, UploadImg } from '@molecules';
import { TextArea, Picture } from '@atoms';
import { useMyInfo, useOnTextChange } from '@hooks';
import { MainContainer, RetweetContainer } from '@organisms';
import IMAGE_UPLOAD from '../../../graphql/imageUpload.gql';
import UploadImage from './styled';

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
  const [ImageMutation] = useMutation(IMAGE_UPLOAD);
  const [image, setImage] = useState(undefined);

  const fileUpload = useRef(null);

  useEffect(() => {
    setBtnDisabled(!value && !image);
  }, [value, image]);

  const onTweetBtnClick = () => {
    if (parentId) onClickQuery({ variables: { content: value, parentId, imgUrlList: [image] } });
    else if (tweet) onClickQuery({ variables: { content: value, retweetId: tweet._id } });
    else onClickQuery({ variables: { content: value, imgUrlList: [image] } });
    setValue('');
    imgCloseBtnClick();
  };

  const onClick = () => {
    if (fileUpload) fileUpload.current.click();
  };

  const imgCloseBtnClick = () => {
    if (fileUpload) {
      fileUpload.current.value = '';
    }
    setImage(undefined);
  };

  const onChange = async ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    if (validity) {
      const {
        data: { img },
      } = await ImageMutation({ variables: { file } });
      setImage(img.img_url);
    }
  };

  const placeholder = "What's happening";

  return (
    <MainContainer userId={myProfile.user_id} ProfileImgUrl={myProfile.profile_img_url}>
      <TextArea placeholder={placeholder} value={value} onChange={onTextChange} />
      {tweet ? <RetweetContainer tweet={tweet} /> : <></>}
      {image ? <UploadImg img={image} onClick={imgCloseBtnClick} /> : ''}
      <UploadImage type="file" ref={fileUpload} onChange={onChange} accept=".gif, .jpg, .png" />
      <TweetFooter
        onClick={onTweetBtnClick}
        btnDisabled={btnDisabled}
        icons={[Picture]}
        iconOnClick={onClick}
      />
    </MainContainer>
  );
};
export default NewTweetContainer;
