import React, { FunctionComponent } from 'react';
import { List } from '@material-ui/core';

interface Props {
  children: React.ReactChild[];
}

const SideBar: FunctionComponent<Props> = ({ children }) => <List>{children}</List>;

export default SideBar;
