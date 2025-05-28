import cls from 'classnames';

import styles from './index.module.less';

interface IProps {
  children: React.ReactNode;
  bgWhite?: boolean;
  className?: string;
  padding?: number | boolean;
}

const Content = ({ children, bgWhite = false, padding, className }: IProps) => {
  return (
    <div
      className={cls(styles.content, { [styles.white]: bgWhite }, className)}
      style={{ '--padding--': padding === true ? '24px' : `${padding}px` } as Record<string, string>}
    >
      {children}
    </div>
  );
};

export default Content;
