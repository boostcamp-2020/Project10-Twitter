import styled from 'styled-components';
import { InputContainer, Button } from '@molecules';

const StyledInputContainer = styled(InputContainer)`
  && {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1vh;
    margin-right: 0;
  }
`;

const StyledButton = styled(Button)`
  && {
    width: 100%;
    box-sizing: border-box;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
`;

export { StyledInputContainer, StyledButton };
