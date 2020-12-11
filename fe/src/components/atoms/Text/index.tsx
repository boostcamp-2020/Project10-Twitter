import React, { FunctionComponent } from 'react';
import { StyledText, StyledTitleText, StyledSubText } from './styled';

interface Props {
  className?: string;
  value: string;
  color?: string;
  size?: string;
  weight?: number;
  styled?: 'root' | 'title' | 'sub';
}

const Text: FunctionComponent<Props> = ({
  className,
  value,
  color = '#000',
  size = '15px',
  weight = 400,
  styled = 'root',
}) => {
  switch (styled) {
    case 'root':
    default:
      return (
        <StyledText
          className={className}
          color={color}
          theme={{ fontSize: size, fontWeight: weight }}
        >
          {value}
        </StyledText>
      );
    case 'title':
      return (
        <StyledTitleText className={className} theme={{ fontSize: size }}>
          {value}
        </StyledTitleText>
      );
    case 'sub':
      return (
        <StyledSubText className={className} theme={{ fontSize: size }}>
          {value}
        </StyledSubText>
      );
  }
};

export default Text;
