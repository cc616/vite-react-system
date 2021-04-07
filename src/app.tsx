import React, { useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from '@/pages/home'
import Layout from '@/components/layout'

import { getAllFlattenRoutes } from '@/utils/navigation'

import { routes } from './routes'

const App = () => {

  const router = useMemo(() => {
    return getAllFlattenRoutes(routes).filter(route => !!route.component).map((route, index) => (
      <Route key={index} path={route.path} exact={route.exact}>
        {route.component}
      </Route>
    ))
  }, [])

  return (
    <Layout>
      <Switch>
        {router}
      </Switch>
    </Layout>
  )
}

export default App
