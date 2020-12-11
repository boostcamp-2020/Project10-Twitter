import styled from 'styled-components';

const StyledText = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
`;
const StyledTitleText = styled.span`
  color: #000;
  font-size: ${(props) => props.theme.fontSize};
  font-weight: 700;
  display: inline-block;
  margin-right: 5px;
`;

const StyledSubText = styled.span`
  color: rgb(91, 112, 131);
  font-size: ${(props) => props.theme.fontSize};
  font-weight: 400;
  display: inline-block;
`;

export { StyledText, StyledTitleText, StyledSubText };
