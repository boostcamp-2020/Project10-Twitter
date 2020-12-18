import styled, { keyframes } from 'styled-components';

const StyledDiv = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 11;
  opacity: 0.5;
  overflow: hidden;
`;

const slide = keyframes`
from {
  transform: translate(0, 0);
}
to {
  transform: translate(0, -10rem);
}
`;

const LoadingCanvas = styled.canvas`
  position: relative;
  width: 100%;
  height: calc(100% + 50rem);
  animation: ${slide} 3s ease-in-out infinite alternate;
`;

const fly = keyframes`
0% {
top: 20%;
}
25% {
top: 10%;
}
50% {
top: 20%;
}
75% {
top: 10%;
}
100% {
top: 20%;
}
`;

const Bird = styled.img`
  position: absolute;
  width: 10rem;
  height: 10rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  animation: ${fly} 5s infinite linear;
`;

export { StyledDiv, LoadingCanvas, Bird };
