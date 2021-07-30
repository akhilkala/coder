import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface ProfileRouterProps {
  username: string;
}

export default function Profile({
  match,
}: RouteComponentProps<ProfileRouterProps>): ReactElement {
  return <div className="profile page">Profile- {match.params.username}</div>;
}
