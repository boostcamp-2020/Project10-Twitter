import React, { FunctionComponent } from 'react';
import { InputLabel } from '@material-ui/core';

interface Props {
  value: string;
}

const Label: FunctionComponent<Props> = ({ value }) => <InputLabel>{value}</InputLabel>;

export default Label;
