import React from 'react'
import ReactDOM from 'react-dom'

import { HashRouter, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.less'
import '@/styles/index.less'

import Login from '@/pages/login'
import Authorized from '@/components/authorized'
import App from './app'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Authorized path="/">
          <App />
        </Authorized>
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
