import React from 'react';
import { text } from '@storybook/addon-knobs';
import Button from './index';
import Home from '../../atoms/icons/Home';
import Explore from '../../atoms/icons/Explore';
import Twitter from '../../atoms/icons/Twitter';
import Notifications from '../../atoms/icons/Notifications';
import Profiles from '../../atoms/icons/Profiles';

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
  return <Button icon={Home()} text={content} />;
};

export const ExploreButtonWithText = () => {
  const content = text('text', 'Explore');
  return <Button icon={Explore()} text={content} />;
};

export const NotificationsButtonWithText = () => {
  const content = text('text', 'Notifications');
  return <Button icon={Notifications()} text={content} />;
};

export const ProfilesButtonWithText = () => {
  const content = text('text', 'Profiles');
  return <Button icon={Profiles()} text={content} />;
};

export const TwitterButtonWithText = () => {
  const content = text('text', 'Twitter');
  return <Button icon={Twitter()} text={content} />;
};
