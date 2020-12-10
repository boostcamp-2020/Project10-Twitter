import React, { FunctionComponent, useState, useEffect, ReactChild, useRef } from 'react';
import { useMutation } from '@apollo/client';
import useMyInfo from '../../../hooks/useMyInfo';
import MainContaier from '../MainContainer';
import TextArea from '../../atoms/TextArea';
import { Picture } from '../../atoms/Icons';
import TweetFooter from '../../molecules/TweetFooter';
import ADD_BASIC_TWEET from '../../../graphql/addBasicTweet.gql';
import useOnTextChange from '../../../hooks/useOnTextChange';
import IMAGE_UPLOAD from '../../../graphql/imageUpload.gql';
import UploadImg from '../../molecules/UploadImg';
import UploadImage from './styled';

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
  const [ImageMutation] = useMutation(IMAGE_UPLOAD);
  const [image, setImage] = useState(undefined);

  const fileUpload = useRef(null);

  useEffect(() => {
    setBtnDisabled(!value && !image);
  }, [value, image]);

  const onTweetBtnClick = () => {
    addBasicTweet({ variables: { content: value, imgUrlList: [image] } });
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
    <MainContaier userId={myProfile.user_id} ProfileImgUrl={myProfile.profile_img_url}>
      <TextArea placeholder={placeholder} value={value} onChange={onTextChange} />
      {image ? <UploadImg img={image} onClick={imgCloseBtnClick} /> : ''}
      <UploadImage type="file" ref={fileUpload} onChange={onChange} accept=".gif, .jpg, .png" />
      <TweetFooter
        onClick={onTweetBtnClick}
        btnDisabled={btnDisabled}
        icons={[Picture]}
        iconOnClick={onClick}
      />
    </MainContaier>
  );
};
export default NewTweetContainer;
