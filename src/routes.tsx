import { ROUTE_PATH } from '@/constants/route';

import Dashboard from '@/pages/dashboard';
import Detail from '@/pages/detail';
import ResultSuccess from '@/pages/result/success';
import ResultFailure from '@/pages/result/failure';
import Exception403 from '@/pages/exception/403';
import Exception404 from '@/pages/exception/404';
import Exception500 from '@/pages/exception/500';

export interface IRoute {
  title: string;
  path: string;
  element?: React.FunctionComponent | React.ReactNode;
  children?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: ROUTE_PATH.DASHBOARD,
    title: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: ROUTE_PATH.FORM,
    title: '表单页',
    children: [
      {
        path: ROUTE_PATH.BASIC_FORM,
        element: <Detail />,
        title: '基础表单',
      },
    ],
  },
  {
    path: ROUTE_PATH.RESULT,
    title: '结果页',
    children: [
      {
        path: ROUTE_PATH.RESULT_SUCCESS,
        element: <ResultSuccess />,
        title: '成功页',
      },
      {
        path: ROUTE_PATH.RESULT_FAILURE,
        element: <ResultFailure />,
        title: '失败页',
      },
    ],
  },
  {
    path: ROUTE_PATH.EXCEPTION,
    title: '异常页',
    children: [
      {
        path: ROUTE_PATH.EXCEPTION403,
        element: <Exception403 />,
        title: '403',
      },
      {
        path: ROUTE_PATH.EXCEPTION404,
        element: <Exception404 />,
        title: '404',
      },
      {
        path: ROUTE_PATH.EXCEPTION500,
        element: <Exception500 />,
        title: '500',
      },
    ],
  },
];
