import { Box } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled(Box)`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  border-bottom: 1px solid rgb(235, 238, 240);
`;

const EmptyDiv = styled.div`
  width: 120px;
`;

export { EmptyDiv, Container };
