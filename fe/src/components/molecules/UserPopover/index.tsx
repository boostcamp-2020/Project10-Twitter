import React, { FunctionComponent, ReactElement } from 'react';
import { ListItem } from '@material-ui/core';
import { Button } from '@molecules';
import { useRouter } from 'next/router';
import { useMyInfo } from '@hooks';
import { recreateApollo } from '@libs';
import { Container, StyledList } from './styled';

interface ButtonProps {
  id: number;
  text: string;
  icon?: ReactElement | null;
  color?: 'primary' | 'inherit' | 'default' | 'secondary' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  width?: string;
  onClick?: () => void;
}

const ITEM: Array<ButtonProps> = [
  { id: 0, text: 'USER INFO' },
  { id: 1, text: 'log out' },
];

interface Props {
  closeEvent: () => void;
}

const UsePopover: FunctionComponent<Props> = ({ closeEvent }) => {
  const router = useRouter();
  const { myProfile } = useMyInfo();
  ITEM[0].onClick = () => {
    router.push('/[userId]/[[...type]]', `/${myProfile.user_id}/`, { shallow: true });
    closeEvent();
  };
  ITEM[1].onClick = () => {
    router.push('/login');
    document.cookie = 'jwt = ';
    recreateApollo();
  };
  return (
    <Container component="div">
      <StyledList>
        {ITEM.map((v) => (
          <ListItem key={v.id}>
            <Button text={v.text} onClick={v.onClick} />
          </ListItem>
        ))}
      </StyledList>
    </Container>
  );
};

export default UsePopover;
