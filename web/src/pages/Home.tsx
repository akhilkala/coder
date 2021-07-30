import React, { ReactElement } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import Contests from './Contests';
import Feed from './Feed';
import Profile from './Profile';
import Settings from './Settings';
import Social from './Social';

interface Props {}

export default function Home({}: Props): ReactElement {
  const auth = useAuth();

  return (
    <div className="home page">
      <nav>
        <img src={logo} alt="" />
        <NavLink exact activeClassName="link-active" to="/">
          <i className="fas fa-home"></i>Home
        </NavLink>
        <NavLink activeClassName="link-active" to="/contests">
          <i className="fas fa-calendar"></i>Contests
        </NavLink>
        <NavLink
          activeClassName="link-active"
          to={`/profile/${auth?.user.username}`}
        >
          <i className="fas fa-user"></i>Profile
        </NavLink>
        <NavLink activeClassName="link-active" to="/social">
          <i className="fas fa-users"></i>Social
        </NavLink>
        <NavLink activeClassName="link-active" to="/settings">
          <i className="fas fa-cog"></i>Settings
        </NavLink>
        <button onClick={auth?.logout} className="logout">
          <i className="fas fa-sign-out-alt"></i>Logout
        </button>
      </nav>
      <main>
        <Switch>
          <Route path="/contests" component={Contests} />
          <Route path="/profile/:username" component={Profile} />
          <Route path="/social" component={Social} />
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Feed} />
        </Switch>
      </main>
    </div>
  );
}
