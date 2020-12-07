import ReactDOM from 'react-dom';
import { ReactChild, FunctionComponent } from 'react';

interface Props {
  children: any;
}

const Portal: FunctionComponent<Props> = ({ children }) => {
  const el = document.getElementById('modal');
  console.log(el);
  return ReactDOM.createPortal(children, el as Element);
};

export default Portal;
