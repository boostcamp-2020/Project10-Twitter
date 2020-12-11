import styled from 'styled-components';
import { Box } from '@material-ui/core';

const SearchBox = styled(Box)`
  display: flex;
  border-radius: 50px;
  width: ${(props) => props.width};
  background-color: #ededed;
  padding-right: 20px;
`;

const SearchIconBox = styled(Box)`
  padding: 2px 5px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export { SearchBox, SearchIconBox };
