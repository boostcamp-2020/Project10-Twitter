import ReactDOM from 'react-dom';
import { ReactChild, FunctionComponent, useState, useEffect } from 'react';

interface Props {
  children: ReactChild;
}

const Portal: FunctionComponent<Props> = ({ children }) => {
  const [el, setEl] = useState<null | HTMLElement>();
  useEffect(() => {
    setEl(document.getElementById('modal'));
  }, []);
  if (el) return ReactDOM.createPortal(children, el as Element);
  return null;
};

export default Portal;
