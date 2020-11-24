import React, { ReactElement, FunctionComponent } from 'react';
import { List, ListItem } from '@material-ui/core';
import Button from '../../molecules/Button';
import Home from '../../atoms/icons/Home';
import Explore from '../../atoms/icons/Explore';
import Twitter from '../../atoms/icons/Twitter';
import Notifications from '../../atoms/icons/Notifications';
import Profiles from '../../atoms/icons/Profiles';

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

const TITLE: Array<ButtonProps> = [
  { id: 0, text: '', icon: Twitter({}) },
  { id: 1, text: '홈', icon: Home({}) },
  { id: 2, text: '탐색하기', icon: Explore({}) },
  { id: 3, text: '알림', icon: Notifications({}) },
  { id: 4, text: '프로필', icon: Profiles({}) },
  { id: 5, text: '트윗', color: 'primary', variant: 'contained', width: '20%' },
];

const SideBar: FunctionComponent<Props> = ({ children }) => (
  <List>
    {TITLE.map((v) => (
      <ListItem key={v.id}>
        <Button text={v.text} icon={v.icon} color={v.color} variant={v.variant} width={v.width} />
      </ListItem>
    ))}
    {children}
  </List>
);

export default SideBar;
