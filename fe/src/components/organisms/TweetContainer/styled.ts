import styled from 'styled-components';
import { Box } from '@material-ui/core';
import Button from '../../molecules/Button';

const ButtonsBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const PinkButton = styled(Button)`
  && {
    & svg {
      fill: #f783ac;
    }
  }
`;

export { ButtonsBox, PinkButton };
