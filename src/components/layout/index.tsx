import { useCallback, useMemo, useState } from 'react';

import { Menu } from 'antd';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { last, first } from 'lodash';
import { MenuInfo } from 'rc-menu/lib/interface';

import { routes } from '@/routes';
import Header from './header';

import styles from './index.module.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

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

  const subMenus = useMemo(() => {
    return routes.map((route) => {
      const { path, title, children = [] } = route;
      const pathArr = pathToArr(path);
      const key = first(pathArr);

      return !!children.length ? (
        <SubMenu key={key} title={title}>
          {children.map((item) => {
            const itemPathArr = pathToArr(item.path);
            const itemKey = `${key}-${last(itemPathArr)}`;
            return (
              <MenuItem key={itemKey}>
                <NavLink to={item.path}>
                  {item.title}
                </NavLink>
              </MenuItem>
            );
          })}
        </SubMenu>
      ) : (
        <MenuItem key={key}>
          <NavLink to={path}>
            {title}
          </NavLink>
        </MenuItem>
      );
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
        >
          {subMenus}
        </Menu>
      </div>
      <div className={styles.container}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
