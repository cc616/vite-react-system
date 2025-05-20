import { ROUTE_PATH } from '@/constants/route';
import Workplace from '@/pages/dashboard/workplace';
import Analysis from '@/pages/dashboard/analysis';
import Detail from '@/pages/detail';
import Exception403 from '@/pages/exception/403';
import Exception404 from '@/pages/exception/404';
import Exception500 from '@/pages/exception/500';
import ResultFailure from '@/pages/result/failure';
import ResultSuccess from '@/pages/result/success';
import { NonIndexRouteObject } from 'react-router-dom';

export interface IRoute extends NonIndexRouteObject {
  title: string;
  path: string;
  children?: IRoute[];
}

export const routes: IRoute[] = [
  {
    path: ROUTE_PATH.DASHBOARD,
    title: 'Dashboard',
    children: [
      {
        path: ROUTE_PATH.ANALYSIS,
        element: <Analysis />,
        title: '分析页',
      },
      {
        path: ROUTE_PATH.WORKPLACE,
        element: <Workplace />,
        title: '工作台',
      },
    ],
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
