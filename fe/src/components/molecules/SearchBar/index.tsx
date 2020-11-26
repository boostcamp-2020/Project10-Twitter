import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import { Search } from '../../atoms/Icons';
import Input from '../../atoms/Input/index';
import { SearchBox, SearchIconBox } from './styled';

interface Props {
  placeholder?: string;
  value?: string;
  type: string;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  width?: string;
}

const SearchBar: FunctionComponent<Props> = ({
  placeholder = '',
  value = '',
  type,
  variant = undefined,
  width = '',
}) => (
  <SearchBox width={width}>
    <SearchIconBox>
      <Search />
    </SearchIconBox>
    <Box component="div">
      <Input placeholder={placeholder} type={type} variant={variant} value={value} />
    </Box>
  </SearchBox>
);

export default SearchBar;
