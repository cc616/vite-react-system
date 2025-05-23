import '@/styles/index.less';
import '@ant-design/v5-patch-for-react-19';
import 'dayjs/locale/zh-cn'; // import locale

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Authorized from '@/components/authorized';
import Login from '@/pages/login';

import App from './app';

dayjs.locale('zh-cn');
dayjs.extend(isLeapYear);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 关闭自动刷新
    },
  },
});

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  </React.StrictMode>,
);
