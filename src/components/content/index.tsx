import cls from 'classnames';

import styles from './index.module.less';

interface IProps {
  children: React.ReactNode;
  bgWhite?: boolean;
  className?: string;
}

const Content = ({ children, bgWhite = false, className }: IProps) => {
  return <div className={cls(styles.content, { [styles.white]: bgWhite }, className)}>{children}</div>;
};

export default Content;
