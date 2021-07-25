import React, { ReactElement } from 'react';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import useInputState from '../../hooks/useInputState';
import Lottie from 'react-lottie';
import animation from '../../assets/animations/auth.json';
import Button from '../../components/Button';

interface Props {}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function Register({}: Props): ReactElement {
  const name = useInputState();
  const username = useInputState();
  const email = useInputState();
  const password = useInputState();
  const confirmPassword = useInputState();

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   await auth?.register(email.value, password.value);
    } catch (err: any) {
      // console.log(err.response);
    }
  };

  return (
    <div className="auth auth--register page">
      <aside className="left">
        <div className="lottie">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
        <h1>
          Welcome to <span>Coder</span>
        </h1>
      </aside>
      <aside className="right">
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <section>
            <Input state={name} name="Name" />
            <Input loading state={username} name="Username" />
          </section>
          <Input state={email} name="Email" />
          <section>
            <Input state={password} name="Password" type="password" />
            <Input
              state={confirmPassword}
              name="Confirm Password"
              type="password"
            />
          </section>
          <Button title="Submit" />
          <div className="switch">
            Already a member? <span>Log in</span>
          </div>
        </form>
      </aside>
    </div>
  );
}
