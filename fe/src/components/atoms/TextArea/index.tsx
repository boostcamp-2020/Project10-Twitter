import React, { FunctionComponent } from 'react';
import Text from './styled';

interface Props {
  onChange?: (e: React.SyntheticEvent) => void;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
}

const TextArea: FunctionComponent<Props> = ({
  onChange = () => {},
  placeholder = '',
  value = '',
  readOnly,
}) => {
  return <Text placeholder={placeholder} onChange={onChange} value={value} readOnly={readOnly} />;
};

export default TextArea;
