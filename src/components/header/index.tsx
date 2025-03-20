import styles from './index.module.less';

interface IProps {
  title: string;
  children?: React.ReactNode;
}

const Header = ({ title, children }: IProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{title}</div>
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Header;
