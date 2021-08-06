import React, { ReactElement } from 'react';
import Loading from '../components/Loading';
import { get } from '../utils/requests';
import { Nullable } from '../utils/types';

interface Props {}

interface IProblem {
  name: string;
  link: string;
}

export default function Feed({}: Props): ReactElement {
  return (
    <div className="feed section">
      <main>asd</main>
      <Problems />
    </div>
  );
}

function Problems({}: Props): ReactElement {
  const [problems, setProblems] = React.useState<Nullable<IProblem[]>>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const fetchProblems = async () => {
    setProblems(null);
    setLoading(true);
    //TODO; error handling (maybe put get post in a custom hook)
    const res = await get('/problem/random/20');
    setProblems(res);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <aside className="problems">
      <h1>Problems</h1>
      {loading && (
        <div className="loading">
          <Loading width={200} height={200} />
        </div>
      )}

      {!loading && (
        <div onClick={fetchProblems} className="shuffle">
          Shuffle <i className="fas fa-random"></i>
        </div>
      )}

      {problems?.map((problem: IProblem) => (
        <div className="problem">
          <span>{problem.name}</span>
          <div className="links">
            {/* TODO: add tooltips */}
            <i className="fas fa-plus"></i>
            <a target="_blank" rel="noreferrer noopener" href={problem.link}>
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      ))}
    </aside>
  );
}
