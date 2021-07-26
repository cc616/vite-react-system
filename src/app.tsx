import React, { useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '@/components/layout';

import { getAllFlattenRoutes } from '@/utils/navigation';
import { IRootState } from '@/reducers';
import { getProfile } from '@/apis/auth';
import { useAuthActions } from '@/actions/auth';

import { routes } from './routes';

const App = (): JSX.Element => {
  const { token } = useSelector(({ auth }: IRootState) => auth);
  const authActions = useAuthActions();

  useEffect(() => {
    if (token) {
      getProfile()
        .then((profile) => {
          authActions.setProfile(profile);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  const router = useMemo(() => {
    return getAllFlattenRoutes(routes)
      .filter((route) => !!route.component)
      .map((route, index) => <Route key={index} path={route.path} exact={route.exact} component={route.component} />);
  }, []);

  return (
    <Layout>
      <Switch>{router}</Switch>
    </Layout>
  );
};

export default App;
