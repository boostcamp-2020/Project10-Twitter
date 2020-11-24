import React, { FunctionComponent } from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

interface Props {
  value: string;
  styled?: 'root' | 'title' | 'sub';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '15px',
      fontWeight: 400,
    },
    title: {
      Color: theme.palette.text,
      fontWeight: 700,
    },
    sub: {
      Color: theme.palette.grey,
    },
  }),
);

const Text: FunctionComponent<Props> = ({ value, styled = 'root' }) => {
  const classes = useStyles();
  switch (styled) {
    case 'root':
    default:
      return <Typography className={classes.root}>{value}</Typography>;
    case 'title':
      return <Typography className={classes.title}>{value}</Typography>;
    case 'sub':
      return <Typography className={classes.sub}>{value}</Typography>;
  }
};

export default Text;
