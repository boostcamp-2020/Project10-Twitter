import styled from 'styled-components';
import { Box, SvgIcon } from '@material-ui/core';
import IconLabel from '../../molecules/IconLabel';

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
  color: rgba(29, 161, 242, 1);
  width: 100% !important;
  height: 100% !important;
`;

const StyledIconLabel = styled(IconLabel)`
  margin-bottom: 40px;
`;

const IconLabelContainer = styled(Box)`
  z-index: 1;
`;
export { StyledIconLabel, IconLabelContainer, Container, SvgContainer };
