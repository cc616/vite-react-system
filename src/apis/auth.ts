import { ROLE } from '@/constants/auth';
import { ILogin, IProfile } from '@/typing/auth';
import { ACCESS_TOKEN } from '@/constants/localStorage';
import { getLocalStorage } from '@/utils/localStorage';

export const login = ({ username, password }: ILogin): Promise<string> => {
  if ((username === 'admin' || username === 'user') && password === 'vite.react') {
    const token = window.btoa(username);
    return Promise.resolve(token);
  }

  return Promise.reject();
};

export const getProfile = (): Promise<IProfile> => {
  const token = getLocalStorage(ACCESS_TOKEN);
  if (!token) {
    return Promise.reject();
  }

  const username = window.atob(token);
  if (username === 'admin') {
    return Promise.resolve({ username, roles: [ROLE.ADMIN] });
  }

  if (username === 'user') {
    return Promise.resolve({ username, roles: [ROLE.USER] });
  }

  return Promise.reject();
};
