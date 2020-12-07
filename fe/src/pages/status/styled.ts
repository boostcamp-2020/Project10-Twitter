import styled from 'styled-components';
import { Box } from '@material-ui/core';

const Container = styled(Box)`
  display: flex;
  margin: 0 auto;
  padding: 0 20vw;
  height: 100%;
`;

const MainContainer = styled(Box)`
  position: relative;
  margin: 0 0 0 20vw;
  width: 65vw;
  border-left: 1px solid rgb(235, 238, 240);
  border-right: 1px solid rgb(235, 238, 240);
`;

const UserBox = styled(Box)`
  padding: 5px;
  border-bottom: 1px solid rgb(235, 238, 240);
`;

export { Container, MainContainer, UserBox };
