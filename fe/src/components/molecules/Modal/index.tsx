import React, { FunctionComponent, ReactChild } from 'react';
import { Dialog } from '@material-ui/core';
import Portal from './Portal';

interface Props {
  children: ReactChild[];
  open: boolean;
}

const Modal: FunctionComponent<Props> = ({ children, open }) =>
  Portal({
    children: <Dialog open={open}>{children}</Dialog>,
  });

export default Modal;
