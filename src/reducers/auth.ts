import { handleActions, Action } from 'redux-actions';

import { IProfile } from '@/typing/auth';
import { AUTH_ACTION_TYPES } from '@/actions/auth';
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/utils/localStorage';
import { ACCESS_TOKEN, USER_ROLE } from '@/constants/localStorage';
import { ROLE } from '@/constants/auth';

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
    [AUTH_ACTION_TYPES.SET_TOKEN]: (state, action: Action<{ token: string; role: ROLE }>) => {
      const { token, role } = action.payload;

      setLocalStorage(ACCESS_TOKEN, token);
      setLocalStorage(USER_ROLE, token);
      return {
        ...state,
        token,
        profile: {
          ...(state.profile || {}),
          role,
        } as IProfile,
      };
    },
    [AUTH_ACTION_TYPES.SET_PROFILE]: (state, action: Action<IProfile>) => {
      return {
        ...state,
        profile: action.payload,
      };
    },
    [AUTH_ACTION_TYPES.CLEAR_TOKEN]: (state) => {
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(USER_ROLE);
      return {
        ...state,
        token: null,
      };
    },
  },
  initialState,
);

export default authReducer;
