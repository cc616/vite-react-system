import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getProjects } from '@/apis/project';

interface IActions {
  getProjects: typeof getProjects;
}

type IStore = IActions;

const useProjectStore = create(
  immer<IStore>(() => ({
    getProjects,
  })),
);

export default useProjectStore;
