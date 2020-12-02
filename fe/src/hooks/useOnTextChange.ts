import { useCallback, useState } from 'react';

export default (
  initalValue: string,
): [string, React.Dispatch<React.SetStateAction<string>>, (e: React.SyntheticEvent) => void] => {
  const [value, setValue] = useState(initalValue);

  const onTextChange = useCallback(
    (e: React.SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      setValue(target.value);
    },
    [value],
  );
  return [value, setValue, onTextChange];
};
