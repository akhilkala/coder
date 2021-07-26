import React, { ReactElement } from 'react';
import { InputState } from '../hooks/useInputState';
import cn from 'classnames';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/animations/loading.json';
import tickAnimation from '../assets/animations/tick.json';
import crossAnimation from '../assets/animations/cross.json';

import { lottieOptions } from '../utils/utilities';

interface Props {
  state: InputState;
  type?: string;
  placeholder?: string;
  className?: string;
  name: string;
  loading?: boolean;
  valid?: boolean;
  invalid?: boolean;
  onBlur?: (e: any) => void;
}

export default function Input({
  state,
  type,
  placeholder,
  className,
  name,
  loading = false,
  valid = false,
  invalid = false,
  onBlur,
}: Props): ReactElement {
  const [seen, setSeen] = React.useState(false);

  return (
    <div className={cn('input', { loading, valid, invalid })}>
      <h2 className="input-title">
        {name}
        {loading && (
          <span className="input-loading">
            <Lottie
              options={lottieOptions(loadingAnimation)}
              height={50}
              width={50}
            />
          </span>
        )}
        {valid && (
          <span className="input-valid">
            <Lottie
              options={lottieOptions(tickAnimation, false)}
              height={25}
              width={25}
            />
          </span>
        )}
        {invalid && (
          <span className="input-invalid">
            <Lottie
              options={lottieOptions(crossAnimation, false)}
              height={25}
              width={25}
            />
          </span>
        )}
      </h2>

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
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}
