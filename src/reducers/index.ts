import { combineReducers } from 'redux';

import auth, { IAuthState } from './auth';

export interface IRootState {
  auth: IAuthState;
}

const reducer = combineReducers<IRootState>({
  auth,
});

export default reducer;
