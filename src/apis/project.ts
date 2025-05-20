import { IProject } from '@/typing/project';

import http from '.';

export const getProjects = (): Promise<IProject[]> => {
  return http.get('/project');
};
