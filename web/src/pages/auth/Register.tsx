import React, { ReactElement } from 'react';
import Input from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import useInputState from '../../hooks/useInputState';
import Lottie from 'react-lottie';
import animation from '../../assets/animations/auth.json';
import Button from '../../components/Button';

import { lottieOptions } from '../../utils/utilities';
import { get } from '../../utils/requests';
import { Link } from 'react-router-dom';

interface Props {}

export default function Register({}: Props): ReactElement {
  const name = useInputState();
  //TODO: name and username length checks
  const username = useInputState();
  const email = useInputState();
  const password = useInputState();
  const confirmPassword = useInputState();

  const [usernameCheck, setUsernameCheck] = React.useState({
    valid: false,
    invalid: false,
    loading: false,
  });

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //   await auth?.register(email.value, password.value);
    } catch (err: any) {
      // console.log(err.response);
    }
  };

  const checkAvailability = async () => {
    if (!username.value) {
      setUsernameCheck({
        valid: false,
        loading: false,
        invalid: false,
      });
      return;
    }

    setUsernameCheck((prev) => ({ ...prev, loading: true }));
    const res = await get(`/user/check/${username.value}`);

    setUsernameCheck({
      valid: !res.usernameTaken,
      loading: false,
      invalid: res.usernameTaken,
    });
  };

  return (
    <div className="auth auth--register page">
      <aside className="left">
        <div className="lottie">
          <Lottie options={lottieOptions(animation)} height={400} width={400} />
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
            <Input
              loading={usernameCheck.loading}
              valid={usernameCheck.valid}
              invalid={usernameCheck.invalid}
              onBlur={checkAvailability}
              state={username}
              name="Username"
            />
          </section>
          <Input state={email} name="Email" />
          <section>
            <Input state={password} name="Password" type="password" />
            <Input
              state={confirmPassword}
              name="Confirm Password"
              type="password"
            />
            {/* TODO: Implement captcha */}
          </section>
          <Button>Submit</Button>
          <div className="switch">
            Already a member? <Link to="/login">Login</Link>
          </div>
        </form>
      </aside>
    </div>
  );
}
