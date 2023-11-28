import React, { useState } from 'react';

import { Button, Form, Input, message } from 'antd';

import logo from '@/assets/favicon.svg';
import { ILogin } from '@/typing/auth';

import styles from './index.module.less';
import useAuthStore from '@/store/auth';

const Login = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleLogin = (values: ILogin) => {
    setLoading(true);
    login(values)
      .catch(() => {
        message.error('账号密码错误');
      })
      .finally(() => {
        setLoading(false);
      });
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
            <Input placeholder="密码：vite.react" type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={loading} className={styles.btn} htmlType="submit">
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
