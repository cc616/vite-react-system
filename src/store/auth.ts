import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { getProfile, login } from '@/apis/auth';
import { ACCESS_TOKEN } from '@/constants/localStorage';
import { ILogin, IProfile } from '@/typing/auth';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/localStorage';

interface IState {
  token: string | null;
  profile: IProfile | null;
}

interface IActions {
  getProfile: () => Promise<void>;
  login: (payload: ILogin) => Promise<void>;
  logout: (redirect?: boolean) => void;
}

const initialToken = (() => {
  return getLocalStorage<string>(ACCESS_TOKEN);
})();

type IStore = IState & IActions;

const useAuthStore = create(
  immer<IStore>((set) => ({
    token: initialToken,
    profile: null,
    login: async (payload) => {
      const token = await login(payload);
      setLocalStorage(ACCESS_TOKEN, token);
      set({ token });
    },
    getProfile: async () => {
      const profile = await getProfile();
      set({ profile });
    },
    logout: () => {
      removeLocalStorage(ACCESS_TOKEN);
      set({ token: null, profile: null });
    },
  })),
);

export default useAuthStore;
