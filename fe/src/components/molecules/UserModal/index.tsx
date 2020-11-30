import React, { FunctionComponent, ReactElement } from 'react';
import { ListItem } from '@material-ui/core';
import Container from './styled';
import Button from '../Button';

interface ButtonProps {
  id: number;
  text: string;
  icon?: ReactElement | null;
  color?: 'primary' | 'inherit' | 'default' | 'secondary' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  width?: string;
}

const ITEM: Array<ButtonProps> = [
  { id: 0, text: 'USER INFO' },
  { id: 1, text: 'log out' },
];

const UserModal: FunctionComponent = () => (
  <Container component="ul">
    {ITEM.map((v) => (
      <ListItem key={v.id}>
        <Button text={v.text} />
      </ListItem>
    ))}
  </Container>
);

export default UserModal;
