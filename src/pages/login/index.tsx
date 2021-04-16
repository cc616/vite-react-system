import React from 'react';

import { Button, Form, Input } from 'antd';

import logo from '@/assets/favicon.svg';
import { ILogin } from '@/typing/login';
import { useLoginActions } from '@/actions/login';

import styles from './index.module.less';

const Login = (): JSX.Element => {
  const loginAction = useLoginActions();

  const handleLogin = (values: ILogin) => {
    loginAction.login(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <img src={logo} className={styles.logo} />
          <div>Vite React System</div>
        </div>
        <div className={styles.description}>一站式服务，强有力的 vite react 后台管理系统</div>
      </div>
      <div className={styles.form}>
        <Form onFinish={handleLogin}>
          <Form.Item name="username" rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input placeholder="用户名：admin or user" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '密码不能为空' }]}>
            <Input placeholder="密码：vite.react" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className={styles.btn} htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.footer}>
        <div>Copyright 2021 后台管理系统体验技术部出品</div>
      </div>
    </div>
  );
};

export default Login;
