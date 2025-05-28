import cls from 'classnames';

import styles from './index.module.less';

interface IProps {
  title: string;
  children?: React.ReactNode;
  bgWhite?: boolean;
}

const Header = ({ title, bgWhite = true, children }: IProps) => {
  return (
    <div className={cls(styles.header, { [styles.white]: bgWhite })}>
      <div className={styles.title}>{title}</div>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Header;
