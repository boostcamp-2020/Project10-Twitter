import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { FormGroup } from '@material-ui/core';

interface Props {
  children: React.ReactChild[];
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'inherit',
      flexDirection: 'row',
    },
  }),
);

const Form: FunctionComponent<Props> = ({ children }) => {
  const classes = useStyles();
  return <FormGroup className={classes.root}>{children}</FormGroup>;
};

export default Form;
