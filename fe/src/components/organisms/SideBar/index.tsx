import React, { ReactElement, FunctionComponent } from 'react';
import styled from 'styled-components';
import { Box, ListItem } from '@material-ui/core';
import Button from '../../molecules/Button';
import { Home, Explore, Twitter, Notifications, Profiles } from '../../atoms/Icons';

interface Props {
  children: React.ReactChild[];
}

interface ButtonProps {
  id: number;
  text: string;
  icon?: ReactElement | null;
  color?: 'primary' | 'inherit' | 'default' | 'secondary' | undefined;
  variant?: 'contained' | 'text' | 'outlined' | undefined;
  width?: string;
}

const Container = styled(Box)`
  position: fixed;
  top: 0px;
  height: 100%;
`;

const TITLE: Array<ButtonProps> = [
  { id: 0, text: '', icon: Twitter({ width: '40px', height: '40px' }) },
  { id: 1, text: '홈', icon: Home({ width: '30px', height: '30px' }) },
  { id: 2, text: '탐색하기', icon: Explore({ width: '30px', height: '30px' }) },
  { id: 3, text: '알림', icon: Notifications({ width: '30px', height: '30px' }) },
  { id: 4, text: '프로필', icon: Profiles({ width: '30px', height: '30px' }) },
  { id: 5, text: 'Tweet', color: 'primary', variant: 'contained', width: '90%' },
];

const SideBar: FunctionComponent<Props> = ({ children }) => (
  <Container component="ul">
    {TITLE.map((v) => (
      <ListItem key={v.id}>
        <Button text={v.text} icon={v.icon} color={v.color} variant={v.variant} width={v.width} />
      </ListItem>
    ))}
    {children}
  </Container>
);

export default SideBar;
