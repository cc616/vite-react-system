import React, { useEffect, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '@/components/layout';

import { getAllFlattenRoutes } from '@/utils/navigation';

import { routes } from './routes';
import useAuthStore from './store/auth';

const App = (): JSX.Element => {
  const { token, getProfile } = useAuthStore();

  useEffect(() => {
    if (token) {
      getProfile();
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
