import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../components/Loading';
import useReactQuery from '../hooks/useReactQuery';

interface ProfileRouterProps {
  username: string;
}

export default function Profile({
  match,
}: RouteComponentProps<ProfileRouterProps>): ReactElement {
  const profileFetcher = useReactQuery(
    `/user/profile/${match.params.username}`
  );

  if (profileFetcher.isLoading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="profile page">
      Profile- {JSON.stringify(profileFetcher.data)}
    </div>
  );
}
