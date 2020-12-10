import React, { FunctionComponent } from 'react';
import IconButton from '../IconButton';
import Heart from '../../atoms/Icons/Heart';

interface Props {
  onClick?: () => void;
  img?: string;
}

const UploadImg: FunctionComponent<Props> = ({ onClick = undefined, img }) => (
  <>
    {onClick ? <IconButton onClick={onClick} icon={Heart} /> : ''}
    <img src={img} alt="img" />
  </>
);

export default UploadImg;
