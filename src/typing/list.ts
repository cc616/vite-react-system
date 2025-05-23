import { TABLE_LIST_STATUS } from '@/constants/list';

export interface ITableItem {
  id: string;
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  status: TABLE_LIST_STATUS;
}

export interface ITableListResponse<T = unknown> {
  list: T;
  total: number;
  page: number;
  pageSize: number;
}
