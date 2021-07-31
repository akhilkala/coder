import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import useReactQuery from './hooks/useReactQuery';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/Home';

// https://react-spring.io/
// https://www.framer.com/docs/animation/

export default function App(): ReactElement {
  useReactQuery('/contest');

  return (
    <React.Fragment>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <PrivateRoute path="/" component={Home} />
        {/* <Route path="*" component={NotFound} /> */}
      </Switch>
    </React.Fragment>
  );
}
