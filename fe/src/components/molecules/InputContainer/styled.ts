import styled from 'styled-components';
import { Box } from '@material-ui/core';

const Container = styled(Box)`
  display: inline-block;
  border-radius: 5px;
  padding: 0.5rem 1rem 0;
  margin-right: 1rem;
  background-color: #efefef;
  & label {
    width: 100%;
  }
`;

export default Container;
