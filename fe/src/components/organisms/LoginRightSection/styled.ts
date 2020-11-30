import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Button from '../../molecules/Button';
import Text from '../../atoms/Text';

const LoginFormContainer = styled(Box)`
  position: absolute;
  top: 15px;
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 95vh;
  z-index: 1;
  background-color: white;
`;

const JoinBox = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  &[style] {
    margin-top: 10px;
  }
`;

const StyledText = styled(Text)`
  &[style] {
  }
`;
export { Container, LoginFormContainer, JoinBox, StyledButton, StyledText };
