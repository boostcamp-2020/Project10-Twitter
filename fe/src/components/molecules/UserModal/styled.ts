import { List, Box } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled(Box)`
  position: absolute;
  bottom: 10vh;
  right: 5vw;
`;

const StyledList = styled(List)`
  border-radius: 15px;
  position: relative;
  border: 1px solid #dee2e6;
  background-color: #fff;
  box-shadow: 3px 3px 3px #999;
  z-index: 1;

  &::before {
    position: absolute;
    bottom: -7px;
    left: 15px;
    width: 12px;
    height: 12px;
    content: '';
    border-bottom: 1px solid #dee2e6;
    border-right: 1px solid #dee2e6;
    box-shadow: 3px 3px 3px #999;
    transform: rotate(45deg);
    background-color: #fff;
  }
`;

export { Container, StyledList };
