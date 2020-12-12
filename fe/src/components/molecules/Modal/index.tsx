import React, { FunctionComponent, ReactChild } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import { X } from '@atoms';
import { IconButton } from '@molecules';
import Portal from './Portal';
import StyledDialogContent from './styled';

interface Props {
  children: ReactChild | ReactChild[];
  displayModal: boolean;
  onClickCloseBtn: () => void;
}

const Modal: FunctionComponent<Props> = ({ children, displayModal, onClickCloseBtn }) => {
  return (
    <Portal>
      <Dialog open={displayModal} onClose={onClickCloseBtn} fullWidth maxWidth="sm">
        <DialogTitle>
          <IconButton onClick={onClickCloseBtn} icon={X} />
        </DialogTitle>
        <StyledDialogContent>{children}</StyledDialogContent>
      </Dialog>
    </Portal>
  );
};

export default Modal;
