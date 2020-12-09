import React, { FunctionComponent, useState, useEffect, ReactElement } from 'react';
import IconButton from '../../molecules/IconButton';
import Button from '../../molecules/Button';
import ButtonsBox from './styled';

interface Props {
  icons: FunctionComponent<{}>[];
  onClick: () => void;
  btnDisabled: boolean;
}

const TweetFooter: FunctionComponent<Props> = ({ icons, onClick, btnDisabled }) => (
  <ButtonsBox component="div">
    {icons.map((icon, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <IconButton key={index} icon={icon} />
    ))}
    <Button
      borderRadius={50}
      text="Tweet"
      color="primary"
      variant="contained"
      onClick={onClick}
      disabled={btnDisabled}
    />
  </ButtonsBox>
);
export default TweetFooter;
