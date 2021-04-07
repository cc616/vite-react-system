import React, { useCallback, useMemo, useState } from 'react'

import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { last, first } from 'lodash'
import { MenuInfo } from 'rc-menu/lib/interface'

import { routes } from '@/routes'

import styles from './index.module.less'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

interface IProps {
  children: React.ReactElement
}

const pathToArr = (path: string) => {
  return path.split('/').filter((item) => !!item)
}

const Layout = (props: IProps) => {
  const location = useLocation();
  const { pathname } = location
  const pathArr = pathToArr(pathname)

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const firstKey = first(pathArr)
    return firstKey ? [firstKey] : []
  })

  const [selectedKey, setSelectedKey] = useState<string>(() => {
    return `${first(pathArr)}-${last(pathArr)}`
  })

  const handleOpenChange = useCallback<(openKeys: React.Key[]) => void>((openKeys) => {
    const lastKey = last(openKeys) as string

    const newOpenKeys = lastKey ? [lastKey] : []
    setOpenKeys(newOpenKeys)
  }, [])

  const handleChange = useCallback<(info: MenuInfo) => void>(({ key }) => {
    setSelectedKey(key as string)
  }, [])

  const subMenus = useMemo(() => {
    return routes.map((route) => {
      const { path, title, children = [] } = route
      const pathArr = pathToArr(path)
      const key = first(pathArr)

      return (
        <SubMenu key={key} title={title}>
          {children.map((item) => {
            const itemPathArr = pathToArr(item.path)
            const itemKey = `${key}-${last(itemPathArr)}`
            return (
              <MenuItem key={itemKey}>
                <NavLink to={item.path} exact>
                  {item.title}
                </NavLink>
              </MenuItem>
            )
          })}
        </SubMenu>
      )
    })
  }, [])

  return (
    <div className={styles.layout}>
      <Menu
        className={styles.sider}
        openKeys={openKeys}
        selectedKeys={[selectedKey]}
        onOpenChange={handleOpenChange}
        onClick={handleChange}
        mode="inline"
      >
        {subMenus}
      </Menu>
      <div className={styles.container}>
        <div className={styles.header}>header</div>
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout
