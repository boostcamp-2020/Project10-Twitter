import React, { FunctionComponent } from 'react';
import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

interface JSX {}

const getJSXwithUserState = (userState: string, meJSX: JSX, followJSX: JSX, unfollowJSX: JSX) => {
  if (userState === 'me') return meJSX;
  if (userState === 'followUser') return followJSX;
  return unfollowJSX;
};

const makeTimeText = (pastTime: string) => {
  const pastDatetime = new Date(pastTime);
  const timeString = timeAgo.format(pastDatetime, 'round');
  return timeString;
};

export { getJSXwithUserState, makeTimeText };
