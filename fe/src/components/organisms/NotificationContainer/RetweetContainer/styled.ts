import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const SubContainer = styled.div`
  margin: 5px;
  padding: 5px;
  & svg {
    fill: rgb(23, 191, 99);
  }
`;
const Span = styled.span`
  margin: auto 5px;
`;

const Content = styled.div`
  margin: 10px 0;
  font-size: 20px;
`;

export { Container, SubContainer, Span, Content };
