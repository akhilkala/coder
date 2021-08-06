import React, { ReactElement } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Loading from '../components/Loading';
import useReactQuery from '../hooks/useReactQuery';
//TODO: change default image
import test from '../assets/user.jpg';

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
    <div className="profile section">
      <div className="top">
        <img src={test} alt="" />
        <div className="name">
          <h2>{profileFetcher.data.name}</h2>
          <h3>@{profileFetcher.data.username}</h3>
        </div>
      </div>
      <div className="description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
        veniam rerum quis perspiciatis officia delectus obcaecati, qui provident
        quae pariatur accusamus placeat tenetur sint quo nulla voluptatem
        dolorum aliquam iusto!
      </div>
    </div>
  );
}
