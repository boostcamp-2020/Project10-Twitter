import { Box } from '@material-ui/core';
import styled from 'styled-components';

const MainBox = styled(Box)`
  padding: 5px;
  border-bottom: 1px solid rgb(235, 238, 240);
  display: flex;
`;

const BodyContainer = styled(Box)`
  margin: 0 auto;
  width: 85%;
`;

export { MainBox, BodyContainer };
