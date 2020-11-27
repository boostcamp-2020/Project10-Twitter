import React, { FunctionComponent } from 'react';
import { makeStyles, fade, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Label from '../../atoms/Label';
import Input from '../../atoms/Input';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'inline-block',
    borderRadius: '5px',
    padding: '0.5rem 1rem 0',
    marginRight: '1rem',
    backgroundColor: fade(theme.palette.common.black, 0.05),
    '& label': {
      width: '100%',
    },
  },
}));

interface Props {
  labelValue: string;
  placeholder?: string;
  type: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
}

const InputContainer: FunctionComponent<Props> = ({
  labelValue,
  placeholder = '',
  type,
  variant,
}) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.root}>
      <Label value={labelValue} />
      <Input placeholder={placeholder} type={type} variant={variant} />
    </Box>
  );
};

export default InputContainer;
