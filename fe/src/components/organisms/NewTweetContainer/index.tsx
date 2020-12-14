import React, { FunctionComponent, useState, useEffect, ReactChild, useRef } from 'react';
import { useMutation, MutationFunctionOptions, FetchResult } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { TweetFooter, UploadImg } from '@molecules';
import { TextArea, Picture } from '@atoms';
import { useMyInfo, useOnTextChange } from '@hooks';
import { MainContainer, RetweetContainer } from '@organisms';
import UPLOAD_IMAGE from '@graphql/image';
import { TweetType } from '@types';
import { binarySearch } from '@libs';
import UploadImage from './styled';

interface Props {
  children?: ReactChild;
  tweet?: TweetType;
  onClickQuery: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  parentId?: string;
  updateQuery?: DocumentNode;
  onClickCloseBtn?: () => void;
}

const NewTweetContainer: FunctionComponent<Props> = ({
  tweet,
  onClickQuery,
  onClickCloseBtn = () => {},
  parentId,
  updateQuery,
}) => {
  const { myProfile } = useMyInfo();
  const [value, setValue, onTextChange] = useOnTextChange('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [ImageMutation] = useMutation(UPLOAD_IMAGE);
  const [image, setImage] = useState(undefined);

  const fileUpload = useRef(null);

  useEffect(() => {
    setBtnDisabled(!value && !image);
  }, [value, image]);

  const onTweetBtnClick = () => {
    if (parentId && updateQuery)
      onClickQuery({
        variables: { content: value, parentId, imgUrlList: [image] },
        update: (cache) => {
          const res = cache.readQuery({ query: updateQuery });
          const source = [...res.tweetList];
          const idx = binarySearch(source, parentId);
          if (idx === -1) return;
          const number: number = source[idx].child_tweet_number + 1;
          source[idx] = {
            ...source[idx],
            child_tweet_number: number,
          };
          cache.writeQuery({
            query: updateQuery,
            data: { tweetList: source },
          });
        },
      });
    else if (tweet && updateQuery)
      onClickQuery({
        variables: { content: value, retweetId: tweet._id },
        update: (cache) => {
          const res = cache.readQuery({ query: updateQuery });
          const source = [...res.tweetList];
          const idx = binarySearch(source, tweet._id);
          if (idx === -1) return;
          const number: number = source[idx].retweet_user_number + 1;
          source[idx] = {
            ...source[idx],
            retweet_user_number: number,
          };
          cache.writeQuery({
            query: updateQuery,
            data: { tweetList: source },
          });
        },
      });
    else onClickQuery({ variables: { content: value, imgUrlList: [image] } });
    onClickCloseBtn();
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
