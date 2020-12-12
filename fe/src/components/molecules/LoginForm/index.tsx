import React, { FunctionComponent } from 'react';
import { Form } from '@atoms';

interface Props {
  children: React.ReactChild[];
}

const LoginForm: FunctionComponent<Props> = ({ children }) => <Form>{children}</Form>;

export default LoginForm;
