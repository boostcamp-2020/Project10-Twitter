import React, { FunctionComponent, ReactElement, useState } from 'react';
import MainContaier from '../MainContainer';
import TextArea from '../../atoms/TextArea';
import IconButton from '../../molecules/IconButton';
import { Picture } from '../../atoms/Icons';
import Button from '../../molecules/Button';
import ButtonsBox from './styled';

interface Props {
  img?: string;
}

const NewTweetContainer: FunctionComponent<Props> = ({ img = '' }) => {
  const placeholder = "What's happening";
  const content = 'Tweet';
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;

  const [value, setValue] = useState('');
  const onChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  return (
    <MainContaier ProfileImgUrl={img}>
      <TextArea placeholder={placeholder} value={value} onChange={onChange} />
      <ButtonsBox component="div">
        <IconButton icon={Picture} />
        <Button borderRadius={borderRadius} text={content} color={color} variant={variant} />
      </ButtonsBox>
    </MainContaier>
  );
};
export default NewTweetContainer;
