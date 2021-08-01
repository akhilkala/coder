import { useState } from 'react';

export interface InputState {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

const useToggle = (init?: boolean): InputState => {
  const [value, setValue] = useState<boolean>(!!init);
  const toggle = () => setValue((p) => !p);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(true);
  return { value, toggle, setTrue, setFalse };
};

export default useToggle;
