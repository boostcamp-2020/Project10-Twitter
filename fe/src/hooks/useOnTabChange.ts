import React, { useCallback, useState } from 'react';

const useOnTabChange = (
  initalValue: number,
): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  (e: React.ChangeEvent<{}>, newValue: number) => void,
] => {
  const [value, setValue] = useState(initalValue);

  const onTabChange = useCallback(
    (e: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    },
    [value],
  );
  return [value, setValue, onTabChange];
};

export default useOnTabChange;
