import React, { FunctionComponent, ReactChild } from 'react';
import { Dialog } from '@material-ui/core';
import Portal from './Portal';

interface Props {
  children: ReactChild;
}

const Modal: FunctionComponent<Props> = ({ children }) =>
  Portal({
    children: (
      <Dialog open>
        <div>hello</div>
      </Dialog>
    ),
  });

export default { Modal };
