import { Dropdown, MenuProps } from 'antd';
import { useMemo } from 'react';

import useAuthStore from '@/store/auth';

import styles from './header.module.less';

const Header = () => {
  const { profile, logout } = useAuthStore();

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'LOGOUT') {
      logout();
    }
  };

  const items = useMemo<MenuProps['items']>(() => {
    return [
      {
        key: 'LOGOUT',
        label: '退出登录',
      },
    ];
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>vite react system</div>
      <Dropdown menu={{ items, onClick: handleClick }}>
        <div className={styles.username}>{profile?.username}</div>
      </Dropdown>
    </div>
  );
};

export default Header;
