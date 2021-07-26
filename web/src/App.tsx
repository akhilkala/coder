import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/Home';

// https://react-spring.io/
// https://www.framer.com/docs/animation/

export default function App(): ReactElement {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <PrivateRoute exact path="/" component={Home} />
          {/* <Route path="*" component={NotFound} /> */}
        </Switch>
      </Router>
    </React.Fragment>
  );
}
