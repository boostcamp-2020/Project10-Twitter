import TimeAgo from 'javascript-time-ago';
import Cookies from 'cookies';

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

const binarySearch = (arr: any, id: string) => {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid]._id < id) right = mid - 1;
    else if (arr[mid]._id > id) left = mid + 1;
    else return mid;
  }
  return -1;
};

const getJWTFromBrowser = (req: any, res: any) => {
  const cookies = new Cookies(req, res);
  return cookies.get('jwt');
};

export { getJSXwithUserState, makeTimeText, binarySearch, getJWTFromBrowser };
