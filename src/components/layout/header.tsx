import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Menu, Dropdown } from 'antd';

import { IRootState } from '@/reducers';

import styles from './header.module.less';

const MenuItem = Menu.Item;

const Header = (): JSX.Element => {
  const profile = useSelector(({ auth }: IRootState) => auth.profile);

  const handleLogout = () => {
    console.log(2);
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
