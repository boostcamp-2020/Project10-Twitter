import { useCallback, useState } from 'react';

export default (
  initalValue: boolean,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void] => {
  const [display, setDisplay] = useState(initalValue);

  const onClick = useCallback(() => {
    setDisplay(!display);
  }, [display]);

  return [display, setDisplay, onClick];
};
