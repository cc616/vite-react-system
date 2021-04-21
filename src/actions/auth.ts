import { createAction } from 'redux-actions';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { IProfile } from '@/typing/auth';

export enum AUTH_ACTION_TYPES {
  SET_TOKEN = 'SET_TOKEN',
  SET_PROFILE = 'SET_PROFILE',
}

const authActions = {
  setToken: createAction<string>(AUTH_ACTION_TYPES.SET_TOKEN),
  setProfile: createAction<IProfile>(AUTH_ACTION_TYPES.SET_PROFILE),
};

export const useAuthActions = (): typeof authActions => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(authActions, dispatch);
  }, []);
};
