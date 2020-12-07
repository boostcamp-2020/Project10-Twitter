import ReactDOM from 'react-dom';
import { ReactChild, FunctionComponent } from 'react';

interface Props {
  children: ReactChild;
}

const Portal: FunctionComponent<Props> = ({ children }) => {
  const el = document.getElementById('modal');
  return ReactDOM.createPortal(children, el as Element);
};

export default Portal;
