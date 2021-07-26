import React from 'react';

import cls from 'classnames';

import styles from './index.module.less';

interface IProps {
  children: React.ReactNode;
  bgWhite?: boolean;
}

const Content = ({ children, bgWhite = false }: IProps): JSX.Element => {
  return <div className={cls(styles.content, { [styles.white]: bgWhite })}>{children}</div>;
};

export default Content;
