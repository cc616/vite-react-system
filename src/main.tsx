import '@/styles/index.less';
import '@ant-design/v5-patch-for-react-19';

import { ConfigProvider } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route,Routes } from 'react-router-dom';

import Authorized from '@/components/authorized';
import Login from '@/pages/login';

import App from './app';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0d93ae',
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Authorized />}>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
);
