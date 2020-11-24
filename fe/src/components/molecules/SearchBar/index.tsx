import React, { FunctionComponent } from 'react';
import { fade, Theme, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import SearchIcon from '../../atoms/icons/Search';
import Input from '../../atoms/Input/index';

interface Props {
  placeholder?: string;
  value: string;
  type: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
}

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    display: 'flex',
    borderRadius: '50px',
    width: '20%',
    backgroundColor: fade(theme.palette.common.black, 0.15),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const SearchBar: FunctionComponent<Props> = ({ placeholder = '', value, type, variant }) => {
  const classes = useStyles();

  return (
    <Box component="div" className={classes.search}>
      <Box component="div" className={classes.searchIcon}>
        <SearchIcon />
      </Box>
      <Box component="div">
        <Input placeholder={placeholder} type={type} variant={variant} />
      </Box>
    </Box>
  );
};

export default SearchBar;
