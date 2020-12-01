import { Box } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled(Box)`
  border-radius: 15px;
  position: relative;
  border: 1px solid #efefef;

  &::before {
    position: absolute;
    bottom: -7px;
    left: 15px;
    width: 12px;
    height: 12px;
    content: '';
    border-bottom: 1px solid #efefef;
    border-right: 1px solid #efefef;
    transform: rotate(45deg);
    z-index: 1;
    background-color: #fff;
  }
`;

export default Container;
