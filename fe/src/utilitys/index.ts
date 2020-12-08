import React, { FunctionComponent } from 'react';

interface JSX {}

const getJSXwithUserState = (userState: string, meJSX: JSX, followJSX: JSX, unfollowJSX: JSX) => {
  if (userState === 'me') return meJSX;
  if (userState === 'followUser') return followJSX;
  return unfollowJSX;
};

export { getJSXwithUserState };
