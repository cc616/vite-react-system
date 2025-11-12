import { getTableList } from '../list/index.js';
import { toMockJson } from '../utils/helper.js';

export const mockTableListJson = () => {
  const tableList = getTableList({ query: {} });
  toMockJson(tableList, '/list/table-list.json');
};
