import { ROLE } from '@/constants/auth';
import { ILogin, IProfile } from '@/typing/auth';

import http from '.';

export const login = ({ username, password }: ILogin): Promise<string> => {
  return http.post<string>('/user/login', { username, password });
};

export const getProfile = (): Promise<IProfile> => {
  return Promise.resolve({
    username: '吴彦祖',
    role: ROLE.ADMIN,
    id: '1',
    position: '高级搬砖专家',
    department: '后台管理系统体验技术部',
    projectCount: 56,
    projectVisitCount: 2123,
    teamTotal: 24,
    teamRanking: 8,
  });
};
