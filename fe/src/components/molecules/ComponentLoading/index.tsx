import React, { useEffect, useRef } from 'react';
import { StyledDiv, LoadingCanvas, Bird } from './styled';

const ComponentLoading: React.FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <StyledDiv>
      <Bird src="https://user-images.githubusercontent.com/49153756/101873372-2da2ab00-3bca-11eb-80d7-cc008402f282.png" />
      <LoadingCanvas ref={canvasRef} />
    </StyledDiv>
  );
};

export default ComponentLoading;
