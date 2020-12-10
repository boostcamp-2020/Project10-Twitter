import styled from 'styled-components';
import { Box } from '@material-ui/core';
import IconButton from '../../molecules/IconButton';

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

const PinkIconButton = styled(IconButton)`
  && {
    & svg {
      fill: #f783ac;
    }
  }
`;

const TweetHeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export {
  DetailContainer,
  TweetDetailInfoContainer,
  ButtonsContainer,
  PinkIconButton,
  TweetHeaderContainer,
};
