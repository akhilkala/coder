import { useState } from 'react';

export interface InputState {
  value: boolean;
  toggle: () => void;
}

const useToggle = (init?: boolean): InputState => {
  const [value, setValue] = useState<boolean>(!!init);
  const toggle = () => setValue((p) => !p);
  return { value, toggle };
};

export default useToggle;
