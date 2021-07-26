import React from 'react';

import cls from 'classnames';

import styles from './index.module.less';

interface IProps {
  children: React.ReactNode;
  bgWhite?: boolean;
  className?: string;
}

const Content = ({ children, bgWhite = false, className }: IProps): JSX.Element => {
  return <div className={cls(styles.content, { [styles.white]: bgWhite }, className)}>{children}</div>;
};

export default Content;
