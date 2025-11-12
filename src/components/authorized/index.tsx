import { useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/route';
import useAuthStore from '@/store/auth';

const Authorized = () => {
  const { token } = useAuthStore();
  const { pathname } = useLocation();

  const isLogin = useMemo(() => !!token, [token]);

  if (isLogin) {
    if (pathname === ROUTE_PATH.LOGIN) {
      return <Navigate to='/ai' replace />;
    }
    return <Outlet />;
  }

  if (pathname === ROUTE_PATH.LOGIN) {
    return <Outlet />;
  }

  return <Navigate to={ROUTE_PATH.LOGIN} replace />;
};

export default Authorized;
