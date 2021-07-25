import React, { ReactElement } from 'react';
import { InputState } from '../hooks/useInputState';
import Lottie from 'react-lottie';
import loadingAnimation from '../assets/animations/loading.json';
import tickAnimation from '../assets/animations/tick.json';

interface Props {
  state: InputState;
  type?: string;
  placeholder?: string;
  className?: string;
  name: string;
  loading?: boolean;
  valid?: boolean;
}

const defaultOptions = (animation: any) => ({
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
});

export default function Input({
  state,
  type,
  placeholder,
  className,
  name,
  loading = false,
  valid = false,
}: Props): ReactElement {
  const [seen, setSeen] = React.useState(false);

  return (
    <div className={!loading ? 'input' : 'input input--loading'}>
      <h2 className="input-title">
        {name}
        {loading && (
          <span className="input-loading">
            <Lottie
              options={defaultOptions(loadingAnimation)}
              height={50}
              width={50}
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
        />
      </div>
    </div>
  );
}
