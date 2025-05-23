import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getTableList } from '@/apis/list';

interface IActions {
  getTableList: typeof getTableList;
}

type IStore = IActions;

const useListStore = create(
  immer<IStore>(() => ({
    getTableList,
  })),
);

export default useListStore;
