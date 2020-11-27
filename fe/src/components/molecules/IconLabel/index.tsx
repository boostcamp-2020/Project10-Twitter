import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

interface Props {
  children: React.ReactChild[];
}
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

const IconLabel: FunctionComponent<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <Box component="div" className={classes.root}>
      {children}
    </Box>
  );
};

export default IconLabel;
