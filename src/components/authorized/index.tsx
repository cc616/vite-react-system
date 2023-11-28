import React, { useMemo } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/route';
import useAuthStore from '@/store/auth';

type IProps = Omit<RouteProps, 'render'>;

const Authorized = ({ children, ...rest }: IProps): JSX.Element => {
  const { token } = useAuthStore();

  const isLogin = useMemo(() => !!token, [token]);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        const { pathname } = location;

        if (isLogin) {
          if (pathname === ROUTE_PATH.LOGIN) {
            return (
              <Redirect
                to={{
                  pathname: ROUTE_PATH.DASHBOARD,
                }}
              />
            );
          }
          return children;
        }

        if (pathname === ROUTE_PATH.LOGIN) {
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: ROUTE_PATH.LOGIN,
            }}
          />
        );
      }}
    />
  );
};

export default Authorized;
