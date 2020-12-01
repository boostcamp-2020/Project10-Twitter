import styled from 'styled-components';
import { Box } from '@material-ui/core';

const DetailContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const UserBackgroundContainer = styled(Box)`
  height: 30vh;
  & img {
    height: 100%;
    width: 100%;
  }
`;
const BottomContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 0px 15px;
`;
const UserMainContainer = styled(Box)`
  width: 100%;
  position: absolute;
  top: 20vh;
  display: flex;
  flex-direction: column;
`;

const UserFollowContainer = styled(Box)`
  display: flex;
  & div:first-child {
    margin-right: 10px;
  }
`;

const UserImgContainer = styled(Box)`
  z-index: 1px;
  margin-left: 15px;
  bottom: 0;
`;

const ImgCircleContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 100px;
  padding: 5px;
`;

const TopContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export {
  DetailContainer,
  UserBackgroundContainer,
  BottomContainer,
  UserMainContainer,
  TopContainer,
  UserFollowContainer,
  UserImgContainer,
  ImgCircleContainer,
};
