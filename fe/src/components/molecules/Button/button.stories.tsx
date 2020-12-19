import React from 'react';
import { text } from '@storybook/addon-knobs';
import { Home, Explore, Twitter, Notifications, Profiles } from '@atoms';
import Button from './index';

export default {
  title: 'Molecules/Button',
  component: Button,
};

export const Default = () => {
  const content = text('text', 'Tweet');
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;
  const width = '50%';

  return (
    <Button
      width={width}
      borderRadius={borderRadius}
      text={content}
      color={color}
      variant={variant}
    />
  );
};

export const HomeButtonWithText = () => {
  const content = text('text', 'Home');
  return <Button icon={Home({})} text={content} />;
};

export const ExploreButtonWithText = () => {
  const content = text('text', 'Explore');
  return <Button icon={Explore({})} text={content} />;
};

export const NotificationsButtonWithText = () => {
  const content = text('text', 'Notifications');
  return <Button icon={Notifications({})} text={content} />;
};

export const ProfilesButtonWithText = () => {
  const content = text('text', 'Profiles');
  return <Button icon={Profiles({})} text={content} />;
};

export const TwitterButtonWithText = () => {
  const content = text('text', 'Twitter');
  return <Button icon={Twitter({})} text={content} />;
};

export const LoginButton = () => {
  const content = text('text', '로그인');
  const color = 'primary';
  const variant = 'contained';
  const borderRadius = 50;

  return <Button borderRadius={borderRadius} text={content} color={color} variant={variant} />;
};
