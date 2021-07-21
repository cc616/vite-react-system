import { handleActions, Action } from 'redux-actions';

import { IProfile } from '@/typing/auth';
import { AUTH_ACTION_TYPES } from '@/actions/auth';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import { ACCESS_TOKEN } from '@/constants/localStorage';

export interface IAuthState {
  profile: IProfile | null;
  token?: string | null;
}

const initToken = (() => {
  return getLocalStorage<string>(ACCESS_TOKEN);
})();

const initialState: IAuthState = { profile: null, token: initToken };

const authReducer = handleActions<IAuthState, any>(
  {
    [AUTH_ACTION_TYPES.SET_TOKEN]: (state, action: Action<string>) => {
      const token = action.payload;

      setLocalStorage(ACCESS_TOKEN, token);
      return {
        ...state,
        token,
      };
    },
    [AUTH_ACTION_TYPES.SET_PROFILE]: (state, action: Action<IProfile>) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
    [AUTH_ACTION_TYPES.LOGIN_OUT]: (state) => {
      removeLocalStorage(ACCESS_TOKEN);
      return {
        ...state,
        token: null,
      };
    },
  },
  initialState,
);

export default authReducer;
