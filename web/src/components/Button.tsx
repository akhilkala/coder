import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  loading?: boolean;
  link?: boolean;
  to?: string;
  children?: any;
  secondary?: boolean;
  className?: string;
  onClick?: () => any;
}

export default function Button({
  loading = false,
  link = false,
  to,
  children,
  secondary,
  className,
  onClick,
}: Props): ReactElement {
  if (link)
    return (
      <Link
        to={to || '/'}
        className={cn([
          'button',
          { 'button--secondary': secondary },
          className,
        ])}
        onClick={onClick}
      >
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={cn(['button', { 'button--secondary': secondary }, className])}
    >
      {children}
    </button>
  );
}
