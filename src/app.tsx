import { useEffect } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import Layout from '@/components/layout';
import useAuthStore from '@/store/auth';

import { ROUTE_PATH } from './constants/route';
import { routes } from './routes';

const layoutRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={ROUTE_PATH.DASHBOARD} replace />,
  },
  {
    path: '/',
    element: <Layout />,
    children: routes,
  },
];

const App = () => {
  const { token, getProfile } = useAuthStore();

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const element = useRoutes(layoutRoutes);

  return <>{element}</>;
};

export default App;
