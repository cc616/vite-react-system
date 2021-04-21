import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import 'antd/dist/antd.less';
import '@/styles/index.less';

import store from '@/store';

import Login from '@/pages/login';
import Authorized from '@/components/authorized';
import App from './app';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Authorized path="/login" exact>
          <Login />
        </Authorized>
        <Authorized path="/">
          <App />
        </Authorized>
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
