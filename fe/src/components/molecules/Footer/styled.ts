import styled from 'styled-components';

const Container = styled.div`
  z-index: 1;
  margin: 0 auto;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 10px;
  & span {
    z-index: 1;
    margin: 0 5px;
    padding-right: 10px;
  }
`;

export default Container;
