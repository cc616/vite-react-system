import React from 'react'

import { Button } from 'antd'

import { setLocalStorage } from '@/utils/localStorage'

import styles from './index.module.less'

const Login = () => {

  const handleLogin = () => {
    setLocalStorage('token', 'token')
  }

  return (
    <div className={styles.container}>
      <Button onClick={handleLogin}>login</Button>
    </div>
  )
}

export default Login
