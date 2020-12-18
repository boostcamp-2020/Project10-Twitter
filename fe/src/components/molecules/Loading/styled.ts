import styled, { keyframes } from 'styled-components';

const StyledDiv = styled.div`
  display: block;
  position: fixed;
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
  width: 100%;
  height: calc(100% + 50rem);
  animation: ${slide} 3s ease-in-out infinite alternate;
`;

const grow = keyframes`
0% {
  transform: scale(1);
  opacity: 1;
}
50% {
  transform: scale(1.2) skew(10deg);
  opacity: 0.5;
}
100% {
  transform: scale(1);
  opacity: 1;
}
`;

const StyledP = styled.p`
  margin: 0;
  font-size: 1.5rem;
  position: absolute;
  top: 30%;
  left: calc(50% - 15rem);
  animation: ${grow} 4s infinite linear;
  width: 30rem;
  text-align: center;
  z-index: 100;
`;

const fly = keyframes`
0% {
left: 0;
top: 20%;
}
25% {
left: 25%;
top: 10%;
}
50% {
left: 50%;
top: 20%;
}
75% {
left: 75%;
top: 10%;
}
100% {
left: 100%;
top: 20%;
}
`;

const Bird = styled.img`
  position: absolute;
  width: 20rem;
  height: 20rem;
  top: 20%;
  left: 0;
  z-index: 20;
  animation: ${fly} 5s infinite linear;
`;

export { StyledDiv, LoadingCanvas, StyledP, Bird };
