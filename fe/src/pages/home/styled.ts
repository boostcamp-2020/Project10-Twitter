import styled from 'styled-components';
import { Box } from '@material-ui/core';

const Container = styled(Box)`
  display: flex;
  margin: 0 auto;
  width: 70%;
  height: 100%;
`;

const HomeBox = styled(Box)`
  padding: 5px;
  border-bottom: 1px solid rgb(235, 238, 240);
  font-weight: 800px;
`;

const MainContainer = styled(Box)`
  position: relative;
  margin: 0 0 0 30%;
  width: 65%;
  border-left: 1px solid rgb(235, 238, 240);
  border-right: 1px solid rgb(235, 238, 240);
`;

export { Container, MainContainer, HomeBox };
