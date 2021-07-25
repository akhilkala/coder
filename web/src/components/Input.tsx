import React, { ReactElement } from 'react';
import { InputState } from '../hooks/useInputState';

interface Props {
  state: InputState;
  type?: string;
  placeholder?: string;
  className?: string;
  name: string;
}

export default function Input({
  state,
  type,
  placeholder,
  className,
  name,
}: Props): ReactElement {
  const [seen, setSeen] = React.useState(false);

  return (
    <div className="input">
      <h2 className="input-title">{name}</h2>
      <div className="input-container">
        {type === 'password' && !seen && (
          <i onClick={() => setSeen(true)} className="fas fa-eye-slash"></i>
        )}
        {type === 'password' && seen && (
          <i onClick={() => setSeen(false)} className="fas fa-eye"></i>
        )}
        <input
          value={state.value}
          onChange={state.handleChange}
          type={!seen ? (type ? type : 'text') : 'text'}
          placeholder={placeholder}
          className={className || ''}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
