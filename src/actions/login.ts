
import { createAction } from 'redux-actions'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

import { ILogin } from '@/typing/login'

export enum LOGIN_ACTION_TYPES {
  LOGIN = 'LOGIN'
}

const loginActions = {
  login: createAction(LOGIN_ACTION_TYPES.LOGIN, (payload: ILogin) => payload)
}

export function useLoginActions() {
  const dispatch = useDispatch()
  return useMemo(() => {
    return bindActionCreators(loginActions, dispatch)
  }, []) as typeof loginActions
}
