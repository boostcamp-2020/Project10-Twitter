import React, { useState } from 'react';
import { text } from '@storybook/addon-knobs';
import { InputContainer, Button } from '@molecules';
import LoginForm from './index';

export default {
  title: 'Molecules/LoginForm',
  component: LoginForm,
};

export const Default = () => {
  const emailLabelValue = '이메일';
  const emailPlaceholder = '입력!';
  const emailType = 'email';

  const passwordLabelValue = '비밀번호';
  const passwordPlaceholder = '입력!';
  const passwordType = 'password';

  const content = text('text', '로그인');
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;

  const onChange = () => {};

  return (
    <LoginForm>
      <InputContainer
        inputValue=""
        labelValue={emailLabelValue}
        placeholder={emailPlaceholder}
        type={emailType}
        onChange={onChange}
      />
      <InputContainer
        inputValue=""
        labelValue={passwordLabelValue}
        placeholder={passwordPlaceholder}
        type={passwordType}
        onChange={onChange}
      />
      <Button borderRadius={borderRadius} text={content} color={color} variant={variant} />
    </LoginForm>
  );
};
