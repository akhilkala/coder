import React, { ReactElement } from 'react';

interface Props {
  title: string;
  loading?: boolean;
}

export default function Button({
  title,
  loading = false,
}: Props): ReactElement {
  return <button className="button">{title}</button>;
}
