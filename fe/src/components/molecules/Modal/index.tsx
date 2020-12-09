import React, { FunctionComponent, ReactChild } from 'react';
import { Dialog, DialogTitle } from '@material-ui/core';
import Portal from './Portal';
import IconButton from '../IconButton';
import Heart from '../../atoms/Icons/Heart';
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
          <IconButton onClick={onClickCloseBtn} icon={Heart} />
        </DialogTitle>
        <StyledDialogContent>{children}</StyledDialogContent>
      </Dialog>
    </Portal>
  );
};

export default Modal;
