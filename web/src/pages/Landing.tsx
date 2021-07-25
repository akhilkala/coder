import React, { ReactElement } from 'react';
import logo from '../assets/logo.png';

interface Props {}

export default function Landing({}: Props): ReactElement {
  return (
    <div className="landing page">
      <img src={logo} alt="" />
    </div>
  );
}
