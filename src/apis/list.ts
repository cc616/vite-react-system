import { ITableItem } from '@/typing/list';

import http from '.';

export const getTableList = (): Promise<ITableItem[]> => {
  return http.get('/list/table-list');
};
