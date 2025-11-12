import { ILogin, IProfile } from '@/typing/auth';

import http from '.';

export const login = ({ username, password }: ILogin): Promise<string> => {
  return http.post<string>('/user/login', { username, password });
};

export const getProfile = (): Promise<IProfile> => {
  return http.get('/user/profile');
};
