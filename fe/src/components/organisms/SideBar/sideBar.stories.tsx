import React from 'react';
import { ListItem } from '@material-ui/core';
import SideBar from './index';
import Button from '../../molecules/Button';
import Home from '../../atoms/icons/Home';
import Explore from '../../atoms/icons/Explore';
import Twitter from '../../atoms/icons/Twitter';
import Notifications from '../../atoms/icons/Notifications';
import Profiles from '../../atoms/icons/Profiles';

export default {
  title: 'Organisms/SideBar',
  component: SideBar,
};

const TITLE = [
  { id: 0, text: '', icon: Twitter() },
  { id: 1, text: '홈', icon: Home() },
  { id: 2, text: '탐색하기', icon: Explore() },
  { id: 3, text: '알림', icon: Notifications() },
  { id: 4, text: '프로필', icon: Profiles() },
  { id: 5, text: '트윗', color: 'primary', variant: 'contained', width: '50%' }
];

export const Default = () => (
  <SideBar>
    {TITLE.map((v) => (
      <ListItem>
        <Button key={v.id} text={v.text} icon={v.icon} color={v.color} variant={v.variant} />
      </ListItem>
    ))}
  </SideBar>
);
