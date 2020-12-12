import React, { FunctionComponent, ReactElement } from 'react';
import { ListItem } from '@material-ui/core';
import { Button } from '@molecules';
import { Container, StyledList } from './styled';

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

const UsePopover: FunctionComponent = () => (
  <Container component="div">
    <StyledList>
      {ITEM.map((v) => (
        <ListItem key={v.id}>
          <Button text={v.text} />
        </ListItem>
      ))}
    </StyledList>
  </Container>
);

export default UsePopover;
