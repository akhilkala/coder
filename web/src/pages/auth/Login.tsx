import React, { ReactElement } from 'react';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import useInputState from '../../hooks/useInputState';
import Lottie from 'react-lottie';
import animation from '../../assets/animations/auth.json';
import Button from '../../components/Button';

import { lottieOptions } from '../../utils/utilities';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';

interface Props {}

export default function Login({}: Props): ReactElement {
  const email = useInputState();
  const password = useInputState();

  const [error, setError] = React.useState('');
  const { addToast } = useToasts();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: prevent spam
    try {
      await auth?.login(email.value, password.value);
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="auth auth--login page">
      {/* TODO: Render aside only once */}
      <aside className="left">
        <div className="lottie">
          <Lottie options={lottieOptions(animation)} height={400} width={400} />
        </div>
        <h1>
          Welcome to <span>Coder</span>
        </h1>
      </aside>
      <aside className="right">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {!!error && <div className="error">{error}</div>}
          <Input state={email} name="Email" />
          <Input state={password} name="Password" type="password" />
          <div className="forgot">
            <span>Forgot your password?</span>
          </div>
          <Button>Submit</Button>
          <div className="switch">
            Not a member? <Link to="/register">Join us!</Link>
          </div>
        </form>
      </aside>
    </div>
  );
}
