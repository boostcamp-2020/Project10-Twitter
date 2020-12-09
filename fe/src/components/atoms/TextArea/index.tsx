import React, { FunctionComponent } from 'react';
import Text from './styled';

interface Props {
  onChange?: (e: React.SyntheticEvent) => void;
  placeholder?: string;
  value?: string;
}

const TextArea: FunctionComponent<Props> = ({
  onChange = () => {},
  placeholder = '',
  value = '',
}) => {
  return <Text placeholder={placeholder} onChange={onChange} value={value} />;
};

export default TextArea;
