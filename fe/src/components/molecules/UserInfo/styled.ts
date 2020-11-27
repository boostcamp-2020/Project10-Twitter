import { Box } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled(Box)`
  border-radius: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default Container;
