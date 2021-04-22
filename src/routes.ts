import { ROUTE_PATH } from '@/constants/route';

import Dashboard from '@/pages/dashboard';
import Detail from '@/pages/detail';

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
];
