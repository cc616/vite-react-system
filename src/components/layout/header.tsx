import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Menu, Dropdown } from 'antd';

import { IRootState } from '@/reducers';
import { useAuthActions } from '@/actions/auth';

import styles from './header.module.less';

const MenuItem = Menu.Item;

const Header = (): JSX.Element => {
  const profile = useSelector(({ auth }: IRootState) => auth.profile);
  const authAction = useAuthActions();

  const handleLogout = () => {
    authAction.loginOut();
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
