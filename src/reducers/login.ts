import { handleActions, Action } from 'redux-actions';

import { ILogin } from '@/typing/login';
import { LOGIN_ACTION_TYPES } from '@/actions/login';
import { setLocalStorage } from '@/utils/localStorage';
import { ROLE } from '@/constants/auth';
import { ACCESS_TOKEN } from '@/constants/localStorage';

interface IProfile {
  username: string;
  roles: ROLE[];
}

interface ILoginState {
  profile: IProfile | null;
  token?: string;
}

const initialState: ILoginState = { profile: null };

const loginReducer = handleActions(
  {
    [LOGIN_ACTION_TYPES.LOGIN]: (state, action: Action<ILogin>) => {
      const { username } = action.payload;
      const stateProfile = state.profile || ({} as IProfile);
      const role = username === ROLE.ADMIN ? ROLE.ADMIN : ROLE.USER;

      setLocalStorage(ACCESS_TOKEN, JSON.stringify({ username }));
      return {
        ...state,
        profile: {
          username,
          roles: [...stateProfile.roles, role],
        },
      };
    },
  },
  initialState,
);

export default loginReducer;
