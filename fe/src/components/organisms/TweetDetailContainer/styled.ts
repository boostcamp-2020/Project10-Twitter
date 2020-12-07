import styled from 'styled-components';
import { Box } from '@material-ui/core';

const DetailContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px rgb(235, 238, 240);
  padding: 15px;
`;

const TweetDetailInfoContainer = styled.div`
  display: flex;
  & div:first-child {
    margin-right: 10px;
  }
`;

const ButtonsContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export { DetailContainer, TweetDetailInfoContainer, ButtonsContainer };
