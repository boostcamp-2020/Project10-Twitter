import React, { FunctionComponent, useState, useEffect, ReactChild, useRef } from 'react';
import {
  useMutation,
  MutationFunctionOptions,
  FetchResult,
  useQuery,
  ApolloCache,
} from '@apollo/client';
import { DocumentNode } from 'graphql';
import { TweetFooter, UploadImg } from '@molecules';
import { TextArea, Picture } from '@atoms';
import { useMyInfo, useOnTextChange } from '@hooks';
import { MainContainer, RetweetContainer } from '@organisms';
import UPLOAD_IMAGE from '@graphql/image';
import { TweetType } from '@types';
import { binarySearch } from '@libs';
import { GET_TWEETLIST } from '@graphql/tweet';
import UploadImage from './styled';

interface Props {
  children?: ReactChild;
  tweet?: TweetType;
  onClickQuery: (
    options?: MutationFunctionOptions<any, Record<string, any>> | undefined,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  parentId?: string;
  updateQuery?: { query: DocumentNode; variables?: {}; object?: boolean };
  onClickCloseBtn?: () => void;
}

const NewTweetContainer: FunctionComponent<Props> = ({
  tweet,
  onClickQuery,
  onClickCloseBtn = () => {},
  parentId,
  updateQuery = { query: GET_TWEETLIST, variables: {} },
}) => {
  const { myProfile } = useMyInfo();
  const [value, setValue, onTextChange] = useOnTextChange('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [ImageMutation] = useMutation(UPLOAD_IMAGE);
  const [image, setImage] = useState(undefined);

  const fileUpload = useRef<HTMLInputElement>(null);
  const { data, fetchMore } = useQuery(updateQuery.query, { variables: updateQuery.variables });

  useEffect(() => {
    setBtnDisabled(!value && !image);
  }, [value, image]);

  const updateCache = (
    cache: ApolloCache<any>,
    targetId: string,
    query: { query: DocumentNode; variables?: {} },
    type: 'child_tweet_number' | 'retweet_user_number',
  ) => {
    let source;
    if (updateQuery.object) {
      source = { ...tweet };
      const number = source[type] || 0 + 1;
      source = { ...source, [type]: number };
    } else {
      const res = cache.readQuery<{ tweetList: TweetType[] }>(query);
      if (res) {
        source = [...res.tweetList];
        const idx = binarySearch(source, targetId);
        if (idx === -1) return;
        const number: number = source[idx][type] + 1;
        source[idx] = {
          ...source[idx],
          [type]: number,
        };
      }
    }
    cache.writeQuery({
      query: updateQuery.query,
      variables: updateQuery.variables,
      data: { tweetList: source },
    });
  };

  const onTweetBtnClick = async () => {
    if (parentId && updateQuery)
      await onClickQuery({
        variables: { content: value, parentId, imgUrlList: [image] },
        update: (cache) => {
          updateCache(cache, parentId, updateQuery, 'child_tweet_number');
        },
      });
    else if (tweet && updateQuery)
      await onClickQuery({
        variables: { content: value, retweetId: tweet._id },
        update: (cache) => {
          updateCache(cache, tweet._id, updateQuery, 'retweet_user_number');
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'retweet_user_list' });
        },
      });
    else await onClickQuery({ variables: { content: value, imgUrlList: [image] } });
    let variables = {};
    if (data?.tweetList[0]) variables = { latestTweetId: data?.tweetList[0]._id };
    fetchMore({ variables: { ...variables, ...updateQuery.variables } });
    onClickCloseBtn();
    setValue('');
    imgCloseBtnClick();
  };

  const onClick = () => {
    if (fileUpload.current) fileUpload.current.click();
  };

  const imgCloseBtnClick = () => {
    if (fileUpload.current) {
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
