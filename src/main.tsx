import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';

import 'antd/dist/antd.less';
import '@/styles/index.less';

import Login from '@/pages/login';
import Authorized from '@/components/authorized';
import App from './app';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Authorized path="/login" exact>
        <Login />
      </Authorized>
      <Authorized path="/">
        <App />
      </Authorized>
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
);
