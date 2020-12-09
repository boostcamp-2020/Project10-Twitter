import React, { FunctionComponent } from 'react';
import Container from './styled';

interface Props {
  children: React.ReactChild[];
}

const Form: FunctionComponent<Props> = ({ children }) => <Container>{children}</Container>;

export default Form;
