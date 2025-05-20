import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getChinaGeo } from '@/apis/dashboard';

interface IActions {
  getChinaGeo: typeof getChinaGeo;
}

type IStore = IActions;

const useDashboardStore = create(
  immer<IStore>(() => ({
    getChinaGeo,
  })),
);

export default useDashboardStore;
