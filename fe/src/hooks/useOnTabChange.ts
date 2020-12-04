import React, { useCallback, useState } from 'react';

const useOnTabChange = (
  initalValue: string,
): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (e: React.ChangeEvent<{}>, newValue: string) => void,
] => {
  const [value, setValue] = useState(initalValue);

  const onTabChange = useCallback(
    (e: React.ChangeEvent<{}>, newValue: string) => {
      setValue(newValue);
    },
    [value],
  );
  return [value, setValue, onTabChange];
};

export default useOnTabChange;
