import React from 'react';
import { ListItem } from '@material-ui/core';
import SideBar from './index';
import UserInfo from '../../molecules/UserInfo';
import SearchBar from '../../molecules/SearchBar';

export default {
  title: 'Organisms/SideBar',
  component: SideBar,
};

export const Default = () => {
  const placeholder = 'Search Twitter';
  const type = 'text';
  const variant = 'standard';
  const userId = '홍길동';
  const userName = '@T22e3diXzsOmcpz';

  return (
    <SideBar>
      <ListItem>
        <SearchBar placeholder={placeholder} type={type} variant={variant} />
      </ListItem>
      <ListItem>
        <UserInfo title={userId} sub={userName} inRow={false} width="90%" />
      </ListItem>
    </SideBar>
  );
};
