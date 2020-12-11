import styled from 'styled-components';
import { Box } from '@material-ui/core';

const Container = styled(Box)`
  position: fixed;
  top: 0px;
  height: 100%;
  width: 20vw;
  padding: 0;
  display: flex;
  flex-direction: column;

  & li:last-child {
    margin-top: auto;
    margin-bottom: 3vh;
  }
`;

export default Container;
