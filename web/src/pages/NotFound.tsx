import React, { ReactElement } from 'react';
import logo from '../assets/logo.png';

interface Props {}

export default function NotFound({}: Props): ReactElement {
  return (
    <div className="not-found">
      <h1>
        4
        <img src={logo} alt="" />4
      </h1>
      <span>Page Not Found</span>
    </div>
  );
}
