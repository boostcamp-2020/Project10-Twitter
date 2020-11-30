import styled from 'styled-components';

const StyledText = styled('span')`
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
`;
const StyledTitleText = styled('span')`
  color: '#000';
  font-size: '15px';
  font-weight: 700;
  display: 'inline-block';
`;

const StyledSubText = styled('span')`
  color: 'rgb(91, 112, 131)';
  font-size: '15px';
  font-weight: 400;
  display: 'inline-block';
`;

export { StyledText, StyledTitleText, StyledSubText };
