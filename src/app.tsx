import Layout from '@/components/layout';
import { useRoutes, Navigate } from 'react-router-dom';
import { ROUTE_PATH } from './constants/route'
import { routes } from './routes';


const allRoutes: any[] =[
  {
    path: "/",
    element: <Navigate to={ROUTE_PATH.DASHBOARD} replace />,
  },
  {
    path: "/",
    element: <Layout />,
    children: routes,
  },
];

const App = () => {
  const element = useRoutes(allRoutes);
  return <>{element}</>;
};

export default App;
