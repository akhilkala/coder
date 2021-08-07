import React, { ReactElement } from 'react';
import Loading from '../components/Loading';
import useInputState from '../hooks/useInputState';
import useReactQuery from '../hooks/useReactQuery';
import { logos, lottieOptions } from '../utils/utilities';
import Lottie from 'react-lottie';
import animation from '../assets/animations/empty.json';

interface Props {}

interface IContest {
  name: string;
  url: string;
  start_time: Date;
  end_time: Date;
  duration: string;
  site: string;
  in_24_hours: 'Yes' | 'No';
  status: 'CODING' | 'BEFORE';
}

export default function Contests({}: Props): ReactElement {
  const contestsFetcher = useReactQuery(`/contest`);

  const search = useInputState();

  if (contestsFetcher.isLoading) {
    return (
      <div className="screen-center">
        <Loading />
      </div>
    );
  }

  const getDerivedData = () =>
    contestsFetcher.data?.filter((contest: IContest) => {
      const searchTerm = [contest.name, contest.site].join(' ');
      return searchTerm.toLowerCase().includes(search.value.toLowerCase());
    });

  return (
    <div className="contests section">
      {/* TODO: change heading fonts */}
      <h1 className="main-heading">Contests</h1>
      <div className="search">
        <i className="fa fa-search"></i>
        <input
          value={search.value}
          onChange={search.handleChange}
          placeholder="Search"
          type="text"
        />
      </div>
      <div className="list">
        {getDerivedData().map((contest: IContest) => (
          <Contest {...contest} />
        ))}
        {!getDerivedData().length && (
          <div className="empty">
            <Lottie
              options={lottieOptions(animation, false)}
              height={200}
              width={200}
            />
            <h1>No Results Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

function Contest(contest: IContest): ReactElement {
  return (
    <>
      {/* {JSON.stringify(contest)} */}
      <div className="contest">
        <img src={logos(contest.site)} alt="" />
        <a target="_blank" rel="noreferrer noopener" href={contest.url}>
          <div className="title">
            {contest.name}
            <i className="fas fa-link"></i>
          </div>
        </a>
      </div>
    </>
  );
}
