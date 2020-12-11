import React, { useEffect, useRef } from 'react';
import { StyledDiv, LoadingCanvas, StyledP, Bird } from './styled';
import WaveGroup from './WaveGroup';

interface Props {
  message: string;
}

const Loading: React.FC<Props> = ({ message }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx: CanvasRenderingContext2D = canvasRef.current.getContext('2d');
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const waveGroup = new WaveGroup(canvas.width, canvas.height);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveGroup.draw(ctx);
      requestAnimationFrame(animate);
    };

    animate();
  }, [message]);

  return (
    <StyledDiv>
      <Bird src="https://user-images.githubusercontent.com/49153756/101873372-2da2ab00-3bca-11eb-80d7-cc008402f282.png" />
      <LoadingCanvas ref={canvasRef} />
      <StyledP>{message}</StyledP>
    </StyledDiv>
  );
};

export default Loading;
