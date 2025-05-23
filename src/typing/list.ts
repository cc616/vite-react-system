import { TABLE_LIST_STATUS } from '@/constants/list';

export interface ITableItem {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: TABLE_LIST_STATUS;
}
