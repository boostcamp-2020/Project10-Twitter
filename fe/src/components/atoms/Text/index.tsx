import React, { FunctionComponent } from 'react';
import { Typography, makeStyles } from '@material-ui/core';

interface Props {
  value: string;
  color?: string;
  size?: string;
  weight?: number;
  styled?: string;
}

interface StyledProps {
  color: string;
  size: string;
  weight?: number;
}

const useStyles = makeStyles({
  root: (styledProps: StyledProps) => ({
    color: styledProps.color,
    fontSize: styledProps.size,
    fontWeight: styledProps.weight,
  }),
  title: {
    color: '#000',
    fontSize: '15px',
    fontWeight: 700,
    display: 'inline-block',
  },
  sub: {
    color: 'rgb(91, 112, 131)',
    fontSize: '15px',
    fontWeight: 400,
    display: 'inline-block',
  },
});

const Text: FunctionComponent<Props> = ({
  value,
  color = '#000',
  size = '15px',
  weight = 400,
  styled = 'root',
}) => {
  const classes = useStyles({ color, size, weight });
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
