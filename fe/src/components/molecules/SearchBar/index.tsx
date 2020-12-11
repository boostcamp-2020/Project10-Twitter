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
  onChange?: (e: React.SyntheticEvent) => void;
  onKeyDown?: (e: React.SyntheticEvent) => void;
}

const SearchBar: FunctionComponent<Props> = ({
  placeholder = '',
  value = '',
  type,
  variant = undefined,
  width = '',
  onChange = (e) => {},
  onKeyDown = (e) => {},
}) => (
  <SearchBox width={width}>
    <SearchIconBox>
      <Search />
    </SearchIconBox>
    <Box component="div">
      <Input
        placeholder={placeholder}
        type={type}
        variant={variant}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Box>
  </SearchBox>
);

export default SearchBar;
