import React, { FunctionComponent } from 'react';
import { IconButton, Button } from '@molecules';
import ButtonsBox from './styled';

interface Props {
  icons: FunctionComponent<{}>[];
  onClick: () => void;
  iconOnClick: () => void;
  btnDisabled: boolean;
}

const TweetFooter: FunctionComponent<Props> = ({ icons, iconOnClick, onClick, btnDisabled }) => (
  <ButtonsBox component="div">
    {icons.map((icon, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <IconButton key={index} icon={icon} onClick={iconOnClick} />
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
