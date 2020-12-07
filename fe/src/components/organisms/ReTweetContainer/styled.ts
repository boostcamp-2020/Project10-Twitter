import styled from 'styled-components';
import { Box } from '@material-ui/core';

const ButtonsBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const RetweetBox = styled.div`
  padding: 5px;
  border: 1px solid rgb(235, 238, 240);
  border-radius: 10px;
`;

const BodyContainer = styled(Box)`
  margin: 0 auto;
  width: 85%;
`;

const HeaderContainer = styled(Box)`
  padding: 5px;
  display: flex;
`;

export { ButtonsBox, RetweetBox, BodyContainer, HeaderContainer };
