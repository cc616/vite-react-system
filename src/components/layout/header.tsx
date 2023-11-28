import React, { useMemo } from 'react';

import { Menu, Dropdown } from 'antd';

import styles from './header.module.less';
import useAuthStore from '@/store/auth';

const MenuItem = Menu.Item;

const Header = (): JSX.Element => {
  const { profile, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const menu = useMemo(() => {
    return (
      <Menu>
        <MenuItem onClick={handleLogout}>退出登录</MenuItem>
      </Menu>
    );
  }, []);

  return (
    <div className={styles.header}>
      <Dropdown overlay={menu}>
        <div className={styles.username}>{profile?.username}</div>
      </Dropdown>
    </div>
  );
};

export default Header;
