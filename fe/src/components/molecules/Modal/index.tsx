import React, { FunctionComponent, ReactChild } from 'react';
import { Dialog, DialogTitle, Slide } from '@material-ui/core';
import { X } from '@atoms';
import { IconButton } from '@molecules';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import Portal from './Portal';
import StyledDialogContent from './styled';

interface Props {
  children: ReactChild | ReactChild[];
  displayModal: boolean;
  onClickCloseBtn: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal: FunctionComponent<Props> = ({ children, displayModal, onClickCloseBtn }) => {
  return (
    <Portal>
      <Dialog
        open={displayModal}
        onClose={onClickCloseBtn}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <IconButton onClick={onClickCloseBtn} icon={X} />
        </DialogTitle>
        <StyledDialogContent>{children}</StyledDialogContent>
      </Dialog>
    </Portal>
  );
};

export default Modal;
