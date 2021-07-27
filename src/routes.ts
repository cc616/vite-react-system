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
  component?: React.FunctionComponent;
  exact: boolean;
  children?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: ROUTE_PATH.DASHBOARD,
    title: 'Dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: ROUTE_PATH.FORM,
    exact: true,
    title: '表单页',
    children: [
      {
        path: ROUTE_PATH.BASIC_FORM,
        component: Detail,
        title: '基础表单',
        exact: true,
      },
    ],
  },
  {
    path: ROUTE_PATH.RESULT,
    exact: true,
    title: '结果页',
    children: [
      {
        path: ROUTE_PATH.RESULT_SUCCESS,
        component: ResultSuccess,
        title: '成功页',
        exact: true,
      },
      {
        path: ROUTE_PATH.RESULT_FAILURE,
        component: ResultFailure,
        title: '失败页',
        exact: true,
      },
    ],
  },
  {
    path: ROUTE_PATH.EXCEPTION,
    exact: true,
    title: '异常页',
    children: [
      {
        path: ROUTE_PATH.EXCEPTION403,
        component: Exception403,
        title: '403',
        exact: true,
      },
      {
        path: ROUTE_PATH.EXCEPTION404,
        component: Exception404,
        title: '404',
        exact: true,
      },
      {
        path: ROUTE_PATH.EXCEPTION500,
        component: Exception500,
        title: '500',
        exact: true,
      },
    ],
  },
];
