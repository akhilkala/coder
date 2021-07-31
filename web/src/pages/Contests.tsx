import React, { ReactElement } from 'react';
import Loading from '../components/Loading';
import useReactQuery from '../hooks/useReactQuery';

interface Props {}

export default function Contests({}: Props): ReactElement {
  const contestsFetcher = useReactQuery(`/contest`);

  if (contestsFetcher.isLoading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="contests page">
      Contests - {JSON.stringify(contestsFetcher.data)}
    </div>
  );
}
