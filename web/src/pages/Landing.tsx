import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

interface Props {}

export default function Landing({}: Props): ReactElement {
  return (
    <div className="landing page">
      <nav>
        <span>
          <img src={logo} alt="" />
          {/* <h2>Coder</h2> */}
        </span>
        <div className="links">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <main>
        <h1>Coder</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
          doloribus quos amet commodi hic repellendus, error culpa a quod!
        </p>
        <Link className="cta" to="/login">
          Start Coding
        </Link>
      </main>
    </div>
  );
}
