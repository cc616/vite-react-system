import React, { useMemo } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IRootState } from '@/reducers';
import { ROUTE_PATH } from '@/constants/route';

type IProps = Omit<RouteProps, 'render'>;

const Authorized = ({ children, ...rest }: IProps): JSX.Element => {
  const authState = useSelector(({ auth }: IRootState) => auth);

  const isLogin = useMemo(() => {
    return !!authState.token;
  }, [authState]);

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
