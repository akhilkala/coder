import React, { ReactElement } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import Landing from '../pages/Landing';
import Loading from './Loading';

interface Props {
  component: React.FC<any>;
  path: string | string[];
  exact?: boolean;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: Props): ReactElement {
  const auth = useAuth();

  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (auth?.user) {
          return <Component {...props} />;
        } else {
          if (auth?.loading)
            return (
              <div className="screen-center">
                <Loading />
              </div>
            );
          return <Landing />;
        }
      }}
    />
  );
}
