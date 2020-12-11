import React, { FunctionComponent } from 'react';
import IconButton from '../IconButton';
import { X } from '../../atoms/Icons';

interface Props {
  onClick?: () => void;
  img?: string;
}

const UploadImg: FunctionComponent<Props> = ({ onClick = undefined, img }) => (
  <>
    {onClick ? <IconButton onClick={onClick} icon={X} /> : ''}
    <img src={img} alt="img" />
  </>
);

export default UploadImg;
