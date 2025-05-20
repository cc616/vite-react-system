import { Menu, MenuProps } from 'antd';
import { first,last } from 'lodash';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback, useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { routes } from '@/routes';

import Header from './header';
import styles from './index.module.less';

type IMenuItem = Required<MenuProps>['items'][number];

const pathToArr = (path: string) => {
  return path.split('/').filter((item) => !!item);
};

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathArr = pathToArr(pathname);

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const firstKey = first(pathArr);
    return firstKey ? [firstKey] : [];
  });

  const [selectedKey, setSelectedKey] = useState<string>(() => {
    const lastKey = last(pathArr);
    const firstKey = first(pathArr) || '';
    return pathArr.length > 1 ? `${firstKey}-${lastKey}` : firstKey;
  });

  const handleOpenChange = useCallback<(openKeys: React.Key[]) => void>((openKeys) => {
    const lastKey = last(openKeys) as string;

    const newOpenKeys = lastKey ? [lastKey] : [];
    setOpenKeys(newOpenKeys);
  }, []);

  const handleChange = useCallback<(info: MenuInfo) => void>(({ key }) => {
    setSelectedKey(key as string);
  }, []);

  const menuItems = useMemo<IMenuItem[]>(() => {
    return routes.map((route, index) => {
      const { path, title, children = [] } = route;
      const pathArr = pathToArr(path);
      const key = first(pathArr) ?? `${index}`;
      return children.length
        ? {
            key,
            label: title,
            children: children.map((item) => {
              const itemPathArr = pathToArr(item.path);
              const itemKey = `${key}-${last(itemPathArr)}`;
              return {
                key: itemKey,
                label: <NavLink to={item.path}>{item.title}</NavLink>,
              };
            }),
          }
        : {
            key,
            label: <NavLink to={path}>{title}</NavLink>,
          };
    });
  }, []);
  return (
    <div className={styles.layout}>
      <div className={styles.sider}>
        <div className={styles.logo}>vite react system</div>
        <Menu
          className={styles.menus}
          openKeys={openKeys}
          selectedKeys={[selectedKey]}
          onOpenChange={handleOpenChange}
          onClick={handleChange}
          mode="inline"
          items={menuItems}
        />
      </div>
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
