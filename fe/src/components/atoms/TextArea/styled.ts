import { TextareaAutosize } from '@material-ui/core';
import styled from 'styled-components';

const Text = styled(TextareaAutosize)`
  border-color: white;
  width: 100%;
  font-size: 17px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

export default Text;
