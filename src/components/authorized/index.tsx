import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { getLocalStorage } from '@/utils/localStorage'

type IProps = Omit<RouteProps, 'render'>

const Authorized = ({
  children,
  ...rest
}: IProps) => {
  const isLogin = !!getLocalStorage('token')

  return (
    <Route {...rest} render={() => {
      if (isLogin) {
        return children
      }

      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }} />
  )
}

export default Authorized
