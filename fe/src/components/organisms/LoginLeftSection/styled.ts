import styled from 'styled-components';
import { Box, SvgIcon } from '@material-ui/core';
import { IconLabel } from '@molecules';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 95vh;
  background-color: rgb(122, 204, 254);
`;

const SvgContainer = styled(SvgIcon)`
  position: fixed;
  overflow: hidden;
  color: rgb(29, 161, 242);
  width: 100% !important;
  height: 100% !important;
`;

const StyledIconLabel = styled(IconLabel)`
  && {
    margin-bottom: 40px;

    & svg {
      fill: #fff;
    }
  }
`;

const IconLabelContainer = styled(Box)`
  z-index: 1;
`;
export { StyledIconLabel, IconLabelContainer, Container, SvgContainer };
