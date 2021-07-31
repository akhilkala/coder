import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  loading?: boolean;
  link?: boolean;
  to?: string;
  children?: any;
}

export default function Button({
  loading = false,
  link = false,
  to,
  children,
}: Props): ReactElement {
  if (link)
    return (
      <Link to={to || '/'} className="button">
        {children}
      </Link>
    );

  return <button className="button">{children}</button>;
}
