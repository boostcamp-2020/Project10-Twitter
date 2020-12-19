import styled from 'styled-components';

const Container = styled.div`
  background: ${(props) => props.color};
`;

const BodyContainer = styled.div`
  margin: auto 0;
`;

const UnderLine = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid rgb(235, 238, 240);
`;

export { BodyContainer, Container, UnderLine };
