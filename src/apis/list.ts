import { ITableItem, ITableListResponse } from '@/typing/list';

import http from '.';

export const getTableList = (page: number, pageSize: number) => {
  return http.get<ITableListResponse<ITableItem[]>>('/list/table-list', { page, pageSize });
};
